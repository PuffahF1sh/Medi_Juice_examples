class Example extends Phaser.Scene
{
    create ()
    {
        const texture = this.textures.createCanvas('particleTexture', 10, 10);
        const context = texture.getContext();
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, 10, 10);
        texture.refresh();
        

        this.add.particles(0, 0, 'particleTexture', {
            emitZone: { type: 'random', quantity:1, source: new Phaser.Geom.Rectangle(0, -50, 800, 1) },
            speedY: { min: 200, max: 300 },
            speedX: { min: -100, max: 100 },
            accelerationY: { min: 50, max: 100 },
            lifespan: { min: 2000, max: 3000 },
            scaleX: {
                onUpdate: (particle, key, t) => {
                // console.log('particle', particle, key, t);
                return Math.sin((t / 1) * Math.PI * 10);
                },
            },
            blendMode: 'ADD',
            rotate: { min: -180, max: 180 }, 
            frequency: 50,
            quantity: 2,
            tint: [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff],
            blendMode: 'ADD',
        });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#313e3e',
    parent: 'phaser-example',
    scene: Example
};

const game = new Phaser.Game(config);

//-----------------

const emitter = this.add.particles(100, 300, 'flares', {
  frame: 'red',
  angle: { min: -30, max: 30 },
  speed: 150
});

//-----------------

const pane = new Pane();

const f1 = pane.addFolder({
  title: 'Basic',
});
f1.addBinding(PARAMS, 'speed');

const f2 = pane.addFolder({
  title: 'Advanced',
  expanded: false,   // optional
});
f2.addBinding(PARAMS, 'acceleration');
f2.addBinding(PARAMS, 'randomness');