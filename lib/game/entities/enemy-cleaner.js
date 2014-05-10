ig.module(
    'game.entities.enemy-cleaner'
)
.requires(
    'plusplus.core.entity',
    'plusplus.core.config'
)
.defines(function () {

    'use strict';

    var _c  = ig.CONFIG;
    var _ut = ig.utils;

    /**
     *
     * Mysterious entity that lurks at the beginning of the level and will eat all enemys!!!
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityEnemyCleaner = ig.global.EntityEnemyCleaner = ig.EntityExtended.extend({

        performance: 'dynamic',

        size: {
            x: 1,
            y: 200
        },

        initTypes: function() {

            this.parent();

            _ut.addType(ig.EntityExtended, this, 'checkAgainst', "FOE");

        },

        /**
         *  Removes all colliding entitys from the game.
         */
        check: function( entity ) {

            ig.game.removeEntity( entity );

        }

    });

});