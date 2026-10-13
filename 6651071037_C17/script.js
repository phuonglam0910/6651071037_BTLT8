$(document).ready(function () {
  $('.accordion-title').on('click', function () {
    const $title = $(this);
    const $content = $('#' + $title.attr('aria-controls'));
    const shouldOpen = $title.attr('aria-expanded') !== 'true';

    $('.accordion-title').attr('aria-expanded', 'false');
    $('.accordion-content').prop('hidden', true);

    if (shouldOpen) {
      $title.attr('aria-expanded', 'true');
      $content.prop('hidden', false);
    }
  });
});
