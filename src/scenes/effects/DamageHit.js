// src/scenes/effects/DamageHit.js
import { createPane } from '../../ui/createPane';

export default class DamageHit extends Phaser.Scene {
  constructor() {
    // IMPORTANT: When duplicating this file, you must:
    // 1. Rename the class (e.g. 'MyEffect')
    // 2. Change the key below to match (e.g. super('MyEffect'))
    super('DamageHit');
  }

  preload() {
    // Example: load assets you need
    this.load.image('error', 'assets/DamageHit_Error.png');
    this.load.image('BG', 'assets/DamageHit_BG.png');
    this.load.image('tablet', 'assets/DamageHit_TabletAlert.png');
  }

  create() {
    // Title in top-left so you always know your scene
    this.add.text(20, 20, 'DamageHit', { fontSize: '20px', fill: '#ffffff' });

    const centerX = this.scale.width / 2;
    const centerY = this.scale.height / 2;

    // --- EFFECT CORE SETUP ----------------------------------------------
    // Create images positioned relative to container center (0,0)
    const bg = this.add.image(0, 0, 'BG');

    // Create tablet grouping
    const tabletImg = this.add.image(0, 0, 'tablet');
    const error = this.add.image(0, 0, 'error');
    error.setVisible(false); // Hide initially
    const tablet = this.add.container(0, 0, [tabletImg, error]);
    tablet.setSize(tabletImg.width, tabletImg.height);

    // Create container and add images
    this.mainContainer = this.add.container(centerX, centerY, [bg, tablet]);

    // Container must fit the width of the current window
    // We scale based on the background image width
    const scale = this.scale.width / bg.width;
    this.mainContainer.setScale(scale);

    // --- UI PANEL (Tweakpane) -------------------------------------------
    this.pane = createPane(this, 'Effect Controls');

    // Default params

    // Restart effect button
    this.pane.addButton({ title: 'Trigger Damage' }).on('click', () => {
      // Show the error message on hit
      error.setVisible(true);

      // Apply effects
      // We use the specific flash method to pass the custom color
      this.juice.add(tabletImg).shake().flash();
      this.juice.add(error).shake().flash();
    });

    // Reset State
    this.pane.addButton({ title: 'Reset System' }).on('click', () => {
      error.setVisible(false);
      // Reset position/effects if needed
      tablet.setPosition(0, 0);
      juice.reset(tablet);
    });



    this.input.keyboard.on('keydown-ESC', () => {
      this.scene.start('MenuScene');
    });


  }

  update() {
    // Optional per-frame logic
  }
}