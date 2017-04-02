class EnemyController {
  constructor(position, spriteName, physicsGroup, configs) {
    this.sprite = physicsGroup.create(position.x, position.y, spriteName, 2);
    this.configs = configs;
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.scale.setTo(3);
    Dotf.greenEnemies.push(this);
    this.sprite.animations.add('run', [0, 1, 2, 3], 5, true);
    this.sprite.events.onKilled.add(this.remove, this);

    this.sprite.baseHealth = 25;
    this.sprite.health = this.sprite.baseHealth + (Dotf.player.sprite.level - 1) * 4;
    this.sprite.coinValue = 1;
    this.sprite.expValue = 5;
    this.sprite.setDamage = 5;
    this.isPlayerLevelUp = false;
    this.currentPlayerLevel = Dotf.player.sprite.level;

    this.sprite.dropCoin = () => {
      let cordinateX = this.sprite.position.x;
      let cordinateY = this.sprite.position.y;
      let coinQuantity = Math.floor(Math.random() * 4 +1);
      this.createCoin(cordinateX, cordinateY, coinQuantity);
    };

    this.sprite.dropExp = () => {
      let cordinateX = this.sprite.position.x;
      let cordinateY = this.sprite.position.y;
      let coinQuantity = Math.floor(Math.random() * 4 +1);
      this.createExp(cordinateX, cordinateY, coinQuantity);
    };
    this.sprite.dropBaseImmuneItem = () => {
      let cordinateX = this.sprite.position.x;
      let cordinateY = this.sprite.position.y;
      this.createBaseImmuneItem(cordinateX, cordinateY);
    }
    // TODO: change enemy's color when get hit
  }

  increaseHealthWhenPlayerLevelUp() {
    this.checkPlayerLevelUp();
    if (this.isPlayerLevelUp) {
      this.sprite.health = this.sprite.baseHealth + (Dotf.player.sprite.level - 1) * 4;
    }
    this.isPlayerLevelUp = false;
  }

  checkPlayerLevelUp() {
    if (Dotf.player.sprite.level > this.currentPlayerLevel) {
      this.isPlayerLevelUp = true;
      this.currentPlayerLevel = Dotf.player.sprite.level
    }
  }

  createCoin(corX, corY, multiple) {
    for (let i = 0; i < multiple; i++) {
      new CoinController({
        x: corX,
        y: corY
      }, 'coin', {
        coinValue: this.sprite.coinValue,
        speed: 1000
      }, this.sprite);
    }
  }

  createExp(corX, corY, multiple) {
    for (let i = 0; i < multiple; i++) {
      new ExpController({
        x: corX,
        y: corY
      }, 'powerup', {
        expValue: this.sprite.expValue,
        speed: 1000
      }, this.sprite);
    }
  }

  createBaseImmuneItem(corX, corY) {
    new BaseImmuneItemController({
      x: corX,
      y: corY
    });
  }

  checkRandomCoinDropRate() {
    let numberForChecking = Math.floor(Math.random() * 100 + 1) / 100;
    if (numberForChecking < this.configs.coinDroppingRate) return true;
    return false;
  }

  checkRandomBaseImmuneRate() {
    let numberForChecking = Math.floor(Math.random() * 100 + 1) / 100;
    if (numberForChecking < 0.1) return true;
    return false;
  }

  createExplosion() {
    new ExplodeController(this.sprite.position, 'shockwave', {});
  }

  remove() {
    this.createExplosion();
    if (this.sprite.dropCoin && this.checkRandomCoinDropRate()) this.sprite.dropCoin();
    if (this.sprite.dropExp)this.sprite.dropExp();
    if (this.checkRandomBaseImmuneRate()) this.sprite.dropBaseImmuneItem();
    Dotf.greenEnemies.splice(Dotf.greenEnemies.indexOf(this), 1);
  }

  update() {
    this.sprite.play('run');
    if (!Dotf.base.sprite.health) {
      this.sprite.body.velocity.x = 0;
      this.sprite.body.velocity.y = 0;
    } else {
      Dotf.game.physics.arcade.moveToXY(this.sprite, Dotf.base.sprite.position.x, Dotf.base.sprite.position.y, this.configs.speed);
    }
  }

}
