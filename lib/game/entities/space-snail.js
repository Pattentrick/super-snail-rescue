ig.module(
    'game.entities.space-snail'
)
.requires(
    'plusplus.abstractities.character',
    'plusplus.core.config'
)
.defines(function () {

    var _c  = ig.CONFIG;
    var _ut = ig.utils;

    /**
     * A snail in space :O (spawns after the final boss is defeated)
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntitySpaceSnail = ig.global.EntitySpaceSnail = ig.Character.extend({

        performance: 'dynamic',

        size: {
            x: 29,
            y: 30
        },

        maxVelGrounded: {
            x: 0,
            y: 5
        },

        hasMovementPoints: false,

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'space-snail.gif', 29, 30 ),

        animSettings: {
            idle: {
                frameTime: 1,
                sequence: [0,1]
            }
        },

        initTypes: function() {

            this.parent();

            _ut.addType(ig.EntityExtended, this, 'checkAgainst', "PLAYER");

        },

        /**
         * Will move the enmy up and down.
         *
         * @param {Number} start The start position of the movement
         * @param {Number} end The end position of the movement
         *
         */
        moveUpAndDown: function( start, end ){

            var y = this.pos.y;

            if( y > start && !this.isMovingDown ){

                this.moveToUp();

            }
            else {

                if( y > end ){

                    this.isMovingDown = false;

                }
                else {

                    this.moveToDown();

                    this.isMovingDown = true;

                }

            }

        },

        check: function( entity ) {

            // End game load title

            if( entity ){

                // load credits

                ig.game.loadLevelDeferred( 'credits' );

            }

        },

        update: function(){

            this.parent();

            if( !this.hasMovementPoints ){

                this.startY = this.pos.y - 5;
                this.endY = this.pos.y + 5;

                this.hasMovementPoints = true;

                // Music

                ig.music.volume = 0.25;
                ig.music.play( ['lamentOfLayla'] );
                ig.music.loop = true;

            }
            else {

                this.moveUpAndDown( this.startY, this.endY );

            }

        }

    });

});