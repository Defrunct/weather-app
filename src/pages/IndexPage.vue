<template>
  <q-page class="flex column">

    <div class="col q-pt-lg q-px-md">
      <q-input filled bottom-slots v-model="search" label="Місто" >

        <template v-slot:before>
          <q-icon name="my_location"/>
        </template>
        
        <template v-slot:append>
          <q-btn round dense flat icon="search" />
        </template>
        
      </q-input>
    </div>

    <template v-if="weatherData">
      <div class="col text-white text-center">
        <div class="text-h2 text-weight-light custom-font">
          <!-- Місто  -->
          {{ weatherData.name  }}
        </div>

        <div class="text-h6 text-weight-light custom-font">
          <!-- Погода -->
          {{ weatherData.weather[0].description.toUpperCase() }}
        </div>

        <div class="text-h1 text-weight-thin custom-font q-my-lg relative-position">
          <span>
            <!-- Температура -->
            {{ Math.ceil(weatherData.main.temp) }}
          </span>
          <span class="text-h4 relative-position degree" >&deg;C</span>
        </div>
      </div>
      
      <div class="col text-center">
        <!-- <img :src="`https://openweathermap.org/img/wn/10n@2x.png`" > -->
        <!-- <img :src="`https://openweathermap.org/img/wn/${ weatherData.weather[0].icon }@2x.png`" /> -->

        <!-- TODO: Змінити стилі -->
        <div class="weather-icon">
          <img :src="getWeatherIconReplacer(weatherData.weather[0].icon)" />
        </div>
      </div>
      
      <!-- <div class="weather-container">
        <div v-for="(day, index) in weatherDataDays" :key="index" class="weather-day">
          <div class="day">{{ day.name }}</div>
          <div class="weather-icon">
            <img :src="day.icon" :alt="day.description" />
          </div>
          <div class="temperature">
            <span class="temp-high">{{ day.high }}°C</span>
            <span class="temp-low">{{ day.low }}°C</span>
          </div>
        </div>
      </div> -->


      <div v-if="forecastData" class="weather-container">
        <div v-for="(data, index) in forecastData" :key="index" class="weather-day">
          <div class="day">{{ data.date }}</div>
          <div class="weather-icon">
            <img :src="getWeatherIconReplacer(data.icon)" />
          </div>
          <div class="temperature">
            <span class="temp-high">{{ data.temp_max }}°C</span>
            <span class="temp-low">{{ data.temp_min }}°C</span>
          </div>
        </div>
      </div>
    </template>

    <!--Потрібно повідомлення про помилку у беку -->
    <template v-else-if="errorMessage">
      <div class="col text-center text-white custom-font">
        <div class="col text-h2 text-white custom-font text-weight-thin">
          Місто не знайдено. <br>Спробуйте ще раз.
        </div>
      </div>
    </template>

    <!-- Змінюйте tryGetWeather для тестування -->
    <template v-else>
      <div class="col text-center text-white custom-font">
        <div class="col text-h2 text-white custom-font text-weight-thin">
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

<script setup>

  defineOptions({
  name: 'IndexPage',
    data() {
      return{
        search:'',
        city: "Dnipro",
        weatherData: null,
        forecastData: null,
        apiKey: 'dd76f1d7c2c54c9250d0de544316dcca',
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
        tryGetWeather: true
      }
    },


    methods: {
      getTodayWeatherByCity() {
        this.$axios(
          `https://api.openweathermap.org/data/2.5/weather?q=${ this.city }&appid=${ this.apiKey }&units=metric&lang=ua`
        ).then(response => {
          console.log("response: ", response)
          this.weatherData = response.data
        })
      },

      getForecastByCity() {
        this.$axios(
          `https://api.openweathermap.org/data/2.5/forecast?q=${ this.city }&appid=${ this.apiKey }&units=metric&lang=ua`
        ).then(response => {
          console.log("forecast: ", response)

          let dataList = []
          for (let i = 0; i < response.data.cnt; i++) {
            if (!(i % 8)) {
              dataList[Math.floor(i / 8)] = []
            }
            dataList[Math.floor(i / 8)][i % 8] = response.data.list[i]
          }

          let resultList = []
          dataList.forEach((element, index) => {
            let dayData = {}
            let iconCount = {}
            let date = new Date(element[0].dt * 1000)
            dayData.date = date.toLocaleDateString()
            element.forEach((element) => {
              if (!dayData.temp_min || dayData.temp_min > element.main.temp_min) {
                dayData.temp_min = element.main.temp_min
              }
              if (!dayData.temp_max || dayData.temp_max < element.main.temp_max) {
                dayData.temp_max = element.main.temp_max
              }
              let icon = element.weather[0].icon.substr(0, 2)
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
          })

          this.forecastData = resultList
        })
      },

      getWeatherIconReplacer(original) {
        let c = this.weatherIcons[original.substr(0, 2)]
        if (original.substr(2) == "d") {
          return c.day
        }
        else {
          return c.night
        }
      }
    },
    
    
    mounted() {
      if (this.tryGetWeather) {
        this.getTodayWeatherByCity()
        this.getForecastByCity()
      }
    }
});

</script>

<style lang="scss" scoped>
.weather-container {
  width: 100%;
  max-width: 1000px;
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
  width: 40px;
  height: 40px;
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
  color: #f5f5f7;
  opacity: 0.6;
}
</style>