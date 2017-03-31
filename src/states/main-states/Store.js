var Store = function () {
    btnGun = false;

}
Store.prototype = {
  preload : function () {
    Dotf.game.load.image('gun', 'Assets/guns/flamthrower/flamethrower_down.png');
    Dotf.game.load.image('youhigh', 'Assets/youhigh.png');

  },
  create :function (){
    Dotf.game.stage.backgroundColor = "#71c5cf";
    cannon = Dotf.game.add.button(Dotf.game.width / 2-300, Dotf.game.height / 2,"gun" , this.cannonBtn, this);
    cannon.anchor.setTo(0.5, 0.5);
    youHighPicture = Dotf.game.add.button(Dotf.game.width / 2+300, Dotf.game.height / 2, "youhigh", this.win, this);
    youHighPicture.anchor.setTo(0.5, 0.5);
    cannonText = Dotf.game.add.text(Dotf.game.width / 2-300, Dotf.game.height / 2 +50, '2$', {
        font: '30px Courier',
        fill: '#ff0000'
    })
    cannonText.anchor.setTo(0.5, 0.5);
  },
   cannonBtn : function (){
    if(money > 0){
       let money1 = 0;
       money1= money - 2;
      btnGun = true;
      console.log(money1);
      money =money1;
    }else { console.log(" Not Enough Money");}
  },
  win : function() {
      Dotf.game.state.start('Winning',money,btnGun);
  }
}
