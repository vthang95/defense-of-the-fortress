class BaseController extends ConstructionController {
    constructor(x, y, configs) {
        super(x, y, Dotf.constructionsGroup, 'fountain', {});
        this.configs = configs;
        this.sprite.baseHealth = 100;
        this.sprite.health = 100;
        this.sprite.scale.setTo(3);
    }
}
