class PlayerController {
  constructor(spriteName, cursor, gunName, animation, configs) {
    this.sprite = Dotf.game.add.sprite(Dotf.configs.GAME_WIDTH_MAX/2, Dotf.configs.GAME_HEIGHT_MAX/2, animation.down, 1);
    Dotf.game.physics.p2.enable(this.sprite);
    this.sprite.body.fixedRotation = true;
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.scale.setTo(3);

    this.sprite.smoothed = false;
    Dotf.left = this.sprite.animations.add('left', [0,1,2,3], 10, true);

    this.configs = configs;
    this.animation = animation;

    Dotf.game.camera.follow(this.sprite);
    Dotf.game.camera.follow(this.sprite, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

    Dotf.game.input.mouse.capture = true;
    this.cursor = Dotf.game.add.sprite(Dotf.game.world.centerX, Dotf.game.world.centerY, cursor);
    Dotf.game.physics.p2.enable(this.cursor);
    this.cursor.body.fixedRotation = true;
    this.cursor.anchor.setTo(0.5, 0.5);

    this.gun = Dotf.game.add.sprite(this.sprite.body.x, this.sprite.body.y, gunName);
    Dotf.game.physics.p2.enable(this.gun);
    this.gun.body.fixedRotation = true;
    this.gun.anchor.setTo(0.5, 0.5);
    this.gun.scale.setTo(2);
  }

  tryFire() {
    console.log('test fire');
  }

  update() {

    this.gun.body.x = this.sprite.body.x;
    this.gun.body.y = this.sprite.body.y + 28;

    this.cursor.body.x = Dotf.game.input.mousePointer.x + Dotf.game.camera.x;
    this.cursor.body.y = Dotf.game.input.mousePointer.y + Dotf.game.camera.y;

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
