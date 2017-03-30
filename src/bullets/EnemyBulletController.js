class EnemyBulletController extends BulletController{
    constructor(position, fatherObject) {
        super(position, 'bulleta', Dotf.enemyBulletGroup, fatherObject, {
          bulletSpeed:  EnemyBulletController.BULLET_SPEED
        });
        Dotf.game.physics.arcade.moveToXY(
          this.sprite,
          Dotf.player.sprite.position.x,
          Dotf.player.sprite.position.y,
          EnemyBulletController.BULLET_SPEED
        );

        this.sprite.setDamage = 2;
    }
}

EnemyBulletController.BULLET_SPEED = 500;
