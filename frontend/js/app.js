const IUPS = 'https://imageuploadapi1.azurewebsites.net:443/api/uploadImageFlow/triggers/When_a_HTTP_request_is_received/invoke?api-version=2022-05-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=KLZMuudrx8lScwPPoMDr8WPjTk9Tc-eiYfpC05Gpmlw';
const RAI = 'https://imageuploadapi1.azurewebsites.net:443/api/getallImageFlow/triggers/When_a_HTTP_request_is_received/invoke?api-version=2022-05-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=wPATRrskZTXqzOliozivUdqcTaTXXYY0GF_UbBSjmEI';
const BLOB_ACCOUNT = 'https://mediashareblob123.blob.core.windows.net';

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
