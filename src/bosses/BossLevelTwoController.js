class BossLevelTwoController extends BossController {
  constructor(configs) {
    super(new Phaser.Point(2800, 150), Dotf.bossGroup, 'boss_level_two', configs);
    this.sprite.baseHealth = 500;
  }

  tryMove() {
      var positionDes;
      this.sprite.timeSinceLastMove += Dotf.game.time.physicsElapsed;
      if (this.sprite.timeSinceLastMove >= 3) {
          positionDes = new Phaser.Point(Math.floor(Math.random() * 800) + 2000, Math.floor(Math.random() * 600));
          Dotf.game.physics.arcade.moveToXY(
              this.sprite,
              positionDes.x,
              positionDes.y,
              this.configs.speedBoss
          );
          this.sprite.timeSinceLastMove = 0;
      }
  }

  fire() {
    new HomingBulletController(this.sprite.position, this);
    new BossOneBulletController(this.sprite.position, new Phaser.Point(0, 1), this);
    new BossOneBulletController(this.sprite.position, new Phaser.Point(1, 5), this);
    new BossOneBulletController(this.sprite.position, new Phaser.Point(-1, 5), this);

  }
}
