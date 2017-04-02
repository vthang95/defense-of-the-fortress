class PlayerInformation {
  constructor() {
    this.board = Dotf.game.add.sprite(50, 50, 'player_board');
    this.board.scale.setTo(1.5, 1.5);
    this.board.fixedToCamera = true;
    this.healthBar = Dotf.game.add.sprite(142, 77, 'red_health_bar');
    this.healthBar.fixedToCamera = true;
    this.healthBar.scale.setTo(1.5, 1.5);
    this.healthBar.anchor.setTo(0, 0.5);
    this.avatar = Dotf.game.add.sprite(100, 95, 'avatar');
    this.avatar.fixedToCamera = true;
    this.avatar.scale.setTo(1.5, 1.5);
    this.avatar.anchor.setTo(0.5, 0.5);
    this.manaBar = Dotf.game.add.sprite(148, 99, 'blue_bar');
    this.manaBar.fixedToCamera = true;
    this.manaBar.scale.setTo(1.5, 1.5);
    this.manaBar.anchor.setTo(0, 0.5);
    this.expBar = Dotf.game.add.sprite(138, 119, 'yellow_bar');
    this.expBar.fixedToCamera = true;
    this.expBar.scale.setTo(1.5, 1.5);
    this.expBar.anchor.setTo(0, 0.5);
    this.avatarImage = Dotf.game.add.sprite(102, 100, 'character1_animation', 14);
    this.avatarImage.fixedToCamera = true;
    this.avatarImage.scale.setTo(3);
    this.avatarImage.anchor.setTo(0.5, 0.5);
    this.coinIcon = Dotf.game.add.sprite(75, 158, 'coin', 0);
    this.coinIcon.fixedToCamera = true;
    this.coinIcon.scale.setTo(1.2);
    this.coinIcon.anchor.setTo(0.5, 0.5);

    // Dotf.baseHealth = Dotf.game.add.text(320, 20, `Base Health: ${ data.heath }`, {
    //   font: '12px Arial',
    //   fill: '#fff'
    // });
    // Dotf.baseHealth.fixedToCamera = true;
    // Dotf.stageName = Dotf.game.add.text(550, 20, `Stage: ${ stageId }`, {
    //   font: '12px Arial',
    //   fill: '#fff'
    // });
    // Dotf.stageName.fixedToCamera = true;
    this.infoHealth = Dotf.game.add.text(182, 72, `${ Dotf.player.sprite.health }`, {
      font: '12px Arial',
      fill: '#fff'
    });
    this.infoHealth.fixedToCamera = true;
    this.infoCoin = Dotf.game.add.text(85, 151, `${ Dotf.player.sprite.coin }`, {
      font: '12px Arial',
      fill: '#fff'
    });
    this.infoCoin.fixedToCamera = true;
    this.infoExp = Dotf.game.add.text(182, 114, `${ Dotf.player.sprite.exp }`, {
      font: '12px Arial',
      fill: '#fff'
    });
    this.infoExp.fixedToCamera = true;
    this.infoDamage = Dotf.game.add.text(230, 132, `${ Dotf.player.sprite.realDamage } + <p style="color: green"> ${ Dotf.player.gun.sprite.setDamage } </p>`, {
      font: '12px Arial',
      fill: '#fff'
    });
    this.infoDamage.fixedToCamera = true;
    // this.infoMaxHealth = Dotf.game.add.text(220, 700, `Max Health: ${ Dotf.player.sprite.maxHealth }`, {
    //   font: '12px Arial',
    //   fill: '#fff'
    // });
    // this.infoMaxHealth.fixedToCamera = true;
    this.infoSpeed = Dotf.game.add.text(230, 150, `${ Dotf.player.sprite.speed }`, {
      font: '12px Arial',
      fill: '#fff'
    });
    this.infoSpeed.fixedToCamera = true;
    this.infoLevel = Dotf.game.add.text(66, 120, `${ Dotf.player.sprite.level }`, {
      font: '14px Arial',
      fill: '#fff'
    });
    this.infoLevel.fixedToCamera = true;
  }

  update() {
    this.infoHealth.setText(`${ Dotf.player.sprite.health } / ${ Dotf.player.sprite.maxHealth }`);
    // this.baseHealth.setText(`Base Health: ${ Dotf.base.sprite.health }`);
    this.infoCoin.setText(`${ Dotf.player.sprite.coin }`);
    this.infoExp.setText(`${ Dotf.player.sprite.exp % 300} / 300 `);
    this.infoDamage.setText(`${ Dotf.player.sprite.baseDamage } + ${ Dotf.player.gun.sprite.setDamage }`);
    // this.infoMaxHealth.setText(`Max Health: ${ Dotf.player.sprite.maxHealth }`);
    this.infoSpeed.setText(`${ Dotf.player.sprite.speed }`);
    this.infoLevel.setText(`${ Dotf.player.sprite.level }`);

    this.healthBar.scale.setTo((Dotf.player.sprite.health / Dotf.player.sprite.maxHealth) * 1.5, 1.5);
    this.expBar.scale.setTo(((Dotf.player.sprite.exp % 300) / 300) * 1.5, 1.5);
  }

 }
