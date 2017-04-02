const Menu = {
  preload: function() {
    Dotf.game.load.image("startButton", "Assets/startbutton.gif");
    Dotf.game.load.image('default', 'Assets/cursors/mouse_pointer.png');
      Dotf.game.load.image('instruction','Assets/Instruction.png');
      Dotf.game.load.audio('Game Sound2','Assets/audio/Game Sound2.mp3');
  },

  create: function() {
    Dotf.game.stage.backgroundColor = "#71c5cf";
    music = Dotf.game.add.audio('Game Sound2');
    music.play();
    startButton = Dotf.game.add.button(Dotf.game.width / 2, Dotf.game.height / 2, "startButton", this.startGame, this);
    startButton.anchor.setTo(0.5);
    instruction = Dotf.game.add.button(Dotf.game.width / 2 , Dotf.game.height / 2 +200, "instruction",this.instructionState,this);
    instruction.anchor.setTo(0.5,0.5);
    Dotf.cursor = new CursorController('default', {
      anchorX: 0,
      anchorY: 0
    });
  },

  startGame: function() {
    Dotf.game.state.start("Preload");
  },
  instructionState : function () {
    Dotf.game.state.start("Instruction");
  },

  update: function() {
    Dotf.cursor.update();
  }
};
