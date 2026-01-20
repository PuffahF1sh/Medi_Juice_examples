/**
 * Adds confetti emitters to a scene and provides a trigger function.
 * @param {Phaser.Scene} scene - The scene to add the confetti to.
 * @param {Phaser.GameObjects.Container} container - The container to add emitters to.
 * @param {number} frameW - The width of the game frame.
 * @param {number} frameH - The height of the game frame.
 * @returns {object} An object containing the fire function and emitters.
 */
export const addConfetti = (scene, container, frameW, frameH) => {
  const halfW = frameW / 2;
  const halfH = frameH / 2;

  // --- Particle Texture Setup ---
  if (!scene.textures.exists('particleTexture')) {
    const texture = scene.textures.createCanvas('particleTexture', 10, 10);
    const context = texture.getContext();
    context.fillStyle = '#ffffff';
    const confettiSize = 8;
    context.fillRect(0, 0, confettiSize, confettiSize);
    texture.refresh();
  }

  const createEmitter = (figmaX, figmaY, angle) => {
    const x = figmaX - halfW;
    const y = figmaY - halfH;
    const cone = 20;
    const velocap = 2000;
    const speed = 800;

    const emitter = scene.add.particles(x, y, 'particleTexture', {
      speed: { min: 500, max: speed * 1.2 },
      angle: { min: angle - cone, max: angle + cone },
      lifespan: { min: 500, max: 800 },
      scaleX: {
        onUpdate: (particle, key, t) => { return Math.sin((t / 1) * Math.PI * 3); },
      },
      rotate: { min: -180, max: 180, random: true },
      tint: [0xFFFAE6, 0xCD0172, 0xFF66B9, 0x7FF9FF, 0x5C58EB, 0x00B0CB],
      emitting: false,
      gravityY: 1000,
      maxVelocityX: { start: velocap, end: 50, ease: 'Sine.easeOut' },
      maxVelocityY: { start: velocap, end: 50, ease: 'Sine.easeOut' },
    });

    if (container) {
      container.add(emitter);
    }

    return emitter;
  };

  const angle = 60;
  const emitterLeft = createEmitter(0, frameH, -angle);
  const emitterRight = createEmitter(frameW, frameH, angle - 180);

  return {
    fire: (count = 100) => {
      emitterLeft.explode(count);
      emitterRight.explode(count);
    },
    emitterLeft,
    emitterRight
  };
};
