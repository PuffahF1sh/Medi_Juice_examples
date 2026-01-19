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

    //add a particle layer container same size as the frame
    this.particleLayer = this.add.container(0, 0);
    this.container.add(this.particleLayer);

    // --- Warning Popup ---
    // We add it to the container so it scales with everything else
    const popup = new WarningPopup(this, 0, 0); // 0,0 relative to container center
    this.container.add(popup);
    popup.setVisible(true);

    // Define the path around the Warning Popup (560x175, Radius 10)
    // Popup is centered at (0,0) in the container
    const popupW = 560;
    const popupH = 175;
    const halfPW = popupW / 2;
    const halfPH = popupH / 2;

    var p0 = new Phaser.Math.Vector2(-halfPW + 5, halfPH - 5);
    var p1 = new Phaser.Math.Vector2(0, -popupH - 50);
    var p2 = new Phaser.Math.Vector2(halfPW - 5, halfPH - 5);

    var curve = new Phaser.Curves.QuadraticBezier(p0, p1, p2);

    const totalPoints = 100;
    const points = [];
    const tangents = [];

    // spacing based on points count
    const step = 1 / totalPoints;

    for (let c = 0; c <= totalPoints; c++) {
      const t = c * step;
      points.push(curve.getPoint(t));
      tangents.push(curve.getTangent(t));
    }

    const tempVec = new Phaser.Math.Vector2();
    const emittersArray = [];

    const startScale = 1;
    const endScale = 0.1;

    for (let i = 0; i < points.length; i++) {
      const p = points[i];

      // Calculate emission angle (outward from edge)
      // Similar to copypad: copy tangent, normalize right hand, scale, add to point
      tempVec.copy(tangents[i]).normalizeRightHand().scale(-32).add(p);
      const angle = Phaser.Math.RadToDeg(Phaser.Math.Angle.BetweenPoints(p, tempVec));

      const texture = (i % 2 === 0) ? 'particle1' : 'particle2';

      const emitter = this.add.particles(p.x, p.y, texture, {
        speed: { min: 20, max: 300 },
        scale: { start: startScale, end: endScale },
        maxVelocityX: { start: 2000, end: 50, ease: 'Sine.easeOut' },
        maxVelocityY: { start: 2000, end: 50, ease: 'Sine.easeOut' },
        opacity: { values: [ 100, 100, 100, 0 ], interpolation: 'catmull', ease: 'linear' },
        rotate: { min: 0, max: 360, random: true },
        angle: angle,
        gravityY: 200,
        lifespan: 600,
        blendMode: 'screen',
        frequency: 100,
      });
      emittersArray.push(emitter);
    }

    this.particleLayer.add(emittersArray);

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
  }
}
