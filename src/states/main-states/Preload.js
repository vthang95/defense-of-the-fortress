const Preload = {
  preload: function() {
    // TODO: shared preload contents should be load here
    // Dotf.game.load.atlasJSONHash('assets', 'Assets/assets.png', 'Assets/assets.json');
    Dotf.game.load.image('background', 'Assets/maps/Map1.png');
    // <CURSOR>
    Dotf.game.load.image('bulleta_cursor1', 'Assets/cursors/1crosshair.png');
    Dotf.game.load.image('bulleta_cursor2', 'Assets/cursors/1crosshair2.png');
    Dotf.game.load.image('bulletc_cursor1', 'Assets/cursors/2crosshair.png');
    Dotf.game.load.image('bulletc_cursor2', 'Assets/cursors/2crosshair2.png');
    Dotf.game.load.image('default', 'Assets/cursors/mouse_pointer.png');
    //TODO create a spritesheet including all animations of an object.
    // <GUN TYPE>
    Dotf.game.load.image('gun', 'Assets/guns/flamthrower/flamethrower_down.png');
    // <CONTRUCTIONS>
    Dotf.game.load.image('fountain', 'Assets/other/base.png');
    Dotf.game.load.image('healthBar', 'Assets/other/healthBar.png');
    Dotf.game.load.image('healthBarBG', 'Assets/other/healthbarBG.png');
    // <BULLET TYPE>
    Dotf.game.load.image('bulleta', 'Assets/other/bulleta.png', 32, 32);
    Dotf.game.load.image('bulletc', 'Assets/other/bulletc.png', 11, 8);
    Dotf.game.load.image('cannonball', 'Assets/other/cannonball.png', 16, 16);
    Dotf.game.load.image('laser_bullet', 'Assets/other/laser_bullet.png', 65, 15);
    Dotf.game.load.image('homing_bullet', 'Assets/other/homing_bullet.png', 20, 46);
    // <BOSS
    Dotf.game.load.image('boss_level_one', 'Assets/boss/boss_up_left.gif', 872, 632);
    Dotf.game.load.image('boss_level_two', 'Assets/boss/boss.png', 872, 632);

    // <ANIMATION>
    Dotf.game.load.spritesheet('character1_animation', 'Assets/spritesheet/character1.png', 16, 21);
    Dotf.game.load.spritesheet('flaming_gun_animation', 'Assets/guns/flamthrower/flaming_gun.png', 21, 16);
    Dotf.game.load.spritesheet('laser_gun_animation', 'Assets/guns/laser/laser_gun.png', 16, 12);
    Dotf.game.load.spritesheet('bullet_boss_level_one', 'Assets/other/Bullet3.png', 22, 22);
    // <ENEMY>
    Dotf.game.load.spritesheet('enemy', 'Assets/monster/slime1_front.png', 16, 16);
    Dotf.game.load.spritesheet('catscratch', 'Assets/other/catscratch.png', 18, 18);
    Dotf.game.load.spritesheet('enemyshoot', 'Assets/monster/slime_explode.png', 34, 34);
    // Others
    Dotf.game.load.spritesheet('coin', 'Assets/other/coin2.png', 16, 16);
    Dotf.game.load.spritesheet('powerup', 'Assets/other/powerup.png', 16, 16);
    Dotf.game.load.spritesheet('shockwave', 'Assets/other/shockwave.png', 80, 80);
    Dotf.game.load.spritesheet('burning', 'Assets/other/burning.png', 18, 13);
    Dotf.game.load.spritesheet('enemy_fire','Assets/monster/enemy_fire.png', 34, 32);
    Dotf.game.load.image('arrow_navigation','Assets/other/arrow_navigation.png', 32, 32);
    Dotf.game.load.image('compass','Assets/other/compass.png');
    Dotf.game.load.image('shield','Assets/other/Shield.png');
    Dotf.game.load.image('immune_item','Assets/other/icon2.png');
    // Player info
    Dotf.game.load.image('player_board','Assets/other/player_board.png');
    Dotf.game.load.image('red_health_bar','Assets/other/red_health_bar.png');
    Dotf.game.load.image('yellow_bar','Assets/other/yellow_bar.png');
    Dotf.game.load.image('blue_bar','Assets/other/blue_bar.png');
    Dotf.game.load.image('avatar','Assets/other/avatar.png');
    //Audio
    Dotf.game.load.audio('SoundGun1','Assets/audio/SoundGun1.wav');
  },
  create: function() {
    Dotf.game.state.start('Stage1');
  }
}
