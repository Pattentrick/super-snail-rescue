ig.module(
    'game.entities.title'
)
.requires(
    'plusplus.core.entity',
    'plusplus.core.config',
    'game.entities.press-c-to-start'
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
    ig.EntityTitle = ig.global.EntityTitle = ig.EntityExtended.extend({

        name: 'title',

        size: {
            x: 263,
            y: 91
        },

        zIndex: 10,

        alpha: 0,

        hasInvisiblePressSpaceCommand: true,

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'title.png', 263, 91 ),

        animSettings: {
            idle: {
                frameTime: 1,
                sequence: [0]
            }
        },

        update: function(){

            this.parent();

            if( this.hasInvisiblePressSpaceCommand && this.alpha === 1 ){

                this.hasInvisiblePressSpaceCommand = false;

                ig.game.spawnEntity( ig.EntityPressCToStart, 99, 137 );

            }

        }

    });

});