$( document ).ready( function(){
	//store a reference
	var $li = $( 'li' );
		
	function randomMove(){
		//randomly size and move items within bounds of the screen
		$li.each( function( index ){
			//get random timing interval
			var randomTimer = Math.random() * 500 + 500;
			var randomDistanceRatio = Math.random(); //same for distance

			var partialScreen = 0.33;

			var ourThis = $( this ); //store a reference for ease

			var height = $( window ).height() * partialScreen;
			var width = $( window ).width() * partialScreen;

			var objectWidth = ourThis.width();
			var objectHeight = ourThis.height();

			var objectOffset = ourThis.offset();

			//flags for direction
			var directionIsDown 	= ( objectOffset.top > height ) ? true : false;
			var directionIsLeft 	= ( objectOffset.left < 0 ) ? true : false; 

			//move the things
			if( directionIsDown && !directionIsLeft ){ //all is normal
				move( this )
					.x( randomDistanceRatio * width  )
					.y( randomDistanceRatio * height )
					.ease( 'out' )
					.duration( randomTimer )
					.end();
			}else if( !directionIsDown && directionIsLeft ){ //too far down
				move( this )
					.x( randomDistanceRatio * width  )
					.y( -randomDistanceRatio * height )
					.ease( 'out' )
					.duration( randomTimer )
					.end();
			}else if( !directionIsDown && !directionIsLeft ){ //too far right
				move( this )
					.x( -randomDistanceRatio * width  )
					.y( randomDistanceRatio * height )
					.ease( 'out' )
					.duration( randomTimer )
					.end();
			}else{ //too far down and right
				move( this )
					.x( -randomDistanceRatio * width  )
					.y( -randomDistanceRatio * height )
					.ease( 'out' )
					.duration( randomTimer )
					.end();
			}
		} );
	}
	//often
	var clearRandom = setInterval( randomMove, ( Math.random() * 4321 ) );
	
	//on press of items
	$li.on( 'tap, click', function( e ){
		//store a reference for quick repeated use
		var targetGoTo = $( '#targetGoTo' ).offset();
		
		//get the point that we need to get the pieces to
		var targetTop = targetGoTo.top;
		var targetLeft = targetGoTo.left + targetGoTo.width;
		var target = this;
		
		//move it there from wherever it is
		var bounce = new Bounce();
		bounce
			.translate({
				to: { x: 150, y: -200 },
				duration: 600,
				stiffness: 4
			})
			.scale({
				from: { x: 1, y: 1 },
				to: { x: 0.3, y: 7.3 },
				easing: "sway",
				duration: 800,
				delay: 65,
				stiffness: 2
			})
			.scale({
				from: { x: 1, y: 1},
				to: { x: 15, y: 1 },
				easing: "sway",
				duration: 300,
				delay: 30,
			})
			.applyTo( target );
		sweep(  target, 'color', '#fff', '#000', {direction: 1, duration: 2000});
		function goThere(){
			//open their respective contact
			var place = $( this ).attr( 'data-contact' );
			window.open( place );
		}
		//remove the interval
		clearInterval( clearRandom );
	} );
} );