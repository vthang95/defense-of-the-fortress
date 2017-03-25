class GunController {
  constructor(spriteName, playerSprite) {
    this.fatherSprite = playerSprite;
    this.sprite = Dotf.game.add.sprite(this.fatherSprite.body.x, this.fatherSprite.body.y, spriteName);
    Dotf.game.physics.arcade.enable(this.sprite);
    this.sprite.body.fixedRotation = true;
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.scale.setTo(3);
    // TODO check self remove object when it is destroyed
    this.sprite.timeSinceLastFire = 0;
  }
  tryFire() {
    this.sprite.timeSinceLastFire += Dotf.game.time.physicsElapsed;
    if (this.sprite.timeSinceLastFire > 0.4) {
      new BulletController(this.sprite.position, new Phaser.Point(0, 1), 'bulleta', Dotf.playerBulletGroup, {bulletSpeed: 500});
      this.sprite.timeSinceLastFire = 0;
    }
    // direction, spriteName, physicsGroup, configs
  }

  update() {
    this.sprite.body.x = this.fatherSprite.body.x + 10;
    this.sprite.body.y = this.fatherSprite.body.y + 55;

    if (Dotf.game.input.activePointer.isDown) this.tryFire();
    if (Dotf.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) this.tryFire();
    // console.log(this.bullets);
  }

}
