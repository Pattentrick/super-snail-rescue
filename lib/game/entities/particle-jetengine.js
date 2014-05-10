ig.module(
    'game.entities.particle-jetengine'
)
.requires(
    'plusplus.core.config',
    'plusplus.abstractities.particle-fast'
)
.defines(function() {

    "use strict";

    var _c = ig.CONFIG;

    /**
     * Fast particle that spawns from the engine of the ship.
     */
    ig.EntityParticleJetengine = ig.global.EntityParticleJetengine = ig.ParticleFast.extend( {

        size: {
            x: 3,
            y: 1
        },

        zIndex: 5,

        randomDoubleVel: false,

        animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'jetengine-particle.gif', 3, 1),

        reset: function(x, y, settings) {

            this.parent(x, y, settings);

            this.addAnim("move", {
                sequence: [0],
                frameTime: 1,
                stop: true
            });

            // resort for proper zIndex
            ig.game.sortEntitiesDeferred('entities');

        }

    });

});
