(function(){
    'use strict';
    var searchBox = $('.search-box'),
        searchTrigger = $('.search-box a'),
        searcher = $('.searcher'),
        searchInput = searcher.find('input[type="search"]'),
        searchCleaner = searcher.find('.material-icons');

    searchTrigger.on('click', function (event) {
      event.preventDefault();
      searchBox.toggleClass('expanded');
    });
    var cardsInterval = setInterval(function () {
      if ($('.card.program').length) {
        clearInterval(cardsInterval);
        $('.dropdown-button').dropdown();
      }
    }, 1000);
})();
