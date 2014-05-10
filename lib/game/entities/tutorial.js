ig.module(
    'game.entities.tutorial'
)
.requires(
    'plusplus.core.entity',
    'plusplus.core.config'
)
.defines(function () {

    var _c  = ig.CONFIG;

    /**
     * Shows the basic movement to the player.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityTutorial = ig.global.EntityTutorial = ig.EntityExtended.extend({

        size: {
            x: 104,
            y: 40
        },

        highPerformance: true,

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'tutorial.gif', 104, 40 ),

        animSettings: {
            idle: {
                frameTime: 1,
                sequence: [0]
            }
        },

        update: function(){

            this.parent();

            // Remove this entity once the player has passed it

            if( ig.game.getPlayer() ){

                if( ig.game.getPlayer().pos.x - this.pos.x > 275 ){

                    this.kill()

                }

            }

        }

    });

});