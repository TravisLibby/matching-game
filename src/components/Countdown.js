import React, { Component } from 'react';

let timer;

class Countdown extends Component {
  state = {
    seconds: 3,
    finished: false
  };

  componentDidMount() {
    timer = setInterval(this.gameCountdown, 1000);  
  }

  gameCountdown = () => {
    if (this.state.seconds < 1) {
      clearInterval(timer);
      this.setState({finished: true});
      this.props.startGame();
    } else {
      this.setState((prevState) => {
        return {
          seconds: prevState.seconds - 1
        };
      });
    }
  };

  componentWillUnmount() {
    clearInterval(timer);
  }

  render() {
    const secondsText = this.state.seconds > 0 
      ? this.state.seconds
      : 'Go!';
    return (
      <h1 className="countdown">
        {!this.state.finished && secondsText}
      </h1>
    );
  }
}

export default Countdown;