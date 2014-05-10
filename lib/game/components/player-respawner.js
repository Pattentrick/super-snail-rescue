ig.module(
    'game.components.player-respawner'
)
.requires(
    'game.entities.player'
)
.defines(function () {

    'use strict';

    /**
     * Handles the respawn of the player after the death of the player.
     *
     */
    ig.PlayerRespawner = ig.Class.extend({


        /**
         * Has the game a dead player?
         *
         * @type Boolean
         *
         */
        hasDeadPlayer: false,

        /**
         * Is the death timer already set?
         *
         * @type Boolean
         *
         */
        hasDeathTimer: false,

        /**
         * Time in seconds between death and respawn.
         *
         * @type Number
         *
         */
        timeInLimbo: 2,

        /**
         * Checks on every game update if the player is recently deceased.
         * If so, the method will init a new timer changes the {@link ig.PlayerRespawner#hasDeathTimer}
         * flag to true and call the respawn method.
         *
         */
        checkForRespawn: function(){

            if( this.hasDeadPlayer ){

                if( !this.hasDeathTimer ){

                    this.timer = new ig.Timer();

                    this.hasDeathTimer = true;

                }

                this.respawn();

            }

        },

        /**
         * After a given time, defined in {@link ig.PlayerRespawner#timeInLimbo},
         * the player will respawn a few pixels behind the game center and all flags
         * will be resetted.
         */
        respawn: function(){

            if( this.timer.delta() > 2 ){

                var levelScroller = ig.game.getEntityByName('levelScroller');

                ig.game.spawnEntity( ig.EntityPlayer, levelScroller.pos.x - 100, levelScroller.pos.y );

                this.hasDeadPlayer = false;
                this.hasDeathTimer = false;

            }

        }

    });

});
