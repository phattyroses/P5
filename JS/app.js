var useStrict = function(){
  "use strict";
};

useStrict();
//Variable for holding the unique google maps API key
var APIKey = 'AIzaSyBOzHU6514bivAZ_UIhpRwaYXcNTTLfrqs';
//Array to hold all the markers created by 'populateMap'
var markers = [];

var CLIENT_ID = '2UKHNR0FBMK41ZVHJ0VWFN5WVGH0B4TAQBQ2EEE4MBE51YEA';
var CLIENT_SECRET = '2UKHNR0FBMK41ZVHJ0VWFN5WVGH0B4TAQBQ2EEE4MBE51YEA';
//var infoContent = '<div>'+ menuHolder +'</div>';

var menuHolder = [];


//This is the data.  Hardcoding more data will automatically update the list of places and the markers on the map.  However,
//if more places are added, additional 'else if' conditions will need to be added with index updates to correspond
//with the index of the new entry.
var places = [
  {
    title: "Antonio's",
    position:
    {
      lat: 42.376207,
      lng: -72.519618
    },
    map: map,
    varName: "antonio",
    markerIndex: 0,
    fourURL: '4aca36f3f964a520e8c020e3?oauth_token=TTAIIQUS3BHPST0N5TCGDHNXQSMWVTTI0HR5V2JPUAKHZPNU',
    image: 'images/antonios.jpg'
  },
  {
    title: "Bueno Y Sano",
    position:
    {
      lat: 42.375983,
      lng: -72.518432
    },
    map: map,
    varName: "Bueno",
    markerIndex: 1,
    fourURL: '4ba13b82f964a52067a437e3?oauth_token=TTAIIQUS3BHPST0N5TCGDHNXQSMWVTTI0HR5V2JPUAKHZPNU',
    image: 'images/bueno.jpg'
  },
  {
    title: "The Black Sheep",
    position:
    {
      lat: 42.375609,
      lng: -72.518150
    },
    map: map,
    varName: "BlackSheep",
    markerIndex: 2,
    fourURL: '4abbc3c4f964a520c88420e3?oauth_token=TTAIIQUS3BHPST0N5TCGDHNXQSMWVTTI0HR5V2JPUAKHZPNU',
    image: 'images/blackSheep.jpg'
  },
  {
    title: "Judie's Restaurant",
    position:
    {
      lat: 42.376470,
      lng: -72.519666
    },
    map: map,
    varName: "Judie",
    markerIndex: 3,
    fourURL: '4b84d0c3f964a520c34431e3?oauth_token=TTAIIQUS3BHPST0N5TCGDHNXQSMWVTTI0HR5V2JPUAKHZPNU',
    image: 'images/judy.jpg'

  },
  {
    title: "Panda East Chinese Restaurant",
    position:
    {
      lat: 42.377180,
      lng: -72.519186
    },
    map: map,
    varName: "Panda",
    markerIndex: 4,
    fourURL: '4acbcd91f964a520bbc720e3?oauth_token=TTAIIQUS3BHPST0N5TCGDHNXQSMWVTTI0HR5V2JPUAKHZPNU',
    image: 'images/panda.jpg'
  }

];

//ajax call to be made when a marker or list item is clicked
var ajaxCall = function(urlIndex, imageIndex)
{     //First clear that content of the infoWindow so it loads cleanly subsequently.
      infoWindow.setContent('');
      //Then set a timer to catch loading issues.  Necessary to use this because of JSONP.
      var timer = setTimeout(function(){
        alert("AJAX error");
          }, 3000);
  $.ajax(
  {
    url: 'https://api.foursquare.com/v2/venues/' + urlIndex + '&v=20151114&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET + '&v=20130815&ll=40.7,-74',
    dataType: 'jsonp',
    success: function(data)
    {
      menuHolder.push(data.response.venue.name);
      var nameHolder = data.response.venue.name;
      var phoneHolder = data.response.venue.contact.formattedPhone;
      var imageHolder = imageIndex;
      var twitterHolder = data.response.venue.contact.twitter;
      var facebookHolder = data.response.venue.contact.facebookUsername;
      var urlHolder = data.response.venue.url;
      var phraseZeroHolder = data.response.venue.phrases[0].sample.text;
      var rating = data.response.venue.rating;
      var fourSquareImg = 'images/foursquare.png';
      var formattedString = '<h2><img src ="' + fourSquareImg + '">' + nameHolder + '</h2><p>URL: ' + urlHolder + '</p><p>Phone Number: ' + phoneHolder + '</p><p>Twitter: ' + twitterHolder + '</p>' +
        '<p>Facebook: facebook.com/' + facebookHolder + ' </p><img src ="' + imageHolder + '"><h3>What People Are Saying:</h3>' +
        '<p>' + phraseZeroHolder + '</p><p>Rating ' + rating + '</p>';
      infoWindow.setContent(formattedString);
      //Finally, clear the timer upon a successful AJAX call.
      clearTimeout(timer);
    }
  });
};

