ig.module(
    'game.entities.enemy-popcorn-ball'
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
     * Popcorn enemy that is easy to defeat. Will move to the middle of the screen and then left.
     *
     * @class
     * @extends ig.EntityEnemy
     * @memeberof ig
     */
    ig.EntityEnemyPopcornBall = ig.global.EntityEnemyPopcornBall = ig.EntityEnemy.extend({

        size: {
            x: 16,
            y: 16
        },

        performance: 'dynamic',

        highPerformance: false,

        canFlipX: false,

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'enemy-popcorn-ball.png', 16, 16 ),

        animSettings: {
            idle: {
                frameTime: 0.2,
                sequence: [0,1,2,3,4,5]
            }
        },

        maxVelGrounded: {
            x: 40,
            y: 40
        },

        /**
         * True if this enemy reachs the middle of the screen.
         *
         * @type Boolean
         */
        hasReachedDestination: false,

        /**
         * This enemy will move up/down until it reaches this point on the y axis.
         *
         * @type Number
         */
        destination: 100,

        /**
         * If set this enemy will stop moving up/down, and will left
         * once he has travelled the amount of pixels defined at this property.
         *
         * @type Number
         */
        stopAfter: 40,

        /**
         * Starting position on the y-axis of this enemy. Will be set on init.
         *
         * @type Number
         */
        startPosY: null,

        /**
         * Will move this enemy up, or down, until it reaches its destination
         * on the y axis. If that happens this enemy will move left.
         *
         */
        handleMovement: function(){

            var y = Math.ceil( this.getCenterY() );

            if( y === this.destination || this.hasReachedDestination ){

                this.moveToStop();
                this.moveToLeft();

                this.hasReachedDestination = true;

            }

            if( !this.hasReachedDestination ){

                // Move up or down

                if( y < this.destination ){

                    this.moveToDown();

                }
                else {

                    this.moveToUp();

                }

                // Stop traveling to destination if a stop point is defined and reached

                if( this.stopAfter ){

                    if( this.getDifference( y, this.startPosY ) >= this.stopAfter ){

                        this.hasReachedDestination = true;

                    }

                }


            }

        },

        die: function(){

            this.parent();

            this.hasReachedDestination = false;

        },

        updateChanges: function(){

           this.parent();

           if( !this.startPosY ){

               this.startPosY = Math.ceil( this.getCenterY() );

           }

           this.handleMovement();

        }

    });

});