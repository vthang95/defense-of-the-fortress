class CursorController {
    constructor(spriteName) {
        this.sprite = Dotf.game.add.sprite(Dotf.game.world.centerX, Dotf.game.world.centerY, spriteName);
        Dotf.game.physics.arcade.enable(this.sprite);
        this.sprite.body.fixedRotation = true;
        this.sprite.anchor = new Phaser.Point(0.5, 0.5);
        this.sprite.scale.setTo(3);
    }

    update() {
        this.sprite.position.x = Dotf.game.input.mousePointer.x + Dotf.game.camera.x;
        this.sprite.position.y = Dotf.game.input.mousePointer.y + Dotf.game.camera.y;
    }
}
