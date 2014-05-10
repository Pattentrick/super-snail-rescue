ig.module(
    'game.entities.trigger-boss'
)
.requires(
    'plusplus.entities.trigger',
    'game.entities.enemy-boss'
)
.defines(function () {

    /**
     * Triggers the endboss.
     *
     * @class
     * @extends ig.EntityTrigger
     * @memeberof ig
     */
    ig.EntityTriggerBoss = ig.global.EntityTriggerBoss = ig.EntityTrigger.extend({

        spawnEndboss: function(){

            var x = ig.game.getEntityByName('movementBorderRight').pos.x - 81;

            ig.game.spawnEntity( ig.EntityEnemyBoss, x, 92 );

        },

        activate: function(){

            // Disable auto scroll

            ig.game.hasScrollingEnabled = false;

            // Remove warning

            ig.game.removeEntity( ig.game.getEntityByName('warning') );

            // Spawn endboss

            this.spawnEndboss();


        }

    });

});