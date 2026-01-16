import { createPane } from '../../ui/createPane';

export default class Confetti extends Phaser.Scene {
  constructor() {
    super('Confetti');
  }

  preload() {
    // Assets based on Figma Design (Locally Downloaded)
    this.load.image('bg', 'assets/0c4d580c0ad84c54ec5e5ecd05c42c41e2fb4a30.png');
    this.load.image('creatureTube', 'assets/0bf36ea40d2f6c4085382bddb0f304f18728335f.png');
    this.load.image('panelLeft', 'assets/d61b5610a0c3d33dcf32911b24c3d13a52441321.png');
    this.load.image('panelRight', 'assets/4dcdacd0d7959819bc53c87348e08f1dcd9cf61a.png');
    this.load.image('feedingTray', 'assets/ea2586c078e3d75d9ef79bcc3f71786c10ab706e.png');
    this.load.image('taskListTray', 'assets/8f083b76b61d4659917421d78128cc07b45692c3.png');
    this.load.image('containerNarrow', 'assets/6bf07bd9730fd6f942b90df74d7987ae1ed2bb5c.png'); //message container at top
    // Buttons
    this.load.image('btnVolume', 'assets/41d23cbb45142fafbe655326662f0ddac8d8943c.png');
    this.load.image('btnDischarge', 'assets/ca1f7110b498e9e1dded9fcafb8b94c3b32b2bd2.png');
    this.load.image('btnReturn', 'assets/41db02dd8623b057a9ee0f4fa416b9817abca483.png');
    this.load.image('btnOpenTablet', 'assets/a800436954490de6fbf6b2b85cfc577d22c54742.png');

    // Items that would need to be hidden
    this.load.image('tablet', 'assets/c285a53c16ceb71712ecadd08a7dc9fb1c34a79b.png');
    this.load.image('btnCloseTablet', 'assets/8ece8bdc84335de610e8078ff4265c7115ab11d8.png');
    this.load.image('btnSave', 'assets/b37f4ca357ef814b7fc706587992c3545618af51.png');
  }

