class BulletcController extends BulletController {
    constructor(position, fatherObject) {
        super(position, 'bulletc', Dotf.playerBulletGroup, fatherObject, {
            bulletSpeed: Dotf.configs.gun.bulletSpeed
        });
        this.sprite.rotation = Dotf.game.physics.arcade.moveToPointer(
            this.sprite,
            this.configs.bulletSpeed,
            Dotf.game.input.activePointer
        );
    }
}
BulletcController.BULLET_C_MAX_TIME = 500;
