class  ExplodeController {
    constructor(position, spriteName, configs) {
        this.sprite = Dotf.game.add.sprite(position.x, position.y, spriteName, 0);
        this.sprite.anchor.setTo(0.5, 0.5);
        Dotf.explosions.push(this);
        this.configs = configs;
        this.sprite.scale.setTo(2);
        this.sprite.animations.add('explode', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);

        this.autoRemove();
    }

    randomTimeToRemove() {
        return Math.floor(Math.random() * 500 + 500);
    }

    autoRemove() {
        setTimeout(() => {
            Dotf.explosions.splice(Dotf.explosions.indexOf(this), 1);
            this.sprite.destroy();
        }, this.randomTimeToRemove());
    }

    update() {
        this.sprite.play('explode');
    }
}
