import React, { Component } from "react";
import "./style.css";

class PokerCard extends Component {
  render() {
    const { rank, suit, invisible } = this.props;

    const suitString =
      suit === "s"
        ? "spades"
        : suit === "h"
        ? "hearts"
        : suit === "d"
        ? "diamonds"
        : "clubs";

    let rankString;
    switch (rank) {
      case "T":
        rankString = "rank10";
        break;
      case "J":
        rankString = "rank11";
        break;
      case "Q":
        rankString = "rank12";
        break;
      case "K":
        rankString = "rank13";
        break;
      case "A":
        rankString = "rank1";
        break;
      default:
        rankString = `rank${rank}`;
        break;
    }

    const faceOrBackClassName = invisible
      ? "poker-card-back"
      : "poker-card-face";

    return (
      <div>
        <div className={`poker-card ${suitString} ${rankString}`}>
          <div className={faceOrBackClassName}>
            <div className="poker-card-face-suit">
              {suit === "s" && <span>&#9824;</span>}
              {suit === "h" && <span>&#9829;</span>}
              {suit === "d" && <span>&#9830;</span>}
              {suit === "c" && <span>&#9827;</span>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PokerCard;
