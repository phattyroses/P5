//Variable for holding the unique google maps API key
var APIKey = 'AIzaSyBOzHU6514bivAZ_UIhpRwaYXcNTTLfrqs';
//Array to hold all the markers created by 'populateMap'
var markers = [];


var CLIENT_ID = '2UKHNR0FBMK41ZVHJ0VWFN5WVGH0B4TAQBQ2EEE4MBE51YEA';
var CLIENT_SECRET = '2UKHNR0FBMK41ZVHJ0VWFN5WVGH0B4TAQBQ2EEE4MBE51YEA';
//var infoContent = '<div>'+ menuHolder +'</div>';


var menuHolder =[]


//Array to hold parsed JSON data from FourSquare.  Elements are: 0: Name,

//This is the data.  Hardcoding more data will automatically update the list of places and the markers on the map.  However,
//if more places are added, additional 'else if' conditions will need to be added with index updates to correspond
//with the index of the new entry.
var places = [
{
	title: "Antonio's",
	position: {lat: 42.376207, lng: -72.519618},
	map: map,
	varName : "antonio",
	markerIndex: 0,
	fourURL: '4aca36f3f964a520e8c020e3?oauth_token=TTAIIQUS3BHPST0N5TCGDHNXQSMWVTTI0HR5V2JPUAKHZPNU',
	image: 'images/antonios.jpg'
},
/*{
	title: "Rao's Coffee",
	position: {lat: 42.377372, lng: -72.518867},
	map: map,
	varName : "Rao",
	markerIndex: 1,
	fourURL: '4a922525f964a520df1c20e3?oauth_token=TTAIIQUS3BHPST0N5TCGDHNXQSMWVTTI0HR5V2JPUAKHZPNU',
	image: 'images/raos.jpg'
},*/
{
	title: "Bueno Y Sano",
	position: {lat: 42.375983, lng: -72.518432},
	map: map,
	varName: "Bueno",
	markerIndex: 2,
	fourURL: '4ba13b82f964a52067a437e3?oauth_token=TTAIIQUS3BHPST0N5TCGDHNXQSMWVTTI0HR5V2JPUAKHZPNU',
	image: 'images/bueno.jpg'
},
/*{
	title: "Subway",
	position: {lat: 42.375827, lng: -72.519603},
	varName: "Subway",
	markerIndex: 3
},*/
{
	title: "The Black Sheep",
	position: {lat: 42.375609, lng: -72.518150},
	map: map,
	varName: "BlackSheep",
	markerIndex: 4,
	fourURL: '4abbc3c4f964a520c88420e3?oauth_token=TTAIIQUS3BHPST0N5TCGDHNXQSMWVTTI0HR5V2JPUAKHZPNU',
	image: 'images/blackSheep.jpg'
},
{
	title: "Judie's Restaurant",
	position: {lat: 42.376470, lng: -72.519666},
	map: map,
	varName: "Judie",
	markerIndex: 5,
	fourURL: '4b84d0c3f964a520c34431e3?oauth_token=TTAIIQUS3BHPST0N5TCGDHNXQSMWVTTI0HR5V2JPUAKHZPNU',
	image: 'images/judy.jpg'

},
{
	title: "Panda East Chinese Restaurant",
	position: {lat: 42.377180, lng: -72.519186},
	map: map,
	varName: "Panda",
	markerIndex: 6,
	fourURL: '4acbcd91f964a520bbc720e3?oauth_token=TTAIIQUS3BHPST0N5TCGDHNXQSMWVTTI0HR5V2JPUAKHZPNU',
	image: 'images/panda.jpg'
}

];

//ajax call to be made when a marker or list item is clicked
var ajaxCall= function(urlIndex, imageIndex){
	$.ajax({url:'https://api.foursquare.com/v2/venues/'+urlIndex+'&v=20151114&client_id='+CLIENT_ID+'&client_secret='+ CLIENT_SECRET+ '&v=20130815&ll=40.7,-74',
				dataType: 'jsonp',
				success: function(data){
				console.log(data.response.venue.contact);
				console.log(data);
 				menuHolder.push(data.response.venue.name);
				console.log(menuHolder);
				$('#mapRow').append(menuHolder);
				nameHolder = data.response.venue.name
				phoneHolder = data.response.venue.contact.formattedPhone
				imageHolder = imageIndex;
				twitterHolder = data.response.venue.contact.twitter;
				facebookHolder = data.response.venue.contact.facebookUsername;
				urlHolder = data.response.venue.url;
				phraseZeroHolder = data.response.venue.phrases[0].sample.text;
				rating = data.response.venue.rating;
				//phraseTwoHolder = data.response.venue.phrases[2].sample.text;
				formattedString = '<h2>'+nameHolder+'</h2><p>URL: '+urlHolder+'</p><p>Phone Number: '+ phoneHolder +'</p><p>Twitter: '+twitterHolder+'</p>'+
										'<p>Facebook: facebook.com/'+facebookHolder+' </p><img src ="'+imageHolder+'"><h3>What People Are Saying:</h3>'+
										'<p>'+phraseZeroHolder+'</p><p>Rating '+rating+'</p>'//<p>"'+phraseTwoHolder+'"</p>'

				infoWindow.setContent(formattedString);
				}

	})
}
ajaxCall(places[4].fourURL, places[4].image);

