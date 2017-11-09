var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
});

function preload() {

    game.load.image('ground', 'assets/platform.png');
    game.load.image('block', 'assets/block.png');

    game.load.image('star', 'assets/star.png');

    game.load.image('diamond', 'assets/diamond.png');
    game.load.image('red_diamond', 'assets/diamond_red.png');


    game.load.image('green_ground', 'assets/green_platform.png');


    game.load.spritesheet('waters', 'assets/waters.png', 32, 400, 32);
    game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);

    game.load.spritesheet('baddie2', 'assets/b_olive_trim.png', 32, 29);

    game.load.spritesheet('baddie3', 'assets/k_olive.png', 40, 41); // Kalamata olive

    game.load.spritesheet('possu', 'assets/possu2.png', 32, 24);

    //game.load.spritesheet('possu', 'assets/ihleijona.png', 128, 64);

    game.load.spritesheet('avain', 'assets/avain.png', 32, 32);

    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    game.load.spritesheet('dude_naked', 'assets/dude_naked.png', 32, 48);

    game.load.spritesheet('body_burn', 'assets/body_burn.png', 32, 48);

    game.load.spritesheet('fireball_txt', 'assets/tulipallo.png', 64, 64);

    game.load.audio('coin', 'assets/coin.mp3');
    game.load.audio('monster', 'assets/monster.mp3');
    game.load.audio('fire', 'assets/fire.m4a');
    game.load.audio('music', 'assets/music.m4a');
    game.load.audio('music2', 'assets/vv.mp3');

    //game.load.spritesheet('oak', 'assets/oak.png')
    game.load.spritesheet('ufo_dot', 'assets/ufo_dot.png')

    game.load.spritesheet('missile', 'assets/missile.png')

    //game.load.spritesheet('rain', 'assets/rain.png', 17, 17);

}

var platforms;
var green_ground;
var blocks;

var player;

var extraOlive;

var cursors;
var diamonds;
var avaimet;

var diamondCounter = 0;
var stars;

var baddies;
var mustat_oliivit;

var fireballs;

// end scene 1
var ufoDots;
var missiles;

//
var baddieCounter = 0;

var props;

var baddieLeft = true;
var numberOfBaddies = 0;

var score = 0;
var scoreText;

var counter = 0;
var possuCounter = 0;

var coin;
var monster;
var step;
var fire;

var music;
var music2;

var water;
var possu;

var level = 1;

var possuOnTrue = false;
var clothesOffTimer = -1;
var noCursorTimer = -1;
var dyingFromOlive = false;

var dieTimer = -1;

var baddieId = 0;

