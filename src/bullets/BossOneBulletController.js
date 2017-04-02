class BossOneBulletController extends BulletController {
  constructor(position, direction, fatherObject) {
    super(position, 'bullet_boss_level_one', Dotf.bossBulletGroup, fatherObject, {bulletSpeed: BossLevelOneController.BULLET_SPEED});
    this.sprite.body.velocity = direction.setMagnitude(BossLevelOneController.BULLET_SPEED);
    this.sprite.scale.setTo(2, 2);
    this.sprite.baseHealth = 300;
    this.sprite.animations.add('run', [0, 1, 2, 3], 5, true);
  }

  update() {
    this.sprite.play('run');
  }
}


BossLevelOneController.BULLET_SPEED = 300;
