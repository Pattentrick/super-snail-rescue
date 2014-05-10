ig.module(
    'game.entities.enemy-boss'
)
.requires(
    'plusplus.abstractities.character',
    'plusplus.entities.destructable',
    'game.entities.big-explosion',
    'game.entities.projectile-enemy-laser',
    'game.entities.enemy-boss-body',
    'plusplus.core.config',
    'game.entities.space-snail'
)
.defines(function () {

    var _c  = ig.CONFIG;
    var _ut = ig.utils;

    /**
     * The final boss of the game.
     *
     * @class
     * @extends ig.Character
     * @memeberof ig
     */
    ig.EntityEnemyBoss = ig.global.EntityEnemyBoss = ig.Character.extend({

        performance: 'dynamic',

        health: 12,

        damage: 1,

        explodingDamage: false,

        damageDelay: 1.5,

        temporaryInvulnerabilityAlpha: 0,

        temporaryInvulnerabilityPulses: 15,

        /**
         * Position of the top stop on the y-axis (needed for the movement pattern).
         *
         * @type {Number}
         *
         */
        topStop: 40,

        /**
         * Position of the middle stop on the y-axis (needed for the movement pattern).
         *
         * @type {Number}
         *
         */
        middleStop: 100,

        /**
         * Position of the bottom stop on the y-axis (needed for the movement pattern).
         *
         * @type {Number}
         *
         */
        bottomStop: 160,

        /**
         * How often in seconds should the boss stop his movement to shoot lasers.
         *
         * @type {Number}
         *
         */
        stopFrequency: 1.5,

        /**
         * How long should the boss wait while shooting the lasers in seconds.
         *
         * @type {Number}
         *
         */
        waitTime: 0.5,

        /**
         * If the boss is stopping right know.
         *
         * @type {Boolean}
         *
         */
        hasActiveStop: false,

        /**
         * If the boss has spawned a body
         *
         * @type {Boolean}
         *
         */
        hasSpawnedBody: false,

        deathSettings: {
            spawnCountMax: 200,
            spawningEntity: ig.EntityParticleSmallExplosion,
            spawnSettings: {
                vel: {
                    x: 95,
                    y: 95
                },
                lifeDuration: 0.8,
                // fade in after spawning
                fadeAfterSpawnDuration: 0.4,
                // fade out before dieing
                fadeBeforeDeathDuration: 0.4
            }
        },

        size: {
            x: 22,
            y: 16
        },

        offset: {
            x: 0,
            y: 32
        },

        maxVelGrounded: {
            x: 0,
            y: 150
        },

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'enemy-boss.gif', 81, 80 ),

        animSettings: {
            idle: {
                frameTime: 1,
                sequence: [0]
            },
            damaged: {
                frameTime: 0.05,
                sequence: [1]
            }
        },

        initProperties: function(){

            this.parent();

            // Soundeffects

            this.explosion = new ig.Sound( 'media/sounds/explosion.*' );
            this.explosion.volume = 0.2;

            this.laser = new ig.Sound( 'media/sounds/enemy-laser.*' );
            this.laser.volume = 0.1;

            // Timer

            this.stopTimer = new ig.Timer();
            this.stopTimer.pause();

            this.waitTimer = new ig.Timer();
            this.waitTimer.pause();

        },

        initTypes: function() {

            this.parent();

            _ut.addType(ig.EntityExtended, this, 'checkAgainst', "PLAYER");
            _ut.addType(ig.EntityExtended, this, 'type', "FOE");

        },

        check: function( entity ) {

            // Kill player on collison if he is not invulnerable

            if( !entity.invulnerable && !this.invulnerable ){

                entity.receiveDamage(this.damage, this, this.damageUnblockable);

            }

        },

        /**
         * Will move the enmy up and down.
         *
         * @param {Number} start The start position of the movement
         * @param {Number} end The end position of the movement
         *
         */
        moveUpAndDown: function( start, end ){

            var y = this.getCenterY();

            if( y > start && !this.isMovingDown ){

                this.moveToUp();
                this.shipBody.moveToUp();

            }
            else {

                if( y > end ){

                    this.isMovingDown = false;

                }
                else {

                    this.moveToDown();
                    this.shipBody.moveToDown();

                    this.isMovingDown = true;

                }

            }

        },

        /**
         * Override this for special damaged animation (flickering).
         */
        receiveDamage: function( amount, from, unblockable ){

            // Don't block damage after first invulnerable state

            if( this.invulnerable ){

                this.parent( amount, from, unblockable );

            }
            else {

                this.parent( amount, from, true );

            }

            if( !this.invulnerable ){

                this.animOverride('damaged');

            }

        },

        /**
         * Creates particle explosion.
         * @param {Object} [settings] settings object for an {@link ig.EntityExplosion}.
         **/
        explode: function(settings) {

            ig.game.spawnEntity(ig.EntityExplosion, this.getCenterX() + 35, this.getCenterY(), ig.merge({
                size: {
                    x: this.size.x,
                    y: this.size.y
                }
            }, settings || this.damageSettings));

        },

        die: function(){

            this.parent();

            // Explosions

            this.explosion.play();

            // bring da roof down

            ig.game.camera.shake(2,25);

            // Center

            ig.game.spawnEntity( ig.EntityBigExplosion, this.getCenterX() -8 + 35, this.getCenterY() -8, {
                hasDelay: false
            });

            // down right

            ig.game.spawnEntity( ig.EntityBigExplosion, this.getCenterX() -2 + 35, this.getCenterY() );

            // down left

            ig.game.spawnEntity( ig.EntityBigExplosion, this.getCenterX() - 10 + 35, this.getCenterY() + 5 );

            // up left

            ig.game.spawnEntity( ig.EntityBigExplosion, this.getCenterX() -12 + 35, this.getCenterY() -25 );

            // up right

            ig.game.spawnEntity( ig.EntityBigExplosion, this.getCenterX() + 2 + 35, this.getCenterY() -15 );

            // Extra critical explosions

            ig.game.spawnEntity( ig.EntityBigExplosion, this.getCenterX() -16 + 35, this.getCenterY());
            ig.game.spawnEntity( ig.EntityBigExplosion, this.getCenterX(), this.getCenterY() -30);
            ig.game.spawnEntity( ig.EntityBigExplosion, this.getCenterX() - 14  + 35, this.getCenterY() + 35 );

            // More!

            ig.game.spawnEntity( ig.EntityBigExplosion, this.getCenterX(), this.getCenterY());
            ig.game.spawnEntity( ig.EntityBigExplosion, this.getCenterX(), this.getCenterY() + 10);
            ig.game.spawnEntity( ig.EntityBigExplosion, this.getCenterX(), this.getCenterY() - 10 );

            // Debris

            var destructable = ig.game.spawnEntity(ig.EntityDestructable, this.getCenterX() + 35, this.getCenterY(), {
                spawnCountMax: 60,
                spawnSettings: {
                    animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'enemy-debris.gif', 4, 4),
                    vel: {
                        x: 60,
                        y: 60
                    },
                    lifeDuration: 5,
                    // fade in after spawning
                    fadeAfterSpawnDuration: 0,
                    // fade out before dieing
                    fadeBeforeDeathDuration: 0.5,
                    friction: {
                        x: 0,
                        y: 0
                    }
                }
            });

            destructable.activate();

            // Remove body

            ig.game.removeEntity( this.shipBody );

            // Spawn snail

            this.spawnSnail();

            // Stop music

            ig.music.stop();

        },

        spawnSnail: function(){

            ig.game.spawnEntity( ig.EntitySpaceSnail, this.getCenterX(), this.getCenterY() );

        },

        handleMovement: function(){

            // Timer should only run once the movement started.

            this.stopTimer.unpause();

            // Stop movement after given seconds (stopFrequency).

            if( this.stopTimer.delta() >= this.stopFrequency ){

                if( !this.hasActiveStop ){

                    this.moveToStop();
                    this.shipBody.moveToStop();

                    this.hasActiveStop = true;

                }
                else {

                    // Timer should only run once the movement started.

                    this.waitTimer.unpause();

                    // If the wait time is over reset everything so the movement starts again.

                    if( this.waitTimer.delta() > this.waitTime ){

                        // Timers

                        this.stopTimer.reset();
                        this.waitTimer.reset();

                        this.waitTimer.pause();

                        // Flags

                        this.hasActiveStop = false;
                        this.hasFired = false;

                    }
                    else {

                        if( !this.hasFired ){

                            this.shootLaser();

                            this.hasFired = true;

                        }


                    }

                }

            }
            else {

                this.moveUpAndDown( this.topStop, this.bottomStop);

            }

        },

        shootLaser: function(){

            this.laser.play();

            ig.game.spawnEntity( ig.EntityProjectileEnemyLaser, this.pos.x - 10,  this.getCenterY() -25, {
                vel: {
                    x: -300,
                    y: 0
                }
            });

            ig.game.spawnEntity( ig.EntityProjectileEnemyLaser, this.pos.x - 10,  this.getCenterY() +25, {
                vel: {
                    x: -300,
                    y: 0
                }
            });

            ig.game.spawnEntity( ig.EntityProjectileEnemyLaser, this.pos.x,  this.getCenterY() - 33, {
                vel: {
                    x: -300,
                    y: 0
                }
            });

            ig.game.spawnEntity( ig.EntityProjectileEnemyLaser, this.pos.x,  this.getCenterY() + 33, {
                vel: {
                    x: -300,
                    y: 0
                }
            });

        },

        /**
         * Spawns the body of the ship.
         */
        spawnBody: function(){

            this.shipBody = ig.game.spawnEntity( ig.EntityEnemyBossBody, this.pos.x + 23, this.pos.y - 32 );

        },

        update: function(){

            this.parent();

            if( !this.hasSpawnedBody ){

                this.spawnBody();

                this.hasSpawnedBody = true;

            }

            if( !this.invulnerable ){

                this.handleMovement();

            }

        }

    });

});