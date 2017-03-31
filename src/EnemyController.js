class EnemyController {
  constructor(position, spriteName, physicsGroup, configs) {
    this.sprite = physicsGroup.create(position.x, position.y, spriteName, 2);
    this.configs = configs;
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.scale.setTo(3);
    Dotf.greenEnemies.push(this);
    this.sprite.animations.add('run', [0, 1, 2, 3], 5, true);
    this.sprite.events.onKilled.add(this.remove, this);

    this.sprite.health = 20;
    this.sprite.coin = 1;
    this.sprite.setDamage = 5;

    this.sprite.dropCoin = () => {
      let cordinateX = this.sprite.position.x;
      let cordinateY = this.sprite.position.y;
      let coinQuantity = Math.floor(Math.random() * 4 +1);
      this.createCoin(cordinateX, cordinateY, coinQuantity);
    };

    // TODO: change enemy's color when get hit
  }
  createCoin(corX, corY, multiple) {
    for (let i = 0; i < multiple; i++) {
      new CoinController({
        x: corX,
        y: corY
      }, 'coin', {
        coinValue: this.sprite.coin,
        speed: 1000
      }, this.sprite);
    }
  }

  checkRandomCoinDropRate() {
    let numberForChecking = Math.floor(Math.random() * 100 + 1) / 100;
    if (numberForChecking < this.configs.coinDroppingRate) return true;
    return false;
  }

  createExplosion() {
    new ExplodeController(this.sprite.position, 'shockwave', {});
  }

  remove() {
    this.createExplosion();
    if (this.sprite.dropCoin && this.checkRandomCoinDropRate()) this.sprite.dropCoin();
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
