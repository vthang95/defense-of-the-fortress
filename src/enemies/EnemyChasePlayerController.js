class EnemyChasePlayerController extends EnemyController {
    constructor(position, physicsGroup, configs) {
        super(position, 'catscratch', physicsGroup, configs);
    }

    update() {
        this.sprite.play('run');
        if (!Dotf.base.sprite.health) {
            this.sprite.body.velocity.x = 0;
            this.sprite.body.velocity.y = 0;
        } else {
            Dotf.game.physics.arcade.moveToXY(this.sprite,
                Dotf.player.sprite.position.x,
                Dotf.player.sprite.position.y,
                this.configs.speed
            );
        }
    }
}
