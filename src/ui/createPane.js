import { Pane } from 'tweakpane';

// Function to create a Tweakpane UI
export function createPane(scene, title = 'Controls', folderTitle) {
  const pane = new Pane({
    title: 'Menu',
    expanded: true,
  });

  pane.element.style.position = 'fixed';
  pane.element.style.top = '10px';
  pane.element.style.right = '10px';
  pane.element.style.zIndex = 9999;
  pane.element.style.width = '200px';

  // Add Back to Menu button automatically for all scenes except MenuScene
  let folder;
  if (scene && scene.sys.settings.key !== 'MenuScene') {
    pane.addButton({ title: 'Back to Menu' }).on('click', () => {
      scene.scene.start('MenuScene');
    });
    pane.addButton({ title: 'Reset Scene' }).on('click', () =>
      scene.scene.restart());
    // Only create folder if folderTitle is provided
    if (folderTitle) {
      folder = pane.addFolder({ title: folderTitle });
    }
  } else if (folderTitle) {
    // For MenuScene or when no scene is provided, only create folder if folderTitle is provided
    folder = pane.addFolder({ title: folderTitle });
  }

  // Auto-cleanup on shutdown
  if (scene) {
    scene.events.once('shutdown', () => {
      pane.dispose();
    });
  }

  return { pane, folder };
}