ig.module(
    'plusplus.config-user'
)
    .defines(function() {

        /**
         * User configuration of Impact++.
         * <span class="alert alert-info"><strong>Tip:</strong> it is recommended to modify this configuration file!</span>
         * @example
         * // in order to add your own custom configuration to Impact++
         * // edit the file defining ig.CONFIG_USER, 'plusplus/config-user.js'
         * // ig.CONFIG_USER is never modified by Impact++ (it is strictly for your use)
         * // ig.CONFIG_USER is automatically merged over Impact++'s config
         * @static
         * @readonly
         * @memberof ig
         * @namespace ig.CONFIG_USER
         * @author Collin Hover - collinhover.com
         **/
        ig.CONFIG_USER = {

            // set to true for a top down game

            TOP_DOWN: true,

            // enable fullscreen

            GAME_WIDTH_PCT: 1,
            GAME_HEIGHT_PCT: 1,

            // resolution that will be scaled

            GAME_WIDTH_VIEW: 320,
            GAME_HEIGHT_VIEW: 200,

            // Disable parallax on y

            BACKGROUNDS_PARALLAX_Y: false,

            // Min Scale

            SCALE_MIN: 2,

            TRANSITIONER_COLOR: "#000000",

            // Disabeling prerendering speeds up the game

            PRERENDER_BACKGROUND_LAYER : true,

            // camera settings

            CAMERA: {
                AUTO_FOLLOW_PLAYER : false
            }

        };

    });
