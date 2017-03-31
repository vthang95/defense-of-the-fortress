class BurnBulletControtroller extends BulletController {
  constructor(position, fatherObject) {
    super(position, 'bulletc', Dotf.playerBulletGroup, fatherObject, {
      bulletSpeed:  Dotf.configs.gun.bulletSpeed
    });
    // this.sprite.animations.add('run', [0, 1, 2, 3], 5, true);
    this.sprite.timeSinceLastFire = 0;
  }

  update() {
    this.sprite.play('run');
    this.sprite.timeSinceLastFire += Dotf.game.time.physicsElapsed;
    if (this.sprite.timeSinceLastFire >= 0.7) {
      Dotf.game.physics.arcade.moveToXY(this.sprite, 0, 0, 0);
      if (this.sprite.timeSinceLastFire >= 2.5) this.sprite.kill();
    }
  }
}
