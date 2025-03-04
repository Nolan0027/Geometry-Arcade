controller.A.onEvent(ControllerButtonEvent.Repeated, function () {
    if (InEditor == 1) {
        sprites.destroy(Playar)
        sprites.destroy(Select)
        sprites.destroy(SelFrame)
        sprites.destroy(Back)
        Playtesting = 1
        Gamemode = 1
        InLevel = 1
        InEditor = 0
        Playar = sprites.create(assets.image`Player`, SpriteKind.Player)
        tiles.placeOnRandomTile(Playar, assets.tile`StartPos`)
        Playar.vx = 110
        cameraOffsetScene.cameraFollowWithOffset(Playar, 40, 0)
    }
})
function MainMenu () {
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
    Menu.setStyleProperty(miniMenu.StyleKind.Default, miniMenu.StyleProperty.Background, 9)
    Menu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Rows, 1)
    Menu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Columns, 3)
    Menu.setDimensions(100, 30)
    Menu.setPosition(77, 75)
    Menu.onButtonPressed(controller.A, function (selection, selectedIndex) {
        if (selectedIndex == 0) {
            game.showLongText("1/6: A to Jump/Place block", DialogLayout.Center)
            game.showLongText("2/6, Press reset if game bugs", DialogLayout.Center)
            game.showLongText("3/6: Hold B to exit editor", DialogLayout.Center)
            game.showLongText("4/6: Hold A to Playtest", DialogLayout.Center)
            game.showLongText("5/6: B+UP To cycle blocks", DialogLayout.Center)
            game.showLongText("6/6: Demake made by Nolan0027", DialogLayout.Center)
        } else if (selectedIndex == 1) {
            Menu.close()
            color.startFade(color.originalPalette, color.Black, 1200)
            LvlSel = miniMenu.createMenu(
            miniMenu.createMenuItem("Back", assets.image`X`),
            miniMenu.createMenuItem("Stereo Madness", assets.image`Easy`),
            miniMenu.createMenuItem("Back on track", assets.image`Easy`),
            miniMenu.createMenuItem("Polargiest", assets.image`Normal`),
            miniMenu.createMenuItem("Dry out", assets.image`Normal`),
            miniMenu.createMenuItem("Base after base", assets.image`Hard`),
            miniMenu.createMenuItem("Cant let go", assets.image`Hard`),
            miniMenu.createMenuItem("Jumper", assets.image`Harder`),
            miniMenu.createMenuItem("Time machine", assets.image`Harder`),
            miniMenu.createMenuItem("Cycles", assets.image`Harder`),
            miniMenu.createMenuItem("xStep", assets.image`Insane`),
            miniMenu.createMenuItem("Zodiac", assets.image`Demon`)
            )
            A = 1
            LvlSel.setStyleProperty(miniMenu.StyleKind.Default, miniMenu.StyleProperty.Background, 9)
            LvlSel.setMenuStyleProperty(miniMenu.MenuStyleProperty.Columns, 12)
            LvlSel.setDimensions(1300, 50)
            LvlSel.setPosition(650, 78)
            color.startFade(color.Black, color.originalPalette, 500)
            LvlSel.onButtonPressed(controller.A, function (selection, selectedIndex) {
                if (selectedIndex == 0) {
                    MainMenu()
                    A = 0
                } else if (selectedIndex == 1) {
                    Level(1)
                    A = 0
                } else if (selectedIndex == 2) {
                    Level(2)
                    A = 0
                } else if (selectedIndex == 3) {
                    Level(3)
                    A = 0
                } else if (selectedIndex == 4) {
                    Level(4)
                    A = 0
                } else if (selectedIndex == 5) {
                    Level(5)
                    A = 0
                } else if (selectedIndex == 6) {
                    Level(6)
                    A = 0
                } else if (selectedIndex == 7) {
                    Level(7)
                    A = 0
                } else if (selectedIndex == 8) {
                    Level(8)
                    A = 0
                } else if (selectedIndex == 9) {
                    Level(9)
                    A = 0
                } else if (selectedIndex == 10) {
                    Level(10)
                    A = 0
                } else if (selectedIndex == 11) {
                    Level(11)
                    A = 0
                }
                LvlSel.close()
            })
            LvlSel.setMenuStyleProperty(miniMenu.MenuStyleProperty.Rows, 1)
        } else if (selectedIndex == 2) {
            Menu.close()
            Misc = miniMenu.createMenu(
            miniMenu.createMenuItem("Back", assets.image`X`),
            miniMenu.createMenuItem("Editor", assets.image`Hamer`)
            )
            Misc.onButtonPressed(controller.A, function (selection, selectedIndex) {
                if (selectedIndex == 0) {
                    Misc.close()
                    MainMenu()
                } else if (selectedIndex == 1) {
                    sprites.destroy(Title)
                    Misc.close()
                    tiles.setCurrentTilemap(tilemap`Editor`)
                    Editor()
                }
            })
        }
    })
}
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
                    Playar.vy = -100
                    pause(200)
                }
                Playar.vx = 110
            }
        }
    } else {
        if (Playtesting == 0 && !(tiles.tileAtLocationEquals(Playar.tilemapLocation(), assets.tile`Ground`) || (tiles.tileAtLocationEquals(Playar.tilemapLocation(), assets.tile`Ground0`) || (tiles.tileAtLocationEquals(Playar.tilemapLocation(), assets.tile`Ground1`) || (tiles.tileAtLocationEquals(Playar.tilemapLocation(), assets.tile`Ground2`) || tiles.tileAtLocationEquals(Playar.tilemapLocation(), assets.tile`StartPos`)))))) {
            if (SelVar == 1) {
                tiles.setTileAt(Playar.tilemapLocation(), assets.tile`Block`)
                tiles.setWallAt(Playar.tilemapLocation(), true)
            } else if (SelVar == 2) {
                tiles.setTileAt(Playar.tilemapLocation(), assets.tile`Block0`)
                tiles.setWallAt(Playar.tilemapLocation(), true)
            } else if (SelVar == 3) {
                tiles.setTileAt(Playar.tilemapLocation(), assets.tile`Slab`)
                tiles.setWallAt(Playar.tilemapLocation(), true)
            } else if (SelVar == 4) {
                tiles.setTileAt(Playar.tilemapLocation(), assets.tile`Block2`)
                tiles.setWallAt(Playar.tilemapLocation(), true)
            } else if (SelVar == 5) {
                tiles.setTileAt(Playar.tilemapLocation(), assets.tile`Spike`)
                tiles.setWallAt(Playar.tilemapLocation(), true)
            } else if (SelVar == 6) {
                tiles.setTileAt(Playar.tilemapLocation(), assets.tile`Spike4`)
                tiles.setWallAt(Playar.tilemapLocation(), true)
            } else if (SelVar == 7) {
                tiles.setTileAt(Playar.tilemapLocation(), assets.tile`Deco`)
                tiles.setWallAt(Playar.tilemapLocation(), true)
            } else if (SelVar == 8) {
                tiles.setTileAt(Playar.tilemapLocation(), assets.tile`Spike2`)
                tiles.setWallAt(Playar.tilemapLocation(), true)
            } else if (SelVar == 9) {
                tiles.setTileAt(Playar.tilemapLocation(), assets.tile`Spike3`)
                tiles.setWallAt(Playar.tilemapLocation(), true)
            } else if (SelVar == 10) {
                tileUtil.replaceAllTiles(assets.tile`StartPos`, assets.tile`transparency16`)
                tiles.setTileAt(Playar.tilemapLocation(), assets.tile`StartPos`)
                tiles.setWallAt(Playar.tilemapLocation(), false)
            } else if (SelVar == 11) {
                tiles.setTileAt(Playar.tilemapLocation(), assets.tile`Ship`)
                tiles.setWallAt(Playar.tilemapLocation(), false)
            } else if (SelVar == 12) {
                tiles.setTileAt(Playar.tilemapLocation(), assets.tile`Cube`)
                tiles.setWallAt(Playar.tilemapLocation(), false)
            }
        }
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (InEditor == 1 && !(tiles.tileAtLocationEquals(Playar.tilemapLocation(), assets.tile`Ground`) || (tiles.tileAtLocationEquals(Playar.tilemapLocation(), assets.tile`Ground0`) || (tiles.tileAtLocationEquals(Playar.tilemapLocation(), assets.tile`Ground1`) || (tiles.tileAtLocationEquals(Playar.tilemapLocation(), assets.tile`Ground2`) || tiles.tileAtLocationEquals(Playar.tilemapLocation(), assets.tile`StartPos`)))))) {
        tiles.setTileAt(Playar.tilemapLocation(), assets.tile`transparency16`)
        tiles.setWallAt(Playar.tilemapLocation(), false)
    }
})
function Editor () {
    sprites.destroy(Playar)
    sprites.destroy(Title)
    SelFrame = sprites.create(assets.image`SelFrame`, SpriteKind.Player)
    SelFrame.scale = 3
    SelFrame.setPosition(80, 105)
    Select = sprites.create(assets.image`Selector`, SpriteKind.Player)
    Select.setPosition(11, 95)
    Select.scale = 2
    Back = sprites.create(assets.image`X`, SpriteKind.Player)
    Back.setPosition(8, 6)
    Playar = sprites.create(assets.image`Crosshair`, SpriteKind.Player)
    scene.cameraFollowSprite(Playar)
    Playar.setPosition(16, 118)
    SelFrame.setFlag(SpriteFlag.RelativeToCamera, true)
    Select.setFlag(SpriteFlag.RelativeToCamera, true)
    Back.setFlag(SpriteFlag.RelativeToCamera, true)
    Playar.setFlag(SpriteFlag.GhostThroughWalls, true)
    controller.moveSprite(Playar, 100, 100)
    InEditor = 1
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (controller.B.isPressed() && InEditor == 1) {
        if (SelVar != 12) {
            SelVar += 1
        } else {
            SelVar = 1
        }
        if (SelVar == 1) {
            Select.setImage(assets.image`Selector`)
        } else if (SelVar == 2) {
            Select.setImage(assets.image`SelBlock2`)
        } else if (SelVar == 3) {
            Select.setImage(assets.image`SelSlab`)
        } else if (SelVar == 4) {
            Select.setImage(assets.image`SelBlock0`)
        } else if (SelVar == 5) {
            Select.setImage(assets.image`SelSpike`)
        } else if (SelVar == 6) {
            Select.setImage(assets.image`SelSpike0`)
        } else if (SelVar == 7) {
            Select.setImage(assets.image`SelDeco`)
        } else if (SelVar == 8) {
            Select.setImage(assets.image`SelSpike2`)
        } else if (SelVar == 9) {
            Select.setImage(assets.image`SelSpike1`)
        } else if (SelVar == 10) {
            Select.setImage(assets.image`SelStart`)
        } else if (SelVar == 11) {
            Select.setImage(assets.image`SelShip`)
        } else if (SelVar == 12) {
            Select.setImage(assets.image`SelCube`)
        }
    }
})
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    if (InLevel == 1) {
        if (tiles.tileAtLocationEquals(location, assets.tile`Spike3`) || (tiles.tileAtLocationEquals(location, assets.tile`Spike4`) || (tiles.tileAtLocationEquals(location, assets.tile`Spike0`) || tiles.tileAtLocationEquals(location, assets.tile`Spike2`))) || (tiles.tileAtLocationEquals(location, assets.tile`Spike`) || Playar.isHittingTile(CollisionDirection.Right))) {
            if (Playtesting == 0) {
                effects.clearParticles(Playar)
                Gamemode = 1
                Progress.value = 0
                tiles.placeOnTile(Playar, tiles.getTileLocation(0, 14))
                Playar.vx = 110
            } else {
                sprites.destroy(DiedAt)
                DiedAt = sprites.create(assets.image`X`, SpriteKind.Player)
                DiedAt.setPosition(Playar.x, Playar.y)
                Playtesting = 0
                InLevel = 0
                Editor()
            }
        }
    }
})
controller.B.onEvent(ControllerButtonEvent.Repeated, function () {
    if (InEditor == 1) {
        if (game.askForNumber("Exit?, 1=Yes") == 1) {
            game.reset()
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`YellowPad`, function (sprite, location) {
    if (InEditor == 0) {
        if (Gamemode == 1) {
            Playar.vy = -180
            Playar.setImage(assets.image`Jump`)
            pause(500)
            Playar.vy = 150
            Playar.setImage(assets.image`Jump0`)
            pause(370)
            Playar.setImage(assets.image`Player`)
        } else if (Gamemode == 2) {
            Playar.vy = -100
            pause(300)
            Playar.vy = 100
        }
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (A == 1) {
        LvlSel.x += 108
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (A == 1) {
        LvlSel.x += -108
    }
})
function Level (Id: number) {
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    if (Id == 1) {
        tiles.setCurrentTilemap(tilemap`Level1`)
    } else if (Id == 2) {
        tiles.setCurrentTilemap(tilemap`Level2`)
    } else if (Id == 3) {
        tiles.setCurrentTilemap(tilemap`Level3`)
    } else if (Id == 4) {
        tiles.setCurrentTilemap(tilemap`Level4`)
    } else if (Id == 5) {
        tiles.setCurrentTilemap(tilemap`Level5`)
    } else if (Id == 6) {
        tiles.setCurrentTilemap(tilemap`Level6`)
    } else if (Id == 7) {
        tiles.setCurrentTilemap(tilemap`Level7`)
    } else if (Id == 8) {
        tiles.setCurrentTilemap(tilemap`Level8`)
    } else if (Id == 9) {
        tiles.setCurrentTilemap(tilemap`Level9`)
    } else if (Id == 10) {
        tiles.setCurrentTilemap(tilemap`Level10`)
    } else if (Id == 11) {
        tiles.setCurrentTilemap(tilemap`Level11`)
    }
    Playar = sprites.create(assets.image`Player`, SpriteKind.Player)
    cameraOffsetScene.cameraFollowWithOffset(Playar, 40, 0)
    Playar.vx = 110
    tiles.placeOnTile(Playar, tiles.getTileLocation(0, 14))
    Progress = statusbars.create(90, 8, StatusBarKind.Energy)
    Progress.setColor(7, 0)
    Progress.value = 0
    Progress.setPosition(80, 17)
    InLevel = 1
}
controller.A.onEvent(ControllerButtonEvent.Released, function () {
    if (Gamemode == 2) {
        Playar.vy = 100
    }
})
statusbars.onStatusReached(StatusBarKind.Energy, statusbars.StatusComparison.GTE, statusbars.ComparisonType.Percentage, 100, function (status) {
    game.gameOver(true)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`Cube`, function (sprite, location) {
    if (InEditor == 0) {
        Gamemode = 1
        Playar.setImage(assets.image`Player`)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`Ship`, function (sprite, location) {
    if (InEditor == 0) {
        Gamemode = 2
        Playar.setImage(assets.image`PlayerShip`)
        Playar.startEffect(effects.trail)
    }
})
let DiedAt: Sprite = null
let Misc: miniMenu.MenuSprite = null
let A = 0
let LvlSel: miniMenu.MenuSprite = null
let Menu: miniMenu.MenuSprite = null
let Title: Sprite = null
let Playtesting = 0
let Back: Sprite = null
let SelFrame: Sprite = null
let Select: Sprite = null
let Playar: Sprite = null
let SelVar = 0
let Gamemode = 0
let InLevel = 0
let InEditor = 0
let Progress: StatusBarSprite = null
Progress = statusbars.create(0, 0, StatusBarKind.Energy)
tiles.setCurrentTilemap(tilemap`MenuBack`)
InEditor = 0
InLevel = 0
Gamemode = 1
SelVar = 1
MainMenu()
forever(function () {
    pause(tileUtil.tilemapProperty(tileUtil.currentTilemap(), tileUtil.TilemapProperty.PixelWidth) / 11)
    Progress.value += 1
})
