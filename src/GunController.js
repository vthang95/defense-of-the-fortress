class GunController {
  constructor(physicsGroup, spriteName, playerSprite, configs) {
    this.fatherSprite = playerSprite;
    this.sprite = physicsGroup.create(this.fatherSprite.body.x, this.fatherSprite.body.y, spriteName, 3);
    this.sprite.body.fixedRotation = true;
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.scale.setTo(2);
    this.sprite.setDamage = 2;
    this.sprite.alpha = true;
    this.gunName = 'default_gun';
    // TODO check self remove object when it is destroyed

    this.bullets = [];
    this.configs = configs;
    this.nextTime = 0;
    this.fireRate = configs.fireRate;

    this.addAnimation();
  }
  // overide changeCursor function when create an instance
  changeCursor() {
    Dotf.cursor.sprite.anchor.setTo(0.5, 0.5);
    if (Dotf.game.input.activePointer.isDown) Dotf.cursor.sprite.loadTexture('bulleta_cursor2');
    else Dotf.cursor.sprite.loadTexture('bulleta_cursor1');
  }

  createBullet() {
    new BulletcController(
      this.sprite.position,
      this
    );
  }

  addAnimation() {
    this.sprite.animations.add('down', [3], 1, true);
    this.sprite.animations.add('up', [8], 1, true);
    this.sprite.animations.add('left', [2], 1, true);
    this.sprite.animations.add('right', [1], 1, true);
    this.sprite.animations.add('rightCrossUp', [4], 1, true);
    this.sprite.animations.add('rightCrossDown', [6], 1, true);
    this.sprite.animations.add('leftCrossUp', [5], 1, true);
    this.sprite.animations.add('leftCrossDown', [7], 1, true);
  }

  playSound() {

  }

  configGun() {
    return {
      down: {x: 10, y: 40},
      right: {x: 25, y: 25},
      up: {x: 10,y: 25},
      left: {x: -28,y: 22},
      leftCrossDown: {x: -15,y: 37},
      rightCrossDown: {x: 18,y: 37},
      rightCrossUp: {x: 30,y: 15},
      leftCrossUp: {x: -21,y: 3},
    }
  }

  changeAnimation() {
    let configs = this.configGun();
    if (this.angleBetweenSpriteAndPointer > 67.5 && this.angleBetweenSpriteAndPointer < 112.5) {
      this.sprite.play('down');
      this.sprite.body.x = this.fatherSprite.body.x + configs.down.x;
      this.sprite.body.y = this.fatherSprite.body.y + configs.down.y;
    }
    if (this.angleBetweenSpriteAndPointer > 112.5 && this.angleBetweenSpriteAndPointer < 157.5) {
      this.sprite.play('leftCrossDown');
      this.sprite.body.x = this.fatherSprite.body.x + configs.leftCrossDown.x;
      this.sprite.body.y = this.fatherSprite.body.y + configs.leftCrossDown.y;
    }
    if (this.angleBetweenSpriteAndPointer > 22.5 && this.angleBetweenSpriteAndPointer < 67.5) {
      this.sprite.play('rightCrossDown');
      this.sprite.body.x = this.fatherSprite.body.x + configs.rightCrossDown.x;
      this.sprite.body.y = this.fatherSprite.body.y + configs.rightCrossDown.y;
    }
    if (this.angleBetweenSpriteAndPointer > -22.5 && this.angleBetweenSpriteAndPointer < 22.5) {
      this.sprite.play('right');
      this.sprite.body.x = this.fatherSprite.body.x + configs.right.x;
      this.sprite.body.y = this.fatherSprite.body.y + configs.right.y;
    }
    if (this.angleBetweenSpriteAndPointer > -67.5 && this.angleBetweenSpriteAndPointer < -22.5) {
      this.sprite.play('rightCrossUp');
      this.sprite.body.x = this.fatherSprite.body.x + configs.rightCrossUp.x;
      this.sprite.body.y = this.fatherSprite.body.y + configs.rightCrossUp.y;
    }
    if (this.angleBetweenSpriteAndPointer > -112.5 && this.angleBetweenSpriteAndPointer < -67.5) {
      this.sprite.play('up');
      this.sprite.body.x = this.fatherSprite.body.x + configs.up.x;
      this.sprite.body.y = this.fatherSprite.body.y + configs.up.y;
    }
    if (this.angleBetweenSpriteAndPointer > -157.5 && this.angleBetweenSpriteAndPointer < -112.5) {
      this.sprite.play('leftCrossUp');
      this.sprite.body.x = this.fatherSprite.body.x + configs.leftCrossUp.x;
      this.sprite.body.y = this.fatherSprite.body.y + configs.leftCrossUp.y;
    }
    if ((this.angleBetweenSpriteAndPointer > -180 && this.angleBetweenSpriteAndPointer < -157.5) || (this.angleBetweenSpriteAndPointer > 157.5 && this.angleBetweenSpriteAndPointer < 180)) {
      this.sprite.play('left');
      this.sprite.body.x = this.fatherSprite.body.x + configs.left.x;
      this.sprite.body.y = this.fatherSprite.body.y + configs.left.y;
    }
  }

  isCanFire() {
    return true;
  }

  tryFire() {
    if (this.isCanFire) {
      if (!this.sprite.alive) return;
      Dotf.game.camera.shake(0.001, 200);
      if (Dotf.game.time.now > this.nextTime) {
        this.nextTime = Dotf.game.time.now + this.fireRate;
        this.playSound();
        this.createBullet();
      }
    }
  }

  setAngleBetweenSpriteAndPointer() {
    this.angleBetweenSpriteAndPointer = Phaser.Math.radToDeg(Dotf.game.physics.arcade.angleBetween(this.fatherSprite, Dotf.cursor.sprite));
  }

  update() {
    this.changeCursor();
    this.bullets.forEach(bullet => bullet.update());

    this.setAngleBetweenSpriteAndPointer();
    this.changeAnimation();
    // this.sprite.rotation = Dotf.game.physics.arcade.angleBetween(this.sprite, this.fatherSprite.cursor.sprite) - Math.PI / 2;
    if (Dotf.game.input.activePointer.isDown) this.tryFire();
  }

}
