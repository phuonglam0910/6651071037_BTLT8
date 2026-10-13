$(document).ready(function () {
  $('#togglePassword').on('click', function () {
    const passwordInput = $('#password');
    if (passwordInput.attr('type') === 'password') {
      passwordInput.attr('type', 'text');
      $(this).text('🙈');
    } else {
      passwordInput.attr('type', 'password');
      $(this).text('👁');
    }
  });
});
