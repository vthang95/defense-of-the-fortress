const Menu = {
  preload: function() {
    Dotf.game.load.image('menu_background', '../Assets/menu_bg.png');
    Dotf.game.load.image("startButton", "../Assets/startbutton.gif");
    Dotf.game.load.image('default', '../Assets/cursors/mouse_pointer.png');
    Dotf.game.load.image('instruction_button','../Assets/instruction_button.png');
    Dotf.game.load.image('play_button','../Assets/play_button.png');
    Dotf.game.load.audio('start_game','../Assets/audio/menu.wav');
    Dotf.game.load.audio('laser_gun_audio','../Assets/audio/Laser.wav');
    Dotf.game.load.audio('mouseclick','../Assets/audio/mouseclick2.wav');
    Dotf.game.load.image('instructionBackground', '../Assets/instruction_bg.png');
    Dotf.game.load.image('back_button', '../Assets/back_button.png');
  },
  create: function() {
    Dotf.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    Dotf.game.scale.pageAlignHorizontally = true;
    Dotf.game.scale.pageAlignVertically = true;
    Dotf.game.scale.setScreenSize = true;
    // TODO fix responsive
    Dotf.game.time.advancedTiming = true;
    menuBackground = Dotf.game.add.sprite(0, 0, "menu_background");
    music = Dotf.game.add.audio('start_game');
    mouseclick = Dotf.game.add.audio('mouseclick');
    music.loopFull(0.6);
    startButton = Dotf.game.add.sprite(Dotf.game.width / 2 - 50, Dotf.game.height / 2 + 200, "play_button");
    startButton.fixedToCamera = true;
    startButton.anchor.setTo(0.5);
    startButton.scale.setTo(0.2);
    startButton.inputEnabled = true;
    startButton.input.useHandCusor = true;
    startButton.events.onInputDown.add(this.startGame, this);
    instruction = Dotf.game.add.sprite(Dotf.game.width / 2 + 50, Dotf.game.height / 2 + 200, "instruction_button");
    instruction.anchor.setTo(0.5,0.5);
    instruction.fixedToCamera = true;
    instruction.scale.setTo(0.2);
    instruction.inputEnabled = true;
    instruction.input.useHandCusor = true;
    instruction.events.onInputDown.add(this.instructionState, this);
    Dotf.cursor = new CursorController('default', {
      anchorX: 0,
      anchorY: 0
    });
  },

  startGame: function() {
    mouseclick.play();
    music.stop();
    Dotf.game.state.start("Preload");
  },
  instructionState : function () {
    mouseclick.play();
    Dotf.game.state.start("Instruction");
  },

  update: function() {
    Dotf.cursor.update();
  },
  render: function() {

  }
};
