class CannonGunController extends GunController {
  constructor(playerSprite, configs) {
    super(Dotf.gunGroup, 'cannon_gun_animation', playerSprite, configs);
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
    new BulletaController(
      this.sprite.position,
      this
    );
  }

  addAnimation() {
    this.sprite.animations.add('down', [8], 1, true);
    this.sprite.animations.add('up', [9], 1, true);
    this.sprite.animations.add('left', [6], 1, true);
    this.sprite.animations.add('right', [7], 1, true);
    this.sprite.animations.add('rightCrossUp', [2], 1, true);
    this.sprite.animations.add('rightCrossDown', [0], 1, true);
    this.sprite.animations.add('leftCrossUp', [3], 1, true);
    this.sprite.animations.add('leftCrossDown', [1], 1, true);
  }

  configGun() {
    return {
      down: {x: 8, y: 42},
      right: {x: 25, y: 25},
      up: {x: 10,y: 25},
      left: {x: -25,y: 25},
      leftCrossDown: {x: -15,y: 37},
      rightCrossDown: {x: 23,y: 37},
      rightCrossUp: {x: 30,y: 15},
      leftCrossUp: {x: -20,y: 15},
    }
  }
}
