class GuardController {
  constructor() {
    this.sprite = Dotf.guardGroup.create(Dotf.base.sprite.position.x, Dotf.base.sprite.position.y, 'shield');
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.scale.setTo(0.5);
    this.timeCountDown = Dotf.game.add.sprite(Dotf.configs.GAME_WIDTH_MAX / 2, 100, 'healthBar');
    this.timeCountDown.anchor.setTo(0.5, 0.5);
    this.timeCountDown.fixedToCamera = true;
    this.timeCountDown.timeFromStart = Dotf.game.time.now;
  }
  checkTimeOut() {
      let condition = Dotf.game.time.now - GuardController.TIME_TO_AUTO_REMOVE > this.timeCountDown.timeFromStart;
      if (condition) {
        this.sprite.destroy();
        this.timeCountDown.destroy();
      }
  }

  update() {
    this.checkTimeOut();
    if (!this.sprite.alive) return;
    let timeBarScale = (GuardController.TIME_TO_AUTO_REMOVE - (Dotf.game.time.now - this.timeCountDown.timeFromStart)) / GuardController.TIME_TO_AUTO_REMOVE;
    this.timeCountDown.scale.setTo(timeBarScale, 1);
  }
}

GuardController.TIME_TO_AUTO_REMOVE = 30000;
