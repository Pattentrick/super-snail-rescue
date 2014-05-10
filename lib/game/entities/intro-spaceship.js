ig.module(
    'game.entities.intro-spaceship'
)
.requires(
    'plusplus.core.entity',
    'plusplus.abstractities.character',
    'plusplus.core.config',
    'plusplus.entities.explosion',
    'game.entities.particle-color-liftoff',
    'game.levels.title'
)
.defines(function () {

    var _c  = ig.CONFIG;

    /**
     * A spaceships that lifts off in scene 2 of the intro.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityIntroSpaceship = ig.global.EntityIntroSpaceship = ig.Character.extend({

        performance: 'dynamic',

        size: {
            x: 32,
            y: 16
        },

        /**
         * If ship is in liftoff position
         *
         * @type Boolean
         *
         */
        hasLiftoff: false,

        /**
         * After how many seconds the
         * title should be loaded.
         *
         * @type Number
         *
         */
        loadTitleTime: 6,

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'player.png', 32, 16 ),

        animSettings: {
            idle: {
                frameTime: 0.3,
                sequence: [0,1]
            }
        },

        maxVelGrounded: {
            x: 50,
            y: 10
        },

        initProperties: function(){

            this.parent();

            this.timer = new ig.Timer();

            this.liftOff = new ig.Sound( 'media/sounds/liftoff.*' );
            this.liftOff.volume = 0.3;

        },

        updateChanges: function(){

            this.parent();

            if( !this.hasLiftoff ){

                this.moveToRight();

            }

            if( this.timer.delta() >= this.loadTitleTime ){

                ig.game.loadLevelDeferred( 'title' );

            }

        },

        activate: function(){

            this.hasLiftoff = true;

            // Liftoff sound

            this.liftOff.play();

            // bring da roof down!

            ig.game.camera.shake(4,3);

            // spawn lift off explosion

            ig.game.spawnEntity(ig.EntityExplosion, this.pos.x, this.pos.y + 10, {
                spawnCountMax: 20,
                spawnSettings: {
                    vel: {
                        x: -200,
                        y: -200
                    },
                    animTileOffset: 16
                },
                spawningEntity: ig.EntityParticleColorLiftoff
            });

            this.moveToRight();
            this.moveToUp();

            // increase velocity

            this.maxVelGrounded = {
                x: 150,
                y: 50
            }

        }

    });

});