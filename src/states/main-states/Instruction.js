var Instruction = {
  preload : function (){
    Dotf.game.load.image('instructionBackground','Assets/instructionBackground.jpg');
    Dotf.game.load.image('Back','Assets/Back.png');
  },
  create : function (){
    back = Dotf.game.add.button(0,0,"Back",this.returnMenu,this );
    menuBoder=Dotf.game.add.sprite(Dotf.game.width/2,Dotf.game.height/2,"instructionBackground");
    menuBoder.anchor.setTo(0.5);
    var text = "Mẹo chơi : Người chơi cố gắng bảo vệ trụ\nTiêu diệt hết địch trong màn chơi để chuyển sang map mới\nCố gắng nhặt tiền để có thể mua thêm weapon và base\nW : đi lên\nS : đi xuống\nA : sang trái\nD : sang phải \nchuột phải : bắn";

    menuText = Dotf.game.add.text(Dotf.game.width / 2, Dotf.game.height / 2 +80,text,
    {
      font: '20px Courier',
      fill: 'white'
    })
    menuText.anchor.setTo(0.5, 0.5);
  },
  returnMenu : function () {
    Dotf.game.state.start("Menu");
  }
};
