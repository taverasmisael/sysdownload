(function(){
    'use strict';
    var doc = $(document),
        searchLabel = $('.search-box a');

    searchLabel.on('click', function (event) {
      event.preventDefault();
      searchLabel.parent().toggleClass('expanded');
    });
})();
