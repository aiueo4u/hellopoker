import React from 'react';
import PokerCard from 'components/PokerCard';

const BoardCardArea = ({ gameTable }) => (
  <div style={{ position: "relative", width: "100%", background: "gray" }}>
    <div
      style={{
        position: "absolute",
        left: "calc(50% - 72px)",
        transform: "translate(-50%, 0%)"
      }}
    >
      {gameTable.boardCards &&
      gameTable.boardCards[0] &&
      gameTable.reachedRounds.flop ? (
        <PokerCard
          rank={gameTable.boardCards[0][0]}
          suit={gameTable.boardCards[0][1]}
        />
      ) : (
        <PokerCard invisible />
      )}
    </div>
    <div
      style={{
        position: "absolute",
        left: "calc(50% - 36px)",
        transform: "translate(-50%, 0%)"
      }}
    >
      {gameTable.boardCards &&
      gameTable.boardCards[1] &&
      gameTable.reachedRounds.flop ? (
        <PokerCard
          rank={gameTable.boardCards[1][0]}
          suit={gameTable.boardCards[1][1]}
        />
      ) : (
        <PokerCard invisible />
      )}
    </div>
    <div
      style={{
        position: "absolute",
        left: "50%",
        transform: "translate(-50%, 0%)"
      }}
    >
      {gameTable.boardCards &&
      gameTable.boardCards[2] &&
      gameTable.reachedRounds.flop ? (
        <PokerCard
          rank={gameTable.boardCards[2][0]}
          suit={gameTable.boardCards[2][1]}
        />
      ) : (
        <PokerCard invisible />
      )}
    </div>
    <div
      style={{
        position: "absolute",
        left: "calc(50% + 36px)",
        transform: "translate(-50%, 0%)"
      }}
    >
      {gameTable.boardCards &&
      gameTable.boardCards[3] &&
      gameTable.reachedRounds.turn ? (
        <PokerCard
          rank={gameTable.boardCards[3][0]}
          suit={gameTable.boardCards[3][1]}
        />
      ) : (
        <PokerCard invisible />
      )}
    </div>
    <div
      style={{
        position: "absolute",
        left: "calc(50% + 72px)",
        transform: "translate(-50%, 0%)"
      }}
    >
      {gameTable.boardCards &&
      gameTable.boardCards[4] &&
      gameTable.reachedRounds.river ? (
        <PokerCard
          rank={gameTable.boardCards[4][0]}
          suit={gameTable.boardCards[4][1]}
        />
      ) : (
        <PokerCard invisible />
      )}
    </div>
  </div>
);

export default BoardCardArea;
