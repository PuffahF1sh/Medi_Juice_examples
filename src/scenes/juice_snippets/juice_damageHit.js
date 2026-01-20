/**
 * Applies a shake and flash effect to the given targets.
 * @param {Phaser.Scene} scene - The scene containing the phaserJuice plugin.
 * @param {Phaser.GameObjects.GameObject|Phaser.GameObjects.GameObject[]} targets - The target(s) to apply effects to.
 */
export const applyDamageHitEffect = (scene, targets) => {
  if (!scene.juice) {
    console.warn('phaserJuice plugin not found on scene');
    return;
  }

  const targetList = Array.isArray(targets) ? targets : [targets];

  targetList.forEach(target => {
    scene.juice.add(target).shake().flash();
  });
};
