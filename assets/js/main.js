// Active Menu
(function() {
  var nav = document.getElementById('nav'),
    anchor = nav.getElementsByTagName('a'),
    current = window.location.pathname.split('/')[1];

    for (var i = 0; i < anchor.length; i++) {
    if(anchor[i].href == current) {
        anchor[i].className = 'active';
    }

    console.log(anchor);
  }
})();
 