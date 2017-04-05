const GameOver = {
  preload: function() {
    
  },
  create: function() {
    Dotf.game.stage.backgroundColor = "#71c5cf";
    youHighPicture = Dotf.game.add.sprite(0, 0, "game_over");
    backToMenuButton = Dotf.game.add.sprite(Dotf.game.width / 2, Dotf.game.height / 2 + 200, "back_button");
    backToMenuButton.fixedToCamera = true;
    backToMenuButton.anchor.setTo(0.5);
    backToMenuButton.scale.setTo(0.4);
    backToMenuButton.inputEnabled = true;
    backToMenuButton.input.useHandCusor = true;
    backToMenuButton.events.onInputDown.add(this.turnBackToMenu, this);
    Dotf.cursor = new CursorController('default', {
      anchorX: 0,
      anchorY: 0
    });

    // winningText = Dotf.game.add.text(Dotf.game.width / 2, Dotf.game.height / 2 - 300, 'You Lose! Click this image to back the menu', {
    //   font: '30px Courier',
    //   fill: '#ff0000'
    // })
    // winningText.anchor.setTo(0.5, 0.5);
  },
  update: function() {
    Dotf.cursor.update();
  },
  turnBackToMenu: function() {
    mouseclick.play();
    Dotf.game.state.start('Menu');
  }
}
