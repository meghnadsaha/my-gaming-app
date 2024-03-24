import React, { useState, useEffect } from 'react';
import './PuzzleGame.css';

const PuzzleGame = () => {
  const [image, setImage] = useState(null);
  const [pieces, setPieces] = useState([]);
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    fetch('https://source.unsplash.com/random/400x400')
      .then((response) => response.blob())
      .then((blob) => {
        setImage(URL.createObjectURL(blob));
      });
  }, []);

  useEffect(() => {
    if (image) {
      const tempPieces = [];
      const pieceSize = 100;
      const cols = 4;
      const rows = 4;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const piece = {
            id: `${x}-${y}`,
            x: x * pieceSize,
            y: y * pieceSize,
            width: pieceSize,
            height: pieceSize,
            order: y * cols + x,
            isCorrect: y * cols + x === cols * rows - 1,
          };
          tempPieces.push(piece);
        }
      }

      setPieces(tempPieces.sort(() => Math.random() - 0.5));
    }
  }, [image]);

  const handleDrop = (e, piece) => {
    e.preventDefault();
    const droppedPiece = JSON.parse(e.dataTransfer.getData('piece'));

    if (droppedPiece.id !== piece.id) {
      const droppedIndex = pieces.findIndex((p) => p.id === droppedPiece.id);
      const targetIndex = pieces.findIndex((p) => p.id === piece.id);

      const tempPieces = [...pieces];
      tempPieces[droppedIndex] = piece;
      tempPieces[targetIndex] = droppedPiece;
      setPieces(tempPieces);

      checkSolved(tempPieces);
    }
  };

  const checkSolved = (currentPieces) => {
    const isSolved = currentPieces.every((p, index) => p.order === index);
    setSolved(isSolved);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="puzzle-game">
      <h1>Puzzle Game</h1>
      {!solved && (
        <div className="puzzle-board">
          {pieces.map((piece) => (
            <div
              key={piece.id}
              className="puzzle-piece"
              style={{
                backgroundImage: `url(${image})`,
                backgroundPosition: `-${piece.x}px -${piece.y}px`,
                width: piece.width,
                height: piece.height,
                border: piece.isCorrect ? '2px solid green' : 'none',
              }}
              draggable={!solved}
              onDragStart={(e) => e.dataTransfer.setData('piece', JSON.stringify(piece))}
              onDrop={(e) => handleDrop(e, piece)}
              onDragOver={(e) => handleDragOver(e)}
            ></div>
          ))}
        </div>
      )}
      {solved && <div className="puzzle-solved">Puzzle Solved!</div>}
    </div>
  );
};

export default PuzzleGame;
