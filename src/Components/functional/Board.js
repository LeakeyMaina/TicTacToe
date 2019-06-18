import React from "react";
import "../index.css";

import Square from "./Square";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      currentPlayerIsX: true
    };
  }

  setSquaresState(i) {
    //create a copy of the squares array to modify instead of modifying the existing array
    const squaresCopy = this.state.squares.slice();

    if (this.calculateWinner(squaresCopy) || squaresCopy[i]) {
      return;
    }

    //Update the Square on the copy with new value
    squaresCopy[i] = this.state.currentPlayerIsX ? "X" : "O";

    this.setState({
      squares: squaresCopy,
      currentPlayerIsX: !this.state.currentPlayerIsX
    });
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.setSquaresState(i)}
      />
    );
  }

  render() {
    const winner = this.calculateWinner(this.state.squares);
    let status;

    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = this.state.currentPlayerIsX ? "X" : "O";
    }

    return (
      <div>
        <div className="status"> {`Current player: ${status}`}</div>

        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export default Board;
