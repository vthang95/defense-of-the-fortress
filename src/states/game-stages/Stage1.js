const Stage1 = {
  stageId: 1,
  isInStage: true,
  preload: function() {
    sharedPreloadResource();
  },
  create: function() {
    sharedGlobalSetup();
    sharedCreateBackgroundForStage('background');
    sharedGlobalObject();

    sharedInitializeObjectOfStage('character1_animation');
    sharedGameInfo(this.stageId, Dotf.player.sprite.data);

    setInterval(() => {
      if (!this.isInStage) {
        console.log('stop')
        return
      };
      if (!Dotf.player.sprite.alive || !Dotf.base.sprite.alive) return;
      if (Math.random() > 0.5) {
        new EnemyChasePlayerController({
            x: Math.floor(Math.random() * 2960) + 1,
            y: Math.floor(Math.random() * 2160) + 1
            // reference GAME_WIDTH_MAX, GAME_HEIGHT_MAX
          },
          Dotf.chasingEnemyGroup, {
            speed: 200,
            coinDroppingRate: 0.7
          });
      } else {
        new EnemyController({
            x: Math.floor(Math.random() * 2960) + 1,
            y: Math.floor(Math.random() * 2160) + 1
            // reference GAME_WIDTH_MAX, GAME_HEIGHT_MAX
          },
          'enemy',
          Dotf.enemiesGroup, {
            speed: 200,
            coinDroppingRate: 0.7
          });
      }
    }, 2000);


  },
  update: function() {
    // Pass stage
    if (Dotf.player.sprite.coin > 10) {
      sharedStopPlayer();
      sharedSaveDataToNextStage();
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
