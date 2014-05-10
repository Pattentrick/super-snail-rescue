ig.module(
    'game.entities.particle-big-explosion'
)
.requires(
    'plusplus.core.config',
    'plusplus.abstractities.particle-fast'
)
    .defines(function() {

        "use strict";

        var _c = ig.CONFIG;

        /**
         * Particle that will spawn on enemy death.
         *
         */
        ig.EntityParticleBigExplosion = ig.global.EntityParticleBigExplosion = ig.ParticleFast.extend( /**@lends ig.EntityParticleColor.prototype */ {

            size: {
                x: 2,
                y: 2
            },

            animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'particle-enemy-big-explosion.gif', 2, 2),

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

            reset: function(x, y, settings) {

                this.parent(x, y, settings);

                this.addAnim("move", {
                    sequence: [this.getRandomNumber(0,5)],
                    frameTime: 1,
                    stop: true
                });

            }

        });


    });
