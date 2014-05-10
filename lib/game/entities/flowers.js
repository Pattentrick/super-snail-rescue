ig.module(
    'game.entities.flowers'
)
.requires(
    'plusplus.core.entity',
    'plusplus.core.config'
)
.defines(function () {

    var _c  = ig.CONFIG;

    /**
     * Some flowers on the meadow.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityFlowers = ig.global.EntityFlowers = ig.EntityExtended.extend({

        collides: ig.Entity.COLLIDES.NEVER,

        size: {
            x: 44,
            y: 8
        },

        zIndex: 20,

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'flowers.gif', 44, 8 ),

        animInit: 'idle',

        animSettings: {
            idle: {
                frameTime: 1,
                sequence: [0]
            }
        }

    });

});