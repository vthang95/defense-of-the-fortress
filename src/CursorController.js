class CursorController {
  constructor(spriteName) {
    this.sprite = Dotf.game.add.sprite(Dotf.game.world.centerX, Dotf.game.world.centerY, spriteName);
    Dotf.game.physics.p2.enable(this.sprite);
    this.sprite.body.fixedRotation = true;
    this.sprite.scale.setTo(3);
    this.sprite.anchor.setTo(0.5, 0.5);
  }

  update() {
    this.sprite.body.x = Dotf.game.input.mousePointer.x + Dotf.game.camera.x;
    this.sprite.body.y = Dotf.game.input.mousePointer.y + Dotf.game.camera.y;
  }
}
