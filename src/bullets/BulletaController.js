class BulletaController extends BulletController {
    constructor(position, fatherObject) {
        super(position, 'bulleta', Dotf.playerBulletGroup, fatherObject, {
            bulletSpeed: Dotf.configs.gun.bulletSpeed
        });
    }
}
