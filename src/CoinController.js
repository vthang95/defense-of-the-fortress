class CoinController {
    constructor(position, spriteName, configs) {
        this.sprite = Dotf.coinGroup.create(position.x, position.y, spriteName, 1);
        this.configs = configs;
        this.sprite.coinValue = this.configs.coinValue;
        this.sprite.scale.setTo(3);
        this.sprite.anchor.setTo(0.5, 0.5);
        this.sprite.animations.add('spin', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);

        Dotf.coins.push(this);

        Dotf.game.add.tween(this.sprite).to({
                x: position.x + this.randomNumber(),
                y: position.y + this.randomNumber()
            },
            this.configs.speed,
            Phaser.Easing.Bounce.Out,
            true
        );

        this.autoRemove();
        // TODO you can optimize coin dropping effect
    }

    randomNumber() {
        return Math.floor(Math.random() * 80 - 40);
    };

    update() {
        this.sprite.play('spin');
    };

    autoRemove() {
        setTimeout(() => {
            Dotf.coins.splice(Dotf.coins.indexOf(this), 1);
            this.sprite.destroy();
            // TODO add auto remove instance
        }, 5000)
    }
}
