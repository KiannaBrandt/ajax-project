var $tableLast = document.querySelectorAll('.last');
var $tableTitle = document.querySelector('.title');
var $tableData = document.querySelectorAll('td');
var $a = document.querySelectorAll('a');

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
};

getLastPrice();

function getStockInfo() {
  var xhr = new XMLHttpRequest();
  var stockName = stocks[stocks.length - 1].replace(' ', '%20')
  xhr.open('GET', 'https://sandbox.tradier.com/v1/markets/search?q=' + stockName);
  xhr.setRequestHeader('Authorization', 'Bearer GaAaHyfRiHqr4OvhZBdHrkhg4Aq4');
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    $tableData[4].textContent = xhr.response.securities.security[0].symbol;
    $tableData[5].textContent = xhr.response.securities.security[0].description;
  });
  xhr.send();
  xhr.onload = function getStockQuote() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://sandbox.tradier.com/v1/markets/quotes?symbols=' + $tableData[4].textContent);
    xhr.setRequestHeader('Authorization', 'Bearer GaAaHyfRiHqr4OvhZBdHrkhg4Aq4');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      $tableData[6].textContent = xhr.response.quotes.quote.change_percentage;
      $tableData[7].textContent = xhr.response.quotes.quote.last;
    });
    xhr.send();
  };
  xhr.onload = function getStockNews() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', `https://newsapi.org/v2/everything?q=${stockName}&apiKey=5beb1cbe866848bb98531afa92899fb0`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      console.log(xhr.response)
      for (var i = 0; i < $a.length; i++) {
        $a[i].textContent = xhr.response.articles[i].title;
        $a[i].href = xhr.response.articles[i].url
      };
    });
    xhr.send();
  };
};

$form.addEventListener('submit', function () {
  event.preventDefault();
  stocks.push($form.elements[0].value);
  $form.reset()
  $tableTitle.textContent = stocks[stocks.length - 1];
  $tableData[2].textContent = 'Change Percentage';
  for (var i = 8; i < $tableData.length; i++) {
    $tableData[i].classList.add('hide')
  };
 getStockInfo();
});
