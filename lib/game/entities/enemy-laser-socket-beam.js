ig.module(
    'game.entities.enemy-laser-socket-beam'
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
     * A beam that will kill the player.
     *
     * @class
     * @extends ig.EntityEnemy
     * @memeberof ig
     */
    ig.EntityEnemyLaserSocketBeam = ig.global.EntityEnemyLaserSocketBeam = ig.EntityEnemy.extend({

        size: {
            x: 6,
            y: 8
        },

        health: 100,

        textured: true,

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'socket-laser-beam.gif', 6, 8 ),

        animSettings: {
            idle: {
                frameTime: 1,
                sequence: [0]
            }
        },

        initProperties: function(){

            this.parent();

            this.lifeTimeTimer = new ig.Timer();

        },

        update: function(){

            this.parent();

            if( this.lifeTimeTimer.delta() > 1 ){

                ig.game.removeEntity(this);

            }

        }

    });

});