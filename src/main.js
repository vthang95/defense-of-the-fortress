// const fs = require('fs');

var Dotf = Dotf || {};

Dotf.configs = {};

window.onload = function(){
  Dotf.game = new Phaser.Game(800,640,Phaser.CANVAS,'',
    {
      preload: preload,
      create: create,
      update: update,
      render: render
    }, false, false
  );
}

// preparations before game starts
const preload = function(){
  Dotf.game.scale.minWidth = 320;
  Dotf.game.scale.minHeight = 480;
  Dotf.game.scale.maxWidth = 800;
  Dotf.game.scale.maxHeight = 640;
  Dotf.game.scale.pageAlignHorizontally = true;
  Dotf.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

  Dotf.game.time.advancedTiming = true;

  // Dotf.game.load.atlasJSONHash('assets', 'Assets/assets.png', 'Assets/assets.json');
  Dotf.game.load.image('background', 'Assets/maps/map1.png');
  Dotf.game.load.image('character1', 'Assets/characters/1.png');
}

// initialize the game
const create = function(){
  Dotf.game.physics.startSystem(Phaser.Physics.ARCADE);
  Dotf.game.physics.startSystem(Phaser.Physics.P2JS);
  Dotf.keyboard = Dotf.game.input.keyboard;

  background1 = Dotf.game.add.tileSprite(0, 0, 1920, 1080, 'background');
  Dotf.game.world.setBounds(0, 0, 1920, 1080);

  Dotf.playerGroup = Dotf.game.add.physicsGroup();

  Dotf.player = new PlayerController('character1', {
    up: Phaser.Keyboard.W,
    down: Phaser.Keyboard.S,
    left: Phaser.Keyboard.A,
    right: Phaser.Keyboard.D,
    fire: Phaser.Keyboard.SPACEBAR,
    speed: 200
  });

}

// update game state each frame
const update = function(){
  Dotf.player.update();
}

// before camera render (mostly for debug)
const render = function(){}