function create() {

    water = game.add.tileSprite(0, 24 * 16, 128 * 16, 24 * 16, 'waters');

    // water = game.add.sprite(0, 0, 'waters');

    water.animations.add('waves0', [0, 1, 2, 3, 2, 1]);
    water.animations.add('waves1', [4, 5, 6, 7, 6, 5]);
    water.animations.add('waves2', [8, 9, 10, 11, 10, 9]);
    water.animations.add('waves3', [12, 13, 14, 15, 14, 13]);

    water.animations.add('waves4', [16, 17, 18, 19, 18, 17]);
    water.animations.add('waves5', [20, 21, 22, 23, 22, 21]);
    water.animations.add('waves6', [24, 25, 26, 27, 26, 25]);
    water.animations.add('waves7', [28, 29, 30, 31, 30, 29]);

    // change to animation num
    var n = 7;
    water.animations.play('waves' + n, 8, true);

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#0099FF';

    coin = game.add.audio('coin');
    monster = game.add.audio('monster');
    step = game.add.audio('step');
    fire = game.add.audio('fire');

    music = game.add.audio('music');
    music.volume = 0.9;
    music.loop = true;
    music.play();


    coin.volume = 0.1;
    monster.volume = 0.7;
    step.volume = 0.5;

    fire.allowMultiple = false;
    coin.allowMultiple = false;
    step.allowMultiple = false;

    platforms = game.add.group();
    platforms.enableBody = true;

    green_ground = game.add.group();
    green_ground.enableBody = true;

    green_groundBG = game.add.group();
    green_groundBG.enableBody = true;

    blocks = game.add.group();
    blocks.enableBody = true;


    // Build platforms.
    var ground = green_ground.create(0, game.world.height - 64, 'green_ground');

    ground.scale.setTo(2, 2);
    ground.body.immovable = true;


    ledge = green_groundBG.create(0, game.world.height - 88, 'green_ground');
    ledge.body.immovable = true;
    ledge = green_groundBG.create(game.world.width * 0.5, game.world.height - 88, 'green_ground');
    ledge.body.immovable = true;


    var ledge = platforms.create(500, 420, 'ground');
    ledge.body.immovable = true;

    var ledge2 = platforms.create(-100, 420, 'ground');
    ledge2.body.immovable = true;

    var ledge3 = platforms.create(585, 260, 'ground');
    ledge3.body.immovable = true;

    var ledge4 = platforms.create(-185, 260, 'ground');
    ledge4.body.immovable = true;

    var ledge5 = platforms.create(200, 100, 'ground');
    ledge5.body.immovable = true;





    // first init player
    player = game.add.sprite(game.world.width * 0.5 - 19, game.world.height * 0.5 - 150, 'dude');

    noCursorTimer = 100;

    player.scale.setTo(1.2, 1.2);

    game.physics.arcade.enable(player);

    player.body.bounce.y = 0.17;
    player.body.gravity.y = 350;
    player.body.collideWorldBounds = true;
    player.body.friction = 0;

    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);


    // Baddies olives group. (vihreät oliivit)
    baddies = game.add.group();
    baddies.enableBody = true;

    // Mustat oliivit (Level 2)
    mustat_oliivit = game.add.group();
    mustat_oliivit.enableBody = true;

    // Keys group
    avaimet = game.add.group();
    avaimet.enableBody = true;

    // Init fireballs
    fireballs = game.add.group();
    fireballs.enableBody = true;




    //Init the blocks
    var block = blocks.create(0, 230, 'block');
    block.body.immovable = true;

    var block2 = blocks.create(game.world.width - 32, 230, 'block');
    block2.body.immovable = true;

    var block3 = blocks.create(0, 390, 'block');
    block3.body.immovable = true;

    var block4 = blocks.create(game.world.width - 32, 390, 'block');
    block4.body.immovable = true;

    var block5 = blocks.create(game.world.width * 0.5 - 16, game.world.height - 160, 'block');
    block5.body.immovable = true;

    var block6 = blocks.create(game.world.width * 0.38 - 16, game.world.height - 365, 'block');
    block6.body.immovable = true;

    var block7 = blocks.create(game.world.width * 0.62 - 16, game.world.height - 365, 'block');
    block7.body.immovable = true;



    // cursors
    cursors = game.input.keyboard.createCursorKeys();


    diamonds = game.add.group();
    diamonds.enableBody = true;

    appearDiamonds();


    //

    props = game.add.group();

    //

    stars = game.add.group();

    stars.enableBody = true;

    scoreText = game.add.text(16, 16, 'Coins: 0', {
        fontSize: '32px',
        fill: '#000'
    });


    // Test end scene 1
    level = 4;
    setupEndMonster1()

}

function playerMovement() {

    // Initially, reset player movement.
    player.body.velocity.x = 0;

    // check if we have movement
    if (noCursorTimer > 0) {

        noCursorTimer -= 1;

        //  Meanwhile, stand still
        player.animations.stop();
        player.frame = 4;

        return;

    }

    // handle dying from green olive
    if (dyingFromOlive == true) {

        //  Stand still
        player.animations.stop();
        player.frame = 4;

        player.body.velocity.x = 0;
        player.body.velocity.y = 0;


        if (cursors.left.isDown) {

            extraOlive.frame = 3;

        } else if (cursors.right.isDown) {

            extraOlive.frame = 0;
        }

        return;
    }

    if (cursors.left.isDown) {

        //  Move to the left
        player.body.velocity.x = -180;

        player.animations.play('left');

    } else if (cursors.right.isDown) {

        //  Move to the right
        player.body.velocity.x = 180;

        player.animations.play('right');

    } else {

        //  Stand still
        player.animations.stop();

        player.frame = 4;
    }

    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down) {
        player.body.velocity.y = -300;
    }


}

