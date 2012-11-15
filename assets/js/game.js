//	Create the game function. This will be called by Jaws on Jaws load.
function Game(){

	//	Define game variables
	var width = 700;
	var height = 700;
	var viewport;
	var tile_map;

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

	}

	//	Called each game tick with your specified FPS. Logic goes here.
	this.update = function() {
	}

	//	Directly after each update draw() will be called. Put all your on-screen operations here.
    this.draw = function() {

    	//	Clear the cavas
    	jaws.clear();

    	//	Draw the tilemap
    	viewport.drawTileMap(tile_map);

    }

}