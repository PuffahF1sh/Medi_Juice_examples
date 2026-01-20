
export default class WarningPopup extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.scene = scene;

    // Design Constants
    const COLORS = {
      bg: 0xe5ebff,
      border: 0x11044e,
      text: 0x11044e,
      buttonBg: 0x5c58eb,
      buttonShadow: 0x3e27be,
      buttonText: 0xe5ebff
    };

    const SIZES = {
      width: 560,
      height: 175,
      radius: 10,
      borderWidth: 2
    };

    const halfW = SIZES.width / 2;
    const halfH = SIZES.height / 2;

    // --- Main Container Background ---
    // Shadow (simulated with offset rect)
    const shadowOffset = 4;
    const shadow = scene.add.graphics();
    shadow.fillStyle(COLORS.border, 1);
    shadow.fillRoundedRect(-halfW, -halfH + shadowOffset, SIZES.width, SIZES.height, SIZES.radius);
    this.add(shadow);

    // Main Box
    const bg = scene.add.graphics();
    bg.fillStyle(COLORS.bg, 1);
    bg.lineStyle(SIZES.borderWidth, COLORS.border, 1);
    bg.fillRoundedRect(-halfW, -halfH, SIZES.width, SIZES.height, SIZES.radius);
    bg.strokeRoundedRect(-halfW, -halfH, SIZES.width, SIZES.height, SIZES.radius);
    this.add(bg);

    // --- Content Container (for centering) ---
    // Using a vertical offset to simulate flex gap
    let currentY = -halfH + 24; // Top padding

    // Text 1: Mission Complete
    const titleText = scene.add.text(0, currentY, "Mission Complete!", {
      fontFamily: '"Gluten", sans-serif',
      fontSize: '20px',
      color: '#11044e',
      fontStyle: '600' // SemiBold
    }).setOrigin(0.5, 0);
    this.add(titleText);

    currentY += titleText.height + 4; // Gap 4px

    // Text 2: Body Copy
    const bodyText = scene.add.text(0, currentY, "", {
      fontFamily: '"Space Grotesk", sans-serif',
      fontSize: '14px',
      color: '#11044e',
      align: 'center'
    }).setOrigin(0.5, 0);

    // Rich text formatting simulation
    bodyText.setText([
      "You’ve cared for 2 creatures and earned enough fuel.",
      "Onto the next planet!"
    ]);

    this.add(bodyText);

    currentY += bodyText.height + 12; // Gap/Margin bottom 12px

    // --- Button: To the Cockpit ---
    const buttonWidth = 220;
    const buttonHeight = 50;
    const buttonX = 0;
    const buttonY = currentY + buttonHeight / 2;

    const buttonContainer = scene.add.container(buttonX, buttonY);
    this.add(buttonContainer);

    // Button Shadow
    const btnBg = scene.add.graphics();
    btnBg.fillStyle(COLORS.buttonBg, 1);
    btnBg.lineStyle(2, COLORS.border, 1);
    btnBg.fillRoundedRect(-buttonWidth / 2, -buttonHeight / 2, buttonWidth, buttonHeight, 10);
    btnBg.strokeRoundedRect(-buttonWidth / 2, -buttonHeight / 2, buttonWidth, buttonHeight, 10);
    buttonContainer.add(btnBg);

    const btnText = scene.add.text(0, 0, "To the Cockpit!", {
      fontFamily: '"Gluten", sans-serif',
      fontSize: '22px',
      color: '#e5ebff',
      fontStyle: 'bold'
    }).setOrigin(0.5, 0.5);
    buttonContainer.add(btnText);

    // Interactivity
    const hitArea = new Phaser.Geom.Rectangle(-buttonWidth / 2, -buttonHeight / 2, buttonWidth, buttonHeight);
    buttonContainer.setInteractive(hitArea, Phaser.Geom.Rectangle.Contains);

    buttonContainer.on('pointerover', () => {
      scene.input.setDefaultCursor('pointer');
    });

    buttonContainer.on('pointerout', () => {
      scene.input.setDefaultCursor('default');
    });

    buttonContainer.on('pointerdown', () => {
      console.log("To the Cockpit clicked!");
      this.scene.scene.start('ButtonPulse');
    });

    this.setSize(SIZES.width, SIZES.height);
    this.setPosition(x, y);
  }
}
