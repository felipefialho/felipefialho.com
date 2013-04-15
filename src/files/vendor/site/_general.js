
// Modernizr
if (!Modernizr.svg) {
  $('img[src$=".svg"]').each(function() {
    var $this = $(this); // this = img
    $this.attr('src', $this.attr('src').replace(/svg$/, 'png'));
  });
}

// CHOSEN //
$(".f-select select").chosen({no_results_text: "Sem resultados"});

// DISPLAY MENU //
$(".bt-navbar").toggle(function() {
	$(".navbar").slideDown(function() {
	});
},
function() {
	$(".navbar").slideUp();
});

// TABS //
$('a[data-toggle="tab"]').on('shown', function (e) {
    e.target // activated tab
    e.relatedTarget // previous tab
})

// Classy Social
$(".classysocial").each(function() {
    new ClassySocial(this);
});


