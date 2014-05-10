ig.module(
    'game.entities.enemy-popcorn-spinner'
)
.requires(
    'plusplus.core.config',
    'game.entities.enemy',
    'game.entities.projectile-spinner-bullet'
)
.defines(function () {

    'use strict';

    var _c  = ig.CONFIG;

    /**
     * Popcorn enemy that is easy to defeat. Will fly through the
     * level and spawn a projectile if it's near enough to the player.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityEnemyPopcornSpinner = ig.global.EntityEnemyPopcornSpinner = ig.EntityEnemy.extend({

        size: {
            x: 17,
            y: 16
        },

        /**
         * In which direction should the projectile fly?
         *
         * Possible Values:
         *
         * - up
         * - upLeft
         * - left
         * - downLeft
         * - down
         *
         * @type String
         *
         */
        shootingDirection: 'downLeft',

        /**
         * In which way should the enemy fly?
         *
         * Possible Values:
         *
         * - wave ( moves in a wave pattern )
         * - straight ( moves in a straight line )
         *
         * @type String
         *
         */
        movement: 'straight',

        /**
         * Is this enemy moving up at the moment?
         *
         * @type Boolean
         */
        isMovingUp: false,

        /**
         * How many shots can this enemy fire?
         *
         * @type Number
         *
         */
        ammuniton: 1,

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
            x: 20,
            y: 100
        },

        /**
         * On which distance to the player should this enemy start attacking.
         */
        attackRange: 120,

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'enemy-popcorn-spinner.gif', 17, 16 ),

        animSettings: {
            idle: {
                frameTime: 0.1,
                sequence: [0,1,2,3]
            }
        },

        initProperties: function(){

            this.parent();

            this.movementTimer = new ig.Timer();

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

        updateChanges: function(){

            this.parent();

            // Movement

            if( !this.isWaiting ){

                this.moveToLeft();

                if( this.movement === 'wave' ){

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

                }

                // Shooting

                this.handleShooting();

            }

        }

    });

});