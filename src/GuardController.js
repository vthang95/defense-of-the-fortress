class GuardController {
  constructor() {
    this.sprite = Dotf.guardGroup.create(Dotf.base.sprite.position.x, Dotf.base.sprite.position.y, 'shield');
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.scale.setTo(0.5);
    this.timeCountDown = Dotf.game.add.sprite(Dotf.configs.GAME_WIDTH_MAX / 2, 100, 'healthBar');
    this.timeCountDown.anchor.setTo(0.5, 0.5);
    this.timeCountDown.fixedToCamera = true;
    Dotf.guards.push(this);

    this.timeLeft = Dotf.game.add.text(Dotf.configs.GAME_WIDTH_MAX / 2, 80, `Time left`, {
      font: '24px Arial',
      fill: '#fff'
    });
    this.timeLeft.fixedToCamera = true;
    this.timeLeft.anchor.setTo(0.5, 0.5);

    this.timeCountDown.timeFromStart = Dotf.game.time.now;
  }
  checkTimeOut() {
      let condition = Dotf.game.time.now - Dotf.configs.baseImmuneTime > this.timeCountDown.timeFromStart;
      if (condition) {
        this.sprite.destroy();
        this.timeCountDown.destroy();
        this.timeLeft.destroy();
        Dotf.guards.splice(Dotf.guards.indexOf(this), 1);
      }
  }

  update() {
    this.checkTimeOut();
    if (!this.sprite.alive) return;
    let timeBarScale = (Dotf.configs.baseImmuneTime - (Dotf.game.time.now - this.timeCountDown.timeFromStart)) / Dotf.configs.baseImmuneTime;
    this.timeCountDown.scale.setTo(timeBarScale, 1);
  }
}
