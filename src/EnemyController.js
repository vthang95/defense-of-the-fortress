class EnemyController {
    constructor(position, spriteName, physicsGroup, configs) {
        this.sprite = physicsGroup.create(position.x, position.y, spriteName, 2);
        Dotf.game.physics.arcade.enable(this.sprite);
        this.sprite.anchor.setTo(0.5, 0.5);
        this.sprite.scale.setTo(3);
        this.sprite.health = 20;
        this.sprite.setDamage = 5;
        this.configs = configs;
        Dotf.greenEnemies.push(this);
        this.sprite.events.onKilled.add(this.remove, this);
    }

    remove() {
        Dotf.greenEnemies.splice(Dotf.greenEnemies.indexOf(this), 1);
    }

    update() {
        Dotf.game.physics.arcade.moveToXY(this.sprite, Dotf.base.sprite.position.x, Dotf.base.sprite.position.y, this.configs.speed);
    }

}
