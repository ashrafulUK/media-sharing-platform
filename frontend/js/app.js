const IUPS = 'YOUR_IUPS_ENDPOINT';
const RAI = 'YOUR_RAI_ENDPOINT';
const BLOB_ACCOUNT = 'https://YOUR_BLOB_STORAGE_NAME.blob.core.windows.net';

function submitNewAsset() {
  const formData = new FormData();
  formData.append('FileName', $('#FileName').val());
  formData.append('userID', $('#userID').val());
  formData.append('userName', $('#userName').val());
  formData.append('File', $('#UpFile')[0].files[0]);

  $.ajax({
    url: IUPS,
    data: formData,
    cache: false,
    enctype: 'multipart/form-data',
    contentType: false,
    processData: false,
    type: 'POST',
    success: function() {
      alert('Upload Successful');
      getImages();
    }
  });
}

function getImages() {
  $('#ImageList').html('<p>Loading...</p>');
  $.getJSON(RAI, function(data) {
    let items = [];
    $.each(data, function(i, val) {
      items.push("<img src='" + BLOB_ACCOUNT + val.filePath + "' />");
      items.push("<p>" + val.fileName + " by " + val.userName + "</p>");
    });
    $('#ImageList').html(items.join(''));
  });
}

$(document).ready(function () {
  $('#uploadForm').submit(function (e) {
    e.preventDefault();
    submitNewAsset();
  });
  $('#retImages').click(getImages);
});
