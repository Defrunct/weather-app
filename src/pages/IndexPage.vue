<template>
  <q-page class="flex column">

    <div class="col q-pt-lg q-px-md">
      <q-input filled bottom-slots v-model="this.store.currentCityName" label="Місто" @keydown.enter="searchWeather">

        <template v-slot:before>
          <q-icon name="my_location"/>
        </template>
        
        <template v-slot:append>
          <q-btn round dense flat icon="search" @click="searchWeather" />
        </template>
        
      </q-input>
    </div>

    <template v-if="weatherData">
<!-- Тиць тиць on the button and go to favorites -->
      <div class="col text-white text-right custom-font text-sha">
        <q-btn
          size="lg"
          flat
          icon="favorite"
          color=""
          label="Збережене"
          class="text-white text-right custom-font text-sha"
          to="/favorite"
        />
      </div>

      <div class="col text-white text-center">
        <div class="text-h2 text-weight-light custom-font text-sha d-flex justify-center items-center">
        <!-- Місто  -->
        <span>{{ weatherData.name }}</span>
        <!-- при натиску зміити на icon="favorite" -->
          <q-btn
          size="lg"
          round
          :icon="favorite[this.store.currentCityName] ? 'favorite' : 'favorite_border'"
          color="primary"
          class="q-ml-md"
          @click="favorite[this.store.currentCityName] ? removeFavorite(this.store.currentCityName) : addFavorite(this.store.currentCityName)"
          />
        </div>

        <div class="text-h4 text-weight-light custom-font text-sha">
          <!-- Погода -->
          {{ weatherData.weather[0].description.toUpperCase() }}
        </div>

        <div class="text-h1 text-weight-thin custom-font q-my-lg relative-position text-sha">
          <span>
            <!-- Температура -->
            {{ Math.ceil(weatherData.main.temp) }}
          </span>
          <span class="text-h4 relative-position degree text-sha" >&deg;C</span>
        </div>
      </div>
      
      <div class="col text-center">
        <!-- <img :src="`https://openweathermap.org/img/wn/10n@2x.png`" > -->
        <!-- <img :src="`https://openweathermap.org/img/wn/${ weatherData.weather[0].icon }@2x.png`" /> -->

        <div class="weather-icon">
          <img :src="getWeatherIconReplacer(weatherData.weather[0].icon)" />
        </div>
      </div>

      <!-- Панель прогнозу погоди -->
      <div v-if="forecastData" class="weather-container">
        <div v-for="(data, index) in forecastData" :key="index" class="weather-day">
          <div class="day">{{ data.date }}</div>
          <div class="weather-icon-t">
            <img :src="getWeatherIconReplacer(data.icon)" />
          </div>
          <div class="temperature">
            <span class="temp-high">{{ data.temp_max }}°C</span>
            <span class="temp-low">{{ data.temp_min }}°C</span>
          </div>
        </div>
      </div>


      <div class="weather-map">
        <img src="https://via.placeholder.com/300x300.png?text=Weather+Map" alt="Weather Map">
      </div>

      
      <div class="row q-my-md q-gutter-lg justify-around">
      
      <!-- Индекс УФ -->
      <div class="info-box col-4 text-center text-white rounded-borders text-sha custom-font">
        <div class="text-h6">Індекс УФ</div>
        <div class="text-h2">0</div>
        <div class="text-subtitle1">Низький</div>
        <div class="text-caption">Низький до кінця дня.</div>
      </div>

      <!-- Схід Сонця -->
      <div class="info-box col-4 text-center text-white rounded-borders text-sha custom-font">
        <div class="text-h6">Схід сонця</div>
        <div class="text-h2">06:54</div>
        <div class="text-subtitle1">Захід сонця: 18:33</div>
      </div>
      
    </div>


    </template>

    <template v-if="errorMessage">
      <div class="col text-center text-white custom-font">
        <div class="col text-h2 text-white custom-font text-weight-thin text-sha">
          Місто не знайдено. <br>Спробуйте ще раз.
        </div>
      </div>
    </template>

    <template v-if="!errorMessage && !weatherData">
      <div class="col text-center text-white custom-font">
        <div class="col text-h2 text-white custom-font text-weight-thin text-sha">
          Прогноз<br>Погоди
        </div>
        
        <q-btn
          size="35px"
          round
          color=""
          icon="map"
        />
      </div>
    </template>
    
  </q-page>
</template>

<script>
import { crossPageData } from 'stores/crossPageData';

