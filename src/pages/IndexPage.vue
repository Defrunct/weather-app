<template>
  <q-page class="flex column">

    <div class="col q-pt-lg q-px-md">
      <q-input 
      filled bottom-slots v-model="search" 
      label="Місто" 
      >

          <template v-slot:before>
            <q-icon name="my_location"/>
          </template>

          <!-- Підказка дійсно потрібна? -->
          <template v-slot:hint>
            Підказка поля
          </template>

          <template v-slot:append>
            <q-btn round dense flat icon="search" />
          </template>
        </q-input>
    </div>

    <template v-if="weatherData">

        <div class="col text-white text-center">
          <div class="text-h2 text-weight-light custom-font">
            <!-- Відень  -->
            {{ weatherData.name  }}
          </div>
          <div class="text-h6 text-weight-light custom-font">
            <!-- Дощ -->
            {{ weatherData.weather[0].description.toUpperCase() }}
          </div>
          <div class="text-h1 text-weight-thin custom-font q-my-lg relative-position">
            <span>
              <!-- 13 -->
              {{ Math.ceil(weatherData.main.temp) }}
            </span>
            <span class="text-h4 relative-position degree" >&deg;C</span>
          </div>
        </div>
      

      <div class="col text-center">
        <!-- <img :src="`https://openweathermap.org/img/wn/10n@2x.png`" > -->
        <img :src="`https://openweathermap.org/img/wn/${ weatherData.weather[0].icon }@2x.png`" /> 
      </div>

    
        <div class="weather-container">
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
        </div>

    </template>

    <!-- Змінюйте tryGetWeather для тестування -->
    <template v-else>
      <div class="col text-center text-white custom-font">
        <div class="col text-h2 text-white custom-font text-weight-thin">
         Прогноз <br> Погоди
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
        weatherData: null,
        tryGetWeather: true
      }
    },



    mounted() {
      if (this.tryGetWeather) {
        this.$axios(
          `https://api.openweathermap.org/data/2.5/weather?q=Dnipro&appid=dd76f1d7c2c54c9250d0de544316dcca&units=metric&lang=ua`
        ).then(response => {
          console.log("response: ", response)
          this.weatherData = response.data
        })
      }
    }

    

});
</script>

<script setu>
    const weatherDataDays = [
    { name: 'Monday', icon: 'https://cdn-icons-png.flaticon.com/512/1163/1163661.png', description: 'Sunny', high: 22, low: 15 },
    { name: 'Tuesday', icon: 'https://cdn-icons-png.flaticon.com/512/1163/1163672.png', description: 'Cloudy', high: 19, low: 12 },
    { name: 'Wednesday', icon: 'https://cdn-icons-png.flaticon.com/512/1163/1163657.png', description: 'Rainy', high: 17, low: 10 },
    { name: 'Thursday', icon: 'https://cdn-icons-png.flaticon.com/512/1163/1163660.png', description: 'Thunderstorm', high: 18, low: 11 },
    { name: 'Friday', icon: 'https://cdn-icons-png.flaticon.com/512/1163/1163658.png', description: 'Snow', high: 0, low: -5 }
    ]
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