//An initialization of the global map variable.  This refers to the map itself.
var map;

//Creats and adds all markers to the map based on the data in 'places' and pushes these markers to the 'markers' array.
var marker;
var infoWindow;
var setCurrentMarker = function(currentMarker, place){
    currentMarker.addListener('click', function()
      {
        if (currentMarker.getAnimation() !== null)
        {
          currentMarker.setAnimation(null);
          infoWindow.close(map, currentMarker);
          //else if the marker clicked isn't bouncing, before starting all others should stop first.
        }
        else
        {
          for (var i = 0, j=markers.length; i < j; i++)
          {
            markers[i].setAnimation(null);
          }
          ajaxCall(place.fourURL, place.image);
          currentMarker.setAnimation(google.maps.Animation.BOUNCE);
          infoWindow.open(map, currentMarker);
        }
      });
    infoWindow = new google.maps.InfoWindow(
      {
        content: '<div>' + menuHolder + '</div>',
      });
};

var stopCurrentMarker = function(currentMarker){

      google.maps.event.addListener(infoWindow, 'closeclick', function()
      {  for (var i = 0, j=markers.length; i < j; i++)
          {
            markers[i].setAnimation(null);
          }
        currentMarker.setAnimation(null);
        infoWindow.close(map, currentMarker);
      });
    };

var populateMap = function()
{
  for (var i = 0, j=places.length; i < j; i++)
  {
    var placeHolder = places[i];
    marker = new google.maps.Marker(
    {
      position: places[i].position,
      animation: google.maps.Animation.DROP,
      map: map,
      title: 'Get More Information'
    });

    //imediately call this function to get the current state of 'marker'(passed as a param. assigned to each new marker) so
    //that only the marker selected will animate and not just the last marker.
    setCurrentMarker(marker, placeHolder);
    //set up the markers to stop when clicked
    stopCurrentMarker(marker);
    //Put the markers on the map and push them to the 'markers' array.
    marker.setMap(map);
    markers.push(marker);

  }

};
//This function is called when the google maps script is initially run.  Sets up the map on the screen.
var initMap = function()
{
  var mapCenter = {
    lat: 42.378000,
    lng: -72.519875
  };
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
  $('#map').width(mapParentWidth * 0.75);
  $('#map').height(3 * mapParentWidth / 4);
};
var resizeBootstrapMap = function()
{

  var mapParentWidth = $('#mapRow').width();
  if (mapParentWidth <= 768)
  {
    $('#map').width(mapParentWidth * 0.75);
    $('#map').height(3 * mapParentWidth / 5);

  }
  else if (mapParentWidth <= 455)
  {
    $('#map').width(mapParentWidth * 0.75);
    $('#map').height(3 * mapParentWidth / 6);

  }
  else
  {
    $('#map').width(mapParentWidth * 0.75);
    $('#map').height(3 * mapParentWidth / 4);
  }
  google.maps.event.trigger($('#map resize'));
};



$(window).resize(resizeBootstrapMap);

