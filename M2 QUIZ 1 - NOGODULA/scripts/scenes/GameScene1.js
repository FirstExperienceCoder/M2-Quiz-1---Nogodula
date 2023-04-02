// Sprites (Player,Collectables,Bomb)
var player;
var primogems;
var dodocos;

// Sprites (Ground Platform, Crate Box)
var platforms;
var crate;

// Cursor Controls
var cursors;

// The Text UI Variables and its settings
var score = 0;
var scoreText;
var primogemscollected = 0;
var primogemScoreText;

// Color in order: (Red, Orange, Yellow, Green, Blue, Indigo, Violet)
// Array Sets of colors (In order)
var colors = [0xff0000, 0xffa500, 0xffff00, 0x00ff00, 0x0000ff, 0x4b0082, 0xee82ee];
var currentColorIndex = 0;

class GameScene1 extends Phaser.Scene{

    constructor() {
        super('GameScene1');
    }

preload () 
{
    // The Images Set of preload files
    this.load.image('urban', 'assets/images/background/city.png');
    this.load.image('land', 'assets/images/sprites/land.png');
    this.load.image('primogem', 'assets/images/sprites/primogem32.png');
    this.load.image('dodoco', 'assets/images/sprites/dodoco64.png');
    this.load.image('box', 'assets/images/sprites/box.png');
    this.load.spritesheet('red_guy', 'assets/images/sprites/redguy.png', { frameWidth: 32, frameHeight: 48 });

    // BGM in GameScene1
    this.load.audio('buroTheme', 'assets/sounds/Buro Zombie Girl theme.mp3');

    // SFX when get hit DODOCO Bombs
    this.load.audio('deathSFX', 'assets/sounds/mario death.mp3');

    // BGM when its over
    this.load.audio('defeatSFX', 'assets/sounds/dark souls.mp3');
}

create () 
{
    // Background Image of Whole Canvas
    this.add.image(800, 400, 'urban');  

    /**MUSIC BACKGROUND CODE (lesson acquired: saved) */
    // Background Music Function
    //var ingameSND=this.sound.add('bgmusic');
    //ingameSND.loop=true;
    //ingameSND.play();

    // Platform Physics Function
    platforms = this.physics.add.staticGroup();

    // Platform Sprites and its Positions (Ground)
    platforms.create(400, 890, 'land').setScale(2).refreshBody();
    platforms.create(1200, 890, 'land').setScale(2).refreshBody();
    platforms.create(2000, 890, 'land').setScale(2).refreshBody();

    // Flying Platform Sprites and its Position (Sky)
    platforms.create(500, 720, 'land');
    platforms.create(100, 610, 'land');
    platforms.create(720, 500, 'land');
    platforms.create(1200, 600, 'land');
    platforms.create(1000, 720, 'land');
    platforms.create(1600, 460, 'land');
    platforms.create(1640, 680, 'land');

    // Box Physics Function
    crate = this.physics.add.staticGroup();

    // Box Sprites and its Position (Obstacles)
    crate.create(800, 450, 'box');
    crate.create(1200, 550, 'box');
    crate.create(30, 560, 'box');
    crate.create(1710, 410, 'box');
    crate.create(500, 670, 'box');

    // The player and its start position
    player = this.physics.add.sprite(100, 450, 'red_guy');

    // BACKGROUND MUSIC & ITS FUNCTIONS
    this.sound.add('buroTheme', { 
        loop: true,
        volume: 0.6
      }).play();
    
      this.sound.add('defeatSFX', { 
        loop : true,
        volume: 15
    });

    // Player Physics Properties
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

     // The player animations, turning, walking left and walking right.
     this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('red_guy', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'red_guy', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('red_guy', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    // Keyboard Input Events
    cursors = this.input.keyboard.createCursorKeys();

    // Primogems physics and its position to the scene w/ RANDOM spawn using Math.random
    primogems = this.physics.add.group({
        key: 'primogem',
        repeat: 0,
        setXY: { x: game.config.width * Math.random() - Math.random(80), y: Math.random() * game.config.height - 70, stepX: 40 }
    });

    primogems.children.iterate(function (child) {

        //  Gives the Primogems Bouncing settings
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    dodocos = this.physics.add.group();

    // Score Text UI (Display)
    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '40px', fill: '#F7FF00' });
    
    // Primogems Collected Text UI (Display)
    primogemScoreText= this.add.text(1150, 16, 'Primogems Collected: 0', { fontSize: '40px', fill: '#F7FF00' });
    
    // Platform Physics Collider
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(primogems, platforms);
    this.physics.add.collider(dodocos, platforms);
    
    // Box Crate Physics Collider
    this.physics.add.collider(player, crate);
    this.physics.add.collider(primogems, crate);
    this.physics.add.collider(dodocos, crate);

    //  Checks to see if the player overlaps with any of the primogems, if the player does call the collectPrimogems function
    // Physics Collider of all sprite subjects
    this.physics.add.overlap(player, primogems, collectPrimogem, playerColors, null, this);

    this.physics.add.collider(player, dodocos, hitDodoco, null, this);
}

update ()
{
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
}

}













