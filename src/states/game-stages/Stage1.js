const Stage1 = {
  stageId: 1,
  isInStage: true,
  preload: function() {

  },
  create: function() {
    this.isInStage = true;
    sharedGlobalSetup();
    sharedCreateBackgroundForStage('background');
    sharedGlobalObject();

    sharedInitializeObjectOfStage('character1_animation');
    sharedGameInfo(this.stageId, Dotf.player.sprite.data);

    new BossController(new Phaser.Point(500, 500), Dotf.bossGroup, 'boss', {
      speedBoss:  200
    });
    this.randomEnemy();
  },
  randomEnemy: function() {
    this.setIntervalId = setInterval(() => {
      if (!this.isInStage) return;
      if (!Dotf.player.sprite.alive || !Dotf.base.sprite.alive) return;
      let randomRate = Math.random();
      if (randomRate < 0.3) {
        new EnemyChasePlayerController({
            x: Math.floor(Math.random() * 2960) + 1,
            y: Math.floor(Math.random() * 2160) + 1
            // reference GAME_WIDTH_MAX, GAME_HEIGHT_MAX
          },
          Dotf.chasingEnemyGroup, {
            speed: 200,
            coinDroppingRate: 0.7
          });
      } else if (randomRate < 0.7) {
        new EnemyController({
            x: Math.floor(Math.random() * 2960) + 1,
            y: Math.floor(Math.random() * 2160) + 1
            // reference GAME_WIDTH_MAX, GAME_HEIGHT_MAX
          },
          'enemy',
          Dotf.enemiesGroup, {
            speed: 200,
            coinDroppingRate: 0.7,
          });
      } else {
        new EnemyShootPlayerController({
            x: Math.floor(Math.random() * 2960) + 1,
            y: Math.floor(Math.random() * 2160) + 1
          },
          Dotf.chasingEnemyGroup, {
            speed: 200,
            coinDroppingRate: 0.7
          });
      }
    }, 2000);
  },
  update: function() {
    // Next stage condition
    if (!Dotf.player.sprite.alive || !Dotf.base.sprite.alive) {
      console.log('ss');
      Dotf.game.state.start('GameOver');
    }
    if (Dotf.bosses.length === 0) {
      sharedStopPlayer();
      sharedSaveDataToNextStage();
      clearInterval(this.setIntervalId);
      sharedNextStage('Stage2', this.isInStage);
      this.isInStage = false;
      return;
    }

    sharedUpdateInfoOfStage();
    sharedUpdateSpritesOfStage();
    sharedCollideChecking();
  },
  render: function() {

  }
}
