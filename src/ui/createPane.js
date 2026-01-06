import { Pane } from 'tweakpane';

export function createPane(title = 'Controls') {
  const pane = new Pane({
    title,
    expanded: true,
  });

  pane.element.style.position = 'fixed';
  pane.element.style.top = '10px';
  pane.element.style.right = '10px';
  pane.element.style.zIndex = 9999;

  return pane;
}