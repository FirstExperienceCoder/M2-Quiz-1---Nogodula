class MenuScene extends Phaser.Scene {

    constructor() {
        super('MenuScene');
    }

    preload() 
    {
        // Title Image & Background
        this.load.image('titleText','assets/images/title_background/title.png');
        this.load.image('blackSceneBg','assets/images/background/klee.png');
        
        // Buttons Image
        this.load.image('playBtn','assets/images/buttons/play.png');
        this.load.image('creditsBtn','assets/images/buttons/credits.png');
        this.load.image('exitBtn','assets/images/buttons/exit.png');

        // HERO SPRITESHEET
        this.load.spritesheet('heroHover','assets/images/sprites/hero.png', {
            frameHeight: 48,
            frameWidth: 32
        });
    }

    create()
    {
        // Background Image of Whole Canvas w/ Image Text
        this.add.image(800, 400, 'blackSceneBg');
        this.add.image(850, 200, 'titleText').setScale(2);

        // Play Button
        const playButton = this.add.image(800,400,'playBtn').setScale(2);
        playButton.setInteractive();
        playButton.on('pointerdown', () => {this.scene.start('GameScene1');
        score = 0;
        primogemscollected = 0;
        });

        // Credits Button
        const creditsButton = this.add.image(800,600,'creditsBtn').setScale(2);
        creditsButton.setInteractive();
        creditsButton.on('pointerdown', () => {this.scene.start('CreditScene')});

        // Exit Button
        const exitGame = this.add.image(800,800,'exitBtn').setScale(2);
        exitGame.setInteractive();
        exitGame.on('pointerdown', () => {alert('SHEESSSSH! GAME END')})

        // Hero Spritesheet Hovering
        const hoverSprite = this.add.sprite(100,100, 'heroHover');
        hoverSprite.setScale(3);
        hoverSprite.setVisible(false);

        // Hero Animates
        this.anims.create({
            key: "walk",
            frameRate: 4,
            repeat: -1, 
            frames: this.anims.generateFrameNumbers("heroHover", {
                frames: [0,1,2,3]
            })
        })

        playButton.setInteractive();

        playButton.on("pointerover", ()=>{
            hoverSprite.setVisible(true);
            hoverSprite.play("walk");
            hoverSprite.x = playButton.x - playButton.width;
            hoverSprite.y = playButton.y;
        })

        playButton.on("pointerout", ()=>{
            hoverSprite.setVisible(false);
            console.log("SHEESH! PLAY SyA")
        })

        playButton.on("pointerout", ()=>{
            console.log("WELCOME TO MY GAME")
        })

        creditsButton.setInteractive();
        
        creditsButton.on("pointerover", ()=>{
            hoverSprite.setVisible(true);
            hoverSprite.play("walk");
            hoverSprite.x = creditsButton.x - creditsButton.width;
            hoverSprite.y = creditsButton.y;
        })

        creditsButton.on("pointerout", ()=>{
            hoverSprite.setVisible(false);
            console.log("CREDITS! wannabe game prog")
        })

        creditsButton.on("pointerout", ()=>{
            console.log("stalk sya!")
        })

     }

    update()
    {

    }
}

