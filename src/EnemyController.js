class EnemyController {
    constructor(position, spriteName, physicsGroup, configs) {
        this.sprite = physicsGroup.create(position.x, position.y, spriteName, 2);
        this.sprite.anchor.setTo(0.5, 0.5);
        this.sprite.scale.setTo(3);
        this.sprite.health = 20;
        this.sprite.setDamage = 5;
        this.configs = configs;
        Dotf.greenEnemies.push(this);
        this.sprite.coin = 1;
        this.sprite.events.onKilled.add(this.remove, this);

        this.sprite.animations.add('run', [0, 1, 2, 3], 5, true);

        this.sprite.dropCoin = () => {
            let cordinateX = this.sprite.position.x;
            let cordinateY = this.sprite.position.y;
            new CoinController({x: cordinateX, y: cordinateY}, 'coin', {coinValue: this.sprite.coin, speed: 100}, this.sprite);
            new CoinController({x: cordinateX, y: cordinateY}, 'coin', {coinValue: this.sprite.coin, speed: 100}, this.sprite);
            new CoinController({x: cordinateX, y: cordinateY}, 'coin', {coinValue: this.sprite.coin, speed: 100}, this.sprite);
        };
    }

    remove() {
        if (this.sprite.dropCoin) this.sprite.dropCoin();
        Dotf.greenEnemies.splice(Dotf.greenEnemies.indexOf(this), 1);
    }

    update() {
        this.sprite.play('run');
        if (!Dotf.base.sprite.health) {
            this.sprite.body.velocity.x = 0;
            this.sprite.body.velocity.y = 0;
        } else {
            Dotf.game.physics.arcade.moveToXY(this.sprite, Dotf.base.sprite.position.x, Dotf.base.sprite.position.y, this.configs.speed);
        }
    }

}
