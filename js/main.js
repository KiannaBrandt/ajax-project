var $tableLast = document.querySelectorAll('.last');

function getLastPrice() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://api.marketstack.com/v1/eod/latest?access_key=dfd3a8492c07dc0e117016cc1b244ff4&symbols=LB,MRO,AMAT');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    for (var i = 0; i < xhr.response.data.length; i++) {
      $tableLast[i].textContent = xhr.response.data[i].adj_close;
    }
  });
  xhr.send();
}

getLastPrice();
