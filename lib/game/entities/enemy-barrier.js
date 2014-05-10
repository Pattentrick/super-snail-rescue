ig.module(
    'game.entities.enemy-barrier'
)
.requires(
    'plusplus.core.config',
    'game.entities.enemy'
)
.defines(function () {

    'use strict';

    var _c  = ig.CONFIG;
    var _ut = ig.utils;

    /**
     * Barrier that stands in the way. The player has to destroy it, or else he will die on collision.
     *
     * @class
     * @extends ig.EntityEnemy
     * @memeberof ig
     */
    ig.EntityEnemyBarrier = ig.global.EntityEnemyBarrier = ig.EntityEnemy.extend({

        name: 'barrier',

        size: {
            x: 28,
            y: 41
        },

        health: 4,

        explodingDamage: false,

        canFlipX: false,

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'enemy-barrier.gif', 28, 41 ),

        animSettings: {
            idle: {
                frameTime: 1,
                sequence: [0]
            },
            damaged: {
                frameTime: 0.05,
                sequence: [1]
            }
        },

        /**
         * Override this for special damaged animation (flickering).
         */
        receiveDamage: function( amount, from, unblockable ){

            this.parent( amount, from, unblockable );

            this.animOverride('damaged');

        }

    });

});