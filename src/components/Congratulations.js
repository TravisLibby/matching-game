import React, { Component } from 'react';
import { connect } from 'react-redux';

class Congratulations extends Component {
  render() {
    return (
      <div>
        <h1 className="congratulations">Congratulations!</h1>
        <p className="winning-turns">You won the game in {this.props.turns} moves.</p>
        <button 
          className="ui positive basic button massive start-button"
          onClick={this.props.resetGame}>
          Start
        </button>
      </div>
    );
  }
}

function mapStateToProps ({ turns }) {
  return { turns };
}

export default connect(mapStateToProps)(Congratulations);