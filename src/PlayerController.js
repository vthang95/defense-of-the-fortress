class PlayerController {
  constructor(spriteName, configs) {
    this.sprite = Dotf.game.add.sprite(Dotf.game.world.centerX, Dotf.game.world.centerY, spriteName);
    Dotf.game.physics.p2.enable(this.sprite);
    this.sprite.body.fixedRotation = true;
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.scale.setTo(2, 2);

    Dotf.game.camera.follow(this.sprite);
    Dotf.game.camera.follow(this.sprite, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

    Dotf.game.input.mouse.capture = true;
    this.configs = configs;
  }

  tryFire() {
    console.log('test fire');
  }

  update() {
    this.sprite.body.setZeroVelocity();

    if (Dotf.keyboard.isDown(this.configs.up)) {
        this.sprite.body.velocity.y = -this.configs.speed;
    } else if (Dotf.keyboard.isDown(this.configs.down)) {
        this.sprite.body.velocity.y = this.configs.speed;
    }
    if (Dotf.keyboard.isDown(this.configs.left)) {
        this.sprite.body.velocity.x = -this.configs.speed;
    } else if (Dotf.keyboard.isDown(this.configs.right)) {
        this.sprite.body.velocity.x = this.configs.speed;
    }
    if (Dotf.game.input.activePointer.isDown) {
        this.tryFire();
    }
  }
}
