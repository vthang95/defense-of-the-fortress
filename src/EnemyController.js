class EnemyController {
    constructor(position, spriteName, physicsGroup, configs) {
        this.sprite = physicsGroup.create(position.x, position.y, spriteName, 2);
        // Dotf.game.physics.arcade.enable(this.sprite);
        this.sprite.anchor.setTo(0.5, 0.5);
        this.sprite.scale.setTo(3);
        this.sprite.health = 20;
        this.sprite.setDamage = 5;
        this.configs = configs;
        Dotf.greenEnemies.push(this);
        this.sprite.coin = 5;
        this.sprite.events.onKilled.add(this.remove, this);

        this.sprite.animations.add('run', [0, 1, 2, 3], 5, true);

        this.sprite.dropCoin = () => {
            let random = () => Math.floor(Math.random() * 40 + 1);
            new CoinController(this.sprite.position.x, this.sprite.position.y, 'coin', {coinValue: 1});
            new CoinController(this.sprite.position.x + random(), this.sprite.position.y - random(), 'coin', {coinValue: 1});
            new CoinController(this.sprite.position.x + random(), this.sprite.position.y - random(), 'coin', {coinValue: 1});
        };
    }

    remove() {
        if (this.sprite.dropCoin) this.sprite.dropCoin();
        Dotf.greenEnemies.splice(Dotf.greenEnemies.indexOf(this), 1);
    }

    update() {
        this.sprite.play('run');
        Dotf.game.physics.arcade.moveToXY(this.sprite, Dotf.base.sprite.position.x, Dotf.base.sprite.position.y, this.configs.speed);
    }

}
