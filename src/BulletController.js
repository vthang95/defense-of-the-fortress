class BulletController {
    constructor(position, direction, spriteName, physicsGroup, configs) {
        this.sprite = physicsGroup.create(position.x, position.y, spriteName, 1);
        Dotf.game.physics.arcade.enable(this.sprite);
        this.direction = direction;
        this.configs = configs;
        this.sprite.setDamage = 5;
        this.sprite.body.checkWorldBounds = true;
        this.sprite.outOfBoundsKill = true;
        this.sprite.anchor.setTo(0.5, 0.5);
        // this.sprite.body.velocity = direction.setMagnitude(this.configs.bulletSpeed);
        this.sprite.scale.setTo(4);
        Dotf.game.physics.arcade.moveToPointer(this.sprite, this.configs.bulletSpeed);
    }
}
