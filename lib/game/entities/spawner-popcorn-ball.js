ig.module(
    'game.entities.spawner-popcorn-ball'
)
.requires(
    'game.entities.enemy-popcorn-ball',
    'plusplus.abstractities.spawner-character',
    'plusplus.core.config'
)
.defines(function () {

    var _c  = ig.CONFIG;

    /**
     * This spawner will spawn a wave of enemy popcorn balls.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntitySpawnerPopcornBall = ig.global.EntitySpawnerPopcornBall = ig.SpawnerCharacter.extend({

        spawningEntity: ig.EntityEnemyPopcornBall,

        spawnCountMax: 3,

        duration: 4,

        spawnAtSide: {
            x: 0,
            y: -1
        },

        suicidal: true

    });

});