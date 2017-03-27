class CursorController {
    constructor(spriteName, fatherObject) {
        this.sprite = Dotf.game.add.sprite(Dotf.game.world.centerX, Dotf.game.world.centerY, spriteName);
        Dotf.game.physics.arcade.enable(this.sprite);
        this.sprite.anchor = new Phaser.Point(0.5, 0.5);
        this.sprite.scale.setTo(3);
        this.fatherObject = fatherObject;
    }

    update() {
        // this.sprite.rotation = Dotf.game.physics.arcade.angleBetween(this.sprite, this.fatherSprite.cursor.sprite) - Math.PI / 2;
        this.fatherObject.changeCursor();
        this.sprite.position.x = Dotf.game.input.mousePointer.x + Dotf.game.camera.x;
        this.sprite.position.y = Dotf.game.input.mousePointer.y + Dotf.game.camera.y;
    }
}
