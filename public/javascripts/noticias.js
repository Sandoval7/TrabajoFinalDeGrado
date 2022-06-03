const API_KEY = "6cd8356bffe7410a8c70eeea2482478e"
const BUSINESS_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=";

fetch(BUSINESS_NEWS+API_KEY)
.then(response => response.json())
    newsDataArr = []
    if(response.status >= 200 && response.status < 300){
        const myJson = await response.json()
        newsDataArr = myJson
    }
}