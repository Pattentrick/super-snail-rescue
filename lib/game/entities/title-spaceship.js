ig.module(
    'game.entities.title-spaceship'
)
.requires(
    'plusplus.core.entity',
    'plusplus.abstractities.character',
    'plusplus.core.config'
)
.defines(function () {

    var _c  = ig.CONFIG;

    /**
     * A spaceships that flies at the title screen.
     * Responsible for the title fade in, after it
     * collides with a trigger.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityTitleSpaceship = ig.global.EntityTitleSpaceship = ig.Character.extend({

        performance: 'dynamic',

        size: {
            x: 32,
            y: 16
        },

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'player.png', 32, 16 ),

        animSettings: {
            idle: {
                frameTime: 0.3,
                sequence: [0,1]
            }
        },

        maxVelGrounded: {
            x: 150,
            y: 20
        },


        /**
         * Moves the spacship to the upper right corner.
         */
        updateChanges: function(){

            this.parent();

            this.moveToUp();
            this.moveToRight();

        },

        /**
         *
         * Fades in title enity
         *
         */
        activate: function(){

            var title = ig.game.getEntityByName('title');

            title.fadeTo( 1, {
                name: 'fade',
                duration: 1500
            });

        }

    });

});