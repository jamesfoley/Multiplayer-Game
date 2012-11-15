//	Create the game function. This will be called by Jaws on Jaws load.
function Game(){

	//	Define game variables
	var width = 620;
	var vheight = 620;
	var viewport;
	var tile_map;

	//	Called once when a game state is activated. Use it for one-time setup code.
	this.setup = function() {

		//	Build the viewport
		viewport = new jaws.Viewport({max_x: width*32, max_y: height*32});

		//	Build the tile map
		tile_map = new jaws.TileMap({size: [width, height], cell_size: [32,32]});

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