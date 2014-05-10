ig.module(
    'game.abilities.plasma-gun'
)
.requires(
    'plusplus.abilities.ability-shoot',
    'game.entities.projectile-plasma'
)
.defines(function () {

    "use strict";

    /**
     * The plasma gun. It spawns plasma projectiles with a cooldown
     * of 0.3 seconds between shoots and accelerates the projectile
     * to a speed of 1000 (not over 9000 though - that would break
     * the game).
     *
     * ATTENTION: This is NOT an entity, but a normal class.
     *
     */
    ig.PlasmaGun = ig.AbilityShoot.extend({

        spawningEntity: ig.EntityProjectilePlasma,

        offsetVelX: 1000,

        cooldownDelay: 0.2,

        plasma: new ig.Sound( 'media/sounds/plasma.*' ),

        activateComplete: function( settings ){

            this.parent( settings );

            this.plasma.volume = 0.1;
            this.plasma.play();

        }

    });

});