var p = 0.0

var ufoDotCounter = 0
var stopAndShootCounter = 0
var willShootCounter = 0

var nextShoot = 292

var incrementer = 0.008

// End scene 1 missile shooter
function shootMissile(ufo) {

    for (var i = 0; i < 2; i++) {
        var missile = missiles.create(ufo.centerX, ufo.centerY, 'missile')
        missile.centerX = ufo.centerX
        missile.centerY = ufo.centerY

        game.physics.arcade.enable(missile);

        missile.body.allowGravity = false

        missile.body.mass = 5
        missile.body.maxVelocity.x = 720
        missile.body.maxVelocity.y = 720

        missile.body.allowGravity = false

        missile.seekTime = 170
        missile.launchTime = 50

        missile.checkWorldBounds = true;
        missile.events.onOutOfBounds.add(possuOut, this);

        if (i == 0) {
            missile.body.velocity.x = -100

        } else if (i == 1) {
            missile.body.velocity.x = 100

        }

    }

}

// End scene 1 game loop
function endMonster() {

    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(player, blocks);
    game.physics.arcade.collide(player, green_ground);
    game.physics.arcade.collide(player, ufoDots);

    game.physics.arcade.overlap(missiles, green_ground, killStar, null, this);

    game.physics.arcade.overlap(missiles, player, takeClothesOff, null, this);

    // handle missiles
    missiles.children.forEach(function(m) {

        // seek player
        m.launchTime--;
        m.seekTime--;

        if (m.launchTime == 0) {
            m.body.velocity.x = 0
        }

        if (m.seekTime > 0 && m.launchTime < 0) {

            // seek towards player.

            var ax = player.centerX - m.centerX
            var ay = player.centerY - m.centerY

            //truncate acceleration
            var l_t = Math.sqrt(ax * ax + ay * ay) / 300.0
            ax = ax / l_t
            ay = ay / l_t

            m.body.acceleration.x = ax
            m.body.acceleration.y = ay
        }

    })


    if (ufoDotCounter++ > nextShoot) {

        stopAndShootCounter++;


        if (willShootCounter++ > 50) {

            monster.play();

            ufoDots.children.forEach(function(e) {
                shootMissile(e)
                willShootCounter = 0
            })
        }

        if (stopAndShootCounter > 200) {



            incrementer *= -1
            ufoDotCounter = 0;
            stopAndShootCounter = 0;
            willShootCounter = 0;

            nextShoot = 784
        }


    } else {

        p += incrementer

    }

    var phase = 0


    // 1st phase
    ufoDots.children.forEach(function(e) {

        phase += 1.2 / ufoDots.children.length;

        e.x = Math.sin(2 * (p + phase)) * game.world.width * 0.4 + game.world.width * 0.5;
        e.y = Math.cos(3 * (p + phase)) * game.world.height * 0.4 + game.world.height * 0.4;

    })


    // handle player movement
    playerMovement()
}

