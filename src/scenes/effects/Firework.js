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

    // --- Container Setup ---
    this.container = this.add.container(this.cameras.main.centerX, this.cameras.main.centerY);

    // --- Scene Objects (Visual Layer Order) ---
    // Background
    const bg = this.add.image(0, 0, 'bg');
    this.container.add(bg);

    // Overlay
    const overlay = this.add.rectangle(-halfW, -halfH, frameW, frameH, 0xC11044E, 0.4).setOrigin(0, 0);
    this.container.add(overlay);

    // Particle Layer
    this.particleLayer = this.add.container(0, 0);
    this.container.add(this.particleLayer);

    // Warning Popup
    const popup = new WarningPopup(this, 0, 0);
    this.container.add(popup);

    // --- Logic/Effects ---
    this.createFireworkEffect(560, 175);

    // --- Controls & Inputs ---
    this.createControls();

    // Navigation
    this.input.keyboard.on('keydown-ESC', () => this.scene.start('MenuScene'));

    // --- Scale Management ---
    this.updateScale(frameW, frameH);
    this.scale.on('resize', (gameSize) => this.updateScale(frameW, frameH, gameSize));
  }

  createFireworkEffect(width, height) {
    const halfW = width / 2;
    const halfH = height / 2;
    // Define the path around the popup (Radius 10 roughly accounted for by padding)
    const p0 = new Phaser.Math.Vector2(-halfW + 5, halfH - 5);
    const p1 = new Phaser.Math.Vector2(0, -height - 50);
    const p2 = new Phaser.Math.Vector2(halfW - 5, halfH - 5);

    const curve = new Phaser.Curves.QuadraticBezier(p0, p1, p2);
    const points = curve.getSpacedPoints(100);

    const tempVec = new Phaser.Math.Vector2();
    const emittersArray = [];

    points.forEach((p, i) => {
      // Calculate emission angle (outward from edge)
      const tangent = curve.getTangent(i / points.length);
      tempVec.copy(tangent).normalizeRightHand().scale(-32).add(p);
      const angle = Phaser.Math.RadToDeg(Phaser.Math.Angle.BetweenPoints(p, tempVec));

      const texture = (i % 2 === 0) ? 'particle1' : 'particle2';

      const emitter = this.add.particles(p.x, p.y, texture, {
        speed: { min: 20, max: 300 },
        scale: { start: 1, end: 0.1 },
        maxVelocityX: { start: 2000, end: 50, ease: 'Sine.easeOut' },
        maxVelocityY: { start: 2000, end: 50, ease: 'Sine.easeOut' },
        opacity: { values: [100, 100, 100, 0], interpolation: 'catmull', ease: 'linear' },
        rotate: { min: 0, max: 360, random: true },
        angle: angle,
        gravityY: 200,
        lifespan: 600,
        blendMode: 'screen',
        frequency: 100,
      });
      emittersArray.push(emitter);
    });

    this.particleLayer.add(emittersArray);
  }

  updateScale(frameW, frameH, gameSize = this.scale) {
    const scale = Math.min(gameSize.width / frameW, gameSize.height / frameH) * 0.9;
    this.container.setScale(scale);
    this.container.setPosition(gameSize.width / 2, gameSize.height / 2);
  }

  createControls() {
    // --- UI PANEL (Tweakpane) ---
    const { pane } = createPane(this, 'Firework Controls');
    this.pane = pane;
  }
}
