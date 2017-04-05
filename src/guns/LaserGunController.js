class LaserGunController extends GunController {
  constructor(playerSprite, configs) {
    super(Dotf.gunGroup, 'laser_gun_animation', playerSprite, configs);
    this.sprite.setDamage = 10;
    this.laserGunSound = Dotf.game.add.audio('laser_gun_audio');
    this.laserGunSound.volume = 0.01;
    this.gunName = 'laser_gun';
  }

  changeCursor() {
    Dotf.cursor.sprite.anchor.setTo(0.5, 0.5);
    if (Dotf.game.input.activePointer.isDown) Dotf.cursor.sprite.loadTexture('bulletc_cursor2');
    else Dotf.cursor.sprite.loadTexture('bulletc_cursor1');
  }

  playSound() {
    this.laserGunSound.play();
  }

  createBullet() {
    new LaserBulletController(
      this.sprite.position,
      this
    );
  }

  addAnimation() {
    this.sprite.animations.add('down', [2], 1, true);
    this.sprite.animations.add('up', [7], 1, true);
    this.sprite.animations.add('left', [1], 1, true);
    this.sprite.animations.add('right', [0], 1, true);
    this.sprite.animations.add('rightCrossUp', [3], 1, true);
    this.sprite.animations.add('rightCrossDown', [5], 1, true);
    this.sprite.animations.add('leftCrossUp', [4], 1, true);
    this.sprite.animations.add('leftCrossDown', [6], 1, true);
  }

  changeAnimation() {
    if (this.angleBetweenSpriteAndPointer > 67.5 && this.angleBetweenSpriteAndPointer < 112.5) {
      this.sprite.play('down');
      this.sprite.body.x = this.fatherSprite.body.x + 8;
      this.sprite.body.y = this.fatherSprite.body.y + 42;
    }
    if (this.angleBetweenSpriteAndPointer > 112.5 && this.angleBetweenSpriteAndPointer < 157.5) {
      this.sprite.play('leftCrossDown');
      this.sprite.body.x = this.fatherSprite.body.x - 15;
      this.sprite.body.y = this.fatherSprite.body.y + 37;
    }
    if (this.angleBetweenSpriteAndPointer > 22.5 && this.angleBetweenSpriteAndPointer < 67.5) {
      this.sprite.play('rightCrossDown');
      this.sprite.body.x = this.fatherSprite.body.x + 20;
      this.sprite.body.y = this.fatherSprite.body.y + 38;
    }
    if (this.angleBetweenSpriteAndPointer > -22.5 && this.angleBetweenSpriteAndPointer < 22.5) {
      this.sprite.play('right');
      this.sprite.body.x = this.fatherSprite.body.x + 25;
      this.sprite.body.y = this.fatherSprite.body.y + 25;
    }
    if (this.angleBetweenSpriteAndPointer > -67.5 && this.angleBetweenSpriteAndPointer < -22.5) {
      this.sprite.play('rightCrossUp');
      this.sprite.body.x = this.fatherSprite.body.x + 34;
      this.sprite.body.y = this.fatherSprite.body.y + 16;
    }
    if (this.angleBetweenSpriteAndPointer > -112.5 && this.angleBetweenSpriteAndPointer < -67.5) {
      this.sprite.play('up');
      this.sprite.body.x = this.fatherSprite.body.x + 10;
      this.sprite.body.y = this.fatherSprite.body.y + 25;
    }
    if (this.angleBetweenSpriteAndPointer > -157.5 && this.angleBetweenSpriteAndPointer < -112.5) {
      this.sprite.play('leftCrossUp');
      this.sprite.body.x = this.fatherSprite.body.x - 21;
      this.sprite.body.y = this.fatherSprite.body.y + 15;
    }
    if ((this.angleBetweenSpriteAndPointer > -180 && this.angleBetweenSpriteAndPointer < -157.5) || (this.angleBetweenSpriteAndPointer > 157.5 && this.angleBetweenSpriteAndPointer < 180)) {
      this.sprite.play('left');
      this.sprite.body.x = this.fatherSprite.body.x - 25;
      this.sprite.body.y = this.fatherSprite.body.y + 25;
    }
  }
}