// Basic levels
function levels1to3() {

    if (clothesOffTimer > 0) {

        clothesOffTimer -= 1;

    } else if (clothesOffTimer == 0) {

        putClothesOn();

        clothesOffTimer = -1;

    }

    if (dieTimer > 0) {

        dieTimer -= 1;

    } else if (dieTimer == 0) {

        cleanup();

        resetPlayer();
        dieTimer = -1;
    }

    // Increment counter for baddie timer.
    baddieCounter += 1;

    // Emit baddies and coins.
    createBaddiesAndCoins();


    // Collitions
    // baddies collitions with blocks and platforms
    game.physics.arcade.collide(baddies, platforms);
    game.physics.arcade.collide(baddies, green_ground);
    game.physics.arcade.collide(baddies, blocks, collideBlock, null, this);

    game.physics.arcade.collide(mustat_oliivit, platforms);
    game.physics.arcade.collide(mustat_oliivit, green_ground);
    game.physics.arcade.collide(mustat_oliivit, blocks, collideBlock, null, this);
    //game.physics.arcade.collide(baddies, baddies);


    // Money and diamonds
    game.physics.arcade.overlap(player, stars, collectStar, null, this);
    game.physics.arcade.overlap(player, diamonds, collectDiamond, null, this);

    game.physics.arcade.collide(stars, stars);
    game.physics.arcade.collide(stars, blocks);
    game.physics.arcade.collide(stars, platforms);
    game.physics.arcade.collide(stars, green_ground);


    // baddies get coin
    game.physics.arcade.overlap(stars, baddies, killStar, null, this);
    game.physics.arcade.overlap(stars, mustat_oliivit, killStar, null, this);

    game.physics.arcade.collide(diamonds, platforms);
    game.physics.arcade.collide(diamonds, blocks);


    // Pork collitions and apparitions
    game.physics.arcade.overlap(green_groundBG, baddies, luoPossu, null, this);
    game.physics.arcade.overlap(green_groundBG, mustat_oliivit, luoPossu, null, this);

    if (possuOnTrue) {

        game.physics.arcade.overlap(possu, baddies, checkBaddieDiePossu, null, this);
        game.physics.arcade.overlap(possu, mustat_oliivit, checkBaddieDiePossu, null, this);

        game.physics.arcade.overlap(possu, player, takeClothesOff, null, this);

    }

    game.physics.arcade.collide(possu, platforms);
    game.physics.arcade.collide(possu, green_ground);

    game.physics.arcade.collide(fireballs, platforms);

    game.physics.arcade.overlap(fireballs, player, bodyBurns, null, this);

    // Player, platforms and enemies.
    if (dyingFromOlive != true) {

        game.physics.arcade.collide(baddies, player, checkPlayerDie, null, this);
        //game.physics.arcade.collide(mustat_oliivit, player, checkPlayerDie, null, this);

        // Black olive fireball
        game.physics.arcade.collide(mustat_oliivit, player, blackOliveFireball, null, this);

    }

    // Manage fireballs

    fireballs.children.forEach(function(entry) {

        entry.timeToLive--;

        if (entry.timeToLive == 0) {
            entry.kill();
        }

    });


    // Olive collision between themselves
    game.physics.arcade.collide(baddies, baddies, checkBaddieDie, null, this);
    game.physics.arcade.collide(baddies, mustat_oliivit, checkBaddieDie, null, this);

    game.physics.arcade.collide(baddies, fireballs, killBaddie, null, this);
    game.physics.arcade.collide(mustat_oliivit, fireballs, killBaddie, null, this);

    game.physics.arcade.collide(mustat_oliivit, mustat_oliivit, blackOliveFireball, null, this);

    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(player, green_ground);
    game.physics.arcade.collide(player, blocks);

    // coins and keys
    game.physics.arcade.collide(stars, stars);
    game.physics.arcade.overlap(player, avaimet, collectKey, null, this);
    game.physics.arcade.collide(avaimet, blocks);

    // handle player movement
    playerMovement()

}

function update() {


    if (level < 4) {
        levels1to3()
    } else {
        endMonster()
    }


} // End of game loop.


// setup for end monster 1

function setupEndMonster1() {

    ufoDots = game.add.group();
    missiles = game.add.group();

    for (i = 0; i < 3; i++) {
        ufoDots.create(game.world.width * 0.5, game.world.height * 0.5, 'ufo_dot');
    }

    blocks.children.forEach(function(e) {
        e.kill()
    })

    platforms.children.forEach(function(e) {
        e.kill()
    })

    diamonds.children.forEach(function(e) {
        e.kill()
    })

    // reset to basic texture
    player.loadTexture('dude')

    music.stop()

    music2 = game.add.audio('music2');
    music2.volume = 0.9;
    music2.loop = true;

    music2.play()

}

// Utility methods:

