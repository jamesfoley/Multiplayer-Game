//	On Jaws load...
jaws.onload = function() {

	//	Unpack Jaws
	jaws.unpack();

	//	Add assets
	jaws.assets.add(['/assets/img/textures/grass.png']);

	//	Start the game.
	jaws.start(Game);
}