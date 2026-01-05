// src/scenes/effects/ButtonPulse.js
import { createPane } from '../../ui/createPane';

export default class ButtonPulse extends Phaser.Scene {
  constructor() {
    // IMPORTANT: When duplicating this file, you must:
    // 1. Rename the class (e.g. 'MyEffect')
    // 2. Change the key below to match (e.g. super('MyEffect'))
    super('ButtonPulse');
  }

  preload() {
    // Example: load assets you need
    this.load.image('BG', 'assets/ButtonPulse_BG.png');
    this.load.image('button', 'assets/ButtonPulse_btn.png');
  }

  create() {
    // Title in top-left so you always know your scene
    this.add.text(20, 20, 'ButtonPulse', { fontSize: '20px', fill: '#ffffff' });

    const centerX = this.scale.width / 2;
    const centerY = this.scale.height / 2;

    // --- EFFECT CORE SETUP ----------------------------------------------
    // Create images positioned relative to container center (0,0)
    const bg = this.add.image(0, 0, 'BG');
    const buttonImg = this.add.image(0, 0, 'button');

    // Create container and add images
    this.mainContainer = this.add.container(centerX, centerY, [bg, buttonImg]);

    // Container must fit the width of the current window
    // We scale based on the background image width
    const scale = this.scale.width / bg.width;
    this.mainContainer.setScale(scale);

    this.juice.add(buttonImg).pulse(null, { repeat: -1 });

    // --- UI PANEL (Tweakpane) -------------------------------------------
    if (this.pane) {
      this.pane.dispose();
    }
    this.pane = createPane('Effect Controls');

    // Back to menu
    this.pane.addButton({ title: 'Back to Menu' }).on('click', () => {
      this.scene.start('MenuScene');
    });

    this.input.keyboard.on('keydown-ESC', () => {
      this.scene.start('MenuScene');
    });

    // Cleanup
    this.events.once('shutdown', () => {
      if (this.pane) {
        this.pane.dispose();
        this.pane = null;
      }
    });
  }

  update() {
    // Optional per-frame logic
  }
}