(function(){
    'use strict';
    $(document).ready(loadFunction());

    function loadFunction () {
      var searchBox = $('.search-box'),
          searchTrigger = $('.search-box a'),
          modalsTriggers = $('.modal-trigger');

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
      $('#infoServer').click(function (e) {
        e.preventDefault();
        $('#infoModal').openModal();
      })
    }
})();
