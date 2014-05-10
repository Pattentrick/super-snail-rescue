ig.module(
    'game.entities.water-reflection'
)
.requires(
    'plusplus.core.entity',
    'plusplus.core.config'
)
.defines(function () {

    var _c  = ig.CONFIG;

    /**
     * Reflection of the water.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityWaterReflection = ig.global.EntityWaterReflection = ig.EntityExtended.extend({

        size: {
            x: 9,
            y: 1
        },

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'water-reflection.gif', 9, 1 ),

        animSettings: {
            idle: {
                frameTime: 0.1,
                sequence: [0,1,2,3,4,5,4,3,2,1,0]
            }
        },

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

            var randomNumber = this.getRandomNumber(0,3);

            switch( randomNumber ){
                case 0:
                    this.animSettings.idle.sequence = [0,1,2,3,4,5,4,3,2,1,0];
                break;
                case 1:
                    this.animSettings.idle.sequence = [5,4,3,2,1,0,1,2,3,4,5];
                break;
                case 2:
                    this.animSettings.idle.sequence = [2,3,4,5,4,3,2,1,0];
                break;
                case 3:
                    this.animSettings.idle.sequence = [0,1,2,3,2,1,0];
                break;
            }

        }

    });

});