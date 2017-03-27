class ConstructionController {
    constructor(x, y, physicsGroup, spriteName, configs) {
        this.sprite = physicsGroup.create(x, y, spriteName, 0);
        Dotf.game.physics.arcade.enable(this.sprite);
        this.configs = configs;
        this.sprite.health = 100;
        this.sprite.scale.setTo(3);
        this.sprite.anchor.setTo(0.5, 0.5);

        Dotf.constructions.push(this);
        this.sprite.events.onKilled.add(this.remove, this);

        this.healthBar = new HealthBarController({
                x: x - 45,
                y: y + 78
            }, {
                x: x - 48,
                y: y + 70
            },
            this
        );
    }
    remove() {
        Dotf.constructions.splice(Dotf.constructions.indexOf(this), 1);
    }

    update() {
        this.healthBar.update();
    }
}
