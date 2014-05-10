ig.module(
    'game.entities.bee'
)
.requires(
    'plusplus.abstractities.character',
    'plusplus.core.config'
)
.defines(function () {

    var _c  = ig.CONFIG;

    /**
     * A bee that flies over the meadow.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityBee = ig.global.EntityBee = ig.Character.extend({

        performance: 'dynamic',

        size: {
            x: 10,
            y: 6
        },

        /**
         * True when a movement direction is set.
         *
         * @type Boolean
         */
        hasMovementDirection: false,

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'bee.gif', 10, 6 ),

        /**
         * In which direction should the bee fly?
         */
        movementDirection: 'right',

        animSettings: {
            idle: {
                frameTime: 0.1,
                sequence: [0,1]
            }
        },

        maxVelGrounded: {
            x: 5,
            y: 10
        },

        update: function(){

            this.parent();

            if( !this.hasMovementDirection ){

                if( this.movementDirection === 'right' ){

                    this.moveToRight();

                }
                else {

                    this.moveToLeft();

                }

                // once a direction is set, this flag will prevent future checks
                this.hasMovementDirection = true;

            }

        }

    });

});