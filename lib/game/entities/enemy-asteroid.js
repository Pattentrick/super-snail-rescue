ig.module(
    'game.entities.enemy-asteroid'
)
.requires(
    'plusplus.core.config',
    'game.entities.enemy'
)
.defines(function () {

    'use strict';

    var _c  = ig.CONFIG;
    var _ut = ig.utils;

    /**
     * Asteroid that kills the player on collison.
     *
     * @class
     * @extends ig.EntityEnemy
     * @memeberof ig
     */
    ig.EntityEnemyAsteroid = ig.global.EntityEnemyAsteroid = ig.EntityEnemy.extend({

        name: 'asteroid',

        size: {
            x: 14,
            y: 14
        },

        health: 1,

        explodingDamage: false,

        canFlipX: false,

        /**
         * False if the animation sequence is not set.
         *
         * @type {Boolean}
         *
         */
        hasRandomAnimationSequence: false,

        /**
         * False if the movement pattern is not set.
         *
         * @type {Boolean}
         *
         */
        hasMovementPattern: false,

        /**
         * Contains an indicator of the movement pattern.
         *
         * Possible values:
         *
         * - 0 (will move left)
         * - 1 (will move left/up)
         * - 2 (will move left/down)
         *
         * @type {Number}
         *
         */
        movementPattern: null,

        maxVelGrounded: {
            x: 10,
            y: 1
        },

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'enemy-asteroid.gif', 14, 14 ),

        animSettings: {
            idle1: {
                frameTime: 1,
                sequence: [0]
            },
            idle2: {
                frameTime: 1,
                sequence: [1]
            },
            idle3: {
                frameTime: 1,
                sequence: [2]
            }
        },

        setRandomAnimationSequence: function(){

            var r = this.getRandomNumber(1,3);

            this.animOverride( 'idle' + r , {
                lock: true
            });

            this.hasRandomAnimationSequence = true;

        },

        setMovementPattern: function(){

            this.movementPattern = this.getRandomNumber(0,2);

            this.hasMovementPattern = true;

        },

        update: function(){

            var player = ig.game.getPlayer();

            this.parent();

            if( !this.hasRandomAnimationSequence ){

                this.setRandomAnimationSequence();

            }

            if( !this.isWaiting ){

                if( !this.hasMovementPattern ){

                    this.setMovementPattern();

                    switch( this.movementPattern ){
                        case 0:
                            this.moveToLeft();
                        break;
                        case 1:
                            this.moveToLeft();
                            this.moveToUp();
                        break;
                        case 2:
                            this.moveToLeft();
                            this.moveToDown();
                        break;
                    }

                }

                if( player ){

                    if( player.pos.x - this.pos.x >= 400 ){

                        ig.game.removeEntity( this );

                    }

                }

            }

        }

    });

});