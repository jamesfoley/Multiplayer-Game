//	Create the game function. This will be called by Jaws on Jaws load.
function Game(){

	//	Define game variables
	var width = 700;
	var height = 700;
	var viewport;
	var tile_map;
	var player;

	//	Called once when a game state is activated. Use it for one-time setup code.
	this.setup = function() {

		//	Build the viewport. So this is going to give us a 22400x22400 world using 32x32px tiles... I think.
		viewport = new jaws.Viewport({max_x: width*32, max_y: height*32});

		//	Build the tile map. Seeing as we are using 32x32px tiles, we can just use the width and hight for the tile map
		//	and maths should do the rest...
		tile_map = new jaws.TileMap({size: [width, height], cell_size: [32,32]});

		//	Create the grass
		var grass = new jaws.SpriteList();

		//	Loop over the every cell in the width
		for(var i = 0; i < width; i++) {

			//	For each width, loop over the height cells too
			for(var i2 = 0; i2 < height; i2++) {

				//	Push a grass sprite into this cell
				grass.push(new Sprite({image: "/assets/img/textures/grass.png", x: i*32, y: i2*32}));
			}
        }

        //	Shove the grass into the tilemap
        tile_map.push(grass);

        //	Create the player
        player = new jaws.Sprite({x:10, y:10, scale: 2, anchor: "center"});

		//	Create player animation
		var player_anim = new jaws.Animation({sprite_sheet: "/assets/img/players/default.png", frame_size: [27,32], frame_duration: 100});
        player.anim_default = player_anim.slice(0, 0);
        player.anim_up = player_anim.slice(1, 4);
        player.anim_down = player_anim.slice(5, 8);
        player.anim_left = player_anim.slice(9, 12);
        player.anim_right = player_anim.slice(13, 16);

        //	Set the player to idle
        player.setImage(player.anim_default.next());

        jaws.preventDefaultKeys(["up", "down", "left", "right", "space"]);

	}

	//	Called each game tick with your specified FPS. Logic goes here.
	this.update = function() {

		//	Player movement keys
		if(jaws.pressed("left"))  { player.move(-2,0);  player.setImage(player.anim_left.next()) }
        if(jaws.pressed("right")) { player.move(2,0);   player.setImage(player.anim_right.next()) }
        if(jaws.pressed("up"))    { player.move(0, -2); player.setImage(player.anim_up.next()) }
        if(jaws.pressed("down"))  { player.move(0, 2);  player.setImage(player.anim_down.next()) }

        //	Make sure we center the view around the player
        viewport.centerAround(player);

	}

	//	Directly after each update draw() will be called. Put all your on-screen operations here.
    this.draw = function() {

    	//	Clear the cavas
    	jaws.clear();

    	//	Draw the tilemap
    	viewport.drawTileMap(tile_map);

    	//	Draw the player
    	viewport.draw(player);

    }

}