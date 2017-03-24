class PlayerController {
  constructor(spriteName, gunName, spritesheet, configs) {
    this.sprite = Dotf.game.add.sprite(Dotf.configs.GAME_WIDTH_MAX/2, Dotf.configs.GAME_HEIGHT_MAX/2, spritesheet.down, 1);
    Dotf.game.physics.p2.enable(this.sprite);
    this.sprite.body.fixedRotation = true;
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.scale.setTo(5);

    this.sprite.smoothed = false;
    Dotf.left = this.sprite.animations.add('left', [0,1,2,3], 10, true);

    this.configs = configs;
    this.spritesheet = spritesheet;

    Dotf.game.camera.follow(this.sprite);
    Dotf.game.camera.follow(this.sprite, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
    Dotf.gun = new GunController(gunName, this.sprite);

  }

  tryFire() {
    console.log('test fire');
  }

  update() {
    Dotf.gun.update();

    this.sprite.body.setZeroVelocity();
    //TODO add animation for all navigations command
    if (Dotf.keyboard.isDown(this.configs.up)) {
        this.sprite.body.velocity.y = -this.configs.speed;
    } else if (Dotf.keyboard.isDown(this.configs.down)) {
        this.sprite.body.velocity.y = this.configs.speed;
        this.sprite.play('left');
    }
    if (Dotf.keyboard.isDown(this.configs.left)) {
        this.sprite.body.velocity.x = -this.configs.speed;
    } else if (Dotf.keyboard.isDown(this.configs.right)) {
        this.sprite.body.velocity.x = this.configs.speed;
    }
    // Stop animation
    if (this.sprite.body.velocity.x === 0 && this.sprite.body.velocity.y === 0) this.sprite.animations.stop();

    if (Dotf.game.input.activePointer.isDown) this.tryFire();
  }
}
