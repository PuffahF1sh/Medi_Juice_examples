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
    if (this.pane) {
      this.pane.dispose();
    }

    this.pane = createPane('Effect Lab');

    effects.forEach(sceneClass => {
      this.pane.addButton({ title: sceneClass.name }).on('click', () => {
        this.scene.start(sceneClass.name);
      });
    });

    // Cleanup the pane when the scene shuts down
    this.events.once('shutdown', () => {
      if (this.pane) {
        this.pane.dispose();
        this.pane = null;
      }
    });
  }
}