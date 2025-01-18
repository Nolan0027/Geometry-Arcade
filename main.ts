scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    if (InLevel == 1 && (tiles.tileAtLocationEquals(location, assets.tile`Spike3`) || (tiles.tileAtLocationEquals(location, assets.tile`Spike4`) || (tiles.tileAtLocationEquals(location, assets.tile`Spike0`) || tiles.tileAtLocationEquals(location, assets.tile`Spike2`))) || (tiles.tileAtLocationEquals(location, assets.tile`Spike`) || Playar.isHittingTile(CollisionDirection.Right)))) {
        music.play(music.melodyPlayable(music.powerDown), music.PlaybackMode.UntilDone)
        Progress.value = 0
        tiles.placeOnTile(Playar, tiles.getTileLocation(0, 14))
        Playar.setImage(assets.image`Player`)
        Playar.vx = 110
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (InLevel == 1) {
        while (controller.A.isPressed()) {
            if (Gamemode == 1) {
                Playar.vy = -150
                Playar.setImage(assets.image`Jump`)
                pause(370)
                Playar.vy = 150
                Playar.setImage(assets.image`Jump0`)
                pause(370)
                Playar.setImage(assets.image`Player`)
            } else if (Gamemode == 2) {
                while (controller.A.isPressed()) {
                    Playar.vy = 100
                    Playar.startEffect(effects.spray)
                }
                effects.clearParticles(Playar)
                Playar.vy = -100
            }
        }
    }
})
function Menu2 () {
    scene.setBackgroundColor(9)
    Title = sprites.create(assets.image`Title`, SpriteKind.Food)
    Title.setPosition(81, 32)
    Title.scale = 0.8
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
            sprites.destroy(Title)
            Level(1)
            Menu.close()
        }
    })
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`Ship`, function (sprite, location) {
    Gamemode = 2
    Playar.setImage(assets.image`PlayerShip`)
})
function Level (Id: number) {
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    if (Id == 1) {
    	
    } else if (Id == 2) {
        tiles.setCurrentTilemap(tilemap`Level2`)
    }
    Playar = sprites.create(assets.image`Player`, SpriteKind.Player)
    cameraOffsetScene.cameraFollowWithOffset(Playar, 40, 0)
    Playar.vx = 110
    tiles.placeOnTile(Playar, tiles.getTileLocation(0, 14))
    Playar.vy = 150
    Progress = statusbars.create(90, 8, StatusBarKind.Energy)
    Progress.setColor(7, 0)
    Progress.value = 0
    Progress.setPosition(80, 17)
    InLevel = 1
}
statusbars.onStatusReached(StatusBarKind.Energy, statusbars.StatusComparison.GTE, statusbars.ComparisonType.Percentage, 100, function (status) {
    game.gameOver(true)
})
let Menu: miniMenu.MenuSprite = null
let Title: Sprite = null
let Playar: Sprite = null
let Gamemode = 0
let InLevel = 0
let Progress: StatusBarSprite = null
Progress = statusbars.create(0, 0, StatusBarKind.Energy)
InLevel = 0
Gamemode = 1
tiles.setCurrentTilemap(tilemap`Level1`)
Menu2()
forever(function () {
    pause(tileUtil.tilemapProperty(tileUtil.currentTilemap(), tileUtil.TilemapProperty.PixelWidth) / 10)
    Progress.value += 1
})
