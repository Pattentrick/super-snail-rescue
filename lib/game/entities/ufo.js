ig.module(
    'game.entities.ufo'
)
.requires(
    'plusplus.core.entity',
    'plusplus.abstractities.character',
    'plusplus.core.config'
)
.defines(function () {

    var _c  = ig.CONFIG;

    /**
     * The ufo which abducts the poor snail!
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityUfo = ig.global.EntityUfo = ig.Character.extend({

        performance: 'dynamic',

        timer: new ig.Timer(),

        zIndex: 15,

        /**
         * Seconds after which the abduction starts.
         *
         * @readonly
         *
         */
        abductionTime: 7,

        /**
         * How long in seconds should the UFO lurk
         *
         * @readonly
         *
         */
        lurkingTime: 2,

        /**
         * How long in seconds should
         * the UFO wait for takeoff
         *
         * @readonly
         *
         */
        takeOffTime: 1,

        /**
         * If the UFO already starts
         * to approach the snail
         *
         * @type Boolean
         *
         */
        isApproaching: false,

        /**
         * If the UFO abducts the
         * snail right now
         *
         * @type Boolean
         *
         */
        hasAbductioninProgress: false,

        /**
         * If the UFO lurks the
         * snail right now
         *
         * @type Boolean
         *
         */
        isLurking: false,

        /**
         * If the UFO is ready
         * for take off
         *
         * @type Boolean
         *
         */
        readyForTakeOff: false,

        size: {
            x: 92,
            y: 77
        },

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'ufo.png', 92, 77 ),

        animSettings: {
            idle: {
                frameTime: 0.1,
                sequence: [0,1,2]
            },
            abducting: {
                frameTime: 0.1,
                sequence: [3,4,5]
            }
        },

        maxVelGrounded: {
            x: 15,
            y: 20
        },

        /**
         * Returns true if the timer reached the time
         * for approaching an snail abduction!
         *
         * @returns boolean
         */
        isAbductionTime: function(){

            return ( this.timer.delta() >= this.abductionTime );

        },

        /**
         * Moves the UFO towards the snail.
         */
        approachTheSnail: function(){

            this.moveToDown();

            this.isApproaching = true;

        },

        /**
         * Returns true if the UFo is near enough to abduct the snail.
         *
         * @returns boolean
         */
        hasReachedAbductionDistance: function(){

            return ( this.pos.y >= 36 )

        },

        /**
         * Sets the hasAbductioninProgress flag to
         * true, so the UFO graphic changes, and
         * starts the abduction sequence. Also the
         * awesome chiptune music will be played!
         *
         */
        abductTheSnail: function(){

            var snail = ig.game.getEntitiesByClass(ig.EntitySnailSitting)[0];
            var panda = ig.game.getEntitiesByClass(ig.EntityPandaSitting)[0];

            if( !this.readyForTakeOff ){

                // Play some music

                ig.music.play( ['1BitOfAdviceBeforeYouTakeOff'] );

                // set sad animations

                snail.setSadFaceAnimation();
                panda.setSadFaceAnimation();

                // kill hearts

                ig.game.getEntitiesByClass(ig.EntityHearts)[0].kill();

                this.readyForTakeOff = true;

                this.takeOffTimer = new ig.Timer();

            }
            else if( this.readyForTakeOff && this.takeOffTimer.delta() >= this.takeOffTime ){

                this.hasAbductioninProgress = true;

                // lift up the snail and the UFO!

                this.moveToUp();
                this.moveToRight();

                snail.moveToUp();
                snail.moveToRight();

            }

        },

        /**
         * Once the UFo is near enough to abduct the snail,
         * wait a few seconds before abducting the snail.
         */
        lurkTheSnail: function(){

            if( !this.isLurking ){

                this.lurkTimer = new ig.Timer();

                this.isLurking = true;

            }
            else {

                if( this.lurkTimer.delta() >= this.lurkingTime && !this.hasAbductioninProgress ){

                    this.abductTheSnail();

                }

            }

        },

        animAutomatic: false,

        update: function(){

            this.parent();

            // Is it time for abduction? If yes, approach the snail!
            if( this.isAbductionTime() && !this.isApproaching ){

                this.approachTheSnail();

            }

            // UFO is near enough? Lurk the snail!
            if( this.isApproaching && this.hasReachedAbductionDistance() && !this.hasAbductioninProgress ){

                this.moveToStop();

                this.lurkTheSnail();

            }

            // show UFO beam
            if( this.readyForTakeOff ){

                this.animOverride('abducting');

            }

        }

    });

});