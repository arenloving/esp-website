// Nav dropdown + scroll transparency only
document.addEventListener('DOMContentLoaded', function() {

  // Nav dropdown click support
  var dropdown = document.querySelector('.nav-dropdown > a');
  if (dropdown) {
    dropdown.addEventListener('click', function(e) {
      var parent = this.parentElement;
      if (parent.classList.contains('open')) {
        parent.classList.remove('open');
      } else {
        e.preventDefault();
        parent.classList.add('open');
      }
    });
    document.addEventListener('click', function(e) {
      var dd = document.querySelector('.nav-dropdown');
      if (dd && !dd.contains(e.target)) {
        dd.classList.remove('open');
      }
    });
  }

  // Nav transparency on scroll
  var nav = document.querySelector('.site-nav');
  if (nav) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 80) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }
});
