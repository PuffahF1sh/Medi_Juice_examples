import { createPane } from '../../ui/createPane';
import WarningPopup from '../../components/WarningPopup';

export default class Firework extends Phaser.Scene {
  constructor() {
    super('Firework');
  }

  preload() {
    // Assets
    this.load.image('bg', 'assets/lvl1CreatureTube.png');

    // Particles
    this.load.image('particle1', 'assets/particle1.png');
    this.load.image('particle2', 'assets/particle2.png');
  }

  create() {
    this.add.text(20, 20, 'Firework', { fontSize: '20px', fill: '#ffffff' });

    // --- Layout & Scaling Constants ---
    const frameW = 844, frameH = 390;
    const halfW = frameW / 2, halfH = frameH / 2;

    this.container = this.add.container(this.cameras.main.centerX, this.cameras.main.centerY);

    const addToContainer = (item, figmaX, figmaY, isVisible = true) => {
      const obj = (typeof item === 'string') ? this.add.image(0, 0, item) : item;
      const w = obj.width || 0, h = obj.height || 0;
      obj.setPosition(figmaX - halfW + w / 2, figmaY - halfH + h / 2);
      obj.setVisible(isVisible);
      this.container.add(obj);
      return obj;
    };

    // --- Scene Objects ---
    addToContainer('bg', 0, 0);

    // --- OVERLAY LAYER (Tablet) ---
    // Using a Rectangle instead of image for performance/simplicity
    const overlay = this.add.rectangle(-halfW, -halfH, frameW, frameH, 0xC11044E, 0.4).setOrigin(0, 0);
    overlay.setVisible(true);
    this.container.add(overlay);

    // --- Warning Popup ---
    // We add it to the container so it scales with everything else
    const popup = new WarningPopup(this, 0, 0); // 0,0 relative to container center
    this.container.add(popup);

    // --- Confetti Particles ---
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

    // --- Controls & Inputs ---
    this.createControls();

    this.input.keyboard.on('keydown-ESC', () => this.scene.start('MenuScene'));

    // --- Scale Management ---
    this.updateScale(frameW, frameH);
    this.scale.on('resize', (gameSize) => this.updateScale(frameW, frameH, gameSize));
  }

  updateScale(frameW, frameH, gameSize = this.scale) {
    const scale = Math.min(gameSize.width / frameW, gameSize.height / frameH) * 0.9;
    this.container.setScale(scale);
    this.container.setPosition(gameSize.width / 2, gameSize.height / 2);
  }

  createControls() {
    this.pane = createPane(this, 'Firework Controls');
    this.pane.addButton({ title: 'Reset Scene' }).on('click', () => this.scene.restart());

    const confettiParams = this.pane.addFolder({ title: 'Confetti' });
    confettiParams.addButton({ title: 'Fire Confetti' }).on('click', () => this.fireConfetti());
  }
}
