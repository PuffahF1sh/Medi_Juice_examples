/**
 * Adds explosion emitters to a scene and provides a trigger function.
 * @param {Phaser.Scene} scene - The scene to add the explosion to.
 * @param {Phaser.GameObjects.Container} container - The container to add emitters to.
 * @returns {object} An object containing the fire function and emitters.
 */
export const addExplosion = (scene, container) => {
  const particleConfig = {
    lifespan: 500,
    speed: { min: 150, max: 250 },
    scale: { start: 0.8, end: 0 },
    gravityY: 0,
    blendMode: 'normal',
    emitting: false,
    maxVelocityX: { start: 1000, end: 50, ease: 'Sine.easeOut' },
    maxVelocityY: { start: 1000, end: 50, ease: 'Sine.easeOut' },
  };

  const emitter1 = scene.add.particles(0, 0, 'particle1', particleConfig);
  const emitter2 = scene.add.particles(0, 0, 'particle2', particleConfig);

  if (container) {
    container.add([emitter1, emitter2]);
  }

  return {
    fire: (count = 8) => {
      emitter1.explode(count);
      emitter2.explode(count);
    },
    emitter1,
    emitter2
  };
};
