var Instruction = {
  preload: function() {

  },
  create: function() {
    menuBoder = Dotf.game.add.sprite(0, 0, "instructionBackground");
    back = Dotf.game.add.sprite(50, 50, "back_button");
    back.inputEnabled = true;
    back.scale.setTo(0.2)
    back.input.useHandCusor = true;
    back.events.onInputDown.add(this.returnMenu, this);
    Dotf.cursor = new CursorController('default', {
      anchorX: 0,
      anchorY: 0
    });
  },
  returnMenu: function() {
    mouseclick.play();
    music.stop();
    Dotf.game.state.start("Menu");
  },
  update: function() {
    Dotf.cursor.update();
  }
};
