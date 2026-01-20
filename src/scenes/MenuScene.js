import effects from './effects_scenes/index';
import { createPane } from '../ui/createPane';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create() {
    this.add.text(20, 20, 'Effect Lab', { fontSize: '24px', color: '#ffffff' });

    // specific cleanup of previous instance if it exists (defensive)
    const { pane, folder } = createPane(this,'Choose a scene');
    this.pane = pane;

    effects.forEach(sceneClass => {
      pane.addButton({ title: sceneClass.name }).on('click', () => {
        this.scene.start(sceneClass.name);
      });
    });

    // Cleanup is handled by createPane auto-cleanup
  }
}