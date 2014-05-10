ig.module(
    'game.entities.particle-color-random'
)
.requires(
    'plusplus.entities.particle-color',
    'plusplus.core.config'
)
.defines(function() {

    "use strict";

    var _c = ig.CONFIG;

    /**
     * Randomly colored particle.
     * @class
     * @extends ig.EntityParticleColor
     * @memberof ig
     * @author Collin Hover - collinhover.com
     */
    ig.EntityParticleColorRandom = ig.global.EntityParticleColorRandom = ig.EntityParticleColor.extend( /**@lends ig.EntityParticleColorRandom.prototype */ {

        // Just spawn particels in one direction
        randomDoubleVel: false,

        zIndex: 5,

        size: {
            x: 1,
            y: 1
        },

        animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'particles.png', 1, 1),

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

        /**
         * @override
         **/
        reset: function(x, y, settings) {

            // random color between green and purple ... not sure how animTileOffset works :O
            this.animTileOffset = this.getRandomNumber(32,64);

            this.parent(x, y, settings);

            // resort for proper zIndex
            ig.game.sortEntities('entities');

        }

    });

});