ig.module(
        'game.entities.thought-bubble'
    )
.requires(
    'plusplus.core.entity',
    'plusplus.core.config'
)
.defines(function () {

    var _c  = ig.CONFIG;

    /**
     *
     * A thought bubble which shows the thoughts of the panda.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityThoughtBubble = ig.global.EntityThoughtBubble = ig.EntityExtended.extend({

        size: {
            x: 78,
            y: 38
        },

        zIndex: 50,

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'thought-bubble.png', 78, 38 ),

        animSettings: {
            idle: {
                frameTime: 0.8,
                sequence: [0,1,2,3],
                once: true
            }
        }

    });

});