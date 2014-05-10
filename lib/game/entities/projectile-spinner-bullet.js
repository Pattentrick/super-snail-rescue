ig.module(
    'game.entities.projectile-spinner-bullet'
)
.requires(
    'game.entities.projectile-enemy-bullet'
)
.defines(function () {

    'use strict';

    var _c  = ig.CONFIG;
    var _ut = ig.utils;

    /**
     * Basic projectile that is used by the spinner.
     */
    ig.EntityProjectileSpinnerBullet = ig.global.EntityProjectileSpinnerBullet = ig.EntityProjectileEnemyBullet.extend({

        /**
         * In which direction should the projectile fly?
         *
         * Possible Values:
         *
         * - up
         * - upLeft
         * - left
         * - downLeft
         * - down
         *
         * @type String
         *
         */
        movementDirection: 'left',

        isFired: false,

        update: function(){

            this.parent();

            if( !this.isFired ){

                switch( this.movementDirection ){
                    case 'up':

                        this.vel = {
                            x: 0,
                            y: -20
                        };

                    break;
                    case 'upRight':
                    break;
                    case 'right':
                    break;
                    case 'downRight':

                    break;
                    case 'down':

                        this.vel = {
                            x: 0,
                            y: 40
                        };

                    break;
                    case 'downLeft':

                        this.vel = {
                            x: -80,
                            y: 65
                        };

                    break;
                    case 'left':

                        this.vel = {
                            x: -80,
                            y: 0
                        };

                    break;
                    case 'upLeft':

                        this.vel = {
                            x: -80,
                            y: -65
                        };

                    break;
                }

                this.isFired = true;

            }

        }

    });

});