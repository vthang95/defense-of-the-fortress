class GunController {
  constructor(physicsGroup, spriteName, playerSprite, configs) {
    this.fatherSprite = playerSprite;
    this.sprite = physicsGroup.create(this.fatherSprite.body.x, this.fatherSprite.body.y, spriteName, 3);
    this.sprite.body.fixedRotation = true;
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.scale.setTo(2);
    this.sprite.setDamage = 5;
    // TODO check self remove object when it is destroyed

    this.bullets = [];
    this.configs = configs;
    this.nextTime = 0;
    this.fireRate = 500;

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

  changeAnimation() {
    if (this.angleBetweenSpriteAndPointer > 67.5 && this.angleBetweenSpriteAndPointer < 112.5) {
      this.sprite.play('down');
      this.sprite.body.x = this.fatherSprite.body.x + 10;
      this.sprite.body.y = this.fatherSprite.body.y + 40;
    }
    if (this.angleBetweenSpriteAndPointer > 112.5 && this.angleBetweenSpriteAndPointer < 157.5) {
      this.sprite.play('leftCrossDown');
      this.sprite.body.x = this.fatherSprite.body.x - 15;
      this.sprite.body.y = this.fatherSprite.body.y + 37;
    }
    if (this.angleBetweenSpriteAndPointer > 22.5 && this.angleBetweenSpriteAndPointer < 67.5) {
      this.sprite.play('rightCrossDown');
      this.sprite.body.x = this.fatherSprite.body.x + 18;
      this.sprite.body.y = this.fatherSprite.body.y + 37;
    }
    if (this.angleBetweenSpriteAndPointer > -22.5 && this.angleBetweenSpriteAndPointer < 22.5) {
      this.sprite.play('right');
      this.sprite.body.x = this.fatherSprite.body.x + 25;
      this.sprite.body.y = this.fatherSprite.body.y + 25;
    }
    if (this.angleBetweenSpriteAndPointer > -67.5 && this.angleBetweenSpriteAndPointer < -22.5) {
      this.sprite.play('rightCrossUp');
      this.sprite.body.x = this.fatherSprite.body.x + 30;
      this.sprite.body.y = this.fatherSprite.body.y + 15;
    }
    if (this.angleBetweenSpriteAndPointer > -112.5 && this.angleBetweenSpriteAndPointer < -67.5) {
      this.sprite.play('up');
      this.sprite.body.x = this.fatherSprite.body.x + 10;
      this.sprite.body.y = this.fatherSprite.body.y + 25;
    }
    if (this.angleBetweenSpriteAndPointer > -157.5 && this.angleBetweenSpriteAndPointer < -112.5) {
      this.sprite.play('leftCrossUp');
      this.sprite.body.x = this.fatherSprite.body.x - 21;
      this.sprite.body.y = this.fatherSprite.body.y + 3;
    }
    if ((this.angleBetweenSpriteAndPointer > -180 && this.angleBetweenSpriteAndPointer < -157.5) || (this.angleBetweenSpriteAndPointer > 157.5 && this.angleBetweenSpriteAndPointer < 180)) {
      this.sprite.play('left');
      this.sprite.body.x = this.fatherSprite.body.x - 28;
      this.sprite.body.y = this.fatherSprite.body.y + 22;
    }
  }

  tryFire() {
    if (!this.sprite.alive) return;
    soundGun1.play();
    Dotf.game.camera.shake(0.001, 200);
    if (Dotf.game.time.now > this.nextTime) {
      this.nextTime = Dotf.game.time.now + this.fireRate;
      this.createBullet();
    }
  }

  update() {
    this.changeCursor();
    this.bullets.forEach(bullet => bullet.update());

    this.angleBetweenSpriteAndPointer = Phaser.Math.radToDeg(Dotf.game.physics.arcade.angleBetween(this.fatherSprite, Dotf.cursor.sprite));
    this.changeAnimation();
    // this.sprite.rotation = Dotf.game.physics.arcade.angleBetween(this.sprite, this.fatherSprite.cursor.sprite) - Math.PI / 2;
    if (Dotf.game.input.activePointer.isDown) this.tryFire();
  }

}
