const Menu = {
  preload: function() {
    Dotf.game.load.image("startButton", "assets/startbutton.gif");
    Dotf.game.load.image('default', 'Assets/cursors/mouse_pointer.png');
  },

  create: function() {
    Dotf.game.stage.backgroundColor = "#71c5cf";
    startButton = Dotf.game.add.button(Dotf.game.width / 2, Dotf.game.height / 2, "startButton", this.startGame, this);
    startButton.anchor.setTo(0.5);
    Dotf.cursor = new CursorController('default', {
      anchorX: 0,
      anchorY: 0
    });
  },

  startGame: function() {
    Dotf.game.state.start("Preload");
  },

  update: function() {
    Dotf.cursor.update();
  }
};
