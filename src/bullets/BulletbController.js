class BulletbController extends BulletController {
    constructor(position, direction, angle) {
        super(position, direction, 'bulletb', Dotf.playerBulletGroup, {
            bulletSpeed: BulletbController.BULLET_SPEED
        });
        this.sprite.damage = 8;
        this.sprite.angle = angle;
    }
}

BulletbController.BULLET_SPEED = 1100;
