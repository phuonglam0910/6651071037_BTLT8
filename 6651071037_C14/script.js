$(document).ready(function () {
  function setTheme(isLight) {
    if (isLight) {
      $('body').addClass('light');
      $('#themeToggle').addClass('on');
      $('#themeToggle').attr('aria-checked', 'true');
      $('#themeStatus').text('Status: On');
    } else {
      $('body').removeClass('light');
      $('#themeToggle').removeClass('on');
      $('#themeToggle').attr('aria-checked', 'false');
      $('#themeStatus').text('Status: Off');
    }
  }
  $('#themeToggle').on('click', function () {
    const isLight = !$(this).hasClass('on');
    setTheme(isLight);
  });

  $('#themeToggle').on('keydown', function (event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      $(this).trigger('click');
    }
  });
  setTheme(false);
});
