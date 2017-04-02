class PlayerController {
  constructor(physicsGroup, spritesheet, configs) {
    this.sprite = physicsGroup.create(Dotf.base.sprite.position.x, Dotf.base.sprite.position.y, spritesheet, 0);
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.scale.setTo(3);
    this.sprite.body.collideWorldBounds = true;

    this.sprite.health = 50;
    this.sprite.coin = 0;
    this.sprite.exp = 0;
    this.sprite.mana = 1000;
    this.sprite.manaMax = 1000;
    this.sprite.manaRegen = 2;
    this.sprite.speed = configs.speed;
    this.sprite.setDamage = 5;
    this.sprite.baseDamage = 5;
    this.sprite.maxHealth = 50;
    this.sprite.level = 1;
    this.sprite.data = {};

    this.addAnimation();

    this.configs = configs;

    Dotf.game.camera.follow(this.sprite);
    Dotf.game.camera.follow(this.sprite, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

    this.gun = new LaserGunController(this.sprite, {cooldown: 0.7});
    this.sprite.realDamage = this.sprite.setDamage + this.gun.sprite.setDamage;
    // this.buffSpeedKey = Dotf.game.input.keyboard.addKey(this.configs.speedBuff);
    // this.buffSpeedKey.onDown.add(this.buffSpeed, this);
    this.nextTimeBuffSpeed = 0;
    this.nextTimeRegenMana = 0;
    this.decreaseManaRate = 100;
    this.regenManaRate = 1000;
    this.angleBetweenSpriteAndPointer = 90;
  }

  regenMana() {
    if (this.sprite.mana >= this.sprite.manaMax) {
      this.sprite.mana = this.sprite.manaMax;
      return;
    }
    if (Dotf.game.time.now > this.nextTimeRegenMana) {
      this.nextTimeRegenMana = Dotf.game.time.now + this.regenManaRate;
      this.sprite.mana += this.sprite.manaRegen;
    }
  }

  buffSpeed() {
    if (this.sprite.mana <= 0) {
      this.sprite.mana = 0;
      return
    };
    if (Dotf.keyboard.isDown(this.configs.speedBuff) && this.sprite.mana >= 10) {
      if (Dotf.game.time.now > this.nextTimeBuffSpeed) {
        this.nextTimeBuffSpeed = Dotf.game.time.now + this.decreaseManaRate;
        this.sprite.mana -= 10;
        this.sprite.speed = this.configs.speed + 100;
      }
    } else this.sprite.speed = this.configs.speed;
  }

  checkRealDamage() {
    this.sprite.level = Math.floor(this.sprite.exp / 300) + 1;
    this.sprite.baseDamage = this.sprite.setDamage + this.sprite.level * 5;
    this.sprite.realDamage = this.sprite.setDamage + this.gun.sprite.setDamage + this.sprite.level * 5;
  }

  addAnimation() {
    this.sprite.animations.add('left', [25, 26, 27, 28], 5, true);
    this.sprite.animations.add('right', [21, 22, 23, 24], 5, true);
    this.sprite.animations.add('up', [9, 10, 11, 12], 5, true);
    this.sprite.animations.add('down', [17, 18, 19, 20], 5, true);
    this.sprite.animations.add('leftCrossUp', [5, 6, 7, 8], 5, true);
    this.sprite.animations.add('rightCrossUp', [1, 2, 3, 4], 5, true);
    this.sprite.animations.add('leftCrossDown', [33, 34, 35, 36], 5, true);
    this.sprite.animations.add('rightCrossDown', [29, 30, 31, 32], 5, true);
  }

  changeAnimation() {
    if (this.angleBetweenSpriteAndPointer > 67.5 && this.angleBetweenSpriteAndPointer < 112.5) {
      this.sprite.play('down');
    }
    if (this.angleBetweenSpriteAndPointer > 112.5 && this.angleBetweenSpriteAndPointer < 157.5) {
      this.sprite.play('leftCrossDown');
    }
    if (this.angleBetweenSpriteAndPointer > 22.5 && this.angleBetweenSpriteAndPointer < 67.5) {
      this.sprite.play('rightCrossDown');
    }
    if (this.angleBetweenSpriteAndPointer > -22.5 && this.angleBetweenSpriteAndPointer < 22.5) {
      this.sprite.play('right');
    }
    if (this.angleBetweenSpriteAndPointer > -67.5 && this.angleBetweenSpriteAndPointer < -22.5) {
      this.sprite.play('rightCrossUp');
    }
    if (this.angleBetweenSpriteAndPointer > -112.5 && this.angleBetweenSpriteAndPointer < -67.5) {
      this.sprite.play('up');
    }
    if (this.angleBetweenSpriteAndPointer > -157.5 && this.angleBetweenSpriteAndPointer < -112.5) {
      this.sprite.play('leftCrossUp');
    }
    if ((this.angleBetweenSpriteAndPointer > -180 && this.angleBetweenSpriteAndPointer < -157) || (this.angleBetweenSpriteAndPointer > 157.5 && this.angleBetweenSpriteAndPointer < 180)) {
      this.sprite.play('left');
    }
  }

  update() {

    if (this.sprite.health < 0) {
      this.sprite.health = 0;
    };

    this.sprite.data = {
      health: this.sprite.health,
      coin: this.sprite.coin,
      exp: this.sprite.exp,
      speed: this.sprite.speed,
      realDamage: this.sprite.realDamage,
      maxHealth: this.sprite.maxHealth,
      mana: this.sprite.mana
    };
    this.regenMana();
    this.checkRealDamage();
    if (!this.sprite.alive) {
      this.gun.sprite.kill();
      return
    }

    // if mana === 0 => speed set to default


    this.gun.update();

    this.angleBetweenSpriteAndPointer = Phaser.Math.radToDeg(Dotf.game.physics.arcade.angleBetween(this.sprite, Dotf.cursor.sprite));
    this.changeAnimation();

    this.sprite.body.velocity.x = 0;
    this.sprite.body.velocity.y = 0;
    //TODO add animation for all navigations command
    // this.gun.sprite.rotation = Dotf.game.physics.arcade.angleBetween(this.gun.sprite, this.sprite.cursor.sprite) - Math.PI / 2;

    if (Dotf.keyboard.isDown(this.configs.up)) {
      this.sprite.body.velocity.y = -this.sprite.speed;
    } else if (Dotf.keyboard.isDown(this.configs.down)) {
      this.sprite.body.velocity.y = this.sprite.speed;
    }
    if (Dotf.keyboard.isDown(this.configs.left)) {
      this.sprite.body.velocity.x = -this.sprite.speed;
    } else if (Dotf.keyboard.isDown(this.configs.right)) {
      this.sprite.body.velocity.x = this.sprite.speed;
    }
    this.buffSpeed();
    // Stop animation
    if (this.sprite.body.velocity.x === 0 && this.sprite.body.velocity.y === 0) this.sprite.animations.stop();
  }
}
