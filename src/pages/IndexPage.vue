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

