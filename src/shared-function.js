// RULE: All functions in this file will named with the shared___  prefix;

//*************************** define overlap events ******************************
const sharedOnEnemyHitBase = (enemySprite, BaseSprite) => {
  BaseSprite.damage(enemySprite.setDamage);
  enemySprite.dropCoin = null;
  enemySprite.kill();
};

// tint function will create a color filter to the sprite.
// sprite.tint = 0xffffff will remove all tint effect.
// TODO: tint a frame when player got damage

const sharedOnBulletHitEnemy = (playerBulletSprite, enemySprite) => {
  enemySprite.tint = 0xff0000;
  setTimeout(() => {
    enemySprite.tint = 0xffffff;
  }, 100);
  enemySprite.damage(playerBulletSprite.setDamage);
  playerBulletSprite.kill();
};

const sharedOnPlayerPickCoin = (playerSprite, coinSprite) => {
  playerSprite.coin += coinSprite.coinValue;
  coinSprite.destroy();
};

const sharedOnEnemyHitPlayer = (enemySprite, playerSprite) => {
  playerSprite.damage(enemySprite.setDamage);
  enemySprite.kill();
};
//*************************** finish defining overlap events ************************

const sharedGlobalSetup = () => {
  Dotf.game.physics.startSystem(Phaser.Physics.ARCADE);
  Dotf.keyboard = Dotf.game.input.keyboard;
  Dotf.game.input.mouse.capture = true;
  Dotf.game.world.setBounds(0, 0, Dotf.configs.GAME_WORLD_WIDTH, Dotf.configs.GAME_WORLD_HEIGHT);
};

Dotf.playerData = {};
Dotf.baseData = {};
// TODO: make data;

const sharedSaveDataToNextStage = () => {
  Dotf.playerData = Dotf.player.sprite.data;
}

const sharedFetchDataFromPreviewStage = () => {
  Dotf.player.sprite.heatlh = Dotf.playerData.health;
  Dotf.player.sprite.coin = Dotf.playerData.coin;
}

const sharedStopPlayer = () => {
  Dotf.player.sprite.body.velocity.setTo(0, 0);
}

const sharedGlobalObject = () => {
  Dotf.greenEnemies = [];
  Dotf.coins = [];
  Dotf.explosions = [];
  Dotf.constructions = [];
  // TODO Just the gun is actived can change the cursor
  Dotf.gunIsEquiped = [];
  Dotf.constructionsGroup = Dotf.game.add.physicsGroup();
  Dotf.healthBarGroup = Dotf.game.add.physicsGroup();
  Dotf.playerBulletGroup = Dotf.game.add.physicsGroup();
  Dotf.playerGroup = Dotf.game.add.physicsGroup();
  Dotf.gunGroup = Dotf.game.add.physicsGroup();
  Dotf.enemiesGroup = Dotf.game.add.physicsGroup();
  Dotf.chasingEnemyGroup = Dotf.game.add.physicsGroup();
  Dotf.coinGroup = Dotf.game.add.physicsGroup();

  Dotf.playerBulletGroup.setAll('outOfBoundsKill', true);
  Dotf.playerBulletGroup.setAll('checkWorldBounds', true);
};

const sharedCollideChecking = () => {
  Dotf.game.physics.arcade.overlap(
    Dotf.enemiesGroup,
    Dotf.constructionsGroup,
    sharedOnEnemyHitBase
  );

  Dotf.game.physics.arcade.overlap(
    Dotf.playerBulletGroup,
    Dotf.enemiesGroup,
    sharedOnBulletHitEnemy
  );

  Dotf.game.physics.arcade.overlap(
    Dotf.playerGroup,
    Dotf.coinGroup,
    sharedOnPlayerPickCoin
  );

  Dotf.game.physics.arcade.overlap(
    Dotf.chasingEnemyGroup,
    Dotf.playerGroup,
    sharedOnEnemyHitPlayer
  );

  Dotf.game.physics.arcade.overlap(
    Dotf.playerBulletGroup,
    Dotf.chasingEnemyGroup,
    sharedOnBulletHitEnemy
  );
};

const sharedUpdateInfoOfStage = () => {
  Dotf.cursor.update();
  Dotf.playerHealth.setText(`Health: ${ Dotf.player.sprite.health }`);
  Dotf.baseHealth.setText(`Base Health: ${ Dotf.base.sprite.health }`);
  Dotf.playerCoin.setText(`Coin: ${ Dotf.player.sprite.coin }`);
  Dotf.player.update();
  Dotf.base.update();
};
const sharedUpdateSpritesOfStage = () => {
  Dotf.constructions.forEach(construction => construction.update());
  Dotf.coins.forEach(coin => coin.update());
  Dotf.greenEnemies.forEach(enemy => enemy.update());
  Dotf.explosions.forEach(explosion => explosion.update());
};

const sharedNextStage = (nextStage, isInStage) => {
  if (!isInStage) return;
  passStageText = Dotf.game.add.text(700, 500, 'Great! You passed this stage', {
    font: '30px Courier',
    fill: '#fff'
  })
  passStageText.anchor.setTo(0.5, 0.5);
  passStageText.fixedToCamera = true;
  setTimeout(() => Dotf.game.state.start(nextStage), 2000);
  return;
};

const sharedGameInfo = (stageId, data) => {
  Dotf.playerHealth = Dotf.game.add.text(50, 20, `Health: ${ data.health }`, {
    font: '24px Arial',
    fill: '#fff'
  });
  Dotf.playerHealth.fixedToCamera = true;
  Dotf.playerCoin = Dotf.game.add.text(200, 20, `Coin: ${ data.coin }`, {
    font: '24px Arial',
    fill: '#fff'
  });
  Dotf.playerCoin.fixedToCamera = true;
  Dotf.baseHealth = Dotf.game.add.text(320, 20, `Base Health: ${ data.heath }`, {
    font: '24px Arial',
    fill: '#fff'
  });
  Dotf.baseHealth.fixedToCamera = true;
  Dotf.stageName = Dotf.game.add.text(550, 20, `Stage: ${ stageId }`, {
    font: '24px Arial',
    fill: '#fff'
  });
  Dotf.stageName.fixedToCamera = true;
};

const sharedCreateBackgroundForStage = (spriteName) => {
  Dotf.background1 = Dotf.game.add.tileSprite(0, 0, Dotf.configs.GAME_WORLD_WIDTH, Dotf.configs.GAME_WORLD_HEIGHT, spriteName);
  Dotf.background1.scale.setTo(2);
};

const sharedInitializeObjectOfStage = (characterSpriteName) => {
  Dotf.cursor = new CursorController('default', {
    anchorX: 0,
    anchorY: 0
  });

  Dotf.base = new BaseController(1880, 500, {});

  Dotf.player = new PlayerController(Dotf.playerGroup, characterSpriteName, {
    up: Phaser.Keyboard.W,
    down: Phaser.Keyboard.S,
    left: Phaser.Keyboard.A,
    right: Phaser.Keyboard.D,
    speed: Dotf.configs.player.speed
  });
};
