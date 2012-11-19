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
	//	Defaulting the player in by 32 pixels, so they're not outside the viewport
        player = new jaws.Sprite({x:32, y:32, scale: 1, anchor: "center"});

	//	Create player animation
	var player_anim = new jaws.Animation({sprite_sheet: "/assets/img/players/default.png", frame_size: [27,32], frame_duration: 100});
        
	// 	Actual player animation
	player.anim_default 	= player_anim.slice(0, 1);
        player.anim_up 		= player_anim.slice(1, 5);
        player.anim_down 	= player_anim.slice(5, 9);
        player.anim_left 	= player_anim.slice(9, 13);
        player.anim_right 	= player_anim.slice(13, 17);

        //	Set the player to idle
        player.setImage(player.anim_default.next());

        jaws.preventDefaultKeys(["up", "down", "left", "right"]);

	}

	//	Called each game tick with your specified FPS. Logic goes here.
	this.update = function() {

	//	Set a default speed for the player
	var speed = 1.5;
	
	//	Player movement
	//	Hmmm, need to find out how to detect the player X and Y
	if(jaws.pressed("left"))  { 
		player.move(-(speed),0); 
		
		var player_coords = border_collision_det(player.x, player.y, speed);

		if(player_coords > player.x)
			player.x = (player.x + (speed * 2));

		player.setImage(player.anim_left.next());

	}

        if(jaws.pressed("right")) { 
		player.move(speed, 0);   

		var player_coords = border_collision_det(player.x, player.y, speed);

		if(player_coords < player.x)
			player.x = (player.x - (speed * 2));

		player.setImage(player.anim_right.next());

	}

        if(jaws.pressed("up"))    { 
		player.move(0, -(speed)); 

		var player_coords = border_collision_det(player.x, player.y, speed);

		if(player_coords > player.y)
			player.y = (player.y + (speed * 2));

		player.setImage(player.anim_up.next());

	}

        if(jaws.pressed("down"))  {
		player.move(0, speed);  

		var player_coords = border_collision_det(player.x, player.y, speed);
		
		if(player_coords < player.y)
			player.y = (player.y - (speed * 2));

		player.setImage(player.anim_down.next());

	}

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

function border_collision_det(x, y, speed) {
	
	// Little bit'o collision detection for borders
	if(x < 16) {
		x = x + speed;
		return x;
	} else if(y < 16) {
		y = y + speed;
		return y;
	} else if(x > 684) {
		x = x - speed;
		return x;
	} else if(y > 684) {
		y = y - speed;
		return y;
	}

}

function log(message) {
	
	//var text = this.findElementByClass('game_log');

	//text.append(message);

}