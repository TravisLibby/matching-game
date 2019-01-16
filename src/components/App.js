import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showCard, clearFlippedCards } from '../actions/cards';
import { matchFound, clearMatches } from '../actions/matches';
import { turnTaken, clearTurns } from '../actions/turns';
import StartScreen from './StartScreen';
import GameOver from './GameOver';
import Countdown from './Countdown';
import Stopwatch from './Stopwatch';
import Congratulations from './Congratulations';

let cards = [
  'coffee',
  'heart',
  'star',
  'bell',
  'beer',
  'anchor',
  'home',
  'paw'
];

class App extends Component {
  state = {
    shuffledCards: [],
    startScreen: true,
    countdown: false,
    playing: false,
    timeIsUp: false,
    winner: false
  };

  componentDidMount () {
    this.shuffleCards();
  };

  componentDidUpdate (prevProps) {
    if (prevProps.flippedCards !== this.props.flippedCards) {
      if (this.props.flippedCards.length === 2) {
        this.isMatch(this.props.flippedCards);
        this.props.turnTaken();
        this.clearFlippedCards();
      }
    }
  }

  shuffleCards = () => {
    this.setState({
      shuffledCards: this.getShuffledCards(
          cards.reduce((acc, curr, idx, src) => acc
          .concat([{name: curr, type: curr}, {name: `${curr}-b`, type: curr}]), [])
        )
    });
  }

  getFrontCardClasses = (card) => {
    let classes = '';

    if (this.isCardShowing(card) || this.props.matches.includes(card.type)) {
      classes += 'showing';
    }

    return classes;
  };

  clearFlippedCards = () => {
    setTimeout(() => {
      this.props.clearFlippedCards();
    }, 1000);
  };

  getShuffledCards = (cards) => {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    return cards;
  };

  isMatch = ([card1, card2]) => {
    if (card1.type === card2.type && card1.name !== card2.name) {
      this.props.matchFound(card1.type);

      if (this.props.matches.length === cards.length - 1) {
        this.gameOver();
      }
    }
  };

  isCardShowing = (card) => {
    for (let item of this.props.flippedCards) {
      if (item.name === card.name) {
        return true;
      }
    }
  }

  showCard = (card) => {
    const { flippedCards, showCard } = this.props;

    if (flippedCards.length < 2 && !flippedCards.includes(card)) {
      showCard(card);
    }
  };

  startCountdown = () => this.setState({startScreen: false, countdown: true});

  startGame = () => this.setState({countdown: false, playing: true});

  gameOver = () => this.setState({winner: true, playing: false});

  timeIsUp = () => this.setState({playing: false, timeIsUp: true});

  resetGame = () => {
    this.props.clearFlippedCards();
    this.shuffleCards();
    this.props.clearMatches();
    this.props.clearTurns();
    this.setState({countdown: true, timeIsUp: false, winner: false});
  }

  renderCards = () => {
    return this.state.shuffledCards.map((card, idx) => (
      <li 
        key={idx}  
        className={`memory-card ${this.props.matches.includes(card.type) ? 'match' : null}`}
        onClick={() => this.showCard(card)}>
        <div 
          className={`memory-card-front ${this.getFrontCardClasses(card)}`}>
          <i className="question icon big"></i>
        </div>
        <i className={`${card.type} icon big`}></i>
      </li>
    ));
  };

  render() {
    return (
      <div className="memory-card-container">
        {this.state.startScreen && (
          <StartScreen startCountdown={this.startCountdown} />
        )}

        {this.state.countdown && (
          <Countdown startGame={this.startGame}/>
        )}

        {this.state.playing && (
          <div>
            <div className="game-stats">
              <div className="stopwatch"> 
                <Stopwatch 
                  inProgress={!this.state.gameOver}
                  finishCallback={this.timeIsUp}
                  seconds={60}
                />
                <span>/60</span>
              </div>
              <div className="turns">
                Turns: {this.props.turns}
              </div>
            </div>
            <ul>
              {this.renderCards()}
            </ul>
          </div>
        )}

        {this.state.winner && (
          <Congratulations resetGame={this.resetGame} />
        )}

        {(!this.state.playing && !this.state.winner && this.state.timeIsUp) && (
          <GameOver resetGame={this.resetGame} />
        )}
      </div>
    );
  }
}

function mapStateToProps ({ cards, matches, turns }) {
  return {
    flippedCards: cards,
    matches,
    turns
  };
}

export default connect(
  mapStateToProps, { 
    showCard,
    matchFound,
    turnTaken,
    clearFlippedCards,
    clearMatches,
    clearTurns 
  }
)(App);