function cleanup() {

    baddies.children.forEach(function(entry) {
        entry.kill();
    });

    mustat_oliivit.children.forEach(function(entry) {
        entry.kill();
    });

    stars.children.forEach(function(entry) {
        entry.kill();
    });

    diamonds.children.forEach(function(entry) {
        entry.kill();
    });

    avaimet.children.forEach(function(entry) {
        entry.kill();
    });

    props.children.forEach(function(entry) {
        entry.kill();
    });

    fireballs.children.forEach(function(entry) {
        entry.kill();
    });

    if (level > 3) {

        // cleanup & setup for end monster

        setupEndMonster1()

    } else {

        level = 1;
        appearDiamonds();
    }

    dyingFromOlive = false;

}

// Reset diamonds
function appearDiamonds() {

    var diamondName;

    if (level > 1) {

        diamondName = 'red_diamond';
    } else {

        diamondName = 'diamond';
    }

    var diamond = diamonds.create(game.world.width * 0.5 - 16, 50, diamondName);


    game.physics.arcade.enable(diamond);

    diamond.body.bounce.y = 0.8;
    diamond.body.gravity.y = 300;

    diamond = diamonds.create(game.world.width * 0.38 - 16, game.world.height - 400, diamondName);

    game.physics.arcade.enable(diamond);

    diamond.body.bounce.y = 0.8;
    diamond.body.gravity.y = 300;

    diamond = diamonds.create(game.world.width * 0.62 - 16, game.world.height - 400, diamondName);

    game.physics.arcade.enable(diamond);

    diamond.body.bounce.y = 0.8;
    diamond.body.gravity.y = 300;

    diamondCounter = 0;

}

function shootFireBall(enemy, dir) {

    // Don't shoot if already dying.
    if (clothesOffTimer > 0) return;

    // Reduce number of bullets emitted by olive
    if (enemy.bulletLimiter++ < 31) {
        return;
    }

    enemy.bulletLimiter = 0;

    fire.play();

    // Enemy object shoots fireball

    var fireball;

    let posX = enemy.body.x + 25 * dir;
    let posY = enemy.body.y + 5;

    if (dir < 0) {

        fireball = fireballs.create(posX, posY, 'fireball_txt');
        fireball.body.velocity.x = -250;

    } else {

        fireball = fireballs.create(posX, posY, 'fireball_txt');
        fireball.body.velocity.x = 250;

    }

    // shoot up a little
    fireball.body.velocity.y = -30;

    fireball.scale.setTo(0.65, 0.65);

    // game.physics.arcade.enable(fireball);

    fireball.body.bounce.y = 0.9;
    fireball.body.gravity.y = 35;

    fireball.checkWorldBounds = true;
    fireball.events.onOutOfBounds.add(baddieOut, this);

    fireball.animations.add('spin', [0, 1, 2, 3], 20, true);
    fireball.animations.play('spin');

    fireball.timeToLive = 190;

    // Own fireball not kill.
    fireball.baddieid = enemy.baddieid;

}


//
// If player touches the Black olive,
// is shoots a fireball.
//

function blackOliveFireball(player, olive) {

    // only shoot if player is left or right

    var direction;

    if (olive.animations.currentAnim.name == "left") {

        dir = -1;

    } else if (olive.animations.currentAnim.name == "right") {

        dir = 1;

    }

    shootFireBall(olive, dir)

}


// Create pork

function luoPossu(a, b) {

    if (possuOnTrue) return;

    possuOnTrue = true;

    possu = game.add.sprite(1, game.world.height - 150, 'possu');

    possu.animations.add('run', [0, 1], 11, true);
    possu.animations.add('run_clothes', [2, 3], 11, true);

    possu.scale.setTo(2, 2);

    game.physics.arcade.enable(possu);
    possu.body.bounce.y = 0.7;
    possu.body.gravity.y = 1600;

    possu.body.velocity.x = 280;

    possu.checkWorldBounds = true;
    possu.events.onOutOfBounds.add(possuOut, this);

    possu.animations.play('run');

}

// Create fireball

// Player dies reset

