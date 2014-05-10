ig.module(
    'game.entities.gate'
)
.requires(
    'plusplus.core.entity',
    'plusplus.core.config'
)
.defines(function () {

    var _c  = ig.CONFIG;

    /**
     * A small gate which opens on activate.
     *
     * @class
     * @extends ig.EntityExtended
     * @memeberof ig
     */
    ig.EntityGate = ig.global.EntityGate = ig.EntityExtended.extend({

        size: {
            x: 30,
            y: 14
        },

        animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'gate.png', 30, 14 ),

        animSettings: {
            idle: {
                frameTime: 1,
                sequence: [0]
            },
            open: {
                frameTime: 0.2,
                sequence: [0,1,2,3]
            }
        },

        activate: function(){

            this.animOverride('open',{
                lock: true
            });

        }

    });

});