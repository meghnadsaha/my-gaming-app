import "./MemoryCardGame.css";
import React, { useState, useEffect } from "react";

const MemoryCardGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);

  // Generate a new deck of cards
  useEffect(() => {
    const generateDeck = () => {
      const symbols = ["🌟", "🎈", "🍉", "🚀", "🌈", "🐱", "🍕", "🎉"];
      const newCards = symbols.concat(symbols).map((symbol, index) => ({
        id: index,
        symbol,
        isFlipped: false,
        isMatched: false,
      }));
      //   shuffleCards(newCards);
      setCards(newCards);
    };
    
    generateDeck();
  }, []);

  // Shuffle the deck of cards
  const shuffleCards = (deck) => {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
  };

  // Handle card click
  const handleCardClick = (clickedCard) => {
    if (
      flippedCards.length === 2 ||
      clickedCard.isFlipped ||
      clickedCard.isMatched
    ) {
      return;
    }

    const newFlippedCards = [...flippedCards, clickedCard];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);

      if (newFlippedCards[0].symbol === newFlippedCards[1].symbol) {
        setMatchedCards([...matchedCards, ...newFlippedCards]);
        setFlippedCards([]);

        if (matchedCards.length + 2 === cards.length) {
          alert(
            `Congratulations! You completed the game in ${moves + 1} moves.`
          );
        }
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="memory-card-game">
      <h1>Memory Card Game</h1>
      <p>Moves: {moves}</p>
      {/* <pre>{JSON.stringify(cards, null, 2)}</pre> */}

      <div className="cards">

        {cards.map((card) => (
          <div
            key={card.id}
            className={`card ${card.isFlipped ? "flipped" : ""} ${
              card.isMatched ? "matched" : ""
            }`}
            onClick={() => handleCardClick(card)}
          >
            {card.isFlipped || card.isMatched ? card.symbol : ""}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryCardGame;
