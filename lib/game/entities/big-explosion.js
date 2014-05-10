ig.module(
    'game.entities.big-explosion'
)
.requires(
    'plusplus.core.entity',
    'plusplus.core.config'
)
.defines(function () {

    'use strict';

    var _c  = ig.CONFIG;

    /**
     * Represents a big explosion that will be spawned after the death of the boss.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityBigExplosion = ig.global.EntityBigExplosion = ig.EntityExtended.extend({

        size: {
            x: 32,
            y: 32
        },

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'boss-explosion.gif', 32, 32 ),

        animSettings: {
            idle: {
                frameTime: 1,
                sequence: [0]
            },
            explode: {
                frameTime: 0.15,
                sequence: [1,2,3,4]
            }
        },

        /**
         * Wheter explosion has a delay.
         *
         * @type Boolean
         *
         */
        hasDelay: true,

        /**
         * Wheter this has an active explosion, or is idle.
         *
         * @type Boolean
         *
         */
        hasActiveExplosion: false,

        /**
         * Returns a random number between min and max.
         *
         * @param {number} min The min number
         * @param {number} max The max number
         * @returns {number} A random number
         *
         */
        getRandomNumber: function(min, max){

            var diff = max - min + 1;
            var r    = Math.random()*diff;

            r = Math.floor( r );
            r = r + min;

            return r;

        },

        initProperties: function(){

            this.parent();

            // Set timer

            this.delayTimer = new ig.Timer();
            this.delay = this.getRandomNumber(1,5) / 10;

        },

        update: function(){

            this.parent();

            // If this has a delay, init explosion animation once delay is over, else immediate.

            if( this.delayTimer.delta() > this.delay && !this.hasActiveExplosion || !this.hasDelay && !this.hasActiveExplosion ){

                this.animOverride('explode',{
                    callback: function(){
                        this.kill();
                    }
                });

                this.hasActiveExplosion = true;

            }

        }

    });

});