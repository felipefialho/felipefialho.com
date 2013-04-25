
// MENU ACTIVE //
$('.nav-list-item a:contains("'+$('.page-header').text()+'")').addClass('active')

// Modernizr
if (!Modernizr.svg) {
  $('img[src$=".svg"]').each(function() {
    var $this = $(this); // this = img
    $this.attr('src', $this.attr('src').replace(/svg$/, 'png'));
  });
}

// TOOLTIP //
$('.tooltip-hover').tooltip();
