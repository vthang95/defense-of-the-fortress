class ExpController {
  constructor(position, spriteName, configs) {
    this.sprite = Dotf.expGroup.create(position.x, position.y, spriteName, 0);
    this.configs = configs;
    this.sprite.expValue = this.configs.expValue;
    this.sprite.scale.setTo(2);
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.animations.add('spin', [0, 1, 2, 3], 10, true);

    Dotf.exps.push(this);

    Dotf.game.add.tween(this.sprite).to({
        x: position.x + this.randomNumber(),
        y: position.y + this.randomNumber()
      },
      this.configs.speed,
      Phaser.Easing.Bounce.Out,
      true
    );

    this.autoRemove();
  }

  randomNumber() {
    return Math.floor(Math.random() * 80 - 40);
  };

  update() {
    this.sprite.play('spin');
  };

  autoRemove() {
    setTimeout(() => {
      Dotf.exps.splice(Dotf.exps.indexOf(this), 1);
      this.sprite.destroy();
      // TODO add auto remove instance
    }, 5000)
  }
}
