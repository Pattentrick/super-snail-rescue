ig.module(
    'game.entities.enemy-turret'
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
     * A static turret that can't move. Will shoot at the player if he is in range.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityEnemyTurret = ig.global.EntityEnemyTurret = ig.EntityEnemy.extend({

        size: {
            x: 12,
            y: 14
        },

        /**
         * Whether the turret is placed upside down at the ceiling.
         *
         * ATTENTION: This is not a boolean because Weltmeister saves values as strings!
         *
         * Possible Values:
         *
         * - 'yes'
         * - 'no'
         *
         * @type String
         */
        isUpsideDown: 'no',

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
        shootDelay: 1.5,

        /**
         * How far the player can move towards the turret before it shoots.
         */
        attackRange: 180,

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'enemy-turret.gif', 12, 14 ),

        animSettings: {
            idle: {
                frameTime: 1,
                sequence: [0]
            },
            aimAbove: {
                frameTime: 1,
                sequence: [1]
            }
        },

        initProperties: function(){

            this.parent();

            this.shootingTimer = new ig.Timer;

        },

        /**
         * Gets the context of the position between the player and the turret.
         *
         * Possible values are:
         *
         * - front
         * - above
         * - behind
         *
         * @param {Object} player A reference to the player
         * @returns {String} The name of the position context.
         *
         */
        getPositionContext: function( player ){

            var playerX = player.pos.x;
            var turretX = this.pos.x;

            if( playerX < turretX - 40 ){

                return 'front';

            }
            else if( playerX - 10 > turretX ){

                return 'behind';

            }
            else {

                return 'above';

            }

        },

        /**
         * Will override the current animation/flip depending on the position context.
         *
         * @param {Object} player A reference to the player
         *
         */
        handleAnimationOverride: function( player ){

            switch( this.getPositionContext( player ) ){
                case 'front':

                    this.animOverride('idle', {
                        lock: true
                    });

                    // Flip back to normal

                    this.flip.x = false;

                break;
                case 'behind':

                    this.animOverride('idle', {
                        lock: true
                    });

                    // Flip to look in the direction of the player

                    this.flip.x = true;

                break;
                case 'above':

                    this.animOverride('aimAbove', {
                        lock: true
                    });

                break;
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

                    switch( this.getPositionContext( player ) ){
                        case 'front':
                            ig.game.spawnEntity( ig.EntityProjectileEnemyBullet, this.pos.x - 5, this.isUpsideDown === 'yes' ? this.pos.y + 11 : this.pos.y - 4, {
                                vel: {
                                    x: -40,
                                    y: this.isUpsideDown === 'yes' ? 40 : -40
                                }
                            });
                        break;
                        case 'behind':
                            ig.game.spawnEntity( ig.EntityProjectileEnemyBullet, this.pos.x + 11, this.isUpsideDown  === 'yes' ? this.pos.y + 11 : this.pos.y - 4, {
                                vel: {
                                    x: 40,
                                    y: this.isUpsideDown === 'yes' ? 40 : -40
                                }
                            });
                        break;
                        case 'above':
                            ig.game.spawnEntity( ig.EntityProjectileEnemyBullet, this.pos.x + 3, this.isUpsideDown === 'yes' ? this.pos.y + 14 : this.pos.y - 4, {
                                vel: {
                                    x: 0,
                                    y: this.isUpsideDown === 'yes' ? 40 : -40
                                }
                            });
                        break;
                    }

                    this.isFirstShot = false;
                    this.shootingTimer.reset();

                }

            }

        },

        updateChanges: function(){

            var player = ig.game.getPlayer();

            this.parent();

            if( player ){

                this.handleAnimationOverride( player );
                this.handleShootMechanic( player );

            }

            // Enable upside down mode

            if( this.isUpsideDown === 'yes' ){

                this.flip.y = true;

            }

        }

    });

});