function resetPlayer() {

    player.body.x = game.world.width * 0.5 - 19;
    player.body.y = game.world.height * 0.5 - 150;

    player.loadTexture('dude')

    score = 0;
    scoreText.text = 'Coins: ' + score;

    noCursorTimer = 100;

    cleanup();

}


// Olive and player collition

function checkPlayerDie(player, olive) {

    // TODO: check the kind of olive enemy.

    var criteria1 = (player.body.touching.up);

    var playerX = player.body.x;
    var oliveX = olive.body.x;

    var difference = game.math.difference(playerX, oliveX)

    if (criteria1 && difference < 30) {

        dyingFromOlive = true;

        dieFromGreenOlive(olive);

    }
}

function dieFromGreenOlive(olive) {

    extraOlive = olive;

    extraOlive.body.x = player.body.x - 4;
    extraOlive.body.y = player.body.y - 27;

    extraOlive.body.velocity.y = 15;
    extraOlive.body.velocity.x = 0;

    extraOlive.body.immovable = true;

    extraOlive.body.bounce.y = 0;
    extraOlive.body.gravity.y = 0;

    extraOlive.scale.setTo(1.5, 1.5);

    extraOlive.animations.add('right', [0, 1], 1, true);
    extraOlive.animations.add('left', [2, 3], 1, true);

    extraOlive.animations.play('left');

    // In case user has no clothes.
    clothesOffTimer = -1;

    dieTimer = 120;

}

function takeClothesOff(possu, p) {

    player.loadTexture('dude_naked'); // player global

    if (dyingFromOlive == false) {
        clothesOffTimer = 80;
    }

    possu.animations.play('run_clothes');
    possu.body.velocity.x = 150;

}

function bodyBurns(possu, p) {

    player.loadTexture('body_burn'); // player global

    if (dyingFromOlive == false) {
        clothesOffTimer = 90;
    }

    possu.animations.play('run_clothes');

}

function putClothesOn() {

    player.loadTexture('dude');

    player.body.x = game.world.width * 0.5 - 19;
    player.body.y = game.world.height * 0.5 - 200;

    score = 0;
    scoreText.text = 'Coins: ' + score;

    noCursorTimer = 100;

    cleanup();

}


function checkBaddieDie(b1, baddie) {

    if (b1.body.touching.up) {

        b1.kill();
    }
}


function checkBaddieDiePossu(possu, baddie) {

    baddie.kill();

    //  Add and update the score
    score += 1;
    scoreText.text = 'Coins: ' + score;

    var star = stars.create(possu.body.x + 20, possu.body.y, 'star');

    star.body.gravity.y = 300;
    star.body.velocity.x = 0;
    star.body.bounce.y = 0.1;

}

function killStar(star, platform) {

    coin.play();
    star.kill();
}

function killBaddie(baddie, fireball) {

    // Own fireball doesn't kill.
    if (baddie.baddieid == fireball.baddieid) { return; }

    // Otherwise
    fireball.kill();
    baddie.kill();

}

function possuOut(possu) {

    possu.kill();
    possuOnTrue = false;

}

function baddieOut(baddie) {

    baddie.kill();
}

function collideStar(star1, star2) {

    star2.kill();
}

function collideBlock(baddie, block) {

    if (block.body.touching.right) {
        baddie.body.velocity.x = 60;
        baddie.animations.play('right');

    } else if (block.body.touching.left) {
        baddie.body.velocity.x = -60;
        baddie.animations.play('left');
    }
}

function collectDiamond(player, diamond) {

    // player has to be level with diamond to get it. (y is down).
    if (player.body.y > diamond.body.y) {
        return;
    }

    coin.play();
    diamond.kill();

    diamondCounter++;

    if (diamondCounter == 3) {

        luoAvain();

    }


    //  Add and update the score

    score += 100 * level;
    scoreText.text = 'Coins: ' + score;

}

function collectStar(player, star) {

    star.kill();
    coin.play();

    //  Add and update the score
    score += 10 * level;
    scoreText.text = 'Coins: ' + score;

}


