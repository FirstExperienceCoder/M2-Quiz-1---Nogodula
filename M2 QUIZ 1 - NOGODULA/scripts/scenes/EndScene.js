class EndScene extends Phaser.Scene {

    constructor() {
        super('EndScene');
    }

    preload ()
    {
        // Reset Button, Return Menu Button, & Background Images
        this.load.image('resetBtn','assets/images/buttons/reset.png');
        this.load.image('homeBtn','assets/images/buttons/home.png');
        this.load.image('endSceneBg','assets/images/background/defeat.png');

        // Text Image of GAME OVER
        this.load.image('gameovertext','assets/images/title_background/gameover.png');

        // HERO SPRITESHEET
        this.load.spritesheet('exitheroHover','assets/images/sprites/hero.png', {
            frameHeight: 48,
            frameWidth: 32
        });
    }

    create ()
    {
        // Background Image of Whole Canvas
        this.add.image(800, 500, 'endSceneBg')

        this.add.image(800, 120, 'gameovertext')
        
        // Declaration Variables
        const playerScore = score;
        const playerPrimogemCollected = primogemscollected;
        
        // Score Text (just normal text w/ command result score)
        const scoreOverText = this.add.text(600,200, 'Score: ' + playerScore, {fontFamily: 'Calibre', fontSize: '42px', fill: '#FFFF00'});
        scoreOverText.setInteractive({useHandCursor: true})

        // Collected Score Text (just normal text w/ command result score)
        const collectedOverText = this.add.text(600,250, 'Primogems Collected: ' + playerPrimogemCollected, {fontFamily: 'Calibre', fontSize: '42px', fill: '#FFFF00'});
        collectedOverText.setInteractive({useHandCursor: true})

        // Reset Button (to play again direct to Game Scene)
        const resetButton = this.add.image(800,400,'resetBtn').setScale(2);
        resetButton.setInteractive();
        resetButton.on('pointerdown', () => {this.scene.start('GameScene1');
        score = 0;
        primogemscollected = 0;});

        // Return Home Menu Button (go back into MenuScene)
        const returnMainMenu = this.add.image(800,600,'homeBtn').setScale(2);
        returnMainMenu.setInteractive();
        returnMainMenu.on('pointerdown', () => {this.scene.start('MenuScene')});

         // Hero Spritesheet Hovering
         const hoverSprite = this.add.sprite(100,100, 'exitheroHover');
         hoverSprite.setScale(3);
         hoverSprite.setVisible(false);
 
        // Hero Animates
         this.anims.create({
             key: "walk",
             frameRate: 4,
             repeat: -1, 
             frames: this.anims.generateFrameNumbers("exitheroHover", {
                 frames: [0,1,2,3]
             })
         })
 
         resetButton.setInteractive();
 
         resetButton.on("pointerover", ()=>{
             hoverSprite.setVisible(true);
             hoverSprite.play("walk");
             hoverSprite.x = resetButton.x - resetButton.width;
             hoverSprite.y = resetButton.y;
         })
 
         resetButton.on("pointerout", ()=>{
             hoverSprite.setVisible(false);
             console.log("Play Again")
         })
 
         resetButton.on("pointerout", ()=>{
             console.log("Collect Primogems Again")
         })

         returnMainMenu.setInteractive();

         returnMainMenu.on("pointerover", ()=>{
            hoverSprite.setVisible(true);
            hoverSprite.play("walk");
            hoverSprite.x = returnMainMenu.x - returnMainMenu.width;
            hoverSprite.y = returnMainMenu.y;
        })

        returnMainMenu.on("pointerout", ()=>{
            hoverSprite.setVisible(false);
            console.log("WOW! BACK MENU AGAIN")
        })

        returnMainMenu.on("pointerout", ()=>{
            console.log("REPEAT THE FLOW")
        })
    }
}