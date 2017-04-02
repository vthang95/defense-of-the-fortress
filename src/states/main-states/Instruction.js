var Instruction = {
  preload: function() {
    Dotf.game.load.image('instructionBackground', 'Assets/instructionBackground.jpg');
    Dotf.game.load.image('Back', 'Assets/Back.png');
  },
  create: function() {
    back = Dotf.game.add.sprite(0, 0, "Back");
    back.inputEnabled = true;
    back.input.useHandCusor = true;
    back.events.onInputDown.add(this.returnMenu, this);
    menuBoder = Dotf.game.add.sprite(Dotf.game.width / 2, Dotf.game.height / 2, "instructionBackground");
    menuBoder.anchor.setTo(0.5);
    var text = "Mẹo chơi : Người chơi cố gắng bảo vệ trụ\nTiêu diệt hết địch trong màn chơi để chuyển sang map mới\nCố gắng nhặt tiền để có thể mua đồ\nW : đi lên\nS : đi xuống\nA : sang trái\nD : sang phải \nclick chuột : bắn \nspace bar: Tăng tốc";

    menuText = Dotf.game.add.text(Dotf.game.width / 2, Dotf.game.height / 2 + 80, text, {
      font: '20px Courier',
      fill: 'white'
    })
    menuText.anchor.setTo(0.5, 0.5);
    Dotf.cursor = new CursorController('default', {
      anchorX: 0,
      anchorY: 0
    });
  },
  returnMenu: function() {
    Dotf.game.state.start("Menu");
  },
  update: function() {
    Dotf.cursor.update();
  }
};
