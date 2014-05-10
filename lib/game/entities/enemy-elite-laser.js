ig.module(
    'game.entities.enemy-elite-laser'
)
.requires(
    'plusplus.core.config',
    'game.entities.enemy',
    'game.entities.projectile-enemy-laser'
)
.defines(function () {

    'use strict';

    var _c  = ig.CONFIG;
    var _ut = ig.utils;

    /**
     * A static elite enemy that shoots lasers. Takes more than one hit to defeat.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityEnemyEliteLaser = ig.global.EntityEnemyEliteLaser = ig.EntityEnemy.extend({

        size: {
            x: 33,
            y: 13
        },

        health: 2,

        explodingDamage: false,

        /**
         * If the upcoming shot is the first one.
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
         * How far the player can move towards the enemy before it shoots.
         */
        attackRange: 320,

        /**
         * Contains the distance to the scroller on the x axis
         *
         * @type Number
         */
        distanceToScroller: null,

        /**
         * Whether this is moving down or not. Needed for up/down movement pattern.
         *
         * @type Boolean
         */
        isMovingDown: false,

        canFlipX: false,

        maxVelGrounded: {
            x: 5,
            y: 55
        },

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'enemy-elite-laser.png', 33, 13 ),

        animSettings: {
            idle: {
                frameTime: 0.1,
                sequence: [0,1]
            },
            damaged: {
                frameTime: 0.05,
                sequence: [2]
            }
        },

        initProperties: function(){

            this.parent();

            this.shootingTimer = new ig.Timer;

            // Soundeffects

            this.laser = new ig.Sound( 'media/sounds/enemy-laser.*' );
            this.laser.volume = 0.1;

        },

        /**
         * Kill the enemy if he collides with the collision map. He is to damn fast!
         */
        handleMovementTrace: function( res ){

            if( res.collision.x || res.collision.y || res.collision.slope ){

                this.kill();

            }
            else {

                this.parent( res );

            }

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

                    ig.game.spawnEntity( ig.EntityProjectileEnemyLaser, this.pos.x - 30,  this.pos.y + 5, {
                        vel: {
                            x: -120,
                            y: 0
                        }
                    });

                    this.laser.play();

                    this.isFirstShot = false;
                    this.shootingTimer.reset();

                }

            }

        },

        /**
         * Override this for special damaged animation (flickering).
         */
        receiveDamage: function( amount, from, unblockable ){

            this.parent( amount, from, unblockable );

            this.animOverride('damaged');

        },

        /**
         * Will shift the enemy on x because it's moving up and down
         * and another call of the moveToX methods would cause a spastic
         * circular movement.
         *
         * @param {Number} difference The Difference between the enemy and the scroller
         *
         */
        updatePosOnX: function( difference ){

            var levelScroller = ig.game.getEntityByName('levelScroller');

            if( !this.distanceToScroller ){

                this.distanceToScroller = difference;

            }

            this.pos.x = this.distanceToScroller + levelScroller.pos.x;

        },

        /**
         * Will move the enmy up and down.
         *
         * @param {Number} start The start position of the movement
         * @param {Number} end The end position of the movement
         *
         */
        moveUpAndDown: function( start, end ){

            var y = this.pos.y;

            if( y > start && !this.isMovingDown ){

                this.moveToUp();

            }
            else {

                if( y > end ){

                    this.isMovingDown = false;

                }
                else {

                    this.moveToDown();

                    this.isMovingDown = true;

                }

            }

        },

        updateChanges: function(){

            var player = ig.game.getPlayer();
            var difference = this.getDifference( this.pos.x, ig.game.getEntityByName('levelScroller').pos.x );

            // If the player is near enough ...

            if( difference < 140 ){

                if( player ){

                    this.handleShootMechanic( player );

                }

                this.updatePosOnX( difference );
                this.moveUpAndDown( 30, 140 );

            }
            else if( !this.isWaiting ){

                this.moveToLeft();

            }

            this.parent();

        }

    });

});