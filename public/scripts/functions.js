(function(){
    'use strict';
    var searchBox = $('.search-box'),
        searchTrigger = $('.search-box a');

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
