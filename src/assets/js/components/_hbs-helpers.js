/**
 * Handlebars Helpers for scorecards data
 * @author Stephen Scaff
 */
var hbHelpers = (function() {

  return {

    /**
     * Init
     */
    init: function() {
      this.hbHelpers();
    },

    /**
     * Our Global HB Helpers
     */
    hbHelpers: function(){

      /**
       * Debug Helper
       * Logs debug info on object context
       */
      Handlebars.registerHelper('debug', function(optionalValue) {
        console.log('Current Context');
        console.log('====================');
        console.log(this);
      });

      /**
       * Remove HTML
       * Helper to strip out any html in our data response
       * @return {string}
       */
      Handlebars.registerHelper('removeHTML', function(str) {
        var formatedStr = str.replace(/<(?:.|\n)*?>/gm, '');
        return new Handlebars.SafeString(formatedStr);
      });


      /**
       * Semicolon to Comma
       * Helper to convert semicolons to commas

       * @return {string}
       */
      Handlebars.registerHelper('semicolonToComma', function(str) {
        var formatedStr = str.replace(/;/g , ",");
        return new Handlebars.SafeString(formatedStr);
      });


       /**
        * FileName Helper
        * Converts fields to a proper filename
        * @return string (filename)
        */
      Handlebars.registerHelper('fileName', function(str) {
        var removedSpaces = str.replace(/\s/g, '');
        var newFileName = encodeURI(removedSpaces.toLowerCase());
        return new Handlebars.SafeString(newFileName);
      });
    }
  };
})();

hbHelpers.init();
