ig.module(
    'game.entities.press-c-to-start'
)
.requires(
    'plusplus.core.entity',
    'plusplus.core.config'
)
.defines(function () {

    var _c  = ig.CONFIG;

    /**
     * The title at the title screen of Super Snail Rescue
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityPressCToStart = ig.global.EntityPressCToStart = ig.EntityExtended.extend({

        size: {
            x: 109,
            y: 9
        },

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'press-c-to-start.gif', 109, 9 ),

        animSettings: {
            idle: {
                frameTime: 0.8,
                sequence: [0,1]
            }
        }

    });

});