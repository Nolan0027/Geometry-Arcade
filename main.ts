scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    if (tiles.tileAtLocationEquals(location, assets.tile`Spike`) || tiles.tileAtLocationEquals(location, assets.tile`Spike0`) || (tiles.tileAtLocationEquals(location, assets.tile`Spike2`) || tiles.tileAtLocationEquals(location, assets.tile`Spike3`) || Playar.isHittingTile(CollisionDirection.Right))) {
        music.play(music.melodyPlayable(music.powerDown), music.PlaybackMode.UntilDone)
        game.reset()
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    while (controller.A.isPressed()) {
        Playar.setImage(assets.image`Jump`)
        Playar.vy = -130
        pause(360)
        Playar.setImage(assets.image`Player`)
        Playar.vy = 110
        pause(450)
    }
})
statusbars.onStatusReached(StatusBarKind.Energy, statusbars.StatusComparison.GTE, statusbars.ComparisonType.Percentage, 100, function (status) {
    game.gameOver(true)
})
let Playar: Sprite = null
Playar = sprites.create(assets.image`Player`, SpriteKind.Player)
scene.setBackgroundColor(9)
tiles.setCurrentTilemap(tilemap`Level1`)
Playar.setPosition(10, 120)
Playar.vy = 100
let Progress = statusbars.create(90, 8, StatusBarKind.Energy)
Progress.setColor(7, 0)
Progress.value = 0
Progress.setPosition(80, 17)
Playar.vx = 110
cameraOffsetScene.cameraFollowWithOffset(Playar, 40, 0)
forever(function () {
    Progress.value += 1
    pause(tileUtil.tilemapProperty(tileUtil.currentTilemap(), tileUtil.TilemapProperty.PixelWidth) / 10)
})
