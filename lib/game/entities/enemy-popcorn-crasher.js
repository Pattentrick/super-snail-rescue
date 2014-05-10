ig.module(
    'game.entities.enemy-popcorn-crasher'
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
     * Popcorn enemy that is easy to defeat. Will try to collide with the player.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityEnemyPopcornCrasher = ig.global.EntityEnemyPopcornCrasher = ig.EntityEnemy.extend({

        size: {
            x: 16,
            y: 16
        },

        canFlipX: false,

        attackDistance: 200,

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'enemy-popcorn-crasher.gif', 16, 16 ),

        animSettings: {
            idle: {
                frameTime: 0.1,
                sequence: [0,1,2,3,4,5]
            }
        },

        maxVelGrounded: {
            x: 10,
            y: 20
        },

        /**
         * True if this enemy is behind the player.
         *
         * @type Boolean
         */
        isBehindPlayer: false,

        initProperties: function(){

            this.parent();

        },

        handleMovementPattern: function(){

            var player = ig.game.getPlayer();

            if( player && !this.isBehindPlayer ){

                // This enemy is in front of the player.

                if( player.pos.x < this.pos.x ){

                    // The enemy is near enough to attack.

                    if( this.pos.x - player.pos.x < this.attackDistance  ){

                        // Move this enemy up/down until it's about on the same height as the player.

                        if( this.getDifference( player.getCenterY(), this.getCenterY() ) > 2 ){

                            // Player is below this enemy

                            if( this.getCenterY() < player.getCenterY() ){

                                this.moveToDown();

                            }
                            else {

                                // Player is above this enemy.

                                this.moveToUp();

                            }

                        }
                        else {

                            // Stop movement or the enemy will move up and down like crazy.

                            this.moveToStop();

                        }

                    }

                }
                else {

                    // The enemy is behind the player.

                    this.isBehindPlayer = true;

                }

            }
            else {

                // Stop movement pattern if there is no player or the enemy is behind the player.

                this.moveToStop();

            }

            // No matter what happens, move left.

            this.moveToLeft();

        },

        updateChanges: function(){

           this.parent();

           if( !this.isWaiting ){

               this.handleMovementPattern();

           }

        }

    });

});