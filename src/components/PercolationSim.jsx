import React from 'react';
import Board from './Board'
import Percolation from '../util/Percolation';

class PercolationSim extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      n: 25,
      percolation: new Percolation(25),
      speed: 500, 
      intervalId: null,
      running: false,
      percolates: false,
      percolationThreshold: null,
      loop: false,
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
      this.setState({ percolates: true });
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
    this.setState({ percolation: new Percolation(this.state.n), percolates: false });
  }

  start = () => {
    if (this.state.percolates) {
      this.reset();
      return;
    }
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

  renderStartStop = () => {
    if (this.state.running) {
      return (
        <button onClick={this.stop}>
          <img 
            className="control-icon play-button"
            src="/assets/images/pause-circle-regular.svg" 
            alt="" 
          />
        </button>
      )
    } else {
      return (
        <button onClick={this.start}>
          <img 
            className="control-icon play-button"
            src="/assets/images/play-circle-regular.svg" 
            alt=""
          />
        </button>
      )
    }
  }

  renderLoop = () => {
    if (!this.state.loop) {
      return (
        <button onClick={this.toggleLoop}>
          <img
            className="control-icon"
            src="/assets/images/repeat-solid.svg"
            alt=""
          />
        </button>
      )
    } else {
      return (
        <button onClick={this.toggleLoop}>
          <img
            className="control-icon"
            src="/assets/images/repeat-on.svg"
            alt=""
          />
        </button>
      )
    }
  }

  render() {
    return (
      <div className="percolation-sim">
        <div className="controls">
          <h1 className="title">Percolation Simulator</h1>
          <div className="buttons">
            {this.renderStartStop()}
            {this.renderLoop()}
            <button onClick={this.reset}>
              <img
                className="control-icon"
                src="/assets/images/trash-alt-solid.svg"
                alt=""
              />
            </button>
          </div>
          <div className="speed-and-threshold">
            <div className="speed-control">
              <p className="speed-text">Speed:</p>
              <input
                type="range"
                min={10}
                max={500}
                value={this.state.speed}
                onChange={this.updateSpeed}
              />
            </div>
            <p>Avg. Threshold: {this.state.percolationThreshold || "---"}</p>
          </div>
        </div>

        <Board 
          n={this.state.n} 
          percolation={ this.state.percolation } 
        />
      </div>
    )
  }
}

export default PercolationSim;