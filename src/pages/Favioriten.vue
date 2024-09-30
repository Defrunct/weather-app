<template>
  <q-page class="flex column">
    
    <div class="col q-pt-lg q-px-md">
      <q-input filled bottom-slots label="Місто">

        <template v-slot:before>
          <q-icon name="my_location"/>
        </template>
        
        <template v-slot:append>
          <q-btn round dense flat icon="search"/>
        </template>
        
      </q-input>
    </div>

    <div class="col text-white text-center">
      <div class="text-h2 text-weight-light custom-font text-sha d-flex justify-center items-center">
        Збережене
      </div>
      <div class="col text-white text-right custom-font text-sha">
        <q-btn
          size="lg" 
          flat
          icon="favorite"
          color=""
          label="Головна"
          class="text-white text-right custom-font text-sha"
          to="/"
        />
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
          <img src="https://cdn-icons-png.flaticon.com/128/9755/9755232.png" />
        </div>
        
      </div>
    </div>

  </q-page>
</template>

<script>

export default {
  name: 'FavoritePage',
  data() {
    return {
     
    }
  },

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




