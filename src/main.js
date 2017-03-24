// const fs = require('fs');

var Dotf = Dotf || {};

Dotf.configs = {
  GAME_WIDTH_MAX: 800,
  GAME_HEIGHT_MAX: 640,
  GAME_WIDTH_MIN: 320,
  GAME_HEIGHT_MIN: 480
};

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
const preload = () => {
  Dotf.game.scale.minWidth = 320;
  Dotf.game.scale.minHeight = 480;
  Dotf.game.scale.maxWidth = Dotf.configs.GAME_WIDTH_MAX;
  Dotf.game.scale.maxHeight = Dotf.configs.GAME_HEIGHT_MAX;
  Dotf.game.scale.pageAlignHorizontally = true;
  Dotf.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

  Dotf.game.time.advancedTiming = true;

  // Dotf.game.load.atlasJSONHash('assets', 'Assets/assets.png', 'Assets/assets.json');
  Dotf.game.load.image('background', 'Assets/maps/map1.png');
  Dotf.game.load.image('character1', 'Assets/characters/1.png');

  //TODO create a spritesheet including all animations of an object.

  Dotf.game.load.image('cursor', 'Assets/cursors/1crosshair.png');
  Dotf.game.load.image('gun', 'Assets/guns/flamthrower/flamethrower_down.png');

  Dotf.game.load.spritesheet('character1_down', 'Assets/characters/animation_down.png', 16, 21);
}

// initialize the game
const create = () => {
  Dotf.game.physics.startSystem(Phaser.Physics.ARCADE);
  Dotf.game.physics.startSystem(Phaser.Physics.P2JS);
  Dotf.keyboard = Dotf.game.input.keyboard;

  Dotf.background1 = Dotf.game.add.tileSprite(0, 0, 1920, 1080, 'background');
  Dotf.game.world.setBounds(0, 0, 1920, 1080);

  Dotf.playerGroup = Dotf.game.add.physicsGroup();

  Dotf.player = new PlayerController('character1', 'cursor', 'gun', {
      down: 'character1_down'
    },
    {
      up: Phaser.Keyboard.W,
      down: Phaser.Keyboard.S,
      left: Phaser.Keyboard.A,
      right: Phaser.Keyboard.D,
      speed: 150
    }
  );

}

// update game state each frame
const update = () => {
  Dotf.player.update();

}

// before camera render (mostly for debug)
const render = () => {}