export default {
  name: 'IndexPage',

  setup() {
    const store = crossPageData()

    return {
      store
    }
  },

  data() {
    return {
      weatherData: null,
      forecastData: null,
      weatherIcons: {
        "01": { day: "https://cdn-icons-png.flaticon.com/128/4814/4814268.png", night: "https://cdn-icons-png.flaticon.com/128/740/740878.png" },
        "02": { day: "https://cdn-icons-png.flaticon.com/128/1146/1146869.png", night: "https://cdn-icons-png.flaticon.com/128/1163/1163630.png" },
        "03": { day: "https://cdn-icons-png.flaticon.com/128/414/414927.png", night: "https://cdn-icons-png.flaticon.com/128/414/414927.png" },
        "04": { day: "https://cdn-icons-png.flaticon.com/128/9755/9755232.png", night: "https://cdn-icons-png.flaticon.com/128/9755/9755232.png" },
        "09": { day: "https://cdn-icons-png.flaticon.com/128/15621/15621965.png", night: "https://cdn-icons-png.flaticon.com/128/9755/9755258.png" },
        "10": { day: "https://cdn-icons-png.flaticon.com/128/414/414966.png", night: "https://cdn-icons-png.flaticon.com/128/414/414966.png" },
        "11": { day: "https://cdn-icons-png.flaticon.com/128/1146/1146860.png", night: "https://cdn-icons-png.flaticon.com/128/1146/1146860.png" },
        "13": { day: "https://cdn-icons-png.flaticon.com/128/2315/2315309.png", night: "https://cdn-icons-png.flaticon.com/128/1163/1163642.png" },
        "50": { day: "https://cdn-icons-png.flaticon.com/128/2930/2930095.png", night: "https://cdn-icons-png.flaticon.com/128/2930/2930127.png" }
      },
      errorMessage: null,
      favorite: {}
    }
  },

  mounted() {
    if (this.store.currentCityName) {
      this.searchWeather()
    }
    if (localStorage.favorite) {
      try {
        this.favorite = JSON.parse(localStorage.getItem('favorite'))
      } catch(e) {
        localStorage.removeItem('favorite')
      }
    }
  },

  
  methods: {
    addFavorite(city) {
      this.favorite[city] = true
      localStorage.setItem('favorite', JSON.stringify(this.favorite))
    },

    removeFavorite(city) {
      delete this.favorite[city]
      localStorage.setItem('favorite', JSON.stringify(this.favorite))
    },

    searchWeather() {
      this.getTodayWeatherByCity()
      this.getForecastByCity()
    },

    getTodayWeatherByCity() {
      this.$axios(
        `https://api.openweathermap.org/data/2.5/weather?q=${ this.store.currentCityName }&appid=${ this.store.apiKey }&units=metric&lang=ua`
      ).then(response => {
        console.log("response: ", response)
        this.weatherData = response.data
        this.errorMessage = null,
        this.store.currentCityName = response.data.name
      }).catch((error) => {
        this.weatherData = null
        this.errorMessage = error
      })
    },

    getForecastByCity() {
      this.$axios(
        `https://api.openweathermap.org/data/2.5/forecast?q=${ this.store.currentCityName }&appid=${ this.store.apiKey }&units=metric&lang=ua`
      ).then(response => {
        console.log("forecast: ", response)

        let dataList = {}
        for (let i = 0; i < response.data.cnt; i++) {
          let date = new Date(response.data.list[i].dt * 1000).toLocaleDateString()
          if (!dataList[date]) {
            dataList[date] = []
          }
          dataList[date].push({
            temp_min: response.data.list[i].main.temp_min,
            temp_max: response.data.list[i].main.temp_max,
            icon: response.data.list[i].weather[0].icon
          })
        }
        delete dataList[new Date().toLocaleDateString()]
        console.log("dataList:", dataList)

        let resultList = []
        let index = 0
        for (let date in dataList) {
          let dayData = {}
          let iconCount = {}
          dayData.date = date
          dataList[date].forEach((element) => {
            if (!dayData.temp_min || dayData.temp_min > element.temp_min) {
              dayData.temp_min = element.temp_min
            }
            if (!dayData.temp_max || dayData.temp_max < element.temp_max) {
              dayData.temp_max = element.temp_max
            }
            let icon = element.icon.substr(0, 2)
            if (!iconCount[icon]) {
              iconCount[icon] = 1
            }
            else {
              iconCount[icon]++
            }
          })

          let max = 0
          for (let key in iconCount) {
            if (iconCount[key] > max) {
              max = iconCount[key]
              dayData.icon = key + 'd'
            }
          }
          
          dayData.temp_min = Math.floor(dayData.temp_min)
          dayData.temp_max = Math.ceil(dayData.temp_max)
          resultList[index] = dayData
          index++
        }

        this.forecastData = resultList
      }).catch((error) => {
        this.forecastData = null
        this.errorMessage = error
      })
    },

    getWeatherIconReplacer(original) {
      let c = this.weatherIcons[original.substr(0, 2)]
      if (original.endsWith('d')) {
        return c.day
      }
      else {
        return c.night
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.weather-container {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  justify-content: space-between;
  backdrop-filter: blur(10px);
  margin: 0 auto;
  margin-bottom: 70px; 
}

.weather-day {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border-right: 1px solid rgba(255, 255, 255, 0.3);
  margin-left: 10px; 
  box-sizing: border-box;
}

.weather-day:last-child {
  border-right: none;
}

.day {
  font-size: 18px; 
  font-weight: 500; 
  color: #fff; 
  text-align: center; 
  margin: 5px 0;
}

.weather-icon img {
  width: 170px;
  height: 170px;
  margin: 10px 0;
}

.weather-icon-t img {
  width: 80px;
  height: 80px;
  margin: 10px 0;
}

.temperature {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.temp-high {
  color: #ff3b30;
  font-weight: 500;
}

.temp-low {
  // color: #00921d;
  // // opacity: 0.6;
  color: #ffffff;
  
}


.weather-map {
  background-color: rgba(255, 255, 255, 0.2); 
  border-radius: 20px; 
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1); 
  padding: 0; 
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(10px); 
  margin: 0 auto;
  margin-bottom: 20px;
  width: 400px; 
  height: 350px; 
  overflow: hidden; 
}

.weather-map img {
  width: 350px;
  height: 250px;
  object-fit: cover;
  border-radius: 20px; 
}

.info-box {
  padding: 16px;
  background-color: rgba(255, 255, 255, 0.2); 
  border-radius: 20px; 
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1); 
}
</style>