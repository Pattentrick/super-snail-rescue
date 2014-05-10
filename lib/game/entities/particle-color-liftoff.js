ig.module(
    'game.entities.particle-color-liftoff'
)
.requires(
    'plusplus.core.config',
    'plusplus.entities.particle-color'
)
    .defines(function() {
        "use strict";

        var _c = ig.CONFIG;

        /**
         * Liftoff particles
         */
        ig.EntityParticleColorLiftoff = ig.global.EntityParticleColorLiftoff = ig.EntityParticleColor.extend( /**@lends ig.EntityParticleColor.prototype */ {

            randomDoubleVel: false,

            size: {
                x: 1,
                y: 1
            },

            animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'particles.png', 1, 1)

        });


    });
