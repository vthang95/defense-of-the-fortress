class CoinController {
    constructor(x, y, spriteName, configs) {
        this.sprite = Dotf.coinGroup.create(x, y, spriteName, 1);
        this.configs = configs;
        this.sprite.coinValue = this.configs.coinValue;
        Dotf.coins.push(this);
        this.sprite.scale.setTo(2);
        this.sprite.anchor.setTo(0.5, 0.5);
        this.autoRemove();
        this.sprite.animations.add('spin', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
        // TODO add coin dropping effect
    }

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
