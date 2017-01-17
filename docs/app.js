(function(w, d){
  var cells = Array.from(d.querySelectorAll('.cell'));
  var xPlayed = function(index) {
    console.log(index);
  };
  d.querySelector('.grid').addEventListener('click', function(ev) {
    var target = ev.target,
        tagName = ev.target.tagName;
    if(tagName !== 'DIV' && tagName !== 'SPAN') return false;
    if(tagName === 'SPAN') target = target.parentNode;
    if(target.className !== 'cell') return false;
    xPlayed(cells.indexOf(target));
  });
})(window, document);
