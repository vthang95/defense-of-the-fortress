class BossController {
    constructor(position, physicsGroup, spriteName, configs) {
        this.sprite = physicsGroup.create(position.x, position.y, spriteName, 1);
        this.sprite.scale.setTo(0.3, 0.3);
        this.configs = configs;
        this.sprite.timeSinceLastMove = 0;
        this.sprite.timeSinceLastFire = 0;
        this.sprite.anchor.setTo(0.5, 0.5);
        this.sprite.baseHealth = 400;
        this.sprite.health = this.sprite.baseHealth;
        this.sprite.body.collideWorldBounds = true;
        this.bullets = [];
        Dotf.bosses.push(this);
        this.healthBar = new HealthBarController({
                x: position.x - 45,
                y: position.y + 78
            }, {
                x: position.x - 48,
                y: position.y + 70
            },
            this
        );
        this.sprite.events.onKilled.add(this.remove, this);
    }

    remove() {
        this.healthBar.healthBar.destroy();
        this.healthBar.healthBarBG.destroy();
        Dotf.bosses.splice(Dotf.bosses.indexOf(this), 1);
    }

    update() {
      if (Dotf.guards.length === 0) {
        Dotf.game.physics.arcade.moveToXY(this.sprite, 0, 0, 0);
        this.sprite.health = this.sprite.baseHealth;
        this.healthBar.update();
        return;
      }
        this.bullets.forEach(bullet => bullet.update());
        this.healthBar.healthBar.position.x = this.sprite.position.x - 46;
        this.healthBar.healthBar.position.y = this.sprite.position.y - 92;
        this.healthBar.healthBarBG.position.x = this.sprite.position.x - 49;
        this.healthBar.healthBarBG.position.y = this.sprite.position.y - 100;
        this.healthBar.update();

        this.sprite.timeSinceLastMove += Dotf.game.time.physicsElapsed;
        this.sprite.timeSinceLastFire += Dotf.game.time.physicsElapsed;

        var positionDes;
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

BossController.DISTANCE_SHOOT = 450;
