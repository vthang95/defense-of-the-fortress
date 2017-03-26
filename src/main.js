var Dotf = Dotf || {};

Dotf.configs = {
  GAME_WIDTH_MAX: 1821,
  GAME_HEIGHT_MAX: 901,
  GAME_WIDTH_MIN: 320,
  GAME_HEIGHT_MIN: 480,
  GAME_WORLD_WIDTH: 2960,
  GAME_WORLD_HEIGHT: 2160,
  gun: {
    bulletSpeed: 1500
    // TODO add types of gun
  },
  player: {
    speed: 200
  }
};

window.onload = function(){
  Dotf.game = new Phaser.Game(Dotf.configs.GAME_WIDTH_MAX, Dotf.configs.GAME_HEIGHT_MAX, Phaser.CANVAS, '',
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
  Dotf.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  Dotf.game.scale.pageAlignHorizontally = true;
  Dotf.game.scale.pageAlignVertically = true;
  Dotf.game.scale.setScreenSize = true;
  // TODO fix responsive
  Dotf.game.time.advancedTiming = true;
  // Dotf.game.load.atlasJSONHash('assets', 'Assets/assets.png', 'Assets/assets.json');
  Dotf.game.load.image('background', 'Assets/maps/map1.png');
  Dotf.game.load.image('cursor', 'Assets/cursors/1crosshair.png');
  //TODO create a spritesheet including all animations of an object.
  // <GUN TYPE>
  Dotf.game.load.image('gun', 'Assets/guns/flamthrower/flamethrower_down.png');
  // <CONTRUCTIONS>
  Dotf.game.load.image('fountain', 'Assets/other/base.png');
  // <BULLET TYPE>
  Dotf.game.load.image('bulleta', 'Assets/other/bulleta.png', 32, 32);
  // <ANIMATION>
  Dotf.game.load.spritesheet('character1_animation', 'Assets/spritesheet/character1.png', 16, 21);

}

// initialize the game
const create = () => {
  Dotf.game.physics.startSystem(Phaser.Physics.ARCADE);
  Dotf.keyboard = Dotf.game.input.keyboard;
  Dotf.game.input.mouse.capture = true;
  Dotf.game.world.setBounds(0, 0, Dotf.configs.GAME_WORLD_WIDTH, Dotf.configs.GAME_WORLD_HEIGHT);

  Dotf.background1 = Dotf.game.add.tileSprite(0, 0, Dotf.configs.GAME_WORLD_WIDTH, Dotf.configs.GAME_WORLD_HEIGHT, 'background');
  Dotf.background1.scale.setTo(2);

  Dotf.base = Dotf.game.add.sprite(1880 , 500, 'fountain');
  Dotf.base.scale.setTo(3);

  // physic Groups
  Dotf.playerGroup = Dotf.game.add.physicsGroup();
  Dotf.towers = Dotf.game.add.physicsGroup();
  Dotf.playerBulletGroup = Dotf.game.add.physicsGroup();
  // TODO Create TowerController class. TownerGroup.

  Dotf.player = new PlayerController(Dotf.playerGroup, 'character1_animation', {
      up: Phaser.Keyboard.W,
      down: Phaser.Keyboard.S,
      left: Phaser.Keyboard.A,
      right: Phaser.Keyboard.D,
      speed: Dotf.configs.player.speed
    }
  );
}

// update game state each frame
const update = () => {
  Dotf.player.update();
}

// before camera render (mostly for debug)
const render = () => {}
