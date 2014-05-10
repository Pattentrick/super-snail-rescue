ig.module(
    'game.entities.enemy-laser-socket'
)
.requires(
    'plusplus.core.config',
    'game.entities.enemy',
    'game.entities.enemy-laser-socket-beam'
)
.defines(function () {

    'use strict';

    var _c  = ig.CONFIG;
    var _ut = ig.utils;

    /**
     * Will spawn every x second a laser beam. It's a trap!
     *
     * @class
     * @extends ig.EntityEnemy
     * @memeberof ig
     */
    ig.EntityEnemyLaserSocket = ig.global.EntityEnemyLaserSocket = ig.EntityEnemy.extend({

        size: {
            x: 20,
            y: 4
        },

        health: 100,

        explodingDamage: false,

        /**
         * How often the laser beam occurs.
         *
         * @type {Number} Time in seconds.
         *
         */
        beamFrequency: 1.8,

        /**
         * How long the laser beam should be.
         *
         * @type {Number} Height in pixel.
         *
         */
        beamHeight: 100,

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'enemy-laser-socket.gif', 20, 4 ),

        animSettings: {
            idle: {
                frameTime: 1,
                sequence: [0]
            }
        },

        initProperties: function(){

            this.parent();

            this.laserTimer = new ig.Timer();

            // Sound effects

            this.laser = new ig.Sound( 'media/sounds/enemy-laser.*' );
            this.laser.volume = 0.1;

        },

        /**
         * Will spawn a laser beam after a given time.
         */
        spawnLaserBeam: function(){

            this.laser.play();

            ig.game.spawnEntity( ig.EntityEnemyLaserSocketBeam, this.getCenterX() - 3, this.getCenterY() + 2, {
                size: {
                    x: 6,
                    y: this.beamHeight
                }
            });

        },

        /**
         * Returns true if the player is near the socket.
         */
        isNearPlayer: function(){

            return ( this.getDifference( this.getCenterX(), ig.game.getPlayer().getCenterX() ) < 300 );

        },

        updateChanges: function(){

           var player = ig.game.getPlayer();

           this.parent();

           if( !this.isWaiting ){

               if( this.laserTimer.delta() > this.beamFrequency ){

                   if( player && this.isNearPlayer() ){

                       this.spawnLaserBeam();

                       this.laserTimer.reset();

                   }

               }

           }

        }

    });

});