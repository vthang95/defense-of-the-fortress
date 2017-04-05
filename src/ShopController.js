class ShopController {
  constructor() {
    this.shopBackground = Dotf.shopGroup.create(Dotf.game.width - 100, 210, 'shop_background');
    this.shopBackground.anchor.setTo(0.5, 0);
    this.shopBackground.scale.setTo(3);
    this.shopBackground.alpha = 0.1;
    this.shopBackground.visible = false;
    this.shopBackground.fixedToCamera = true;
    this.shopBackground.inputEnabled = true;
    // this.shopBackground.events.onInputOver.add(this.hover, this);
    this.guns = [];

    this.sprite = Dotf.shopGroup.create(Dotf.game.width - 100, 180, 'shop_button');
    this.sprite.fixedToCamera = true;
    this.sprite.scale.setTo(0.2);
    this.sprite.anchor.setTo(0.5);
    this.sprite.alpha = 0.5;
    this.sprite.inputEnabled = true;
    this.sprite.input.useHandCusor = true;
    this.sprite.text = 'Shop';
    this.sprite.events.onInputDown.add(this.scrollDown, this);

    this.cannonGun = Dotf.shopGroup.create(Dotf.game.width - 100, 230, 'canon_shop');
    this.setFirstValue(this.cannonGun);
    this.cannonGun.price = 300;
    this.cannonGun.events.onInputDown.add(this.buyCannonGun, this);

    this.flamethrowerGun = Dotf.shopGroup.create(Dotf.game.width - 100, 275, 'flamethrower_shop');
    this.setFirstValue(this.flamethrowerGun);
    this.flamethrowerGun.price = 400;
    this.flamethrowerGun.events.onInputDown.add(this.buyFlamethrower, this);

    this.laserGun = Dotf.shopGroup.create(Dotf.game.width - 100, 320, 'laser_shop');
    this.setFirstValue(this.laserGun);
    this.laserGun.price = 500;
    this.laserGun.events.onInputDown.add(this.buyLaserGun, this);

    this.matterGun = Dotf.shopGroup.create(Dotf.game.width - 100, 365, 'matter_shop');
    this.setFirstValue(this.matterGun);
    this.matterGun.price = 600;
    this.matterGun.events.onInputDown.add(this.buyMatterGun, this);

    this.mgGun = Dotf.shopGroup.create(Dotf.game.width - 100, 400, 'mg_shop');
    this.setFirstValue(this.mgGun);
    this.mgGun.price = 700;
    this.mgGun.events.onInputDown.add(this.buyMgGun, this);

    this.pistolGun = Dotf.shopGroup.create(Dotf.game.width - 100, 435, 'pistol_shop');
    this.setFirstValue(this.pistolGun);
    this.pistolGun.price = 800;
    this.pistolGun.events.onInputDown.add(this.buyPistolGun, this);

    this.rocketGun = Dotf.shopGroup.create(Dotf.game.width - 100, 470, 'rocket_shop');
    this.setFirstValue(this.rocketGun);
    this.rocketGun.price = 900;
    this.rocketGun.events.onInputDown.add(this.buyRocketGun, this);

    this.shotGun = Dotf.shopGroup.create(Dotf.game.width - 100, 505, 'shotgun_shop');
    this.setFirstValue(this.shotGun);
    this.shotGun.price = 1000;
    this.shotGun.events.onInputDown.add(this.buyShotGun, this);

    this.spazerGun = Dotf.shopGroup.create(Dotf.game.width - 100, 540, 'spazer_shop');
    this.setFirstValue(this.spazerGun);
    this.spazerGun.price = 1100;
    this.spazerGun.events.onInputDown.add(this.buySpazerGun, this);

    this.gunInfo = Dotf.game.add.text(Dotf.game.width -100, 250, '', {
      font: '12px Arial',
      fill: '#ffff00'
    });
    this.gunInfo.fixedToCamera = true;

    this.cantBuyWarning = Dotf.game.add.text(Dotf.game.width / 2, Dotf.game.height / 2, ' You can not buy this gun! Because You owned one!', {
      font: '35px Arial',
      fill: '#fff'
    });
    this.cantBuyWarning.visible = false;
    this.cantBuyWarning.anchor.setTo(0.5);
    this.cantBuyWarning.fixedToCamera = true;

    this.dontHaveMoney = Dotf.game.add.text(Dotf.game.width / 2, Dotf.game.height / 2, 'You dont have enough money', {
      font: '35px Arial',
      fill: '#fff'
    });
    this.dontHaveMoney.visible = false;
    this.dontHaveMoney.anchor.setTo(0.5);
    this.dontHaveMoney.fixedToCamera = true;


    this.count = 0;
  }

  setFirstValue(sprite) {
    this.guns.push(sprite);
    sprite.fixedToCamera = true;
    sprite.anchor.setTo(0.5);
    sprite.scale.setTo(3, 3);
    sprite.visible = false;
    sprite.inputEnabled = true;
    sprite.input.useHandCusor = true;
  }

  showWarning(spriteText) {
    spriteText.visible = true;
    setTimeout(() => spriteText.visible = false, 2000);
  }

  buyCannonGun() {
    let pushGun = function() {
      Dotf.player.gunIsEquiped.push(new CannonGunController(Dotf.player.sprite, {
        fireRate: 200
      }));
    };
    this.buy(this.cannonGun, 'default_gun', pushGun);
  }
  buyFlamethrower() {
    let pushGun = function() {
      Dotf.player.gunIsEquiped.push(new GunController(Dotf.gunGroup, 'flaming_gun_animation', Dotf.player.sprite, {
        fireRate: 200
      }));
    };
    this.buy(this.flamethrowerGun, 'flamethrower', pushGun);
  }
  buyLaserGun() {
    let pushGun = function() {
      Dotf.player.gunIsEquiped.push(new LaserGunController(Dotf.player.sprite, {
        fireRate: 200
      }));
    };
    this.buy(this.flamethrowerGun, 'flamethrower', pushGun);
  }
  buyMatterGun() {}
  buyMgGun() {}
  buyPistolGun() {}
  buyRocketGun() {}
  buyShotGun() {}
  buySpazerGun() {}

  buy(sprite, gunName, pushGunFunc) {
    if (Dotf.player.sprite.coin < sprite.price) {
      this.showWarning(this.dontHaveMoney);
    } else if (Dotf.player.gunIsEquiped.every(gun => gun.gunName != gunName)) {
      pushGunFunc();
    } else {
      this.showWarning(this.cantBuyWarning);
    }
  }

  showGunInfo(position, gun) {
    this.gunInfo.position.x = position.x;
    this.gunInfo.position.y = position.y;
    this.gunInfo.visible = true;
    this.gunInfo.setText(`${ gun.text }`, {
      font: '122px Arial',
      fill: '#ffff00'
    });
  }

  enableInput() {
    this.guns.forEach(gun => gun.inputEnabled = true);
  }

  enableVisible() {
    this.shopBackground.visible = true;
    this.guns.forEach(gun => gun.visible = true);
  }

  disableInput() {
    this.guns.forEach(gun => gun.inputEnabled = false)
  }

  disableVisible() {
    this.shopBackground.visible = false;
    this.guns.forEach(gun => gun.visible = false);
  }

  scrollDown() {
    // Dotf.player.gun.isCanFire = false;
    if (this.count % 2 === 0) {
      this.enableInput();
      this.enableVisible();
      Dotf.cursor.sprite.loadTexture('default');
      Dotf.cursor.sprite.anchor.setTo(0);
    } else {
      this.disableVisible();
      this.disableInput();
    }
    this.count += 1;
  }

  hover(sprite, opacityHover, opacity) {
    if (sprite.input.pointerOver()) {
      Dotf.player.gun.isCanFire = false;
      sprite.alpha = opacityHover;
      Dotf.cursor.sprite.loadTexture('default');
      Dotf.cursor.sprite.anchor.setTo(0)
    } else {
      this.gunInfo.visible = false;
      sprite.alpha = opacity;
      Dotf.player.gun.isCanFire = true;
    }
  }

  changeAllHover() {
    this.guns.forEach(gun => this.hover(gun, 1, 0.5))
    this.hover(this.shopBackground, 0.1, 0.1);
  }

  update() {
    this.changeAllHover();

    if (this.sprite.input.pointerOver()) {
      Dotf.player.gun.isCanFire = false;
      this.sprite.alpha = 1;
      Dotf.cursor.sprite.loadTexture('default');
      Dotf.cursor.sprite.anchor.setTo(0)
    } else {
      this.sprite.alpha = 0.5;
      Dotf.player.gun.isCanFire = true;
    }
  }

}
