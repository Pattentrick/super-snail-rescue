ig.module(
    'game.entities.trigger-endfight'
)
.requires(
    'plusplus.entities.trigger',
    'game.entities.warning'
)
.defines(function () {

    /**
     * Triggers the endfight.
     *
     * @class
     * @extends ig.EntityTrigger
     * @memeberof ig
     */
    ig.EntityTriggerEndfight = ig.global.EntityTriggerEndfight = ig.EntityTrigger.extend({

        /**
         * Will remove all hostile entities in the game that are still present.
         */
        cleanUpEnemies: function(){

            var foes = ig.game.getEntitiesByType('FOE');

            for( var i = 0, len = foes.length; i < len; i++ ){

                ig.game.removeEntity( foes[i] );

            }

        },

        /**
         * Spawns an iconic warning message.
         */
        spawnWarning: function(){

            var scroller = ig.game.getEntityByName('levelScroller');

            ig.game.spawnEntity( ig.EntityWarning, scroller.getCenterX() - 37, scroller.getCenterY() - 8 );

        },

        activate: function(){

            this.parent();

            this.cleanUpEnemies();

            this.spawnWarning();

            // Play endfight music

            ig.music.volume = 0.15;
            ig.music.play( ['aFightForTime'] );
            ig.music.loop = true;

        }

    });

});