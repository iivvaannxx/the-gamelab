/** Defines the logic for the game score. */
export class Score {
  private score = 0;
  private highScore = 0;

  /** Gets the current score of the player. */
  public get currentScore() {
    return this.score;
  }

  /** Gets the current high score of the player. */
  public get currentHighScore() {
    return this.highScore;
  }

  /** Constructs a new instance of the Score Controller. */
  public constructor() {
    this.score = 0;
    this.highScore = Number(localStorage.getItem("highScore") ?? "0");
  }

  /** Increases the score of the player (always by 1). */
  public increase() {
    // The score always increases by 1.
    this.score++;
  }

  /** Resets the score of the player. */
  public reset() {
    this.score = 0;
  }

  /** Tries to update the high score of the player. */
  public tryUpdateHighScore() {
    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem("highScore", this.highScore.toString());

      return true;
    }

    return false;
  }
}
