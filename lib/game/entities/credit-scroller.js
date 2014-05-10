ig.module(
    'game.entities.credit-scroller'
)
.requires(
    'plusplus.abstractities.character',
    'plusplus.core.config'
)
.defines(function () {

    var _c  = ig.CONFIG;

    /**
     * Helps with scrolling related to the credits (will be followed by the camera).
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityCreditScroller = ig.global.EntityCreditScroller = ig.Character.extend({

        name: 'creditScroller',

        performance: 'dynamic',

        size: {
            x: 8,
            y: 8
        },

        maxVelGrounded: {
            x: 50,
            y: 10
        },

        updateChanges: function(){

            this.parent();

            this.moveToDown();

        }

    });

});