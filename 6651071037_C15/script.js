$(document).ready(function () {
  $('.tab-button').on('click', function () {
    const selectedTab = $(this);
    const selectedPanelId = selectedTab.attr('aria-controls');

    $('.tab-button')
      .removeClass('active')
      .attr('aria-selected', 'false')
      .attr('tabindex', '-1');

    selectedTab
      .addClass('active')
      .attr('aria-selected', 'true')
      .attr('tabindex', '0');

    $('.tab-panel').prop('hidden', true);
    $('#' + selectedPanelId).prop('hidden', false);
  });
});
