<template>
  <q-page class="flex column">

    <div class="q-pt-lg q-px-md q-ma-0">
      <q-input filled bottom-slots v-model="this.store.currentCityName" label="Місто" @keydown.enter="$router.push('/')">

        <template v-slot:before>
          <q-btn round dense flat icon="my_location" @click="getCoordsAndUpdate"/>
        </template>

        <template v-slot:append>
          <q-btn round dense flat icon="search" to="/"/>
        </template>

      </q-input>
    </div>

    <div class="row q-mt-md q-px-md justify-between items-center scale">
      <div class="col text-center">
        <div class="text-h2 text-weight-light text-white custom-font text-sha">
          Збережене
        </div>
      </div>

      <div class="col-auto">
        <q-btn
          size="lg"
          flat
          icon="favorite"
          color="primary"
          label="Головна"
          class="text-white custom-font text-sha"
          to="/"
        />
      </div>
    </div>



    <!-- Add for. A made just stable schit -->

    <div v-for="(data) in Object.keys(weatherData).sort()" :key="data" class="q-pa-md ">
      <div class="weather-container row q-my-md q-px-md q-py-sm q-gutter-md justify-between items-center rounded-borders scale">

        <div class="col text-left">
          <div class="text-h3 text-weight-light custom-font text-white">
            {{ data }}
          </div>
        </div>

        <div class="col text-center">
          <div class="text-h3 text-weight-light custom-font text-white">
            {{ weatherData[data].weather[0].description }}
          </div>
        </div>

        <div class="col text-center">
          <div class="text-h1 text-white custom-font">
            {{ Math.ceil(weatherData[data].main.temp) }}&deg;C
          </div>
        </div>

        <div class="weather-icon">
          <img :src="getWeatherIconReplacer(weatherData[data].weather[0].icon)" />
        </div>

      </div>
    </div>

  </q-page>
</template>

<script>
import { crossPageData } from 'stores/crossPageData';

export default {
  name: 'FavoritePage',

  setup() {
    const store = crossPageData()

    return {
      store
    }
  },

  data() {
    return {
      favorite: {},
      weatherData: {},
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
      }
    }
  },

  created() {
    if (localStorage.favorite) {
      try {
        this.favorite = JSON.parse(localStorage.getItem('favorite'))
        for (let city in this.favorite)
        {
          this.getTodayWeatherByCity(city)
        }
      } catch(e) {
        localStorage.removeItem('favorite')
      }
    }
  },


  methods: {
    getCoordsAndUpdate() {
      let lat, lon
      if (this.$q.platform.is.electron) {
        this.$axios(
          `https://api.ipbase.com/v1/json/`
        ).then(response => {
          console.log("position: ", response)
          lat = response.data.latitude
          lon = response.data.longitude
        }).then(() => {
          this.getCityFromCoords(lat, lon)
        })
      }
      else {
        navigator.geolocation.getCurrentPosition(position => {
          console.log("position: ", position)
          lat = position.coords.latitude
          lon = position.coords.longitude
          this.getCityFromCoords(lat, lon)
        })
      }
    },

    getCityFromCoords(lat, lon) {
      this.$axios(
        `https://api.openweathermap.org/data/2.5/weather?lat=${ lat }&lon=${ lon }&appid=${ this.store.apiKey }&units=metric&lang=ua`
      ).then(response => {
        this.store.currentCityName = response.data.name
        this.$router.push('/')
      })
    },

    getTodayWeatherByCity(city) {
      this.$axios(
        `https://api.openweathermap.org/data/2.5/weather?q=${ city }&appid=${ this.store.apiKey }&units=metric&lang=ua`
      ).then(response => {
        this.weatherData[city] = response.data
      }).catch((error) => {
        delete this.favorite[city]
        localStorage.setItem('favorite', JSON.stringify(this.favorite))
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

.scale {
flex-direction: column;
font-size: 7vh;
}


</style>




