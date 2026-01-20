/**
 * Adds a continuous pulse effect to a target using the phaserJuice plugin.
 * @param {Phaser.Scene} scene - The scene containing the juice plugin.
 * @param {Phaser.GameObjects.GameObject} target - The target object to pulse.
 * @returns {any} The juice effect instance.
 */
export const addButtonPulse = (scene, target) => {
  if (!scene.juice) {
    console.warn('phaserJuice plugin not found on scene');
    return null;
  }
  return scene.juice.add(target).pulse(null, { repeat: -1 });
};
