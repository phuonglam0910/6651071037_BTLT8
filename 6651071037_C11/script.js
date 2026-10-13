$(document).ready(function () {
  $('#fileInput').on('change', function () {
    const file = this.files[0];
    if (!file) {
      $('#fileInfo').text('Chưa có file nào được chọn.');
      return;
    }
    const fullName = file.name;
    const dotIndex = fullName.lastIndexOf('.');
    const fileName = dotIndex > 0 ? fullName.substring(0, dotIndex) : fullName;
    const extension = dotIndex > 0 ? fullName.substring(dotIndex + 1).toLowerCase() : 'Không có phần mở rộng';
    $('#fileInfo').html(
      '<strong>Tên file:</strong> ' + fileName + '<br>' +
      '<strong>Phần mở rộng:</strong> ' + extension
    );
  });
});
