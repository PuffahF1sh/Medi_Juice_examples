/**
 * Adds firework emitters around a path (e.g., a popup) and provides a start function.
 * @param {Phaser.Scene} scene - The scene to add the fireworks to.
 * @param {Phaser.GameObjects.Container} container - The container to add emitters to.
 * @param {number} width - The width of the area to cover.
 * @param {number} height - The height of the area to cover.
 * @returns {object} An object containing the start function and emitters array.
 */
export const addFireworks = (scene, container, width, height) => {
  const halfW = width / 2;
  const halfH = height / 2;

  // Define the path around the popup (Radius 10 roughly accounted for by padding)
  const p0 = new Phaser.Math.Vector2(-halfW + 5, halfH - 5);
  const p1 = new Phaser.Math.Vector2(0, -height - 50);
  const p2 = new Phaser.Math.Vector2(halfW - 5, halfH - 5);

  const curve = new Phaser.Curves.QuadraticBezier(p0, p1, p2);
  const points = curve.getSpacedPoints(100);

  const tempVec = new Phaser.Math.Vector2();
  const emittersArray = [];

  points.forEach((p, i) => {
    // Calculate emission angle (outward from edge)
    const tangent = curve.getTangent(i / points.length);
    tempVec.copy(tangent).normalizeRightHand().scale(-32).add(p);
    const angle = Phaser.Math.RadToDeg(Phaser.Math.Angle.BetweenPoints(p, tempVec));

    const texture = (i % 2 === 0) ? 'particle1' : 'particle2';

    const emitter = scene.add.particles(p.x, p.y, texture, {
      speed: { min: 20, max: 300 },
      scale: { start: 1, end: 0.1 },
      maxVelocityX: { start: 2000, end: 50, ease: 'Sine.easeOut' },
      maxVelocityY: { start: 2000, end: 50, ease: 'Sine.easeOut' },
      opacity: { values: [100, 100, 100, 0], interpolation: 'catmull', ease: 'linear' },
      rotate: { min: 0, max: 360, random: true },
      angle: angle,
      gravityY: 200,
      lifespan: 600,
      blendMode: 'screen',
      frequency: 100,
      emitting: false,
    });
    emittersArray.push(emitter);
  });

  if (container) {
    container.add(emittersArray);
  }

  return {
    start: () => {
      emittersArray.forEach(emitter => emitter.start());
    },
    emitters: emittersArray
  };
};
