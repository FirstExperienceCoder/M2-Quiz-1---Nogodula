var config = {
    type: Phaser.AUTO,
    width: 1740,
    height: 910,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    // To load the scenes
    scene: [MenuScene,GameScene1,CreditScene,EndScene],
    render: {
        pixelArt: true
    }
};

var game = new Phaser.Game(config);

function collectPrimogem (player, primogem)
{
    primogem.disableBody(true, true);

    score += 10;

    primogemscollected += 1;

    // Result Scores 
    scoreText.setText('Score: ' + score);
    primogemScoreText.setText('Primogems Collected: ' + primogemscollected);

    if (primogemscollected % 5 === 0) {
        player.setScale(player.scaleX + 0.1, player.scaleY + 0.1);
    }
    if (primogems.countActive(true) === 0)
    {
        primogems.children.iterate(function (child) {
            child.enableBody(true, Math.random() * game.config.width - 10, 0, true, true);
        });

        var x = (player.x < 800) ? Phaser.Math.Between(800, 1000) : Phaser.Math.Between(1000, 800);
        var dodoco = dodocos.create(x, 16, 'dodoco');
        
        // Bounce, Gravity, Collider physics
        dodoco.setBounce(1);
        dodoco.setCollideWorldBounds(true);
        dodoco.setVelocity(Phaser.Math.Between(-200, 200), 20);
        dodoco.allowGravity = false;
    }
}

// Dodoco Bomb collide & Music,SFX Commands 
function hitDodoco (player, dodocos){
    this.physics.pause();
    this.sound.stopByKey('buroTheme');
    this.sound.play('deathSFX');
    player.disableBody(true,true);
    this.sound.play('defeatSFX');
    this.scene.start('EndScene',score, primogemscollected);
    }

// Color Index 
function playerColors(){
      player.setTint(colors[currentColorIndex]);
      currentColorIndex = (currentColorIndex + 1) % colors.length;
}