function collectKey(player, key) {

    key.kill();

    level++;

    // put key to scoreboard.
    if (level < 4) {

        var gottenKey = props.create(game.world.width - 117 + level * 25, 15, 'avain');

        appearDiamonds();

    } else { // level 4 end monster

        console.log("End monster!")

        cleanup()

    }

}


function luoAvain() {

    var avain = avaimet.create(game.world.width * 0.5 - 15, game.world.height - 300, 'avain');

    game.physics.arcade.enable(avain);

    avain.body.gravity.y = 300;
    avain.body.velocity.x = 0;
    avain.body.bounce.y = 0.6;

    avain.animations.add('shine', [0, 1, 2, 3], 3, true);

    avain.animations.play('shine');

}

function createBaddiesAndCoins() {


    if (baddieCounter == 240) {

        baddieCounter = 0;
        numberOfBaddies += 1;

        // Create coins:

        if (baddieLeft == true) {

            baddieLeft = false;

            if (numberOfBaddies > 3) {

                var star = stars.create(5 + 12, 280, 'star');

                star.body.gravity.y = 300;
                star.body.velocity.x = 60;
                star.body.bounce.y = 0.1;

            }

        } else {

            baddieLeft = true;

            if (numberOfBaddies > 3) {

                var star = stars.create(game.world.width + 8, 280, 'star');

                star.body.gravity.y = 300;
                star.body.velocity.x = -60;

                star.body.bounce.y = 0.1;

            }
        }

        // create olives:
        var baddie;

        if (baddieLeft === true) {

            if (level == 1) {

                baddie = baddies.create(game.world.width * 0.5 - 32 + 50, -32, 'baddie');
                baddie.animations.add('right', [0, 1], 1, true);
                baddie.animations.add('left', [2, 3], 1, true);
                baddie.body.velocity.x = 60;

            } else if (level == 2) {

                baddie = mustat_oliivit.create(game.world.width * 0.5 - 32 + 50, -32, 'baddie2');
                baddie.animations.add('right', [0, 1], 6, true);
                baddie.animations.add('left', [3, 4], 6, true);
                baddie.body.velocity.x = 70;

            } else {

                baddie = mustat_oliivit.create(game.world.width * 0.5 - 32 + 50, -32, 'baddie3');
                baddie.animations.add('right', [0, 1], 6, true);
                baddie.animations.add('left', [2, 3], 6, true);
                baddie.body.velocity.x = 70;

            }

            baddie.body.bounce.y = 0.3;
            baddie.body.gravity.y = 300;

            baddie.scale.setTo(1.5, 1.5);

            baddie.animations.play('right');

        } else {

            if (level == 1) {

                baddie = baddies.create(game.world.width * 0.5 - 32 - 50, -32, 'baddie');
                baddie.animations.add('right', [0, 1], 1, true);
                baddie.animations.add('left', [2, 3], 1, true);
                baddie.body.velocity.x = -60;

            } else if (level == 2) {

                baddie = mustat_oliivit.create(game.world.width * 0.5 - 32 - 50, -32, 'baddie2');
                baddie.animations.add('right', [0, 1], 6, true);
                baddie.animations.add('left', [3, 4], 6, true);
                baddie.body.velocity.x = -80;

            } else {

                baddie = mustat_oliivit.create(game.world.width * 0.5 - 32 - 50, -32, 'baddie3');
                baddie.animations.add('right', [0, 1], 6, true);
                baddie.animations.add('left', [2, 3], 6, true);
                baddie.body.velocity.x = -80;

            }

            baddie.body.bounce.y = 0.3;
            baddie.body.gravity.y = 300;

            baddie.scale.setTo(1.5, 1.5);

            baddie.animations.play('left');

        }

        // Shoots at 31 -> 6 frames delay first shot
        baddie.bulletLimiter = 25;
        baddie.baddieid = baddieId++;

        monster.play();
        baddie.body.friction.x = 0;

        baddie.checkWorldBounds = true;
        baddie.events.onOutOfBounds.add(baddieOut, this);

    }

}