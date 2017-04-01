class BossController {
    constructor(position, physicsGroup, spriteName, configs) {
        this.sprite = physicsGroup.create(position.x, position.y, spriteName, 1);
        this.sprite.scale.setTo(0.3, 0.3);
        this.configs = configs;
        this.sprite.timeSinceLastMove = 0;
        this.sprite.timeSinceLastFire = 0;
        this.sprite.anchor.setTo(0.5, 0.5);
        this.sprite.health = 500;
        this.sprite.body.collideWorldBounds = true;
        this.bullets = [];
    }

    remove() {
        Dotf.boss.splice(Dotf.boss.indexOf(this), 1);
    }

    update() {
      this.bullets.forEach(bullet => bullet.update());
        if (!this.sprite.alive) this.remove();
        if (Dotf.boss.length == 0) return;

        this.sprite.timeSinceLastMove += Dotf.game.time.physicsElapsed;
        this.sprite.timeSinceLastFire += Dotf.game.time.physicsElapsed;

        if (this.sprite.timeSinceLastMove >= 3) {
            this.positionDes = new Phaser.Point(Math.floor(Math.random() * 2960) + 1, Math.floor(Math.random() * 2160) + 1);
            Dotf.game.physics.arcade.moveToXY(
                this.sprite,
                this.positionDes.x,
                this.positionDes.y,
                this.configs.speedBoss
            );
            this.sprite.timeSinceLastMove = 0;
        }

        var distanceBetweenPlayerAndEnemy = Phaser.Math.distance(
            Dotf.player.sprite.position.x,
            Dotf.player.sprite.position.y,
            this.sprite.position.x,
            this.sprite.position.y
        );

        if (distanceBetweenPlayerAndEnemy <= BossController.DISTANCE_SHOOT &&
          this.sprite.timeSinceLastFire >= 2) {
          new HomingBulletController(this.sprite.position, this);
          this.sprite.timeSinceLastFire = 0;
        }
    }
}

BossController.DISTANCE_SHOOT = 500;
