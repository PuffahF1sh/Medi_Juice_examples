import { createPane } from '../../ui/createPane';
import { addButtonPulse } from '../juice_snippets/juice_buttonPulse';

export default class ButtonPulse extends Phaser.Scene {
  constructor() {
    super('ButtonPulse');
  }

  preload() {
    // Assets
    this.load.image('BG', 'assets/ButtonPulse_BG.png');
    this.load.image('button', 'assets/ButtonPulse_btn.png');
  }

  create() {
    this.add.text(20, 20, 'ButtonPulse', { fontSize: '20px', fill: '#ffffff' });

    // --- Layout & Scaling Constants ---
    const frameW = 844;
    const frameH = 390;

    // --- Container Setup ---
    this.container = this.add.container(this.cameras.main.centerX, this.cameras.main.centerY);

    // --- Scene Objects ---
    // Background (Visual Layer: Bottom)
    const bg = this.add.image(0, 0, 'BG');
    this.container.add(bg);

    // Button (Visual Layer: Top)
    const buttonImg = this.add.image(0, 0, 'button');
    this.container.add(buttonImg);

    // --- Logic/Effects ---
    addButtonPulse(this, buttonImg);

    // --- Controls & Inputs ---
    this.createControls();

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

  createControls() {
    // --- UI PANEL (Tweakpane) ---
    const { pane, folder } = createPane(this, 'Effect Controls');
    this.pane = pane;
  }
}