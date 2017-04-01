class BaseImmuneItemController {
  constructor(position) {
    this.sprite = Dotf.immuneItemGroup.create(position.x, position.y, 'immune_item');
    // this.sprite = Dotf.immuneItemGroup.create(position.x, position.y, 'immune_item');
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.scale.setTo(2);
    this.autoRemove();
  }

  autoRemove() {
    setTimeout(() => {
      this.sprite.destroy();
      // TODO add auto remove instance
    }, Dotf.configs.baseImmuneTime);
  }
}
