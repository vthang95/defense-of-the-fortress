class HealthBarController {
    constructor(healthBarPosition, healthBarBG, fatherObject) {
        this.fatherObject = fatherObject;
        this.healthBar = Dotf.healthBarGroup.create(healthBarPosition.x, healthBarPosition.y, 'healthBar');
        this.healthBarBG = Dotf.healthBarGroup.create(healthBarBG.x, healthBarBG.y, 'healthBarBG');
        this.healthBar.anchor.setTo(0, 0.5);
    }

    remove() {
        if (!this.fatherObject.sprite.health) {
            this.healthBar.kill();
            this.healthBarBG.kill();
        }
    }

    update() {
        this.healthBar.scale.setTo(this.fatherObject.sprite.health / 100, 1);
        this.remove();
    }
}
