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
        this.sprite.coin = 5;
        this.sprite.events.onKilled.add(this.remove, this);

        this.sprite.dropCoin = () => {
            new CoinController(this.sprite.position, 'coin', {});
        };
    }

    remove() {
        if (this.sprite.dropCoin) this.sprite.dropCoin();
        Dotf.greenEnemies.splice(Dotf.greenEnemies.indexOf(this), 1);
    }

    update() {
        Dotf.game.physics.arcade.moveToXY(this.sprite, Dotf.base.sprite.position.x, Dotf.base.sprite.position.y, this.configs.speed);
    }

}
