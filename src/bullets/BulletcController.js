class BulletcController extends BulletController {
    constructor(position, fatherObject) {
        super(position, 'bulletc', Dotf.playerBulletGroup, fatherObject, {
            bulletSpeed: BulletcController.BULLET_SPEED
        });
    }
}
BulletcController.BULLET_C_MAX_TIME = 500;
BulletcController.BULLET_SPEED = 700
