class LaserBulletController extends BulletController {
  constructor(position, fatherObject) {
    super(position, 'laser_bullet', Dotf.playerBulletGroup, fatherObject, {
      bulletSpeed: 1500
    });
    this.sprite.scale.setTo(3, 2);
    this.sprite.setDamage = 10;
    this.sprite.anchor.setTo(0, 0.5);
  }
}
