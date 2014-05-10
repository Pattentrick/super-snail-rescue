ig.module(
    'game.entities.warning'
)
.requires(
    'plusplus.abstractities.character',
    'plusplus.core.config'
)
.defines(function () {

    var _c  = ig.CONFIG;

    /**
     * An iconic warning sign.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityWarning = ig.global.EntityWarning = ig.Character.extend({

        performance: 'dynamic',

        name: 'warning',

        zIndex: 10000,

        size: {
            x: 77,
            y: 16
        },

        maxVelGrounded: {
            x: 50,
            y: 0
        },

        alertFrequency: 2,

        isFirstPlay: true,

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'warning.gif', 77, 16 ),

        animSettings: {
            idle: {
                frameTime: 1,
                sequence: [0,1]
            }
        },

        initProperties: function(){

            this.parent();

            this.alertTimer = new ig.Timer();

            // Sound effects

            this.alert = new ig.Sound( 'media/sounds/alert.*' );
            this.alert.volume = 0.2;

        },

        update: function(){

            if( this.alertTimer.delta() > this.alertFrequency || this.isFirstPlay ){

                this.alert.play();

                this.alertTimer.reset();

                this.isFirstPlay = false;

            }

            this.moveToRight();

            this.parent();

        }

    });

});