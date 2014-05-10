ig.module(
    'game.entities.extra-live-icon'
)
.requires(
    'plusplus.abstractities.character',
    'plusplus.core.config'
)
.defines(function () {

    var _c  = ig.CONFIG;

    /**
     * An icon that is a mini pixel ship which represents
     * how many extra lives the player has left.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityExtraLiveIcon = ig.global.EntityExtraLiveIcon = ig.Character.extend({

        performance: 'dynamic',

        highPerformance: true,

        size: {
            x: 16,
            y: 8
        },

        maxVelGrounded: {
            x: 50,
            y: 0
        },

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'extra-live.gif', 16, 8 ),

        animSettings: {
            idle: {
                frameTime: 1,
                sequence: [0]
            }
        },

        /**
         *  This completely ignores the trace result (res)
         *  and always moves the entity according to its velocity
         */
        handleMovementTrace: function( res ) {

            this.pos.x += this.vel.x * ig.system.tick;
            this.pos.y += this.vel.y * ig.system.tick;

        },

        updateChanges: function(){

            this.parent();

            if( ig.game.hasScrollingEnabled ){

                this.moveToRight();

            }
            else {

                this.moveToStop();

            }

        }

    });

});