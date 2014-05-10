ig.module(
    'game.entities.projectile-enemy-laser'
)
.requires(
    'plusplus.abstractities.projectile'
)
.defines(function () {

    'use strict';

    var _c  = ig.CONFIG;
    var _ut = ig.utils;

    /**
     * Basic laser that can be used by all enemys.
     */
    ig.EntityProjectileEnemyLaser = ig.global.EntityProjectileEnemyLaser = ig.Projectile.extend({

        performance: 'dynamic',

        canFlipX: false,

        size: {
            x: 30,
            y: 5
        },

        damage: 1,

        lifeDuration: 10,

        friction: {
            x:0,
            y:0
        },

        maxVel: {
            x: 400,
            y: 200
        },

        bounciness: 0,

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'projectile-enemy-laser.gif', 30, 5),

        animSettings: {
            idle: {
                frameTime: 1,
                sequence: [0]
            }
        },

        check: function(entity) {

            // deal damage to colliding entity

            var damage;

            if (this.damageAsPct) {

                damage = entity.health * this.damage;

            } else {

                damage = this.damage;

            }

            entity.receiveDamage(damage, this, this.damageUnblockable);

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