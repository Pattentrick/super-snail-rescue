ig.module(
    'game.entities.projectile-enemy-bullet'
)
.requires(
    'plusplus.abstractities.projectile'
)
.defines(function () {

    'use strict';

    var _c  = ig.CONFIG;
    var _ut = ig.utils;

    /**
     * Basic projectile that can be used by all enemys.
     */
    ig.EntityProjectileEnemyBullet = ig.global.EntityProjectileEnemyBullet = ig.Projectile.extend({

        performance: 'dynamic',

        size: {
            x: 6,
            y: 6
        },

        damage: 1,

        lifeDuration: 7,

        friction: {
            x:0,
            y:0
        },

        maxVel: {
            x: 200,
            y: 200
        },

        bounciness: 0,

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'enemy-bullet.gif', 6, 6),

        animSettings: {
            idle: {
                frameTime: 0.1,
                sequence: [0,1,2,3,4,5]
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

        initTypes: function() {

            _ut.addType(ig.EntityExtended, this, 'checkAgainst', "PLAYER");

        }

    });

});