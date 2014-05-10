ig.module(
    'game.entities.crop'
)
.requires(
    'plusplus.core.entity',
    'plusplus.core.config'
)
.defines(function () {

    var _c  = ig.CONFIG;

    /**
     * Will crop everything that leaves the level at the intro.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityCrop = ig.global.EntityCrop = ig.EntityExtended.extend({

        size: {
            x: 320,
            y: 200
        },

        highPerformance: true,

        zIndex: 100,

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'crop.gif', 320, 200 ),

        animSettings: {
            idle: {
                frameTime: 1,
                sequence: [0]
            }
        }

    });

});