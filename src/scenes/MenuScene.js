// src/scenes/MenuScene.js
import effects from './effects/index';
import { createPane } from '../ui/createPane';

/**
 * @class MenuScene
 * @extends Phaser.Scene
 * @description The main menu scene that lists all available effects.
 * It now launches the EffectShowcaseScene with the selected effect.
 */
export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create() {
    this.add.text(20, 20, 'Effect Lab', { fontSize: '24px', color: '#ffffff' });

    // Create the Tweakpane UI for the menu
    this.pane = createPane(this, 'Choose an Effect');

    // Dynamically create a button for each available effect
    effects.forEach(effectClass => {
      this.pane.addButton({ title: effectClass.name }).on('click', () => {
        // When a button is clicked, start the showcase scene and pass the effect class
        this.scene.start('EffectShowcaseScene', { effectClass: effectClass });
      });
    });
  }
}
