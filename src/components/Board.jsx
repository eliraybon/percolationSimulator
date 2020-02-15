import React from 'react';

class Board extends React.Component {

  renderGrid = () => {
    const { n, percolation } = this.props;
    const grid = [];
    for (let row = 0; row < n; row++) {
      for (let col = 0; col < n; col++) {
        if (percolation.isFull(row, col)) {
          grid.push(<li key={`${row}${col}`} className="site full"></li>)
        } else if (percolation.isOpen(row, col)) {
          grid.push(<li key={`${row}${col}`} className="site open"></li>)
        } else {
          grid.push(<li key={`${row}${col}`} className="site closed"></li>)
        }
      }
    }
    return grid;
  }

  render() {
    return ( 
      <ul className="board">
        {this.renderGrid()}
      </ul>
    )
  }
}

export default Board;