class CoinController {
    constructor(position, spriteName, configs) {
        this.sprite = Dotf.coinGroup.create(position.x, position.y, spriteName, 1);
        Dotf.game.physics.arcade.enable(this.sprite);
        this.sprite.coinValue = 5;
        this.configs = configs;
        this.sprite.scale.setTo(2);
        this.sprite.anchor.setTo(0.5, 0.5);
        this.autoRemove();

        // TODO add coin animation
    }

    autoRemove() {
        setTimeout(() => {
            this.sprite.destroy();
            // TODO add auto remove instance
        }, 5000)
    }
}
