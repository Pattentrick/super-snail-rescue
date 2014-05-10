ig.module(
    'game.entities.hearts'
)
.requires(
    'plusplus.core.entity',
    'plusplus.core.config'
)
.defines(function () {

    var _c  = ig.CONFIG;

    /**
     * The floating hearts above the panda and the snail.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityHearts = ig.global.EntityHearts = ig.EntityExtended.extend({

        size: {
            x: 13,
            y: 18
        },

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'hearts.gif', 13, 18 ),

        animInit: 'romantic',

        animSettings: {
            romantic: {
                frameTime: 1,
                sequence: [3,0,1,2]
            }
        },

        initProperties: function(){

            this.parent();

            this.heartBleep = new ig.Sound( 'media/sounds/hearts.*' );
            this.heartBleep.volume = 0.2;

            this.bleepTimer = new ig.Timer();

        },

        update: function(){

            this.parent();

            if( this.bleepTimer.delta() > 1 ){

                this.heartBleep.play();

                this.bleepTimer.reset();

            }

        }

    });

});