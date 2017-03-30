const Stage2 = {
  stageId: 2,
  isInStage: true,
  preload: function() {
    sharedPreloadResource();
  },
  create: function() {
    sharedGlobalSetup();
    sharedCreateBackgroundForStage('background');
    sharedGlobalObject();
    sharedInitializeObjectOfStage('character1_animation');
    sharedFetchDataFromPreviewStage();
    sharedGameInfo(this.stageId, Dotf.playerData);

    setInterval(() => {
      if (!this.isInStage) return;
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
    if (Dotf.player.sprite.coin > 20) {
      sharedStopPlayer();
      sharedSaveDataToNextStage();
      sharedNextStage('Winning', this.isInStage);
      this.isInStage = false;
      return;
    }
    sharedUpdateInfoOfStage();
    sharedUpdateSpritesOfStage();
    sharedCollideChecking();
  }
}
