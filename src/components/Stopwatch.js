import React, { Component } from 'react';

let clock;

class Stopwatch extends Component {
  state = {
    seconds: 0
  };

  componentDidMount() {
    clock = setInterval(this.gameClock, 1000);
  }

  componentDidUpdate(prevProps) {
    if (this.props.gameOver !== prevProps.gameOver) {
      clearInterval(clock);
    }
  }

  gameClock = () => {
    if (this.state.seconds === this.props.seconds) {
      clearInterval(clock);
      this.props.finishCallback();
    } else {
      this.setState((prevState) => {
        return {
          seconds: prevState.seconds + 1
        };
      });
    }
  };

  componentWillUnmount() {
    clearInterval(clock);
  }

  render() {
    return (
      <span>
        {this.state.seconds}
      </span>
    );
  }
}

export default Stopwatch;