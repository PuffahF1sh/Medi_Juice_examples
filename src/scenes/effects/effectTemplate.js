// src/scenes/effects/EffectTemplate.js
import { createPane } from '../../ui/createPane';

export default class EffectTemplate extends Phaser.Scene {
  constructor() {
    // IMPORTANT: When duplicating this file, you must:
    // 1. Rename the class (e.g. 'MyEffect')
    // 2. Change the key below to match (e.g. super('MyEffect'))
    super('EffectTemplate');
  }

  preload() {
    // 1. LOAD ASSETS HERE
    // this.load.image('myImage', 'assets/image.png');
  }

  create() {
    // Title in top-left so you always know your scene
    this.add.text(20, 20, this.constructor.name, { fontSize: '20px', fill: '#ffffff' });

    // --- EFFECT CORE SETUP ----------------------------------------------
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    // 2. SETUP YOUR SCENE OBJECTS HERE
    // const target = this.add.image(centerX, centerY, 'myImage');


    // --- UI PANEL (Tweakpane) -------------------------------------------
    // --- UI PANEL (Tweakpane) -------------------------------------------
    const { pane, folder } = createPane(this, 'Effect Controls');
    this.pane = pane;

    // 3. DEFINE PARAMETERS TO TWEAK
    const params = {
      // property: value,
      // intensity: 10,
    };

    // 4. ADD BINDINGS
    // this.pane.addBinding(params, 'intensity', { min: 0, max: 20 });

    // 5. ADD ACTION BUTTONS
    folder.addButton({ title: 'Trigger Effect' }).on('click', () => {
      // this.juice.shake(target);
      console.log('Trigger effect');
    });

    // --- NAVIGATION -----------------------------------------------------


    this.input.keyboard.on('keydown-ESC', () => {
      this.scene.start('MenuScene');
    });


  }

  update() {
    // Optional per-frame logic
  }
}