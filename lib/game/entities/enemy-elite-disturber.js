ig.module(
    'game.entities.enemy-elite-disturber'
)
.requires(
    'plusplus.core.config',
    'game.entities.enemy',
    'game.entities.projectile-enemy-bullet'
)
.defines(function () {

    'use strict';

    var _c  = ig.CONFIG;
    var _ut = ig.utils;

    /**
     * An elite enemy that moves up and down and shoots triple bullets.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityEnemyEliteDisturber = ig.global.EntityEnemyEliteDisturber = ig.EntityEnemy.extend({

        size: {
            x: 17,
            y: 16
        },

        canFlipX: false,

        health: 1,

        explodingDamage: false,

        /**
         * Whether this is the first time that the turret fires or not.
         *
         * @type Boolean
         */
        isFirstShot: true,

        /**
         * Delay in seconds between shots.
         *
         * @type Number
         */
        shootDelay: 2,

        /**
         * How far the player can move towards the turret before it shoots.
         */
        attackRange: 200,

        /**
         * Determines the "strength" of the wave pattern.
         *
         * @type Boolean
         */
        waveStrength: 1,

        /**
         * True if the wave movement just started.
         *
         * @type Boolean
         */
        isWaveStart: true,

        maxVelGrounded: {
            x: 50,
            y: 50
        },

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'enemy-elite-disturber.gif', 17, 16 ),

        animSettings: {
            idle: {
                frameTime: 0.2,
                sequence: [0,1,2,3]
            },
            damaged: {
                frameTime: 0.05,
                sequence: [4]
            }
        },

        initProperties: function(){

            this.parent();

            this.shootingTimer = new ig.Timer();
            this.movementTimer = new ig.Timer();

        },

        /**
         * Handles all things that are related to shooting a projectile towards a player.
         *
         * @param {Object} player A reference to the player
         *
         */
        handleShootMechanic: function( player ){

            // Is the player in shooting range?

            if( this.getDifference( player.pos.x, this.pos.x ) < this.attackRange ){

                if( this.isFirstShot || this.shootingTimer.delta() > this.shootDelay ){

                    ig.game.spawnEntity( ig.EntityProjectileEnemyBullet, this.pos.x - 5,  this.pos.y + 7, {
                        vel: {
                            x: -80,
                            y: 0
                        }
                    });

                    ig.game.spawnEntity( ig.EntityProjectileEnemyBullet, this.pos.x - 5,  this.pos.y + 7, {
                        vel: {
                            x: -80,
                            y: -10
                        }
                    });

                    ig.game.spawnEntity( ig.EntityProjectileEnemyBullet, this.pos.x - 5,  this.pos.y + 7, {
                        vel: {
                            x: -80,
                            y: 10
                        }
                    });

                    this.isFirstShot = false;
                    this.shootingTimer.reset();

                }

            }

        },

        receiveDamage: function( amount, from, unblockable ){

            this.parent( amount, from, unblockable );

            this.animOverride('damaged');

        },

        updateChanges: function(){

            var player = ig.game.getPlayer();

            this.parent();

            if( !this.isWaiting ){

                this.moveToLeft();

                // Start wave movement after given time, or if this would be the start of the wave movement

                if( this.movementTimer.delta() > this.waveStrength || this.isWaveStart ){

                    if( !this.isMovingUp ){

                        this.moveToUp();

                        this.isMovingUp = true;

                    }
                    else {

                        this.moveToDown();

                        this.isMovingUp = false;

                    }

                    this.movementTimer.reset();
                    this.isWaveStart = false;

                }

                if( player ){

                    this.handleShootMechanic( player );

                }

            }

        }

    });

});