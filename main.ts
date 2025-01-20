controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (InEditor == 0) {
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
                    Playar.startEffect(effects.trail)
                    Playar.vy = -100
                    pause(200)
                }
            }
        }
    } else {
        if (Playar.overlapsWith(Back)) {
            tiles.setCurrentTilemap(tilemap`Level1`)
            sprites.destroy(Playar)
            sprites.destroy(SelBlock)
            sprites.destroy(SelFrame)
            sprites.destroy(Back)
            Menu2()
        } else if (Playar.overlapsWith(SelBlock)) {
            SelVar = 1
        } else {
            if (SelVar == 1) {
                tiles.setTileAt(Playar.tilemapLocation(), assets.tile`Block`)
                tiles.setWallAt(Playar.tilemapLocation(), true)
            }
        }
    }
})
function Editor () {
    sprites.destroy(Playar)
    SelFrame = sprites.create(assets.image`SelFrame`, SpriteKind.Player)
    SelFrame.scale = 3
    SelFrame.setPosition(80, 105)
    SelBlock = sprites.create(assets.image`SelBlock`, SpriteKind.Player)
    SelBlock.setPosition(13, 95)
    Back = sprites.create(assets.image`X`, SpriteKind.Player)
    Back.setPosition(18, 21)
    tiles.setCurrentTilemap(tilemap`Blankvoid`)
    SelVar = 1
    Playar = sprites.create(assets.image`Crosshair`, SpriteKind.Player)
    Playar.setFlag(SpriteFlag.GhostThroughWalls, true)
    controller.moveSprite(Playar)
    InEditor = 1
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (InEditor == 1) {
        tiles.setTileAt(Playar.tilemapLocation(), assets.tile`StartPos`)
    }
})
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    if (InLevel == 1 && (tiles.tileAtLocationEquals(location, assets.tile`Spike3`) || (tiles.tileAtLocationEquals(location, assets.tile`Spike4`) || (tiles.tileAtLocationEquals(location, assets.tile`Spike0`) || tiles.tileAtLocationEquals(location, assets.tile`Spike2`))) || (tiles.tileAtLocationEquals(location, assets.tile`Spike`) || Playar.isHittingTile(CollisionDirection.Right)))) {
        Gamemode = 1
        music.play(music.melodyPlayable(music.powerDown), music.PlaybackMode.UntilDone)
        Progress.value = 0
        tiles.placeOnTile(Playar, tiles.getTileLocation(0, 14))
        Playar.vx = 110
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`Cube`, function (sprite, location) {
    Gamemode = 1
    Playar.setImage(assets.image`Player`)
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
    Menu.setMenuStyleProperty(miniMenu.MenuStyleProperty.BackgroundColor, 0)
    Menu.setDimensions(100, 50)
    Menu.setPosition(77, 75)
    Menu.onButtonPressed(controller.A, function (selection, selectedIndex) {
        if (selectedIndex == 1) {
            Menu.close()
            LvlSel = miniMenu.createMenu(
            miniMenu.createMenuItem("Back", assets.image`X`),
            miniMenu.createMenuItem("Stereo Madness", assets.image`Easy`)
            )
            LvlSel.onButtonPressed(controller.A, function (selection, selectedIndex) {
                if (selectedIndex == 0) {
                    Menu2()
                } else if (selectedIndex == 1) {
                    Level(1)
                }
                LvlSel.close()
            })
        } else if (selectedIndex == 2) {
            Menu.close()
            Misc = miniMenu.createMenu(
            miniMenu.createMenuItem("Back", assets.image`X`),
            miniMenu.createMenuItem("Editor", assets.image`Hamer`)
            )
            Misc.onButtonPressed(controller.A, function (selection, selectedIndex) {
                if (selectedIndex == 0) {
                    Misc.close()
                    Menu2()
                } else if (selectedIndex == 1) {
                    sprites.destroy(Title)
                    Misc.close()
                    Editor()
                }
            })
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
controller.A.onEvent(ControllerButtonEvent.Repeated, function () {
	
})
controller.A.onEvent(ControllerButtonEvent.Released, function () {
    if (Gamemode == 2) {
        effects.clearParticles(Playar)
        Playar.vy = 100
    }
})
statusbars.onStatusReached(StatusBarKind.Energy, statusbars.StatusComparison.GTE, statusbars.ComparisonType.Percentage, 100, function (status) {
    game.gameOver(true)
})
let Misc: miniMenu.MenuSprite = null
let LvlSel: miniMenu.MenuSprite = null
let Menu: miniMenu.MenuSprite = null
let Title: Sprite = null
let SelVar = 0
let SelFrame: Sprite = null
let SelBlock: Sprite = null
let Back: Sprite = null
let Playar: Sprite = null
let InEditor = 0
let Gamemode = 0
let InLevel = 0
let Progress: StatusBarSprite = null
Progress = statusbars.create(0, 0, StatusBarKind.Energy)
InLevel = 0
Gamemode = 1
tiles.setCurrentTilemap(tilemap`Level1`)
Menu2()
forever(function () {
    pause(tileUtil.tilemapProperty(tileUtil.currentTilemap(), tileUtil.TilemapProperty.PixelWidth) / 9)
    Progress.value += 1
})
