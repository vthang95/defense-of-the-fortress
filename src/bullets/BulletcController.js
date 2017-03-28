class BulletcController extends BulletController {
    constructor(position, direction, angle) {
        super(position, direction, 'bulletc', Dotf.playerBulletGroup, {
            bulletSpeed: Dotf.configs.gun.bulletSpeed
        });
        this.sprite.damage = 4;
        this.sprite.angle = angle;

        this.direction = new Phaser.Point(-1,-1);
        Dotf.game.physics.arcade.moveToPointer(this.sprite, this.configs.bulletSpeed);
    }
}

BulletcController.BULLET_SPEED = 1700;
