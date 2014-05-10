ig.module(
    'game.entities.enemy-popcorn-fodder'
)
.requires(
    'plusplus.core.config',
    'game.entities.enemy',
    'game.entities.projectile-spinner-bullet'
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
    ig.EntityEnemyPopcornFodder = ig.global.EntityEnemyPopcornFodder = ig.EntityEnemy.extend({

        size: {
            x: 20,
            y: 14
        },

        canFlipX: false,

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'enemy-popcorn-fodder.gif', 20, 14 ),

        animSettings: {
            idle: {
                frameTime: 0.1,
                sequence: [0,1,2,3]
            }
        },

        /**
         * True if the wave movement just started.
         *
         * @type Boolean
         */
        isWaveStart: true,

        /**
         * On which distance to the player should this enemy start attacking.
         */
        attackRange: 120,

        /**
         * How many shots can this enemy fire?
         *
         * @type Number
         *
         */
        ammuniton: 1,

        initProperties: function(){

            this.parent();

            this.movementTimer = new ig.Timer();

        },

        maxVelGrounded: {
            x: 20,
            y: 10
        },

        /**
         * Checks if the player is near by and calls the shoot method if so.
         */
        handleShooting: function(){

            if( ig.game.getPlayer() ){

                if( this.pos.x - ig.game.getPlayer().pos.x < this.attackRange ){

                    // Enough ammunition?

                    if( this.ammuniton > 0 ){

                        // Shoot!

                        this.shoot();

                        this.ammuniton -= 1;

                    }

                }

            }

        },

        /**
         * Spawns a projectile which flies very
         * roughly in the direction of the player.
         */
        shoot: function(){

            var player  = ig.game.getPlayer();
            var diffOnY = this.getDifference( player.pos.y, this.pos.y );

            if( diffOnY < 15 ){

                this.shootingDirection = 'left'

            }
            else {

                if( player.pos.y < this.pos.y - 20 ){

                    this.shootingDirection = 'upLeft';

                }
                else {

                    this.shootingDirection = 'downLeft';

                }

            }

            ig.game.spawnEntity(ig.EntityProjectileSpinnerBullet, this.getCenterX(), this.getCenterY(), {
                movementDirection: this.shootingDirection
            });

        },

        updateChanges: function(){

           this.parent();

           if( !this.isWaiting ){

               this.moveToLeft();

               // Start wave movement after given time, or if this would be the start of the wave movement

               if( this.movementTimer.delta() > 0.7 || this.isWaveStart ){

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

               // Shooting

               this.handleShooting();

           }

        }

    });

});