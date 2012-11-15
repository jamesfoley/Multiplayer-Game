//	On Jaws load...
jaws.onload = function() {
	
	//	Unpack Jaws
	jaws.unpack();

	//	Add assets
	jaws.assets.add([]);

	//	Start the game.
	jaws.start(Game);
}