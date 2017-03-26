class BaseController {
    constructor(x, y, physicsGroup, spriteName, configs) {
        this.sprite = physicsGroup.create(x, y, spriteName, 0);
        Dotf.game.physics.arcade.enable(this.sprite);
        this.configs = configs;
        this.sprite.health = 100;
        this.sprite.scale.setTo(3);
        this.sprite.anchor.setTo(0.5, 0.5);
        this.healthBarBG = Dotf.game.add.sprite(x - 48, y + 70, 'healthBarBG');
        this.healthBar = Dotf.game.add.sprite(x - 45, y + 78, 'healthBar');
        this.healthBar.anchor.setTo(0, 0.5);
        this.sprite.events.onKilled.add(this.remove, this);
    }

    remove(){
        this.healthBar.destroy();
        this.healthBarBG.destroy();
    }

    update() {
        this.healthBar.scale.setTo(this.sprite.health / 100, 1);
    }
}
