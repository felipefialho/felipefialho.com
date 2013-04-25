
// MENU ACTIVE //
$(".nav-list-item a[href='"+location.href.substring(location.href.lastIndexOf("/")+1,255)+"']").addClass("active");

// Modernizr
if (!Modernizr.svg) {
  $('img[src$=".svg"]').each(function() {
    var $this = $(this); // this = img
    $this.attr('src', $this.attr('src').replace(/svg$/, 'png'));
  });
}

// TABS //
$('a[data-toggle="tab"]').on('shown', function (e) {
    e.target // activated tab
    e.relatedTarget // previous tab
})

// TOOLTIP //
$('.tooltip-hover').tooltip();
