
/**
 * Branch Locator
 * Accessible Store/Branch Locator
 * Uses Google Maps api and handlebars template files.
 */
var BranchLocator = (function() {

  var searchForm = document.querySelector('#js-locator-form');
  var noResults = document.querySelector('#js-results-none');
  var geocoder = new google.maps.Geocoder();
  var autocomplete = new google.maps.places.Autocomplete((document.querySelector('#js-search-input')));


  return {

    init: function(){
      this.bindEvents()
    },

    bindEvents: function() {
      BranchLocator.handleSearch();
    },

    /**
     * Handle Search
     *
     * Get Searched input, geocode it, drop marker, draw radius circle,
     * find locations within that radius, create a new object to send to hbs.
     */
    handleSearch: function() {

      searchForm.addEventListener("submit", function(e) {
        e.preventDefault();
        var searchedAddress = document.querySelector('#js-search-input').value;
        //var radiusMiles = parseInt($('select').val());
        var radiusMiles = 25;
        var radiusMetric = radiusMiles / 0.000621371192;
        var locatedResults = [];
        var searchResults = [];
        var hasResults = false;

        geocoder.geocode({'address': searchedAddress},

        function(results, status) {

          if (status === google.maps.GeocoderStatus.OK) {

            var searchedLocation = results[0].geometry.location;

            var circle = new google.maps.Circle({
              radius: radiusMetric,
              center: searchedLocation
            });

            for ( i = 0; i < branches.length; i++ ) {

              var position = new google.maps.LatLng( branches[i].lat, branches[i].lng );
              var distance = google.maps.geometry.spherical.computeDistanceBetween(searchedLocation, position);

              if ( distance <= radiusMetric ) {

                var distanceAway = (distance * 0.000621371192).toFixed(2);
                var inProximityLocations = branches[i];
                var numResults = branches.length;

                // Add lat/lng to our inProximityLocations object
                var searchResultsObj = Object.assign( inProximityLocations, {
                  distance: distanceAway,
                  lat: branches[i].lat,
                  lng: branches[i].lng
                });

                locatedResults.push(searchResultsObj);
              }
            }

            var numberResults = locatedResults.length;

            BranchLocator.resultsNotice(numberResults, radiusMiles, searchedAddress);
            BranchLocator.hasResults(numberResults);
            BranchLocator.setContainer(locatedResults);
          }
       });
     });
    },

    /**
     * Has Results Detection
     * Updates hasResults flag
     * @param {number} resultsTotal - Total number of results to compare
     */
    hasResults: function(resultsTotal) {
      if (resultsTotal > 0) {
        hasResults = true;
      } else {
        hasResults = false;
      }
      BranchLocator.renderNoResults();
    },

    /**
     * Render No Results
     */
    renderNoResults: function() {
      if (hasResults) {
        noResults.classList.add('is-hidden');
        noResults.classList.remove('is-visible');
      } else {
        noResults.classList.remove('is-hidden');
        noResults.classList.add('is-visible');
      }
    },

    /**
     * Results notice output
     * @param {number} total - Total number of results
     * @param {number} radius - Set radius in miles
     * @param {string} search - The searched for term
     */
    resultsNotice: function(total, radius, search) {
      var resultsNotice = document.querySelector('#js-results-notice');
      resultsNotice.innerHTML = '<p><strong>' + total +'</strong> stores within <strong>' + radius + 'mi</strong> of <strong>' + search + '</strong></p>';
    },

    /**
     * Compile Tempalte
     * Compiles our hbs templatea to our data container,
     * calling our render method.
     * @param {obj} data - our data object of results within radius
     */
    setContainer: function(data) {
      var dataContainer = document.getElementById('js-search-results');
      BranchLocator.render('assets/templates/search-results.hbs', dataContainer, data);
    },

    /**
     * Render HBS Template to
     * Renders our hbs template with our data
     * @param {hbsTemplate} string - path to template
     * @param {renderEl} element - element to render to
     * @param {Object} data - data object
     */
    render: function(hbsTemplate, renderEl, data) {
      BranchLocator.getTemplate(hbsTemplate, function(template) {
        $(renderEl).html(template(data));
      });
    },

    /**
     * Get Template
     * Get's an external HBS template via ajax and compiles
     * with our data.
     * @param {string} path - path to our template file
     * @param {function} callback - our callback function to pass ajax response
     */
    getTemplate: function(path, callback) {
      var source, template;
      $.ajax({
        url: path,
        success: function (data) {
          source = data;
          template = Handlebars.compile(source);
          if (callback) callback(template);
        },
      });
    },
  }
})();

BranchLocator.init();
