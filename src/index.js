import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      board: Array(9).fill(null),
      togglePlayer: true,
      won: false
    };
  }

  handleClick(i) {
    if (this.state.board[i] || this.state.won) {
      return;
    }
    const new_board = this.state.board.slice();
    new_board[i] = this.state.togglePlayer ? "X" : "O";
    this.setState({ board: new_board, togglePlayer: !this.state.togglePlayer });
  }

  handleReset() {
    this.setState({
      board: Array(9).fill(null),
      togglePlayer: true
    });
  }

  isWin(board) {
    for (var x = 0; x < board.length - 3; x += 3) {
      console.log(board[x], board[x + 1], board[x + 2]);
      if (board[x] && board[x] === board[x + 1] && board[x] === board[x + 2]) {
        return board[x];
      }
    }
    for (var y = 0; y < 3; y++) {
      if (board[y] && board[y] === board[y + 3] && board[y] === board[y + 6]) {
        return board[y];
      }
    }
    if (board[0] && board[0] === board[4] && board[0] === board[8]) {
      return board[0];
    }
    if (board[2] && board[2] === board[4] && board[2] === board[6]) {
      return board[2];
    }
  }

  renderSquare(i) {
    return (
      <Square value={this.state.board[i]} onClick={() => this.handleClick(i)} />
    );
  }

  render() {
    var winningPlayer = this.isWin(this.state.board);
    var status = this.state.togglePlayer ? "X" : "O";
    if (winningPlayer) {
      status = null;
    }

    return (
      <div>
        <div className="status">Next player: {status}</div>
        <div className="status">Winner: {winningPlayer}</div>
        <button onClick={() => this.handleReset()}>Reset</button>
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

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
