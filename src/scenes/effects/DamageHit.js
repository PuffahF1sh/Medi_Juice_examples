import { createPane } from '../../ui/createPane';

export default class DamageHit extends Phaser.Scene {
  constructor() {
    super('DamageHit');
  }

  preload() {
    // Assets
    this.load.image('error', 'assets/DamageHit_Error.png');
    this.load.image('BG', 'assets/DamageHit_BG.png');
    this.load.image('tablet', 'assets/DamageHit_TabletAlert.png');
  }

  create() {
    this.add.text(20, 20, 'DamageHit', { fontSize: '20px', fill: '#ffffff' });

    // --- Layout & Scaling Constants ---
    const frameW = 844;
    const frameH = 390;

    // --- Container Setup ---
    this.container = this.add.container(this.cameras.main.centerX, this.cameras.main.centerY);

    // --- Scene Objects ---
    // Background
    const bg = this.add.image(0, 0, 'BG');
    this.container.add(bg);

    // Tablet Group
    const tabletImg = this.add.image(0, 0, 'tablet');
    const error = this.add.image(0, 0, 'error');
    error.setVisible(false);

    const tablet = this.add.container(0, 0, [tabletImg, error]);
    tablet.setSize(tabletImg.width, tabletImg.height);
    this.container.add(tablet);

    // --- Logic/Effects ---

    // --- Controls & Inputs ---
    // --- UI PANEL (Tweakpane) ---
    const { pane, folder } = createPane(this, 'Effect Controls', 'Effect Controls');
    this.pane = pane;

    folder.addButton({ title: 'Trigger Damage' }).on('click', () => {
      error.setVisible(true);
      // Apply effects
      this.juice.add(tabletImg).shake().flash();
      this.juice.add(error).shake().flash();
    });

    // Navigation
    this.input.keyboard.on('keydown-ESC', () => {
      this.scene.start('MenuScene');
    });

    // --- Scale Management ---
    this.updateScale(frameW, frameH);
    this.scale.on('resize', (gameSize) => this.updateScale(frameW, frameH, gameSize));
  }

  updateScale(frameW, frameH, gameSize = this.scale) {
    const scale = Math.min(gameSize.width / frameW, gameSize.height / frameH) * 0.9;
    this.container.setScale(scale);
    this.container.setPosition(gameSize.width / 2, gameSize.height / 2);
  }
}