// RULE: All functions in this file will named with the shared___  prefix;

//*************************** define overlap events ******************************

const sharedTintASprite = (sprite) => {
  sprite.tint = 0xff0000;
  setTimeout(() => {
    sprite.tint = 0xffffff;
  }, 100);
};

const sharedOnEnemyHitBase = (enemySprite, baseSprite) => {
  sharedTintASprite(baseSprite);
  baseSprite.damage(enemySprite.setDamage);
  enemySprite.dropCoin = null;
  enemySprite.dropExp = null;
  enemySprite.kill();
};

// tint function will create a color filter to the sprite.
// sprite.tint = 0xffffff will remove all tint effect.
// TODO: tint a frame when player got damage


const sharedOnBulletHitEnemy = (playerBulletSprite, enemySprite) => {
  sharedTintASprite(enemySprite);
  enemySprite.damage(Dotf.player.sprite.realDamage);
  playerBulletSprite.kill();
};

const sharedOnPlayerPickCoin = (playerSprite, coinSprite) => {
  playerSprite.coin += coinSprite.coinValue;
  coinSprite.destroy();
};

const sharedOnPlayerPickExp = (playerSprite, expSprite) => {
  playerSprite.exp += expSprite.expValue;
  expSprite.destroy();
};

const sharedOnEnemyHitPlayer = (enemySprite, playerSprite) => {
  sharedTintASprite(playerSprite);
  playerSprite.damage(enemySprite.setDamage);
  enemySprite.dropCoin = null;
  enemySprite.dropExp = null;
  enemySprite.kill();
};

const sharedOnEnemyBulletHitPlayer = (enemyBulletSprite, playerSprite) => {
  sharedTintASprite(playerSprite);
  playerSprite.damage(enemyBulletSprite.setDamage);
  enemyBulletSprite.kill();
}

const sharedOnPlayerBulletHitBoss = (playerBulletSprite, bossSprite) => {
  bossSprite.damage(playerBulletSprite.setDamage);
  playerBulletSprite.kill();
}

const sharedOnBossBulletHitPlayerBullet = (bossBulletSprite, playerBulletSprite) => {
  bossBulletSprite.kill();
  playerBulletSprite.kill();
}

const sharedOnBossBulletHitPlayer = (bossBulletSprite, playerSprite) => {
  bossBulletSprite.kill();
  playerSprite.damage(bossBulletSprite.setDamage);
}

const sharedOnEnemyHitGuard = (enemySprite, guardSprite) => {
  enemySprite.dropCoin = null;
  enemySprite.dropExp = null;
  enemySprite.kill();
}

const sharedOnPlayerPickBaseImmuneItem = (playerSprite, immuneItemSprite) => {
  immuneItemSprite.kill();
  new GuardController();
}
//*************************** finish defining overlap events ************************

const sharedGlobalSetup = () => {
  Dotf.game.physics.startSystem(Phaser.Physics.ARCADE);
  Dotf.keyboard = Dotf.game.input.keyboard;
  Dotf.game.input.mouse.capture = true;
  Dotf.game.world.setBounds(0, 0, Dotf.configs.GAME_WORLD_WIDTH, Dotf.configs.GAME_WORLD_HEIGHT);
};


// TODO: make data;

const sharedSaveDataToNextStage = () => {
  Dotf.playerData = Dotf.player.sprite.data;
}

const sharedFetchDataFromPreviewStage = () => {
  Dotf.player.sprite.heatlh = Dotf.playerData.health;
  Dotf.player.sprite.coin = Dotf.playerData.coin;
  Dotf.player.sprite.exp = Dotf.playerData.exp;
  Dotf.player.sprite.speed = Dotf.playerData.speed;
  Dotf.player.sprite.realDamage = Dotf.playerData.realDamage;
  Dotf.player.sprite.maxHealth = Dotf.playerData.maxHealth;
}

const sharedStopPlayer = () => {
  Dotf.player.sprite.body.velocity.setTo(0, 0);
}

