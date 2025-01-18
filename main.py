def on_hit_wall(sprite, location):
    if InLevel == 1 and (tiles.tile_at_location_equals(location, assets.tile("""
        Spike3
    """)) or (tiles.tile_at_location_equals(location, assets.tile("""
        Spike4
    """)) or (tiles.tile_at_location_equals(location, assets.tile("""
        Spike0
    """)) or tiles.tile_at_location_equals(location, assets.tile("""
        Spike2
    """)))) or (Playar.is_hitting_tile(CollisionDirection.BOTTOM) or tiles.tile_at_location_equals(location, assets.tile("""
        Spike
    """)))):
        music.play(music.melody_playable(music.power_down),
            music.PlaybackMode.UNTIL_DONE)
        Progress.value = 0
        tiles.place_on_tile(Playar, tiles.get_tile_location(0, 14))
        Playar.vx = 110
scene.on_hit_wall(SpriteKind.player, on_hit_wall)

def on_a_pressed():
    while controller.A.is_pressed() and InLevel == 1:
        Playar.vy = -150
        Playar.set_image(assets.image("""
            Jump
        """))
        pause(370)
        Playar.set_image(assets.image("""
            Jump0
        """))
        Playar.vy = 150
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def Menu2():
    global Title, Menu
    scene.set_background_color(9)
    Title = sprites.create(assets.image("""
        Title
    """), SpriteKind.food)
    Title.set_position(81, 32)
    Title.scale = 0.8
    tiles.set_current_tilemap(tilemap("""
        MenuScreen
    """))
    Menu = miniMenu.create_menu(miniMenu.create_menu_item("1", assets.image("""
            Info
        """)),
        miniMenu.create_menu_item("2", assets.image("""
            Play
        """)),
        miniMenu.create_menu_item("3", assets.image("""
            Misc
        """)))
    Menu.set_style_property(miniMenu.StyleKind.DEFAULT,
        miniMenu.StyleProperty.ICON_ONLY,
        1)
    Menu.set_menu_style_property(miniMenu.MenuStyleProperty.ROWS, 1)
    Menu.set_menu_style_property(miniMenu.MenuStyleProperty.COLUMNS, 3)
    Menu.set_style_property(miniMenu.StyleKind.DEFAULT,
        miniMenu.StyleProperty.ALIGNMENT,
        1)
    Menu.set_menu_style_property(miniMenu.MenuStyleProperty.BACKGROUND_COLOR, 0)
    Menu.set_dimensions(100, 50)
    Menu.set_position(77, 75)
    
    def on_button_pressed(selection, selectedIndex):
        if selectedIndex == 1:
            sprites.destroy(Title)
            Level(1)
            Menu.close()
    Menu.on_button_pressed(controller.A, on_button_pressed)
    
def Level(Id: number):
    global Playar, InLevel, Progress
    sprites.destroy_all_sprites_of_kind(SpriteKind.player)
    if Id == 1:
        tiles.set_current_tilemap(tilemap("""
            Level1
        """))
    Playar = sprites.create(assets.image("""
        Player
    """), SpriteKind.player)
    Playar.vx = 110
    tiles.place_on_tile(Playar, tiles.get_tile_location(0, 14))
    cameraOffsetScene.camera_follow_with_offset(Playar, 40, 0)
    Playar.vy = 150
    InLevel = 1
    Progress = statusbars.create(90, 8, StatusBarKind.energy)
    Progress.set_color(7, 0)
    Progress.value = 0
    Progress.set_position(80, 17)

def on_status_reached_comparison_gte_type_percentage(status):
    game.game_over(True)
statusbars.on_status_reached(StatusBarKind.energy,
    statusbars.StatusComparison.GTE,
    statusbars.ComparisonType.PERCENTAGE,
    100,
    on_status_reached_comparison_gte_type_percentage)

Menu: miniMenu.MenuSprite = None
Title: Sprite = None
Progress: StatusBarSprite = None
Playar: Sprite = None
InLevel = 0
InLevel = 0
Menu2()

def on_forever():
    if InLevel == 1:
        pause(tileUtil.tilemap_property(tileUtil.current_tilemap(),
            tileUtil.TilemapProperty.PIXEL_WIDTH) / 10)
        Progress.value += 1
forever(on_forever)
