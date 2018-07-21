/**
 * Global Utilities
 */

var Util = (function() {

  return {

    /**
     * ForEach Utility
     * Ensure we can loop over a object or nodelist
     * @see https://toddmotto.com/ditch-the-array-foreach-call-nodelist-hack/
     */
    forEach: function (array, callback, scope) {
      for (var i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i]);
      }
    },

    /**
     * Throttle Util
     * Stoopid simple throttle util to control scroll events and so on.
     *
     * @param  {Function}  Function call to throttle.
     * @param  {int}       milliseconds to throttle  method
     * @return {Function}  Returns a throttled function
     */
    throttle: function(callback, ms) {
      var wait = false;
      return function () {
          if (!wait) {
              callback.call();
              wait = true;
              setTimeout(function () {
                  wait = false;
              }, ms);
          }
      };
    },

  /**
   *
   */
  get: function(url) {

    return new Promise(function(resolve, reject) {
      var req = new XMLHttpRequest();
      req.open('GET', url);
      req.onload = function() {
        if (req.status == 200) {
          resolve(req.response);
        }
        else {
          reject(Error(req.statusText));
        }
      };

      req.onerror = function() {
        reject(Error("Network Error"));
      };
      req.send();
    });
  },

  /**
   * JSONP Helper to get around cors issues
   * Essentially like jquery's getJSON
   */
   loadJSONP: function(url, callback, context){
     var unique = 0;
     var name = "_jsonp_" + unique++;
      if (url.match(/\?/)) url += "&callback="+name;
      else url += "?callback="+name;
      // Create script
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;

       window[name] = function(data){
         callback.call((context || window), data);
         document.getElementsByTagName('head')[0].removeChild(script);
         script = null;
         delete window[name];
       };

      // Load JSON
      document.getElementsByTagName('head')[0].appendChild(script);
    },
  };
 })();
