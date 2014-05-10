ig.module(
    'game.entities.snail-sitting'
)
.requires(
    'plusplus.core.entity',
    'plusplus.abstractities.character',
    'plusplus.core.config'
)
.defines(function () {

    var _c  = ig.CONFIG;

    /**
     * The sitting snail, which is
     * featured in the first intro scene.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntitySnailSitting = ig.global.EntitySnailSitting = ig.Character.extend({

        size: {
            x: 26,
            y: 18
        },

        performance: 'dynamic',

        zIndex: 20,

        isBeeingAbducted: false,

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'snail-sitting.gif', 26, 18 ),

        animInit: 'happy',

        maxVelGrounded: {
            x: 15,
            y: 20
        },

        animSettings: {
            happy: {
                frameTime: 1,
                sequence: [0]
            },
            sad: {
                frameTime: 1,
                sequence: [1]
            }
        },

        animAutomatic: false,

        /**
         * Changes the snail animation based
         * on the isBeeingAbducted flag
         */
        setSadFaceAnimation: function(){

            this.isBeeingAbducted = true;

        },

        update: function(){

            this.parent();

            if( this.isBeeingAbducted ){

                this.animOverride('sad');

            }

        }

    });

});