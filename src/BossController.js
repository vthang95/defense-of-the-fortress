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
        this.isImmuneWaring = Dotf.game.add.text(position.x, position.y + 70, "This Object is immune", {
          font: '24px Arial',
          fill: '#fff'
        });
        this.isImmuneWaring.anchor.setTo(0.5, 0.5);
        this.bullets = [];
        Dotf.bosses.push(this);
        this.healthBar = new HealthBarController({
                x: this.sprite.position.x - 46,
                y: this.sprite.position.y -92
            }, {
                x: this.sprite.position.x - 49,
                y: this.sprite.position.y - 100
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
          this.sprite.body.enable = false;
          this.isImmuneWaring.visible = true;
          Dotf.game.physics.arcade.moveToXY(this.sprite, 0, 0, 0);
          this.sprite.health = this.sprite.baseHealth;
          this.healthBar.update();
          return;
        } else {
          this.isImmuneWaring.visible = false;
          this.sprite.body.enable = true;
        };

        this.bullets.forEach(bullet => bullet.update());
        this.healthBar.healthBar.position.x = this.sprite.position.x - 46;
        this.healthBar.healthBar.position.y = this.sprite.position.y - 92;
        this.healthBar.healthBarBG.position.x = this.sprite.position.x - 49;
        this.healthBar.healthBarBG.position.y = this.sprite.position.y - 100;
        this.isImmuneWaring.x = this.sprite.position.x;
        this.isImmuneWaring.y = this.sprite.position.y + 70;

        this.healthBar.update();


        this.tryMove();

        this.tryFire();
    }

    tryMove() {
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
    }
}

BossController.DISTANCE_SHOOT = 450;
