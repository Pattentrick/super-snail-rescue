ig.module(
    'game.entities.panda-sitting'
)
.requires(
    'plusplus.core.entity',
    'plusplus.core.config',
    'game.entities.thought-bubble',
    'game.levels.intro-scene-2'
)
.defines(function () {

    var _c  = ig.CONFIG;

    /**
     * The sitting panda, which is
     * featured in the first intro scene.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityPandaSitting = ig.global.EntityPandaSitting = ig.EntityExtended.extend({

        size: {
            x: 21,
            y: 28
        },

        zIndex: 20,

        timer: new ig.Timer(),

        /**
         * The thought bubble entity.
         *
         * @type Object|Null
         */
        thoughtBubble: null,

        /**
         * True when the panda thinks.
         *
         * @type Boolean
         */
        isThinking: false,

        /**
         * Seconds after which the new level is loaded.
         *
         * @type Boolean
         */
        timeToLoadLevel: 4,

        /**
         * Set to ture to display a sad panda.
         */
        isLonelyPanda: false,

        /**
         * After how many the thought bubble should appear.
         */
        durationUntilThinking: 20,

        /**
         * If the game is loading a new level.
         *
         * @type Boolean
         */
        hasNewLevelToLoad: false,

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'panda-sitting.png', 21, 28 ),

        animSettings: {
            idle: {
                frameTime: 1,
                sequence: [0]
            },
            sad: {
                frameTime: 1,
                sequence: [2]
            },
            thinking: {
                frameTime: 1,
                sequence: [3]
            }
        },

        /**
         * Ovverides the entity animation with a sad face.
         */
        setSadFaceAnimation: function(){

            this.animOverride('sad', {
                lock: true
            });

        },

        /**
         * Resets the timer, spawns the thought bubble
         * entity and overrides the face animation
         */
        enableThinking: function(){

            this.timer.reset();
            this.isThinking = true;
            this.thoughtBubble = ig.game.spawnEntity(ig.EntityThoughtBubble, 120, 47);

            this.animOverride('thinking', {
                lock: true
            });

        },

        update: function(){

            this.parent();

            if( this.timer.delta() >= this.durationUntilThinking && !this.isThinking ){

                this.enableThinking();

            }

            if( this.isThinking && this.timer.delta() >= this.timeToLoadLevel && !this.hasNewLevelToLoad ){

                this.hasNewLevelToLoad = true;
                ig.game.loadLevelDeferred( 'intro-scene-2' );

            }

        }

    });

});