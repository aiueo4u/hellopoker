const styles = theme => ({
  avatar: ({ isTurn }) => ({
    width: "60px",
    height: "60px",
    animation: isTurn ? "onHeroTurnAvatarBlinkAnimation 1s infinite" : ""
  }),
  "@keyframes onHeroTurnAvatarBlinkAnimation": {
    "50%": {
      boxShadow: "0 1px 15px 1px yellow"
    }
  }
});

export default styles;
