scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    if (InLevel == 1 && (tiles.tileAtLocationEquals(location, assets.tile`Spike3`) || (tiles.tileAtLocationEquals(location, assets.tile`Spike4`) || (tiles.tileAtLocationEquals(location, assets.tile`Spike0`) || tiles.tileAtLocationEquals(location, assets.tile`Spike2`))) || Playar.isHittingTile(CollisionDirection.Bottom))) {
        music.play(music.melodyPlayable(music.powerDown), music.PlaybackMode.UntilDone)
        Progress.value = 0
        tiles.placeOnTile(Playar, tiles.getTileLocation(0, 14))
        Playar.vx = 110
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    while (controller.A.isPressed() && InLevel == 1) {
        Playar.vy = -150
        Playar.setImage(assets.image`Jump`)
        pause(370)
        Playar.setImage(assets.image`Jump0`)
        Playar.vy = 150
        pause(370)
        Playar.setImage(assets.image`Player`)
    }
})
function Menu2 () {
    scene.setBackgroundColor(9)
    Title = sprites.create(assets.image`Title`, SpriteKind.Food)
    Title.setPosition(81, 32)
    Title.scale = 0.8
    tiles.setCurrentTilemap(tilemap`MenuScreen`)
    Menu = miniMenu.createMenu(
    miniMenu.createMenuItem("1", assets.image`Info`),
    miniMenu.createMenuItem("2", assets.image`Play`),
    miniMenu.createMenuItem("3", assets.image`Misc`)
    )
    Menu.setStyleProperty(miniMenu.StyleKind.Default, miniMenu.StyleProperty.IconOnly, 1)
    Menu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Rows, 1)
    Menu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Columns, 3)
    Menu.setStyleProperty(miniMenu.StyleKind.Default, miniMenu.StyleProperty.Alignment, 1)
    Menu.setMenuStyleProperty(miniMenu.MenuStyleProperty.BackgroundColor, 0)
    Menu.setDimensions(100, 50)
    Menu.setPosition(77, 75)
    Menu.onButtonPressed(controller.A, function (selection, selectedIndex) {
        if (selectedIndex == 1) {
            Menu.close()
            Level(1)
        }
    })
}
function Level (Id: number) {
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    if (Id == 1) {
        tiles.setCurrentTilemap(tilemap`Level1`)
    }
    Playar = sprites.create(assets.image`Player`, SpriteKind.Player)
    Progress = statusbars.create(90, 8, StatusBarKind.Energy)
    Progress.setColor(7, 0)
    Progress.value = 0
    Progress.setPosition(80, 17)
    Playar.vx = 110
    tiles.placeOnTile(Playar, tiles.getTileLocation(0, 14))
    cameraOffsetScene.cameraFollowWithOffset(Playar, 40, 0)
    Playar.vy = 150
    InLevel = 1
}
statusbars.onStatusReached(StatusBarKind.Energy, statusbars.StatusComparison.GTE, statusbars.ComparisonType.Percentage, 100, function (status) {
    game.gameOver(true)
})
let Menu: miniMenu.MenuSprite = null
let Title: Sprite = null
let Progress: StatusBarSprite = null
let Playar: Sprite = null
let InLevel = 0
InLevel = 0
Menu2()
forever(function () {
    if (InLevel == 1) {
        pause(tileUtil.tilemapProperty(tileUtil.currentTilemap(), tileUtil.TilemapProperty.PixelWidth) / 10)
        Progress.value += 1
    }
})
