import { Pane } from 'tweakpane';

export function createPane(scene, title = 'Controls') {
  const pane = new Pane({
    title,
    expanded: true,
  });

  pane.element.style.position = 'fixed';
  pane.element.style.top = '10px';
  pane.element.style.right = '10px';
  pane.element.style.zIndex = 9999;

  // Add Back to Menu button automatically for all scenes except MenuScene
  if (scene && scene.sys.settings.key !== 'MenuScene') {
    pane.addButton({ title: 'Back to Menu' }).on('click', () => {
      scene.scene.start('MenuScene');
    });
  }

  // Auto-cleanup on shutdown
  if (scene) {
    scene.events.once('shutdown', () => {
      pane.dispose();
    });
  }

  return pane;
}