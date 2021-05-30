var $h1 = document.querySelector('h1');
var $form = document.querySelector('#form');
var $table = document.querySelector('table');
var $tableLast = document.querySelectorAll('.last');
var $tableTitle = document.querySelector('.title');
var $tableData = document.querySelectorAll('td');
var $error = document.querySelector('.error');
var $newsLink = document.querySelectorAll('.newsLink');

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

function getLBStockNews() {
  var lb = 'L%20Brands';
  var xhr = new XMLHttpRequest();
  xhr.open('GET', `https://newsapi.org/v2/everything?q=${lb}&apiKey=5beb1cbe866848bb98531afa92899fb0`);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    $newsLink[0].textContent = xhr.response.articles[0].title;
    $newsLink[0].href = xhr.response.articles[0].url;
    $newsLink[0].target = `"_blank"`;
  });
  xhr.send();
};

function getMROStockNews() {
  var mro = 'Marathon%20Oil';
  var xhr = new XMLHttpRequest();
  xhr.open('GET', `https://newsapi.org/v2/everything?q=${mro}&apiKey=5beb1cbe866848bb98531afa92899fb0`);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    $newsLink[1].textContent = xhr.response.articles[0].title;
    $newsLink[1].href = xhr.response.articles[0].url;
    $newsLink[1].target = `"_blank"`;
  });
  xhr.send();
};

function getAMATStockNews() {
  var amat = 'Applied%20Materials%20Inc';
  var xhr = new XMLHttpRequest();
  xhr.open('GET', `https://newsapi.org/v2/everything?q=${amat}&apiKey=5beb1cbe866848bb98531afa92899fb0`);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    $newsLink[2].textContent = xhr.response.articles[0].title;
    $newsLink[2].href = xhr.response.articles[0].url;
    $newsLink[2].target = `"_blank"`;
  });
  xhr.send();
};

getLastPrice();
getLBStockNews();
getMROStockNews();
getAMATStockNews();

function getStockInfo() {
  var xhr = new XMLHttpRequest();
  var stockName = stocks[stocks.length - 1].replace(' ', '%20');
  xhr.open('GET', 'https://sandbox.tradier.com/v1/markets/search?q=' + stockName);
  xhr.setRequestHeader('Authorization', 'Bearer GaAaHyfRiHqr4OvhZBdHrkhg4Aq4');
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    if (xhr.response.securities === null) {
      $table.className = "hide";
      $error.className = "";
      $error.textContent = "Error: cannot find the searched stock."
    } else {
      $table.className = "";
      $error.className = "hide";
      $tableData[4].textContent = xhr.response.securities.security.symbol;
      $tableData[5].textContent = xhr.response.securities.security.description;
      if (xhr.response.securities.security.symbol === undefined) {
        $tableData[4].textContent = xhr.response.securities.security[0].symbol;
        $tableData[5].textContent = xhr.response.securities.security[0].description;
      };
    };
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
  function getStockNews() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', `https://newsapi.org/v2/everything?q=${stockName}&apiKey=5beb1cbe866848bb98531afa92899fb0`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.response.articles[4] === undefined) {
        for (var i = 0; i < $newsLink.length; i++) {
          $newsLink[i].textContent = '';
        };
      } else {
        for (var i = 0; i < $newsLink.length; i++) {
          $newsLink[i].textContent = xhr.response.articles[i].title;
          $newsLink[i].href = xhr.response.articles[i].url;
          $newsLink[i].target = `"_blank"`;
        };
      }
    });
    xhr.send();
  };
  getStockNews();
};

$form.addEventListener('submit', function () {
  event.preventDefault();
  stocks.push($form.elements[0].value);
  $form.reset();
  $tableTitle.textContent = stocks[stocks.length - 1];
  $tableData[2].textContent = 'Change Percentage';
  for (var i = 8; i < $tableData.length; i++) {
    $tableData[i].classList.add('hide');
  };
 getStockInfo();
});

$h1.addEventListener('click', function () {
  location.reload();
})
