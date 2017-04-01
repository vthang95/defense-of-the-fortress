class ArrowNavigationController {
  constructor() {
    this.sprite = Dotf.game.add.sprite(Dotf.configs.GAME_WIDTH_MAX - 50, 40, 'arrow_navigation');
    this.sprite.scale.setTo(0.07);
    this.compass = Dotf.game.add.sprite(Dotf.configs.GAME_WIDTH_MAX - 50, 40, 'compass');
    this.compass.fixedToCamera = true;
    this.compass.anchor.setTo(0.5, 0.5);
    this.compass.scale.setTo(0.04);

    this.sprite.fixedToCamera = true;
    this.sprite.anchor.setTo(0.5, 0.5);
  }

  update() {
    this.sprite.rotation = Dotf.game.physics.arcade.angleBetween(Dotf.player.sprite, Dotf.base.sprite);
  }
}
