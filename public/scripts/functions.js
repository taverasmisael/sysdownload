(function(){
    'use strict';
    var doc = $(document),
        searchBox = $('.search-box'),
        searchTrigger = $('.search-box a'),
        searcher = $('.searcher'),
        searchInput = searcher.find('input[type="search"]'),
        searchCleaner = searcher.find('.material-icons');

    searchTrigger.on('click', function (event) {
      event.preventDefault();
      searchBox.toggleClass('expanded');
    });
    searchCleaner.on('click', function (event) {
      event.preventDefault();
      if (searchInput.val() === '') {
        searchTrigger.trigger('click');
      }
      searchInput.val('');
    })
})();