//An initialization of the global map variable.  This refers to the map itself.
var map;

$

//Creats and adds all markers to the map based on the data in 'places' and pushes these markers to the 'markers' array.
var marker;
var infoWindow;
var populateMap = function(){
	//markers = [''];
		for(var i=0; i<places.length; i++){

		 marker = new google.maps.Marker({
    		position: places[i].position,
    		animation: google.maps.Animation.DROP,
    		map: map
		});
		 //imediately call this function to get the current state of 'marker'(passed as a param. assigned to each new marker) so
		 //that only the marker selected will animate and not just the last marker.
		(function(currentMarker){
	  		currentMarker.addListener('click', function(){


		//menuHolder.push(phoneNumber);

	  			if (currentMarker.getAnimation() !== null) {
    				currentMarker.setAnimation(null);
    				infoWindow.close(map, currentMarker);
  				} else {
    				currentMarker.setAnimation(google.maps.Animation.BOUNCE);
    				infoWindow.open(map, currentMarker);
  				}
  			});
	  				 infoWindow = new google.maps.InfoWindow({
						//content: infoContent
						content: '<div>'+menuHolder+'</div>',
						maxWidth: 600
					});
		})(marker);

		marker.setMap(map);
		markers.push(marker);

	}

};


//This function is called when the google maps script is initially run.  Sets up the map on the screen.
var initMap = function() {
	var mapCenter = {lat: 42.376473, lng: -72.518734};
   map = new google.maps.Map(document.getElementById('map'),
   {
    center: mapCenter,
    //This zoom seemed to be most appropriate for the mobile view.  It's a little zoomed out for the larger views, but I think it's
    //the best compromise.
    zoom: 16
  });
   //Call function to put markers on the map
   populateMap();


  //Resizes the map as the window size is adjusted.  Adapted from http://softwarewalker.com/2014/05/07/using-google-maps-in-a-responsive-design/
  var mapParentWidth = $('#mapRow').width();
    $('#map').width(mapParentWidth*.75);
    $('#map').height(3 * mapParentWidth / 4);
}
var resizeBootstrapMap =function () {

    var mapParentWidth = $('#mapRow').width();
    if (mapParentWidth <= 768){
    	$('#map').width(mapParentWidth*.75);
    	$('#map').height(3 * mapParentWidth / 5);

    }else if (mapParentWidth <= 455){
    	$('#map').width(mapParentWidth*.75);
    	$('#map').height(3 * mapParentWidth / 6);

    }
    else{
    	$('#map').width(mapParentWidth*.75);
    	$('#map').height(3 * mapParentWidth / 4);
    }
    	google.maps.event.trigger($('#map resize'));


}






console.log(menuHolder);
$(window).resize(resizeBootstrapMap);

