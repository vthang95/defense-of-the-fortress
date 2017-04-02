const Menu = {
  preload: function() {
    Dotf.game.load.image("startButton", "Assets/startbutton.gif");
    Dotf.game.load.image('default', 'Assets/cursors/mouse_pointer.png');
    Dotf.game.load.image('instruction','Assets/Instruction.png');
    Dotf.game.load.audio('start_game','Assets/audio/menu.wav');
  },
  create: function() {
    Dotf.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    Dotf.game.scale.pageAlignHorizontally = true;
    Dotf.game.scale.pageAlignVertically = true;
    Dotf.game.scale.setScreenSize = true;
    // TODO fix responsive
    Dotf.game.time.advancedTiming = true;
    Dotf.game.stage.backgroundColor = "#71c5cf";
    music = Dotf.game.add.audio('start_game');
    music.loopFull(0.6);
    startButton = Dotf.game.add.sprite(Dotf.game.width / 2, Dotf.game.height / 2, "startButton");
    startButton.anchor.setTo(0.5);
    startButton.inputEnabled = true;
    startButton.input.useHandCusor = true;
    startButton.events.onInputDown.add(this.startGame, this);
    instruction = Dotf.game.add.sprite(Dotf.game.width / 2 , Dotf.game.height / 2 +200, "instruction");
    instruction.anchor.setTo(0.5,0.5);
    instruction.inputEnabled = true;
    instruction.input.useHandCusor = true;
    instruction.events.onInputDown.add(this.instructionState, this);
    Dotf.cursor = new CursorController('default', {
      anchorX: 0,
      anchorY: 0
    });
  },

  startGame: function() {
    music.stop();
    Dotf.game.state.start("Preload");
  },
  instructionState : function () {
    music.stop();
    Dotf.game.state.start("Instruction");
  },

  update: function() {
    Dotf.cursor.update();
  },
  render: function() {

  }
};
