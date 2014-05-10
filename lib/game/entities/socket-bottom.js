ig.module(
    'game.entities.socket-bottom'
)
.requires(
    'plusplus.core.entity',
    'plusplus.core.config'
)
.defines(function () {

    var _c  = ig.CONFIG;

    /**
     * Bottom of the enemy laser socket.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntitySocketBottom = ig.global.EntitySocketBottom = ig.EntityExtended.extend({

        size: {
            x: 20,
            y: 4
        },

        flip: {
            x: false,
            y: true
        },

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'enemy-laser-socket.gif', 20, 4 ),

        animSettings: {
            idle: {
                frameTime: 1,
                sequence: [0]
            }
        }

    });

});