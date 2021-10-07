import React, { useState, useEffect } from 'react';
import Status from './Status';
import Controls from './Controls';
import Hand from './Hand';
import jsonData from '../deck.json';

type bProps = {
  amount: number;
  setAmount(val : number): void;
};

const BlackJack: React.FC<bProps> = ({amount, setAmount}) => {
  enum GameState {
    BET,
    INIT,
    USERTURN,
    DEALERTURN
  }

  enum Deal {
    USER,
    DEALER,
    HIDDEN
  }

  enum Message {
    BET = 'Place a Bet!',
    HITSTAND = 'Hit or Stand?',
    BUST = 'Bust!',
    USERWIN = 'You Win!',
    DEALERWIN = 'Dealer Wins!',
    TIE = 'Tie!'
  }

  const data = JSON.parse(JSON.stringify(jsonData.cards));
  const [deck, setDeck]: any[] = useState(data);

  const [userCards, setUserCards]: any[] = useState([]);
  const [userScore, setUserScore] = useState(0);
  const [userCount, setUserCount] = useState(0);

  const [dealerCards, setDealerCards]: any[] = useState([]);
  const [dealerScore, setDealerScore] = useState(0);
  const [dealerCount, setDealerCount] = useState(0);

  const [bet, setBet] = useState(0);

  const [gameState, setGameState] = useState(GameState.BET);
  const [message, setMessage] = useState(Message.BET);
  const [buttonState, setButtonState] = useState({
    hitDisabled: false,
    standDisabled: false,
    resetDisabled: true
  });

  useEffect(() => {
    if (gameState === GameState.INIT) {
      drawCard(Deal.USER);
      drawCard(Deal.HIDDEN);
      drawCard(Deal.USER);
      drawCard(Deal.DEALER);
      setGameState(GameState.USERTURN);
      setMessage(Message.HITSTAND);
    }
  }, [gameState]);

  useEffect(() => {
    calculate(userCards, setUserScore);
    setUserCount(userCount + 1);
  }, [userCards]);

  useEffect(() => {
    calculate(dealerCards, setDealerScore);
    setDealerCount(dealerCount + 1);
  }, [dealerCards]);

  useEffect(() => {
    if (gameState === GameState.USERTURN) {
      if (userScore === 21) {
        buttonState.hitDisabled = true;
        setButtonState({ ...buttonState });
      }
      else if (userScore > 21) {
        BUST();
      }
    }
  }, [userCount]);

  useEffect(() => {
    if (gameState === GameState.DEALERTURN) {
      if (dealerScore >= 17) {
        checkWin();
      }
      else {
        drawCard(Deal.DEALER);
      }
    }
  }, [dealerCount]);

  const resetGame = () => {
    console.clear();
    setDeck(data);

    setUserCards([]);
    setUserScore(0);
    setUserCount(0);

    setDealerCards([]);
    setDealerScore(0);
    setDealerCount(0);

    setBet(0);

    setGameState(GameState.BET);
    setMessage(Message.BET);
    setButtonState({
      hitDisabled: false,
      standDisabled: false,
      resetDisabled: true
    });
  }

  const placeBet = (betAmount: number) => {
    setBet(betAmount);
    setAmount(Math.round((amount - betAmount) * 100) / 100);
    setGameState(GameState.INIT);
    console.log(amount);
  }

  const drawCard = (dealType: Deal) => {
    if (deck.length > 0) {
      const randomIndex = Math.floor(Math.random() * deck.length);
      const card = deck[randomIndex];
      deck.splice(randomIndex, 1);
      setDeck([...deck]);
      console.log('Remaining Cards:', deck.length);
      switch (card.suit) {
        case 'spades':
          dealCard(dealType, card.value, '♠');
          break;
        case 'diamonds':
          dealCard(dealType, card.value, '♦');
          break;
        case 'clubs':
          dealCard(dealType, card.value, '♣');
          break;
        case 'hearts':
          dealCard(dealType, card.value, '♥');
          break;
        default:
          break;
      }
    }
    else {
      alert('All cards have been drawn');
    }
  }

  const dealCard = (dealType: Deal, value: string, suit: string) => {
    switch (dealType) {
      case Deal.USER:
        userCards.push({ 'value': value, 'suit': suit, 'hidden': false });
        setUserCards([...userCards]);
        break;
      case Deal.DEALER:
        dealerCards.push({ 'value': value, 'suit': suit, 'hidden': false });
        setDealerCards([...dealerCards]);
        break;
      case Deal.HIDDEN:
        dealerCards.push({ 'value': value, 'suit': suit, 'hidden': true });
        setDealerCards([...dealerCards]);
        break;
      default:
        break;
    }
  }

  const revealCard = () => {
    dealerCards.filter((card: any) => {
      if (card.hidden === true) {
        card.hidden = false;
      }
      return card;
    });
    setDealerCards([...dealerCards])
  }

  const calculate = (cards: any[], setScore: any) => {
    let total = 0;
    cards.forEach((card: any) => {
      if (card.hidden === false && card.value !== 'A') {
        switch (card.value) {
          case 'K':
            total += 10;
            break;
          case 'Q':
            total += 10;
            break;
          case 'J':
            total += 10;
            break;
          default:
            total += Number(card.value);
            break;
        }
      }
    });
    const aces = cards.filter((card: any) => {
      return card.value === 'A';
    });
    aces.forEach((card: any) => {
      if (card.hidden === false) {
        if ((total + 11) > 21) {
          total += 1;
        }
        else if ((total + 11) === 21) {
          if (aces.length > 1) {
            total += 1;
          }
          else {
            total += 11;
          }
        }
        else {
          total += 11;
        }
      }
    });
    setScore(total);
  }

  const hit = () => {
    drawCard(Deal.USER);
  }

  const stand = () => {
    buttonState.hitDisabled = true;
    buttonState.standDisabled = true;
    buttonState.resetDisabled = false;
    setButtonState({ ...buttonState });
    setGameState(GameState.DEALERTURN);
    revealCard();
  }

  const BUST = () => {
    buttonState.hitDisabled = true;
    buttonState.standDisabled = true;
    buttonState.resetDisabled = false;
    setButtonState({ ...buttonState });
    setMessage(Message.BUST);
  }

  const checkWin = () => {
    if (userScore > dealerScore || dealerScore > 21) {
      setAmount(Math.round((amount + (bet * 2)) * 100) / 100);
      setMessage(Message.USERWIN);
    }
    else if (dealerScore > userScore) {
      setMessage(Message.DEALERWIN);
    }
    else {
      setAmount(Math.round((amount + (bet * 1)) * 100) / 100);
      setMessage(Message.TIE);
    }
  }

  return (
    <>
      <Status message={message} amount={amount} />
      <Controls
        amount={amount}
        gameState={gameState}
        buttonState={buttonState}
        betEvent={placeBet}
        hitEvent={hit}
        standEvent={stand}
        resetEvent={resetGame}
      />
      <Hand title={`Dealer's Hand (${dealerScore})`} cards={dealerCards} />
      <Hand title={`Your Hand (${userScore})`} cards={userCards} />
    </>
  );
}

export default BlackJack;
