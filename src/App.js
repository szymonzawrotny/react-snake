import React, {Component} from 'react';

import Snake from './Snake';
import Food from './Food';

import "./App.css";

const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  let y =  Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  return [x,y]
};

const initialState = {
  food: getRandomCoordinates(),
  snakeDots: [
    [0,0],
    [2,0],
    [4,0]
  ],
  direction: "right",
  speed: 100,
};

class App extends Component{
  state = initialState;

  onKeyDown = (e)=>{

    const up = 38;
    const left = 37;
    const right = 39;
    const down = 40

    const control = e.keyCode;

    switch(control){
      case right: this.setState({direction:"right"});
      break;
      case down: this.setState({direction:"down"});
      break;
      case up: this.setState({direction:"up"});
      break;
      case left: this.setState({direction:"left"});
      break;
      default: console.log("error");
    }
  };

  moveSnake = ()=>{

    const {snakeDots} = this.state;
    let snakeDotsCopy = [...snakeDots];

    let x = snakeDots[snakeDots.length-1][0];
    let y = snakeDots[snakeDots.length-1][1];

    switch(this.state.direction){
      case "right": x += 2;
      break;
      case "down": y += 2;
      break;
      case "up": y -= 2;
      break;
      case "left": x -= 2;
      break;
      default: console.log("error");
    }

    snakeDotsCopy.push([x,y]);
    snakeDotsCopy.shift();

    this.setState({
      snakeDots:snakeDotsCopy
    });
  };

  checkIfOutOfBorders = ()=>{
    const {snakeDots} = this.state;
    let head = snakeDots[snakeDots.length-1];

    if(head[0] >=100 || head[1] >= 100 || head[0] < 0 || head[1] < 0){
      this.gameOver();
    }
  };

  checkIfCollapsed = ()=>{
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length-1];
    snake.pop();
    snake.forEach(one=>{
      if(head[0] === one[0] && head[1] === one[1])
        this.gameOver()
    })
  }

  enlargeSnake = ()=>{
    const {snakeDots} = this.state;
    let snakeDotsCopy = [...snakeDots];

    let x = snakeDots[0][0];
    let y = snakeDots[0][1];

    snakeDotsCopy.unshift([])
    this.setState({
      snakeDots: snakeDotsCopy
    })
  }

  increaseSpeed = ()=>{
    if(this.state.speed > 10)
      this.setState({
        speed: this.state.speed -20
      })
  }

  checkIfEat = ()=>{
    const {snakeDots, food} = this.state;
    let head = snakeDots[snakeDots.length-1];

    if(head[0]===food[0] && head[1]===food[1]){
      this.setState({
        food: getRandomCoordinates()
      });
      this.enlargeSnake();
      this.increaseSpeed();
    }
  }

  gameOver = ()=>{
    alert(`Przejebałeś, długość Twojego pytonga to ${this.state.snakeDots.length}`);
    this.setState(initialState);
  }


  componentDidMount(){
    window.addEventListener("keydown",this.onKeyDown);
    setInterval(this.moveSnake,this.state.speed);
  };

  componentDidUpdate(){
    this.checkIfOutOfBorders();
    this.checkIfCollapsed();
    this.checkIfEat();
  }

  render(){
    return (
      <div className="game-area">
        <Snake snakeDots={this.state.snakeDots}/>
        <Food dot={this.state.food} />
      </div>
    )
  }
}
export default App;
