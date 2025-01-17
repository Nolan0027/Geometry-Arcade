scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    if (tiles.tileAtLocationEquals(location, assets.tile`Spike`) || tiles.tileAtLocationEquals(location, assets.tile`Spike0`) || (tiles.tileAtLocationEquals(location, assets.tile`Spike2`) || tiles.tileAtLocationEquals(location, assets.tile`Spike3`))) {
        A = 1
        Playar.vx = 0
        music.play(music.melodyPlayable(music.powerDown), music.PlaybackMode.UntilDone)
        Playar.vy = 100
        Playar.setPosition(10, 110)
        Progress.value = 0
        Playar.vx = 100
        A = 0
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    while (controller.A.isPressed()) {
        Playar.vy = -100
        timer.background(function () {
            for (let index = 0; index < 6; index++) {
                transformSprites.changeRotation(Playar, 30)
                pause(150)
                if (Playar.tileKindAt(TileDirection.Bottom, assets.tile`Block`) || (Playar.tileKindAt(TileDirection.Bottom, assets.tile`Slab`) || Playar.tileKindAt(TileDirection.Bottom, assets.tile`Block2`))) {
                    transformSprites.rotateSprite(Playar, 0)
                    break;
                }
            }
        })
        pause(420)
        Playar.vy = 100
        pause(400)
    }
})
statusbars.onStatusReached(StatusBarKind.Energy, statusbars.StatusComparison.GTE, statusbars.ComparisonType.Percentage, 100, function (status) {
    game.gameOver(true)
})
let A = 0
let Progress: StatusBarSprite = null
let Playar: Sprite = null
Playar = sprites.create(assets.image`Player`, SpriteKind.Player)
scene.setBackgroundColor(9)
tiles.setCurrentTilemap(tilemap`Level1`)
Playar.setPosition(10, 110)
Playar.vx = 100
Playar.vy = 100
Playar.startEffect(effects.trail)
Progress = statusbars.create(70, 8, StatusBarKind.Energy)
Progress.setColor(7, 0)
Progress.value = 0
Progress.setPosition(80, 17)
A = 0
cameraOffsetScene.cameraFollowWithOffset(Playar, 40, 0)
forever(function () {
    while (A == 0) {
        Progress.value += 1
        pause(tileUtil.tilemapProperty(tileUtil.currentTilemap(), tileUtil.TilemapProperty.PixelWidth) / 10)
    }
})