//This is the ViewModel for interacting with the UI.  Uses knockout.js.
var ViewModel = function()
{

  var self = this;
  //Observable array which starts as a copy of the places array.
  self.placesList = ko.observableArray([]);
  //Observable array which starts as a copy of the markers array. Populated by 'markersPop()'
  self.markersList = ko.observableArray([]);

  //Adds an object literal to 'placesList'
  self.addName = function(placesIndex)
  {
    self.placesList([placesIndex]);
  };
  self.addOtherName = function(placesIndex)
    {
      self.placesList.push(placesIndex);
    };
    //Clears 'placesList' of all contents
  self.removeNames = function(newName)
  {
    self.placesList([]);
  };

  //Sets all the markers on the map
  self.setMapOnAll = function(map)
    {
      for (var i = 0, j=markers.length; i < j; i++)
      {
        markers[i].setMap(map);
      }
    };
    //Removes all markers from the map
  self.clearMarkers = function()
    {
      self.setMapOnAll(null);
    };
    //Function for populating the initial list of names, 'placesList'
  self.listNamesPop = function()
  {
    for (var i = 0, j=places.length; i < j; i++)
    {
      self.placesList().push(places[i]);
    }
  };
  //Function for populating the initial list of markers, 'markersList'
  self.markersPop = function()
    {
      for (var i = 0, j=markers.length; i < j; i++)
      {
        self.markersList.push(markers[i]);
      }
    };
    //initial population of the list of names and the markers on the map
  self.listNamesPop();
  self.markersPop();

  //Resets the list of names and the markers on the map.  Called by the 'Reset List' button and by searches for values not contained
  //within the list.
  self.resetForm = function()
  {
    self.removeNames();
    for (var i = 0, j=markers.length; i < j; i++)
    {
      markers[i].setMap(map);
    }

    for (i = 0, j=places.length; i < j; i++)
    {
      self.placesList.push(places[i]);
    }
  };

  //When a list item is clicked, the associated object from placesList is passed.  Each object assigned in 'places' is given a
  //markerIndex which corresponds to marker in "markerList".  This function simply indexes into the 'markers' array via
  //its associated 'placesList' object, and then toggles its animated state.  Because a click on the actual map marker also toggles
  // via a similar function, clicking either the map marker or its associated list marker will toggle the state.
  self.animateFromList = function(data)
  {

    if (markers[data.markerIndex].getAnimation() !== null)
    {
      markers[data.markerIndex].setAnimation(null);
      infoWindow.close(map, markers[data.markerIndex]);
    }
    else
    {
      for (var i = 0, j=markers.length; i < j; i++)
      {
        markers[i].setAnimation(null);
      }
      ajaxCall(data.fourURL, data.image);
      markers[data.markerIndex].setAnimation(google.maps.Animation.BOUNCE);
      infoWindow.open(map, markers[data.markerIndex]);
    }
  };

  //Stores the value returned when the 'Submit' button is pressed
  self.searchValue = ko.observable('');

  //This function updates as the user types into the search bar and filters the results accordingly.

  self.filterList = function(data, event)
  {
    self.valuesArray = [];


    //Iterate through all the places
    for (var i = 0, j= places.length; i < j; i++)
    {
      //compare the lower case version of each title in places with the lowercase version of what is being typed in.
      //If there is NOT a match, -1 is returned.
      self.searchIndex = places[i].title.toLowerCase().search(self.searchValue().toLowerCase());
      //push the value returned in 'searchIndex' to the 'valuesArray'
      self.valuesArray.push(self.searchIndex);

    }

    //clear these so they can be updated without duplication
    self.placesList([]);
    self.clearMarkers();
    //Iterate through all the values in 'valuesArray'
    for (j = 0, k= self.valuesArray.length; j < k; j++)
    {
      //store the current value of j
      this.index = j;

      //Imediatly call a function to use the value stored in 'index'
      (function(index)
      {
        //compare the current value in the 'valuesArray' to see if it is a matching substring (ie, not -1)
        if (self.valuesArray[index].valueOf() !== -1)
        {
          //If there is a match, place the markers and list items on the screen
          markers[index].setMap(map);
          self.addOtherName(places[index]);
        }
      })(this.index);
    }
    return true;
  };

};

//Apply the bindings between ViewModel and the UI
ko.applyBindings(new ViewModel());