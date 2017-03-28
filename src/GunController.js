class GunController {
    constructor(physicsGroup, spriteName, playerSprite) {
        this.fatherSprite = playerSprite;
        this.sprite = physicsGroup.create(this.fatherSprite.body.x, this.fatherSprite.body.y, spriteName, 3);
        this.sprite.body.fixedRotation = true;
        this.sprite.anchor.setTo(0.5, 0.5);
        this.sprite.scale.setTo(2);
        // TODO check self remove object when it is destroyed
        this.sprite.cursor = new CursorController('default');

        this.sprite.timeSinceLastFire = 0;
        this.bullets = [];

        this.addAnimation();
    }
    // overide changeCursor function when create an instance
    changeCursor() {
        if (Dotf.game.input.activePointer.isDown) this.sprite.cursor.sprite.loadTexture('bulleta_cursor2');
            else this.sprite.cursor.sprite.loadTexture('bulleta_cursor1');
    }



    addAnimation() {
        this.sprite.animations.add('down', [3], 1, true);
        this.sprite.animations.add('up', [8], 1, true);
        this.sprite.animations.add('left', [2], 1, true);
        this.sprite.animations.add('right', [1], 1, true);
        this.sprite.animations.add('rightCrossUp', [4], 1, true);
        this.sprite.animations.add('rightCrossDown', [6], 1, true);
        this.sprite.animations.add('leftCrossUp', [5], 1, true);
        this.sprite.animations.add('leftCrossDown', [7], 1, true);
    }

    changeAnimation() {
        if (this.angleBetweenSpriteAndPointer > 67.5 && this.angleBetweenSpriteAndPointer < 112.5) {
            this.sprite.play('down');
            this.sprite.body.x = this.fatherSprite.body.x + 10;
            this.sprite.body.y = this.fatherSprite.body.y + 40;
        }
        if (this.angleBetweenSpriteAndPointer > 112.5 && this.angleBetweenSpriteAndPointer < 157.5) {
            this.sprite.play('leftCrossDown');
            this.sprite.body.x = this.fatherSprite.body.x - 15;
            this.sprite.body.y = this.fatherSprite.body.y + 37;
        }
        if (this.angleBetweenSpriteAndPointer > 22.5 && this.angleBetweenSpriteAndPointer < 67.5) {
            this.sprite.play('rightCrossDown');
            this.sprite.body.x = this.fatherSprite.body.x + 18;
            this.sprite.body.y = this.fatherSprite.body.y + 37;
        }
        if (this.angleBetweenSpriteAndPointer > -22.5 && this.angleBetweenSpriteAndPointer < 22.5) {
            this.sprite.play('right');
            this.sprite.body.x = this.fatherSprite.body.x + 25;
            this.sprite.body.y = this.fatherSprite.body.y + 25;
        }
        if (this.angleBetweenSpriteAndPointer > -67.5 && this.angleBetweenSpriteAndPointer < -22.5) {
            this.sprite.play('rightCrossUp');
            this.sprite.body.x = this.fatherSprite.body.x + 30;
            this.sprite.body.y = this.fatherSprite.body.y + 15;
        }
        if (this.angleBetweenSpriteAndPointer > -112.5 && this.angleBetweenSpriteAndPointer < -67.5) {
            this.sprite.play('up');
            this.sprite.body.x = this.fatherSprite.body.x + 10;
            this.sprite.body.y = this.fatherSprite.body.y + 25;
        }
        if (this.angleBetweenSpriteAndPointer > -157.5 && this.angleBetweenSpriteAndPointer < -112.5) {
            this.sprite.play('leftCrossUp');
            this.sprite.body.x = this.fatherSprite.body.x - 21;
            this.sprite.body.y = this.fatherSprite.body.y + 3;
        }
        if ((this.angleBetweenSpriteAndPointer > -180 && this.angleBetweenSpriteAndPointer < -157.5) || (this.angleBetweenSpriteAndPointer > 157.5 && this.angleBetweenSpriteAndPointer < 180)) {
            this.sprite.play('left');
            this.sprite.body.x = this.fatherSprite.body.x - 28;
            this.sprite.body.y = this.fatherSprite.body.y + 22;
        }
    }

    tryFire() {
        Dotf.game.camera.shake(0.003, 200);
        this.sprite.timeSinceLastFire += Dotf.game.time.physicsElapsed;
        if (this.sprite.timeSinceLastFire > 0.2) {
            new BulletcController(
                this.sprite.position,
                this
            );
            this.sprite.timeSinceLastFire = 0;
        }
    }

    update() {
        this.changeCursor();
        this.sprite.cursor.update();
        this.bullets.forEach(bullet => bullet.update());

        this.angleBetweenSpriteAndPointer = Phaser.Math.radToDeg(Dotf.game.physics.arcade.angleBetween(this.fatherSprite, this.sprite.cursor.sprite));
        this.changeAnimation();
        // this.sprite.rotation = Dotf.game.physics.arcade.angleBetween(this.sprite, this.fatherSprite.cursor.sprite) - Math.PI / 2;
        if (Dotf.game.input.activePointer.isDown) this.tryFire();
    }

}
