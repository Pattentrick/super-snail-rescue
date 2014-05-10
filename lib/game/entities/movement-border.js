ig.module(
    'game.entities.movement-border'
)
.requires(
    'plusplus.core.entity',
    'plusplus.abstractities.character',
    'plusplus.core.config'
)
.defines(function () {

    'use strict';

    var _c  = ig.CONFIG;
    var _ut = ig.utils;

    /**
     * Border of the player movement. If the player collides with
     * this entity, he is unable to move in that specific direction.
     *
     * This prevents the player from moving
     * his ship outside the view of the camera.
     *
     * @class
     * @extends ig.Character
     * @memeberof ig
     */
    ig.EntityMovementBorder = ig.global.EntityMovementBorder = ig.Character.extend({

        performance: 'dynamic',

        maxVelGrounded: {
            x: 50,
            y: 0
        },

        initTypes: function() {

            this.parent();

            _ut.addType(ig.EntityExtended, this, 'checkAgainst', "PLAYER");

        },

        /**
         *  Sets the corresponding player flag
         *  to true, if the player touches this
         *  border entity.
         */
        check: function( entity ) {

            switch( this.name ){
                case 'movementBorderTop':
                    entity.isTouchingBorderTop = true;
                    break;
                case 'movementBorderRight':
                    entity.isTouchingBorderRight = true;
                    break;
                case 'movementBorderBottom':
                    entity.isTouchingBorderBottom = true;
                    break;
                case 'movementBorderLeft':
                    entity.isTouchingBorderLeft = true;
                    break;
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

            if( ig.game.hasScrollingEnabled ){

                this.moveToRight();

            }
            else {

                this.moveToStop();

            }

            this.parent();

        }

    });

});