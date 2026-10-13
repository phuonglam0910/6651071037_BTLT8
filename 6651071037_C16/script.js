$(document).ready(function () {
  const $form = $('#memberForm');
  const $rows = $('#memberRows');
  const $message = $('#message');

  $form.on('submit', function (event) {
    event.preventDefault();

    const name = $('#name').val().trim();
    const email = $('#email').val().trim();
    const birthdate = $('#birthdate').val();
    const emailInput = $('#email')[0];

    if (!name || !email || !birthdate) {
      $message.text('Vui lòng nhập đầy đủ Name, Email và Birthdate.');
      return;
    }

    if (!emailInput.validity.valid) {
      $message.text('Vui lòng nhập địa chỉ email đúng định dạng.');
      emailInput.focus();
      return;
    }

    $rows.find('.empty-row').remove();
    const $row = $('<tr>');
    $row.append($('<td>').addClass('select-cell').append(
      $('<input>').attr({ type: 'checkbox', 'aria-label': 'Chọn hàng để xóa' })
    ));
    $row.append($('<td>').text(name));
    $row.append($('<td>').text(email));
    $row.append($('<td>').text(birthdate));
    $rows.append($row);

    $form[0].reset();
    $message.text('');
    $('#name').trigger('focus');
  });

  $('#deleteRows').on('click', function () {
    const $selectedRows = $rows.find('input[type="checkbox"]:checked').closest('tr');

    if (!$selectedRows.length) {
      $message.text('Hãy tích chọn ít nhất một hàng cần xóa.');
      return;
    }

    $selectedRows.remove();
    if (!$rows.children('tr').length) {
      $rows.append('<tr class="empty-row"><td colspan="4">Chưa có dữ liệu.</td></tr>');
    }
    $message.text('');
  });
});
