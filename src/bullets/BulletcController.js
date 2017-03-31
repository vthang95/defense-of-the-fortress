class BulletcController extends BulletController {
    constructor(position, fatherObject) {
        super(position, 'bulletc', Dotf.playerBulletGroup, fatherObject, {
            bulletSpeed: Dotf.configs.gun.bulletSpeed
        });
    }
}
BulletcController.BULLET_C_MAX_TIME = 500;
