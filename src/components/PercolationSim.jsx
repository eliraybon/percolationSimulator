import React from 'react';
import Board from './Board'
import Percolation from '../util/Percolation';

class PercolationSim extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      n: 10,
      percolation: new Percolation(10),
      speed: 500, 
      intervalId: null,
      running: false,
      percolationThreshold: null,
      loop: false
    }
  }

  openRandomSite = () => {
    const { percolation } = this.state;
    if (!percolation.percolates()) {
      let randRow = this.generateRandom();
      let randCol = this.generateRandom();
      while (percolation.isOpen(randRow, randCol)) {
        randRow = this.generateRandom();
        randCol = this.generateRandom();
      }
      percolation.open(randRow, randCol);
      this.setState({ percolation });
    } else {
      this.finishSimulation();
    }
  }

  generateRandom = () => {
    return Math.floor(Math.random() * this.state.n);
  }

  finishSimulation = () => {
    const { percolation, percolationThreshold, n, loop } = this.state;
    this.stop();
    if (!percolationThreshold) {
      this.setState({ percolationThreshold: percolation.openSites / n ** 2 });
    } else {
      const currentThreshold = percolation.openSites / n ** 2;
      const newThreshold = (percolationThreshold + currentThreshold) / 2;
      this.setState({ percolationThreshold: newThreshold });
    }
    if (loop) {
      this.reset();
      this.start();
    }
  }

  reset = () => {
    this.stop();
    this.setState({ percolation: new Percolation(this.state.n) });
  }

  start = () => {
    clearInterval(this.state.intervalId);
    const intervalId = setInterval(this.openRandomSite, this.state.speed);
    this.setState({ intervalId, running: true });
  }

  stop = () => {
    clearInterval(this.state.intervalId);
    this.setState({ running: false });
  }

  updateSpeed = e => {
    if (this.state.running) this.start();
    this.setState({ speed: e.currentTarget.value });
  }

  toggleLoop = () => {
    this.setState(state => {
      return { loop: !state.loop }
    });
  }

  render() {
    return (
      <div className="percolation-sim">
        <button onClick={this.openRandomSite}>Random</button>
        <button onClick={this.reset}>Reset</button>
        <button onClick={this.start}>Start</button>
        <button onClick={this.stop}>Stop</button>
        <button onClick={this.toggleLoop}>Loop {this.state.loop ? "On" : "off"}</button>
        <input 
          type="range" 
          min={10} 
          max={500}
          value={this.state.speed}
          onChange={this.updateSpeed}
        />
        <p>Percolation Threshold: {this.state.percolationThreshold || "---" }</p>
        <Board n={this.state.n} percolation={ this.state.percolation } />
      </div>
    )
  }
}

export default PercolationSim;