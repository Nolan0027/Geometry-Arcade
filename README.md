Open this page at [https://nolan0027.github.io/geometry-arcade](https://nolan0027.github.io/geometry-arcade)
- or https://arcade.makecode.com/S53227-65325-23930-30433

This is a fanmade recreation of Robert "Robtop" Topala's Geometry Dash, one of my favorite games, into MakeCode Arcade.

Bugs
- Player doesn't move after dying>~2

Plans
- Main menu [0/1]
- Back on track [0/1]
- Icon customization [0/1]
- Icons [0/10]

## Blocks preview
This image shows the blocks code from the last commit in master.
This image may take a few minutes to refresh.

![A rendered view of the blocks](https://github.com/nolan0027/geometry-arcade/raw/master/.github/makecode/blocks.png)

#### Metadata (used for search, rendering)

* for PXT/arcade
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>

Let Die = sprites.create(img`
. . . f f f f f . 1 . . . . . . 
. . f 7 7 7 7 f 1 . 1 . . . 1 . 
. f 7 7 7 7 7 7 1 1 6 1 1 . . . 
. f 7 7 7 7 7 9 1 9 9 1 1 . 1 . 
1 f 7 7 6 6 1 6 6 6 1 1 6 . . . 
1 f 9 6 6 9 9 9 9 9 6 6 1 6 7 7 
. 6 1 6 9 6 1 1 6 1 9 6 9 7 7 7 
. 1 1 6 1 6 9 9 9 6 9 7 7 7 7 7 
1 6 1 1 9 1 9 1 1 1 7 7 7 7 7 7 
1 6 1 6 9 1 1 1 9 7 7 7 7 7 7 f 
1 6 7 7 7 6 6 6 6 f f 7 7 7 f 1 
1 1 f 7 7 7 7 7 7 7 6 f f f 1 . 
1 1 6 f 7 7 7 7 7 7 f 9 1 . 1 1 
. 1 . 6 f 7 7 f f f 1 1 1 . 1 . 
. 1 1 . 6 f f 6 6 6 1 1 1 1 . . 
. . . 1 . . 1 1 1 . . . . . . . 
`, SpriteKind.Player
