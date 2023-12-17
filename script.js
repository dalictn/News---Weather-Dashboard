function loadDate() {
    var currentDate = new Date()
    var dateString = currentDate
        .toString()
        .split(' ')
        .splice(1, 3)
        .join(' ')

    $('#date').text(dateString)
}


function loadWeather() {
    var weather = $('#weather')
    var url = 'api.openweathermap.org/data/2.5/weather'
    var apiKey = 'f0593661187aa214f804b5170c2bdf53'

    function success(position) {
        var latitude = position.coords.latitude
        var longitude = position.coords.longitude
    
        // GeoLocation API request:
        $.getJSON(
            url +
          '?units=metric&lat=' +
          latitude +
          '&lon=' +
          longitude +
          '&appid=' +
          apiKey,
        function (data) {
            weather.text('Based on your current location, it is ' + MediaDeviceInfo.temp + '°C right now'
            
    
            )
            
        console.log('function data passed')
        }
        )
    }
    
    function error() {
        alert('Unable to retrieve weather location')
    }
    
    
    //calling the geolocation API
    navigator.geolocation.getCurrentPosition(success, error)
    
    weather.text('fetching weather data...')
}



function loadNews() {
    var news = $('#news')
    var url = 'https://newsapi.org/v2/top-headlines?sources=the-next-web&apiKey='
    var apiKey = '4e317afe1a744c19aee2c3aea21f9d28'

    $.getJSON(url + apiKey, function (data) {
        // map() method to call article urls and titles
    
        var titles = data.articles.map(function (articles) {
          return "<a href='" + articles.url + "'>" + articles.title + '</a>'
        })
    
        // joining the titles with two line breaks
    
        news.html(titles.join('<br><br>'))
      })
    
      // the text that will be displayed while the function is making the request
      news.text('fetching news…')
    }




loadDate()
loadWeather()
loadNews()