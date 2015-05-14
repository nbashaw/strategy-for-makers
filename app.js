$(function(){

  // Basic setup
  var contentString = $('.js-content')[0].innerHTML;
  contentString = contentString.replace(/\n/g, '<br>');
  var pages = contentString.split('---');
  var pageCount = pages.length;
  var currentPageId = 0;

  // Render all pages
  _.each(pages, function(page, index) {
    $('.total-pages').text(pageCount);
    var pageElString = '<div class="page" data-order="'+ index +'"';
    pageElString += 'style="z-index: -'+index+'">'+ page +'</div>';
    $('.container').append(pageElString);
  });

  // Handle click/tap events
  $(window).on('click', function(e) {
    if (currentPageId !== 0) {
      if ((e.clientX / $(window).width()) > 0.5) {
        renderNextPage();
      } else {
        renderPrevPage();
      }
    } else {
      renderNextPage();
    }
  });

  // Handle keyboard events
  $(window).on('keyup', function(e) {
    if (e.keyCode == 39 || e.keyCode == 40) {
      renderNextPage();
    } else if (e.keyCode == 37 || e.keyCode == 38) {
      renderPrevPage();
    }
  });

  // Render next page
  var renderNextPage = function() {
    if (currentPageId < (pageCount - 1)) {
      $('.page[data-order='+currentPageId+']').remove();
      currentPageId += 1;
      updateProgressbar();
    }
  }

  // Render prev page
  var renderPrevPage = function() {
    if (currentPageId > 0) {
      var prevPageId = currentPageId - 1;
      var prevPage = pages[prevPageId];
      var pageElString = '<div class="page" data-order="'+ prevPageId +'"';
      pageElString += 'style="z-index: -'+prevPageId+'">'+ prevPage +'</div>';
      $('.container').prepend(pageElString);
      currentPageId = currentPageId - 1;
      updateProgressbar();
      showBackNotice();
    }
  }

  // Update Progressbar
  var updateProgressbar = function() {
    $('.current-page').text(currentPageId + 1);
  }

  // Show Back Notice
  var showBackNotice = function() {
    $('body').append('<div class="back-notice">&larr;</div>')
    setTimeout(function(){
      $('.back-notice').fadeOut(500);
    }, 130);
  }


});
