ig.module(
    'game.entities.particle-storm-vertically'
)
.requires(
    'plusplus.entities.explosion',
    'game.entities.particle-color-random'
)
.defines(function() {

    "use strict";

    var _c = ig.CONFIG;

    /**
     * Particle storm in horizontal direction.
     * @class
     * @extends ig.EntityExplosion
     * @memberof ig
     * @author Collin Hover - collinhover.com
     */
    ig.EntityParticleStormVertically = ig.global.EntityParticleStormVertically = ig.EntityExplosion.extend( /**@lends ig.EntityExplosionHorizontal.prototype */ {

        // spawn the random colored particle

        spawningEntity: ig.EntityParticleColorRandom,

        // spawn no more than 50 at a time

        spawnCountMax: 10,

        // spawn around 10 per second

        spawnDelay: 0.1,

        // endless spawning

        duration: -1,

        // spawn settings applied to particles when created
        // it is faster to avoid this, and set these settings in particle
        // but in this case, we have a spawner with a specific function
        // and our random particle should not be so specific

        spawnSettings: {
            // starting velocity of particles
            vel: {
                x: 0,
                y: -20
            },
            // long life duration
            lifeDuration: 3,
            // fade in after spawning
            fadeAfterSpawnDuration: 0.5,
            // fade out before dieing
            fadeBeforeDeathDuration: 0.5
        }

    });

});
