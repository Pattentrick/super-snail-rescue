ig.module(
    'game.entities.level-scroller'
)
.requires(
    'plusplus.core.entity',
    'plusplus.abstractities.character',
    'plusplus.core.config'
)
.defines(function () {

    var _c  = ig.CONFIG;

    /**
     * An entity which is used as a core game mechanic. The level scoller
     * entity moves slowly through a level. The camera follows the level
     * scroller, so the level has an autoscrolling behaviour.
     *
     * @class
     * @extends ig.Character
     * @memeberof ig
     */
    ig.EntityLevelScroller = ig.global.EntityLevelScroller = ig.Character.extend({

        name: 'levelScroller',

        performance: 'dynamic',

        size: {
            x: 8,
            y: 8
        },

        maxVelGrounded: {
            x: 50,
            y: 0
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