  create() {
    this.add.text(20, 20, 'Confetti', { fontSize: '20px', fill: '#ffffff' });

    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    // Figma Frame Dimensions
    const frameW = 844;
    const frameH = 390;
    const halfW = frameW / 2;
    const halfH = frameH / 2;

    // --- MAIN CONTAINER ---
    this.container = this.add.container(centerX, centerY);

    // Helper to add image relative to center of container, assuming figma origin is top-left (0,0)
    // and items are placed at 0,0 locally.
    // X_phaser = X_figma - halfW + (Width_asset / 2) IF we use default 0.5 origin
    // OR: X_phaser = X_figma - halfW IF we use setOrigin(0,0)
    const addToContainer = (key, figmaX, figmaY, isVisible = true) => {
      const img = this.add.image(0, 0, key);
      // Calculate center position based on Figma top-left coordinates
      img.setPosition(
        figmaX - halfW + img.width / 2,
        figmaY - halfH + img.height / 2
      );
      img.setVisible(isVisible);
      this.container.add(img);
      return img;
    };

    var rect = new Phaser.Geom.Rectangle(0, 0, frameW, frameH);

    // --- CONFETTI LAYER ---
    // 1. Create texture for confetti
    if (!this.textures.exists('particleTexture')) {
      const texture = this.textures.createCanvas('particleTexture', 10, 10);
      const context = texture.getContext();
      context.fillStyle = '#ffffff';
      const confettiSize = 8;
      context.fillRect(0, 0, confettiSize, confettiSize);
      texture.refresh();
    }

    // 2. Emitter helper
    const addEmitter = (figmaX, figmaY, angle) => {
      const x = figmaX - halfW;
      const y = figmaY - halfH;
      const cone = 20;
      const velocap = 2000;
      const speed = 800;
      const emitter = this.add.particles(x, y, 'particleTexture', {
        speed: { min: 500, max: speed * 1.2 },
        angle: { min: angle - cone, max: angle + cone },
        lifespan: { min: 500, max: 800 },
        scaleX: {
          onUpdate: (particle, key, t) => { return Math.sin((t / 1) * Math.PI * 3); },
        },
        rotate: { min: -180, max: 180, random: true },
        tint: [0xFFFAE6, 0xCD0172, 0xFF66B9, 0x7FF9FF, 0x5C58EB, 0x00B0CB],
        emitting: false,
        gravityY: 1000,
        maxVelocityX: { start: velocap, end: 50, ease: 'Sine.easeOut' },
        maxVelocityY: { start: velocap, end: 50, ease: 'Sine.easeOut' },
        //deathZone: { type: 'onLeave', source: rect }
      });
      this.container.add(emitter);
      return emitter;
    };

    // --- SCENE OBJECTS ---
    const bg = addToContainer('bg', 0, 0);
    addToContainer('panelLeft', 129.75, 24.75);
    addToContainer('panelRight', 553.75, 24.75);
    const tube = addToContainer('creatureTube', 302, 37);
    const feedingTray = addToContainer('feedingTray', 141.5, 121);
    const taskList = addToContainer('taskListTray', 565, 121);

    const btnOpenTablet = addToContainer('btnOpenTablet', 34, 290);
    const btnReturn = addToContainer('btnReturn', 34, 18);
    const btnDischarge = addToContainer('btnDischarge', 547, 311);
    const btnVolume = addToContainer('btnVolume', 764, 20);
    addToContainer('containerNarrow', 249, 18);

    // 3. Emitters
    const angle = 60;
    const emitterLeft = addEmitter(0, frameH, -angle);
    const emitterRight = addEmitter(frameW, frameH, angle - 180);

    // Helper to fire confetti
    const confettiCount = 100;
    this.fireConfetti = () => {
      emitterLeft.explode(confettiCount);
      emitterRight.explode(confettiCount);
    };

    // --- OVERLAY LAYER (Tablet) ---
    // Using a Rectangle instead of image for performance/simplicity
    const overlay = this.add.rectangle(-halfW, -halfH, frameW, frameH, 0xCDFDFF, 0.8).setOrigin(0, 0);
    overlay.setVisible(true);
    this.container.add(overlay);

    const tablet = addToContainer('tablet', 144, 14);
    tablet.setVisible(true);

    const btnCloseTablet = addToContainer('btnCloseTablet', 34, 290);
    btnCloseTablet.setVisible(true);

    const btnSave = addToContainer('btnSave', 545, 301);
    btnSave.setVisible(true);
    btnSave.setInteractive();

    // --- SCALING ---
    // Scale container to fit window with some margin
    const scaleX = this.scale.width / frameW;
    const scaleY = this.scale.height / frameH;
    const scale = Math.min(scaleX, scaleY) * 0.9; // 90% fit

    this.container.setScale(scale);

    // --- INTERACTIVITY & JUICE ---
    // Hitting save hides the tablet and shows the discharge button
    btnSave.on('pointerdown', () => {
      btnOpenTablet.setVisible(true);
      tablet.setVisible(false);
      overlay.setVisible(false);
      btnCloseTablet.setVisible(false);
      btnSave.setVisible(false);
      this.juice.pulse(btnDischarge, { repeat: -1 });
      if (this.fireConfetti) this.fireConfetti();
    });

    // --- UI PANEL (Tweakpane) -------------------------------------------
    this.pane = createPane(this, 'Confetti Controls');

    // Reset State
    this.pane.addButton({ title: 'Reset Scene' }).on('click', () => {
      this.scene.restart();
    });

    const confettiParams = this.pane.addFolder({
      title: 'Confetti',
    });
    // Manual confetti button
    confettiParams.addButton({ title: 'Fire Confetti' }).on('click', () => {
      this.fireConfetti();
    });

    // Cleanup Handled by createPane auto-cleanup

    this.input.keyboard.on('keydown-ESC', () => {
      this.scene.start('MenuScene');
    });

    // Update scale on resize
    this.scale.on('resize', (gameSize) => {
      const sx = gameSize.width / frameW;
      const sy = gameSize.height / frameH;
      const s = Math.min(sx, sy) * 0.9;
      this.container.setScale(s);
      this.container.setPosition(gameSize.width / 2, gameSize.height / 2);
    });
  }
}
