ig.module(
    'game.entities.projectile-plasma'
)
.requires(
    'plusplus.abstractities.projectile'
)
.defines(function () {

    "use strict";

    var _c = ig.CONFIG;
    var _ut = ig.utils;

    /**
     * Plasma projectile that is used by the shoot ability of the player.
     */
    ig.EntityProjectilePlasma = ig.global.EntityProjectilePlasma = ig.Projectile.extend({

        collides: ig.EntityExtended.COLLIDES.LITE,

        size: {
            x: 20,
            y: 6
        },

        // plasma hurts

        damage: 1,

        // lasers eventually fade (like a particle)

        lifeDuration: 0.27,

        //fadeBeforeDeathDuration: 0.1,

        // lasers ignore gravity

        gravityFactor: 0,

        // lasers have no friction

        friction: {
            x:0,
            y:0
        },

        maxVel: {
            x: 2000,
            y: 0
        },

        // lasers don't bounce

        bounciness: 0,

        // lasers stop if they hit a wall

        collisionKills: true,

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'projectile.gif', 20, 6),

        animSettings: {
            idle: {
                frameTime: 0.01,
                sequence: [0,1],
                once: true
            },
            deathX:{
                frameTime: 0.01,
                sequence: [2,3,4,5]
            }
        },

        initProperties: function() {

            this.parent();

            _ut.addType(ig.EntityExtended, this, 'checkAgainst', "FOE");

        }

    });

});