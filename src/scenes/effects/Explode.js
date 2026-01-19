import { createPane } from '../../ui/createPane';
import { createFoodInventory } from '../../components/FoodInventory';

export default class Explode extends Phaser.Scene {
  constructor() {
    super('Explode');
  }

  preload() {
    // Assets
    this.load.image('bg', 'assets/0c4d580c0ad84c54ec5e5ecd05c42c41e2fb4a30.png');
    this.load.image('creatureTube_happy', 'assets/0bf36ea40d2f6c4085382bddb0f304f18728335f.png');
    this.load.image('creatureTube_sad', 'assets/Creature tube_sad.png');
    this.load.image('panelLeft', 'assets/d61b5610a0c3d33dcf32911b24c3d13a52441321.png');
    this.load.image('panelRight', 'assets/4dcdacd0d7959819bc53c87348e08f1dcd9cf61a.png');
    this.load.image('feedingTray3', 'assets/ea2586c078e3d75d9ef79bcc3f71786c10ab706e.png');
    this.load.image('feedingTray1', 'assets/Tray_elderMoss_1.png');
    this.load.image('taskListTray', 'assets/8f083b76b61d4659917421d78128cc07b45692c3.png');

    // Particles
    this.load.image('particle1', 'assets/particle1.png');
    this.load.image('particle2', 'assets/particle2.png');

    // Food Inventory Assets
    this.load.image('elderMoss', 'assets/b81c28f8d0587fdf93b2a2e80f0c3f22e9d6ccce.png');
    this.load.image('chameleonSlug', 'assets/73ebef2e9e1705c56387199b5babd1b7580c261d.png');
    this.load.image('emberfruit', 'assets/04baea026ec450f3755f2daac8cf248997d8bf60.png');
  }

  create() {
    this.add.text(20, 20, 'Explode', { fontSize: '20px', fill: '#ffffff' });

    // --- Layout & Scaling Constants ---
    const frameW = 844, frameH = 390;
    const halfW = frameW / 2, halfH = frameH / 2;

    // --- Helper Functions ---
    const addToContainer = (item, figmaX, figmaY, isVisible = true) => {
      const obj = (typeof item === 'string') ? this.add.image(0, 0, item) : item;
      const w = obj.width || 0, h = obj.height || 0;
      obj.setPosition(figmaX - halfW + w / 2, figmaY - halfH + h / 2);
      obj.setVisible(isVisible);
      this.container.add(obj);
      return obj;
    };

    // --- Container Setup ---
    this.container = this.add.container(this.cameras.main.centerX, this.cameras.main.centerY);

    // --- Scene Objects ---
    addToContainer('bg', 0, 0);
    addToContainer('panelLeft', 129.75, 24.75);
    addToContainer('panelRight', 553.75, 24.75);

    // Confetti Particles
    const particleConfig = {
      lifespan: 500,
      speed: { min: 150, max: 250 },
      scale: { start: 0.8, end: 0 },
      gravityY: 0,
      blendMode: 'normal',
      emitting: false,
      maxVelocityX: { start: 1000, end: 50, ease: 'Sine.easeOut' },
      maxVelocityY: { start: 1000, end: 50, ease: 'Sine.easeOut' },
    };

    this.emitter1 = this.add.particles(0, 0, 'particle1', particleConfig);
    this.emitter2 = this.add.particles(0, 0, 'particle2', particleConfig);
    this.container.add([this.emitter1, this.emitter2]);

    const tube = addToContainer('creatureTube_sad', 302, 37);
    const feedingTray = addToContainer('feedingTray1', 141.5, 121);
    addToContainer('taskListTray', 565, 121);

    // Food Inventory UI
    const invContainer = createFoodInventory(this, (key, index) => {
      if (key === 'elderMoss') {
        this.fireConfetti();
        tube.setTexture('creatureTube_happy');
        feedingTray.setTexture('feedingTray3');
      }
    });
    addToContainer(invContainer, 0, halfH - 107);

    // --- Controls & Inputs ---
    this.createControls();

    // Navigation
    this.input.keyboard.on('keydown-ESC', () => this.scene.start('MenuScene'));

    // --- Scale Management ---
    this.updateScale(frameW, frameH);
    this.scale.on('resize', (gameSize) => this.updateScale(frameW, frameH, gameSize));
  }

  fireConfetti() {
    this.emitter1.explode(8);
    this.emitter2.explode(8);
  }

  updateScale(frameW, frameH, gameSize = this.scale) {
    const scale = Math.min(gameSize.width / frameW, gameSize.height / frameH) * 0.9;
    this.container.setScale(scale);
    this.container.setPosition(gameSize.width / 2, gameSize.height / 2);
  }

  createControls() {
    const { pane, folder } = createPane(this, 'Explode Controls', 'Explode Controls');
    this.pane = pane;

    folder.addButton({ title: 'Fire Explosion' }).on('click', () => this.fireConfetti());
  }
}
