class HomingBulletController extends BulletController{
  constructor(position, fatherObject){
    super(position, 'homing_bullet', Dotf.bossBulletGroup, fatherObject, {
      bulletSpeed:  HomingBulletController.BULLET_SPEED
    });
    this.sprite.scale.setTo(1, 1);
    this.sprite.setDamage = 5;
    this.sprite.body.velocity = new Phaser.Point(0, 1).setMagnitude(HomingBulletController.BULLET_SPEED);
  }

  update(){
    var direction = Phaser.Point.subtract(Dotf.player.sprite.position, this.sprite.position);

    var currentAngle = Dotf.game.math.radToDeg(
      Dotf.game.math.angleBetween(
        0,
        0,
        this.sprite.body.velocity.x,
        this.sprite.body.velocity.y
      )
    );

    var directionAngle = Dotf.game.math.radToDeg(
      Dotf.game.math.angleBetween(
        0,
        0,
        direction.x,
        direction.y
      )
    );

    var deltaAngle = directionAngle - currentAngle;

    // Ensure deltaAngle is between -180 & 180
    if(deltaAngle > 180) deltaAngle -= 360;
    if(deltaAngle < -180) deltaAngle += 360;

    // Ensure deltaAngle does not exceed max turn rate
    var maxDelta = HomingBulletController.TURN_RATE * Dotf.game.time.physicsElapsed;
    if(deltaAngle > maxDelta) deltaAngle = maxDelta;
    if(deltaAngle < -maxDelta) deltaAngle = -maxDelta;

    // Apply new direction based on new angle
    var newAngle = currentAngle + deltaAngle;
    var newDirection = new Phaser.Point(
      Math.cos(Dotf.game.math.degToRad(newAngle)),
      Math.sin(Dotf.game.math.degToRad(newAngle))
    );

    // 5. Set new velocity
    this.sprite.body.velocity = newDirection.setMagnitude(HomingBulletController.BULLET_SPEED);
    this.sprite.angle = Math.atan2(newDirection.x, -newDirection.y) * (180/Math.PI);
  }
}

HomingBulletController.TURN_RATE = 200;
HomingBulletController.BULLET_SPEED = 200;
