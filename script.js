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
    var url = 'http://api.openweathermap.org/data/2.5/forecast?'
    var apiKey = 'a994d6837a806a1003b7979f7e6e2c3f'

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
            weather.text('Based on your current location, it is ' + main.temp + '°C right now')
            
        }
        )
    }
    
    function error() {
        switch(error.code) {
        case error.PERMISSION_DENIED:
            alert('Permission denied')
            break;
        case error.POSITION_UNAVAILABLE:
            alert('Location information unavailable')
            break;
        case error.TIMEOUT:
            alert('Location request timed out')
            break;

        }
    }
    
    
    //calling the geolocation API
    navigator.geolocation.getCurrentPosition(success, error,{timeout:10000})
    
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