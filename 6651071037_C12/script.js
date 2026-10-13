$(document).ready(function () {
  $('input[name="passport"]').on('change', function () {
    $('#passportBox').toggleClass('hidden', $(this).val() !== 'yes');
  });
  $('input[name="credit"]').on('change', function () {
    $('#creditBox').toggleClass('hidden', $(this).val() !== 'yes');
  });
});
