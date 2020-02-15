import React from 'react';
import Board from './Board'
import Percolation from '../util/Percolation';

class PercolationSim extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      n: 4,
      percolation: new Percolation(4)
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
    alert("Simulation complete")
  }

  reset = () => {
    this.setState({ percolation: new Percolation(this.state.n) });
  }

  render() {
    return (
      <div className="percolation-sim">
        <button onClick={this.openRandomSite}>Random</button>
        <button onClick={this.reset}>Reset</button>
        <Board n={4} percolation={ this.state.percolation } />
      </div>
    )
  }
}

export default PercolationSim;