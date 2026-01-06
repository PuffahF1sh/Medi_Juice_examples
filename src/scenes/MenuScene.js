import effects from './effects/index';
import { createPane } from '../ui/createPane';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create() {
    this.add.text(20, 20, 'Effect Lab', { fontSize: '24px', color: '#ffffff' });

    // Create the Tweakpane UI
    // specific cleanup of previous instance if it exists (defensive)
    // Create the Tweakpane UI

    this.pane = createPane(this, 'Choose a scene');

    effects.forEach(sceneClass => {
      this.pane.addButton({ title: sceneClass.name }).on('click', () => {
        this.scene.start(sceneClass.name);
      });
    });

    // Cleanup is handled by createPane auto-cleanup
  }
}