const sharedGlobalObject = () => {
  Dotf.greenEnemies = [];
  Dotf.coins = [];
  Dotf.exps = [];
  Dotf.explosions = [];
  Dotf.constructions = [];
  Dotf.gunIsEquiped = [];
  Dotf.bosses = [];
  Dotf.guards = [];

  // TODO Just the gun is actived can change the cursor
  Dotf.constructionsGroup = Dotf.game.add.physicsGroup();
  Dotf.guardGroup = Dotf.game.add.physicsGroup();
  Dotf.healthBarGroup = Dotf.game.add.physicsGroup();
  Dotf.playerBulletGroup = Dotf.game.add.physicsGroup();
  Dotf.playerGroup = Dotf.game.add.physicsGroup();
  Dotf.gunGroup = Dotf.game.add.physicsGroup();
  Dotf.enemiesGroup = Dotf.game.add.physicsGroup();
  Dotf.enemyBulletGroup = Dotf.game.add.physicsGroup();
  Dotf.chasingEnemyGroup = Dotf.game.add.physicsGroup();
  Dotf.coinGroup = Dotf.game.add.physicsGroup();
  Dotf.expGroup = Dotf.game.add.physicsGroup();
  Dotf.bossGroup = Dotf.game.add.physicsGroup();
  Dotf.bossBulletGroup = Dotf.game.add.physicsGroup();
  Dotf.immuneItemGroup = Dotf.game.add.physicsGroup();

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
    Dotf.playerGroup,
    Dotf.expGroup,
    sharedOnPlayerPickExp
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

  Dotf.game.physics.arcade.overlap(
    Dotf.enemyBulletGroup,
    Dotf.playerGroup,
    sharedOnEnemyBulletHitPlayer
  );

  Dotf.game.physics.arcade.overlap(
    Dotf.playerBulletGroup,
    Dotf.bossGroup,
    sharedOnPlayerBulletHitBoss
  );

  Dotf.game.physics.arcade.overlap(
    Dotf.bossBulletGroup,
    Dotf.playerBulletGroup,
    sharedOnBossBulletHitPlayerBullet
  );

  Dotf.game.physics.arcade.overlap(
    Dotf.bossBulletGroup,
    Dotf.playerGroup,
    sharedOnBossBulletHitPlayer
  );

  Dotf.game.physics.arcade.overlap(
    Dotf.enemiesGroup,
    Dotf.guardGroup,
    sharedOnEnemyHitGuard
  );

  Dotf.game.physics.arcade.overlap(
    Dotf.playerBulletGroup,
    Dotf.enemiesGroup,
    sharedOnBulletHitEnemy
  );

  Dotf.game.physics.arcade.overlap(
    Dotf.playerGroup,
    Dotf.immuneItemGroup,
    sharedOnPlayerPickBaseImmuneItem
  );
};

