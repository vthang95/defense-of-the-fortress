class EnemyShootPlayerController extends EnemyController {
    constructor(position, physicsGroup, configs) {
        super(position, 'enemy_fire', physicsGroup, configs);
        this.sprite.timeSinceLastFire = 0;
        this.bullets = [];
        this.sprite.scale.setTo(2, 2);
        Dotf.configs.enemy.speed = EnemyShootPlayerController.ENEMY_SPEED;
        this.sprite.animations.add('run', [1, 2, 3], 5, true);
    }

    update() {
        this.sprite.play('run');
        if (!Dotf.base.sprite.health) {
            this.sprite.body.velocity.x = 0;
            this.sprite.body.velocity.y = 0;
        } else
            Dotf.game.physics.arcade.moveToXY(this.sprite,
                Dotf.player.sprite.position.x,
                Dotf.player.sprite.position.y,
                Dotf.configs.enemy.speed
            );

        var distanceBetweenPlayerAndEnemy = Phaser.Math.distance(
            Dotf.player.sprite.position.x,
            Dotf.player.sprite.position.y,
            this.sprite.position.x,
            this.sprite.position.y
        );

        this.sprite.timeSinceLastFire += Dotf.game.time.physicsElapsed;
        if (distanceBetweenPlayerAndEnemy <= EnemyShootPlayerController.DISTANCE_SHOOT &&
            this.sprite.timeSinceLastFire >= 4) {
            Dotf.configs.enemy.speed = 0;
            this.tryFire();
            setTimeout(function() {
                Dotf.configs.enemy.speed = EnemyShootPlayerController.ENEMY_SPEED;
            }, 3000);
        }
    }

    tryFire() {
        new EnemyBulletController(
            this.sprite.position,
            this
        );
        this.sprite.timeSinceLastFire = 0;
    }
}

EnemyShootPlayerController.DISTANCE_SHOOT = 500;
EnemyShootPlayerController.ENEMY_SPEED = 250;
