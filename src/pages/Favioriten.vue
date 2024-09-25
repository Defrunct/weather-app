<template>
  <q-page class="flex column">

    <template v-if="favorites">
      
      <div class="col text-center text-white custom-font">
        <div class="col text-h2 text-white custom-font text-weight-thin text-sha">
          Збережене
        </div>
      </div>
<!-- Add for. A made just stable schit -->
      <div class="q-pa-md"> 
        <div class="weather-container row q-my-md q-px-md q-py-sm q-gutter-md justify-between items-center rounded-borders">
          <div class="col text-left">
            <div class="text-h3 text-weight-light custom-font text-white">
            Відень
            </div>
          </div>

          <div class="col text-center">
            <div class="text-h3 text-weight-light custom-font text-white">
               Дощ
            </div>
          </div>

          <div class="col text-center">
            <div class="text-h1 text-white custom-font">
              22&deg;C
            </div>
          </div>

          <div class="weather-icon">
            <!-- <img :src="getWeatherIconReplacer(weatherData.weather[0].icon)" /> -->
            <img src="https://cdn-icons-png.flaticon.com/128/4814/4814268.png" />
          </div>

        
        </div>
      </div>
      
      <!-- Remove this crutch -->
      <div class="q-pa-md"> 
        <div class="weather-container row q-my-md q-px-md q-py-sm q-gutter-md justify-between items-center rounded-borders">
          <div class="col text-left">
            <div class="text-h3 text-weight-light custom-font text-white">
            Десь
            </div>
          </div>

          <div class="col text-center">
            <div class="text-h3 text-weight-light custom-font text-white">
               Щось
            </div>
          </div>

          <div class="col text-center">
            <div class="text-h1 text-white custom-font">
              2&deg;C
            </div>
          </div>

          <div class="weather-icon">
            <!-- <img :src="getWeatherIconReplacer(weatherData.weather[0].icon)" /> -->
            <img src="https://cdn-icons-png.flaticon.com/128/9755/9755232.png" />
          </div>
          
        </div>
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