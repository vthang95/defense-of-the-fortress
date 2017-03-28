class BulletController {
    constructor(position, spriteName, physicsGroup, fatherObject, configs) {
        this.sprite = physicsGroup.create(position.x, position.y, spriteName, 0);

        this.configs = configs;
        this.fatherObject = fatherObject;
        this.sprite.setDamage = 5;
        this.sprite.body.checkWorldBounds = true;
        this.sprite.outOfBoundsKill = true;
        this.sprite.anchor.setTo(0.5, 0.5);
        this.sprite.scale.setTo(4);
        this.fatherObject.bullets.push(this);

        this.sprite.rotation = Dotf.game.physics.arcade.moveToPointer(this.sprite, this.configs.bulletSpeed, Dotf.game.input.activePointer);
        this.sprite.events.onKilled.add(this.remove, this);
    }

    remove() {
        this.fatherObject.bullets.splice(this.fatherObject.bullets.indexOf(this), 1);
    }

    update() {
        // this.sprite.rotation = this.firstPointerPosition;
    }
}
