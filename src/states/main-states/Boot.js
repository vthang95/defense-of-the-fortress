const Boot = {
  preload: function() {
    Dotf.game.load.image('healthBar', './Assets/other/healthBar.png');
    Dotf.game.load.image('loading_screen', './Assets/loading_screen.png');
  },
  create: function() {
    Dotf.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    Dotf.game.scale.pageAlignHorizontally = true;
    Dotf.game.scale.pageAlignVertically = true;
    Dotf.game.scale.setScreenSize = true;
    // TODO fix responsive
    Dotf.game.time.advancedTiming = true;
    Dotf.game.stage.disableVisibilityChange = true;
    Dotf.game.state.start('LoadingMenu');
  }
}
