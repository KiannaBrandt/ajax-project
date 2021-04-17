var $tableLast = document.querySelectorAll('.last');
var $tableTitle = document.querySelector('.title');
var $totalReturn = document.querySelector('.total-return');
var $tableData = document.querySelectorAll('td')

var $form = document.querySelector('#form');

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

$form.addEventListener('submit', function () {
  event.preventDefault();
  stocks.push($form.elements[0].value);
  $form.reset()
  $tableTitle.textContent = stocks[stocks.length-1]
  $tableData[2].textContent = 'Change Percentage'
  $tableData[16].classList.add('hide')
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://sandbox.tradier.com/v1/markets/search?q=' + stocks[stocks.length - 1]);
  xhr.setRequestHeader('Authorization', 'Bearer GaAaHyfRiHqr4OvhZBdHrkhg4Aq4');
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {

  });
  xhr.send();
});
