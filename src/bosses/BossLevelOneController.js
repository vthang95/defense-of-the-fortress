class BossLevelOneController extends BossController {
  constructor(configs) {
    super(new Phaser.Point(300, 250), Dotf.bossGroup, 'boss_level_one', configs);
    this.sprite.baseHealth = 300;
  }

  tryMove() {
      var positionDes;
      this.sprite.timeSinceLastMove += Dotf.game.time.physicsElapsed;
      if (this.sprite.timeSinceLastMove >= 3) {
          positionDes = new Phaser.Point(Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000));
          Dotf.game.physics.arcade.moveToXY(
              this.sprite,
              positionDes.x,
              positionDes.y,
              this.configs.speedBoss
          );
          this.sprite.timeSinceLastMove = 0;
      }
  }

  tryFire() {
      this.sprite.timeSinceLastFire += Dotf.game.time.physicsElapsed;
      var distanceBetweenPlayerAndEnemy = Phaser.Math.distance(
          Dotf.player.sprite.position.x,
          Dotf.player.sprite.position.y,
          this.sprite.position.x,
          this.sprite.position.y
      );

      if (distanceBetweenPlayerAndEnemy <= BossController.DISTANCE_SHOOT &&
          this.sprite.timeSinceLastFire >= 2) {
          this.fire();
          this.sprite.timeSinceLastFire = 0;
      }
  }

  fire() {
    // new HomingBulletController(this.sprite.position, this);
    new BossOneBulletController(this.sprite.position, new Phaser.Point(0, 1), this);
    new BossOneBulletController(this.sprite.position, new Phaser.Point(1, 5), this);
    new BossOneBulletController(this.sprite.position, new Phaser.Point(-1, 5), this);

  }
}
