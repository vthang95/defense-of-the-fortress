class PlayerController {
  constructor(physicsGroup, spriteName, gunName, spritesheet, configs) {
    this.sprite = physicsGroup.create(Dotf.configs.GAME_WORLD_WIDTH/2, Dotf.configs.GAME_WORLD_HEIGHT/2, spritesheet.down, 1);
    this.sprite.anchor.setTo(0.5, 0.5);
    Dotf.game.physics.arcade.enable(this.sprite);
    this.sprite.body.fixedRotation = true;
    this.sprite.scale.setTo(4);

    this.sprite.smoothed = false;
    this.moveLeft = this.sprite.animations.add('left', [0,1,2,3], 10, true);

    this.configs = configs;
    this.spritesheet = spritesheet;

    Dotf.game.camera.follow(this.sprite);
    Dotf.game.camera.follow(this.sprite, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
    this.gun = new GunController(gunName, this.sprite);

    this.cursor = new CursorController('cursor');
  }

  tryFire() {
    console.log('test fire');
  }

  update() {
    this.gun.update();
    this.cursor.update();

    this.sprite.body.velocity.x = 0;
    this.sprite.body.velocity.y = 0;
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
