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

const sharedGlobalObject = () => {
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

    Dotf.greenEnemies = [];
    Dotf.coins = [];
    Dotf.explosions = [];
    Dotf.constructions = [];
    // TODO Just the gun is actived can change the cursor
    Dotf.gunIsEquiped = [];
}
