ig.module(
    'game.entities.press-c-to-continue'
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
    ig.EntityPressCToContinue = ig.global.EntityPressCToContinue = ig.EntityExtended.extend({

        size: {
            x: 8,
            y: 8
        },

        name: 'pressCToContinue',

        initProperties: function(){

            this.parent();

            // Soundeffects

            this.menu = new ig.Sound( 'media/sounds/menu.*' );
            this.menu.volume = 0.3;

        },

        update: function(){

            this.parent();

            // Continue

            if ( ig.input.pressed('shoot') ) {

                this.menu.play();

                ig.game.loadLevelDeferred( 'starfield' );

            }

        }

    });

});