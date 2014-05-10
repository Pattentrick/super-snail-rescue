ig.module(
    'game.entities.clouds'
)
.requires(
    'plusplus.core.entity',
    'plusplus.abstractities.character',
    'plusplus.core.config'
)
.defines(function () {

    var _c  = ig.CONFIG;

    /**
     * Clouds that are moving slowly in the background.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityClouds = ig.global.EntityClouds = ig.Character.extend({

        performance: 'dynamic',

        size: {
            x: 266,
            y: 60
        },

        zIndex: 10,

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'clouds.gif', 266, 60 ),

        animSettings: {
            idle: {
                frameTime: 1,
                sequence: [0]
            }
        },

        maxVelGrounded: {
            x: 1,
            y: 10
        },

        update: function(){

            this.parent();

            this.moveToRight();

        }

    });

});