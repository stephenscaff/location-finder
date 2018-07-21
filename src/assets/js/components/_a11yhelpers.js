
/**
 * A11y Helpers
 */
var A11yHelpers = (function() {

  return {

    init: function() {
      this.bindEvents();
    },

    bindEvents: function() {
      A11yHelpers.focusSearch();
    },

    /**
     * Adds 'is-focued' class to specified element,
     * when a specified form element is focused.
     */
    addIsFocused: function(focusedEl, parentEl) {
      focusedEl.addEventListener('focus', function (e) {
        parentEl.classList.add('is-focused');
      });

      focusedEl.addEventListener('blur', function (e) {
        parentEl.classList.remove('is-focused');
      });
    },

    /**
     * SEarch Box on Focus
     */
    focusSearch: function() {
      var searchInput = document.querySelector('#js-search-input');
      var searchBtn = document.querySelector('#js-search-btn');
      var searchParent = document.querySelector('.mast__search');

      A11yHelpers.addIsFocused(searchInput, searchParent);
      A11yHelpers.addIsFocused(searchBtn, searchParent);
    }
  };
})();

A11yHelpers.init();