const sharedUpdateInfoOfStage = () => {
  Dotf.cursor.update();
  Dotf.arrowNavigation.update();
  Dotf.playerHealth.setText(`Health: ${ Dotf.player.sprite.health }`);
  Dotf.baseHealth.setText(`Base Health: ${ Dotf.base.sprite.health }`);
  Dotf.playerCoin.setText(`Coin: ${ Dotf.player.sprite.coin }`);
  Dotf.playerExp.setText(`Exp: ${ Dotf.player.sprite.exp }`);
  Dotf.playerRealDamage.setText(`Damage: ${ Dotf.player.sprite.realDamage }`);
  Dotf.playerMaxHealth.setText(`Max Health: ${ Dotf.player.sprite.maxHealth }`);
  Dotf.playerSpeed.setText(`Speed: ${ Dotf.player.sprite.speed }`);
  Dotf.playerLevel.setText(`Level: ${ Dotf.player.sprite.level }`);
  Dotf.player.update();
  Dotf.base.update();
};
const sharedUpdateSpritesOfStage = () => {
  Dotf.constructions.forEach(construction => construction.update());
  Dotf.coins.forEach(coin => coin.update());
  Dotf.exps.forEach(exp => exp.update());
  Dotf.greenEnemies.forEach(enemy => enemy.update());
  Dotf.greenEnemies.forEach(enemy => enemy.increaseHealthWhenPlayerLevelUp());
  Dotf.explosions.forEach(explosion => explosion.update());
  Dotf.bosses.forEach(boss => boss.update());
  Dotf.guards.forEach(guard => guard.update());
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
  Dotf.playerExp = Dotf.game.add.text(700, 20, `Exp: ${ data.exp }`, {
    font: '24px Arial',
    fill: '#fff'
  });
  Dotf.playerExp.fixedToCamera = true;
  Dotf.playerRealDamage = Dotf.game.add.text(50, 700, `Damage: ${ data.realDamage }`, {
    font: '24px Arial',
    fill: '#fff'
  });
  Dotf.playerRealDamage.fixedToCamera = true;
  Dotf.playerMaxHealth = Dotf.game.add.text(220, 700, `Max Health: ${ data.maxHealth }`, {
    font: '24px Arial',
    fill: '#fff'
  });
  Dotf.playerMaxHealth.fixedToCamera = true;
  Dotf.playerSpeed = Dotf.game.add.text(400, 700, `Speed: ${ data.speed }`, {
    font: '24px Arial',
    fill: '#fff'
  });
  Dotf.playerSpeed.fixedToCamera = true;
  Dotf.playerLevel = Dotf.game.add.text(550, 700, `Speed: ${ data.level }`, {
    font: '24px Arial',
    fill: '#fff'
  });
  Dotf.playerLevel.fixedToCamera = true;

};

const sharedCreateBackgroundForStage = (spriteName) => {
  Dotf.background1 = Dotf.game.add.tileSprite(0, 0, Dotf.configs.GAME_WORLD_WIDTH, Dotf.configs.GAME_WORLD_HEIGHT, spriteName);
  Dotf.background1.scale.setTo(2);
  // shop = Dotf.game.add.text(Dotf.configs.GAME_WORLD_WIDTH / 2+300, Dotf.configs.GAME_WORLD_HEIGHT / 2, 'shop', {
  //   font: '50px Courier',
  //   fill: '#ff0000'
  // })
  // shop.anchor.setTo(0.5, 0.5);
  // shop.inputEnabled = true;
  // shop.events.onInputUp.add(function (){
  //   var shopGroup;
  //   shopGroup = Dotf.game.add.group();
  //   shop1 = Dotf.game.add.sprite(Dotf.configs.GAME_WORLD_WIDTH/2+300,Dotf.configs.GAME_WORLD_HEIGHT/2+20,'gun');
  //   $shop1 = Dotf.game.add.text(Dotf.configs.GAME_WORLD_WIDTH/2+300,Dotf.configs.GAME_WORLD_HEIGHT/2+30,'2$',
  //   {
  //     font: '30px Courier',
  //     fill : '#ff0000'
  //   })
    // shop1.inputEnabled =true ;
  //   shop1.events.onInputUp.add(listener1,this);
  //   function listener1 (){
  //     gunAlive = false;
  //     let money = Dotf.player.sprite.coin;
  //     if(money > 2){
  //     money = money -2;
  //     Dotf.player.sprite.coin = money;
  //     gunAlive = true;
  //   }else { alert("Not enough money");}
  //   }
  //   // add shop1 && $shop1
  //   shopGroup.add(shop1);
  //   shopGroup.add($shop1);
  //   Dotf.game.input.onDown.add(dissapearShop,self);
  //   function dissapearShop (events){
  //     if(events.x > 0 && events.x <1300 && events.y > 0 && events.y <300){
  //       shopGroup.remove(shop1);
  //       shopGroup.remove($shop1);
  //     }
  //   }
  // });

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

  Dotf.arrowNavigation = new ArrowNavigationController();
};
