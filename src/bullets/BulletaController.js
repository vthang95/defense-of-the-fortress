class BulletaController extends BulletController {
    constructor(position, direction) {
        super(position, direction, 'bulleta', Dotf.playerBulletGroup, {
            bulletSpeed: Dotf.configs.gun.bulletSpeed
        });
    }
}
