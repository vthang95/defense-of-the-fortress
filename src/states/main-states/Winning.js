var Winning = {
    preload: function() {
        Dotf.game.load.image('youhigh', 'Assets/youhigh.png');
    },
    create: function() {
        Dotf.game.stage.backgroundColor = "#71c5cf";
        youHighPicture = Dotf.game.add.button(Dotf.game.width / 2, Dotf.game.height / 2, "youhigh", this.turnBackToMenu, this);
        youHighPicture.anchor.setTo(0.5, 0.5);

        winningText = Dotf.game.add.text(Dotf.game.width / 2, Dotf.game.height / 2 - 300, 'Click this image to back the menu', {
            font: '30px Courier',
            fill: '#ff0000'
        })
        winningText.anchor.setTo(0.5, 0.5);
    },
    turnBackToMenu: function() {
        Dotf.game.state.start('Menu');
    }
}