//This is the ViewModel for interacting with the UI.  Uses knockout.js.
var ViewModel = function(){

	var self = this;
	//Observable array which starts as a copy of the places array.
	this.placesList = ko.observableArray([]);
	this.search_term = 'bowery';
	//Observable array which starts as a copy of the markers array. Populated by 'markersPop()'
	this.markersList = ko.observableArray([]);

	/*this.searchTwitter = function(search_term){
		console.log("searchTwitter initiated");
		$.ajax({
				url: 'http://search.twitter.com/search.json?'+ search_term,
				dataType: 'jsonp',
				success: function(data){
					console.log(search_term);
				}
			});
		}
*/
	//Adds an object literal to 'placesList'
	this.addName = function(placesIndex){
		self.placesList([placesIndex]);
		};
	this.addOtherName = function(placesIndex){
		self.placesList.push(placesIndex);
	}
	//Clears 'placesList' of all contents
	this.removeNames = function(newName){
		self.placesList([]);
	}

	//Sets all the markers on the map
	this.setMapOnAll= function(map){
		for (var i=0; i<markers.length; i++){
		markers[i].setMap(map);
		}
	}
	//Removes all markers from the map
	this.clearMarkers=function(){
		this.setMapOnAll(null);
	}

	//Function for populating the initial list of names, 'placesList'
	this.listNamesPop = function(){
		for (var i = 0; i<places.length; i++){
			this.placesList().push(places[i]);

		}
	};

	//Function for populating the initial list of markers, 'markersList'
	this.markersPop = function(){
		for (var i=0; i<markers.length; i++){
			self.markersList.push(markers[i]);
		}
	}

//initial population of the list of names and the markers on the map
this.listNamesPop();
this.markersPop();



//Resets the list of names and the markers on the map.  Called by the 'Reset List' button and by searches for values not contained
//within the list.
this.resetForm = function(){
	this.removeNames();


			for (var i=0; i<markers.length; i++){
				markers[i].setMap(map);
			}

			for (var i=0; i<places.length; i++){
				this.placesList.push(places[i]);

			}
}

//When a list item is clicked, the associated object from placesList is passed.  Each object assigned in 'places' is given a
//markerIndex which corresponds to marker in "markerList".  This function simply indexes into the 'markers' array via
//its associated 'placesList' object, and then toggles its animated state.  Because a click on the actual map marker also toggles
// via a similar function, clicking either the map marker or its associated list marker will toggle the state.
	this.animateFromList = function(data){
			//data.addListener('click', function(){
	  			if (markers[data.markerIndex].getAnimation() !== null) {
    				markers[data.markerIndex].setAnimation(null);
    				infoWindow.close(map, markers[data.markerIndex]);
  				} else {
    				markers[data.markerIndex].setAnimation(google.maps.Animation.BOUNCE);
    				infoWindow.open(map, markers[data.markerIndex]);
  				}
  			//});


	}

	//Stores the value returned when the 'Submit' button is pressed
	this.searchValue = ko.observable('');
//This function updates as the user types into the search bar and filters the results accordingly.
	this.filterList = function(data, event){

		//Contains the returned vales from 'searchIndex'
		valuesArray = [];
		//Iterate through all the places
		for (var i = 0; i<places.length; i++){
			//compare the lower case version of each title in places with the lowercase version of what is being typed in.
			//If there is NOT a match, -1 is returned.
			var searchIndex = places[i].title.toLowerCase().search(event.currentTarget.value.toLowerCase());
			//push the value returned in 'searchIndex' to the 'valuesArray'
			valuesArray.push(searchIndex);
		}

		//clear these so they can be updated without duplication
		self.placesList([]);
		self.clearMarkers();
		//Iterate through all the values in 'valuesArray'
		for (var j=0; j<valuesArray.length; j++){
			//store the current value of j
			var index = j;
			//Imediatly call a function to use the value stored in 'index'
				 (function(index){
				 	//compare the current value in the 'valuesArray' to see if it is a matching substring (ie, not -1)
					if (valuesArray[index].valueOf() !== -1){
					//If there is a match, place the markers and list items on the screen
					markers[index].setMap(map);
					self.addOtherName(places[index]);
					}
				})(index);
		}
	return true;
	}
	//Function called by search (when 'Submit' button is pressed)
	//Check the returned value from the search against the values stored in the 'places' array
	//To use, add a button for search and one for reset and wire them appropriately.
	/*this.returnSearch = ko.observable(function(){
		console.log("returnSearch");
		if (this.searchValue().toLowerCase() === places[0].title.toLowerCase()){
			console.log(markers[0]);
				this.clearMarkers();
				markers[0].setMap(map);
				this.addName(places[0]);
		}else if(this.searchValue().toLowerCase() === places[1].title.toLowerCase()){
			this.clearMarkers();
			markers[1].setMap(map);
			this.addName(places[1]);
		}else if(this.searchValue().toLowerCase() === places[2].title.toLowerCase()){
			this.clearMarkers();
			markers[2].setMap(map);
			this.addName(places[2]);
		}
		else if(this.searchValue().toLowerCase() === places[3].title.toLowerCase()){
			this.clearMarkers();
			markers[3].setMap(map);
			this.addName(places[3]);
		}else if(this.searchValue().toLowerCase() === places[4].title.toLowerCase()){
			this.clearMarkers();
			markers[4].setMap(map);
			this.addName(places[4]);
		}
		//If nothing is entered in the search or the value doesn't match anything in the list, return to the original state.
		else{
			this.resetForm();
		}
	//Clear the contents of the search box after 'Submit' is clicked.
	this.searchValue('');

	});*/

}

//Apply the bindings between ViewModel and the UI
ko.applyBindings(new ViewModel());

