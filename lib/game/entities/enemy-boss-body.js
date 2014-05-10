ig.module(
    'game.entities.enemy-boss-body'
)
.requires(
    'plusplus.abstractities.character',
    'plusplus.core.config'
)
.defines(function () {

    var _c  = ig.CONFIG;
    var _ut = ig.utils;

    /**
     * The body of the final boss of the game.
     *
     * @class
     * @extends ig.Character
     * @memeberof ig
     */
    ig.EntityEnemyBossBody = ig.global.EntityEnemyBossBody = ig.Character.extend({

        performance: 'dynamic',

        explodingDamage: false,

        damageDelay: 1.5,

        temporaryInvulnerabilityAlpha: 0,

        temporaryInvulnerabilityPulses: 15,

        damage: 1,

        size: {
            x: 58,
            y: 80
        },

        maxVelGrounded: {
            x: 0,
            y: 150
        },

        initTypes: function() {

            this.parent();

            _ut.addType(ig.EntityExtended, this, 'checkAgainst', "PLAYER");
            _ut.addType(ig.EntityExtended, this, 'type', "FOE");

        },

        check: function( entity ) {

            // Kill player on collison if he is not invulnerable

            if( !entity.invulnerable && !this.invulnerable ){

                entity.receiveDamage(this.damage, this, this.damageUnblockable);

            }

        },

        /**
         * Override this for not taking damage.
         */
        receiveDamage: function( amount, from, unblockable ){}

    });

});