var Dotf = Dotf || {};

Dotf.configs = {
  GAME_WIDTH_MAX: 1366,
  GAME_HEIGHT_MAX: 768,
  GAME_WIDTH_MIN: 320,
  GAME_HEIGHT_MIN: 480,
  GAME_WORLD_WIDTH: 2960,
  GAME_WORLD_HEIGHT: 2160,
  gun: {
    bulletSpeed: 1000
    // TODO add types of gun
  },
  player: {
    speed: 200
  },
  enemy: {
    position: {
      x: Math.floor(Math.random() * 2960) + 1,
      y: Math.floor(Math.random() * 2160) + 1
      // reference GAME_WIDTH_MAX, GAME_HEIGHT_MAX
    }
  }
};

window.onload = function() {
  Dotf.game = new Phaser.Game(Dotf.configs.GAME_WIDTH_MAX, Dotf.configs.GAME_HEIGHT_MAX, Phaser.CANVAS, '', {}, false, false);

  // Dotf.cursor = new CursorController('default', {anchorX: 0, anchorY: 0});

  Dotf.game.state.add('Menu', Menu);
  Dotf.game.state.add('Preload', Preload);
  Dotf.game.state.add("Winning", Winning);

  Dotf.game.state.add("Stage1", Stage1);
  Dotf.game.state.add("Stage2", Stage2);

  Dotf.game.state.start('Menu');
};
