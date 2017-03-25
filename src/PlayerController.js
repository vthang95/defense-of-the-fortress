class PlayerController {
  constructor(physicsGroup, spriteName, spritesheet, configs) {
    this.sprite = physicsGroup.create(Dotf.configs.GAME_WORLD_WIDTH/2, Dotf.configs.GAME_WORLD_HEIGHT/2, spritesheet, 0);
    this.sprite.anchor.setTo(0.5, 0.5);
    Dotf.game.physics.arcade.enable(this.sprite);
    this.sprite.body.fixedRotation = true;
    this.sprite.scale.setTo(4);

    this.sprite.smoothed = false;
    this.moveLeft = this.sprite.animations.add('left', [25,26,27,28], 10, true);
    this.moveRight = this.sprite.animations.add('right', [21,22,23,24], 10, true);
    this.moveUp = this.sprite.animations.add('up', [9,10,11,12], 10, true);
    this.moveDown = this.sprite.animations.add('down', [17,18,19,20], 10, true);

    this.configs = configs;
    this.spritesheet = spritesheet;

    Dotf.game.camera.follow(this.sprite);
    Dotf.game.camera.follow(this.sprite, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
    this.gun = new GunController('gun', this.sprite);

    this.cursor = new CursorController('cursor');
  }

  update() {
    this.gun.update();
    this.cursor.update();

    this.sprite.body.velocity.x = 0;
    this.sprite.body.velocity.y = 0;
    //TODO add animation for all navigations command
    if (Dotf.keyboard.isDown(this.configs.up)) {
        this.sprite.body.velocity.y = -this.configs.speed;
          this.sprite.play('up');
    } else if (Dotf.keyboard.isDown(this.configs.down)) {
        this.sprite.body.velocity.y = this.configs.speed;
        this.sprite.play('down');
    }
    if (Dotf.keyboard.isDown(this.configs.left)) {
        this.sprite.body.velocity.x = -this.configs.speed;
          this.sprite.play('left');
    } else if (Dotf.keyboard.isDown(this.configs.right)) {
        this.sprite.body.velocity.x = this.configs.speed;
          this.sprite.play('right');
    }
    // Stop animation
    if (this.sprite.body.velocity.x === 0 && this.sprite.body.velocity.y === 0) this.sprite.animations.stop();


  }
}
