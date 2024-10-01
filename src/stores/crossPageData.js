import { defineStore } from 'pinia'

export const crossPageData = defineStore('cpd', {
  state: () => ({
    currentCityName: null,
    apiKey: 'dd76f1d7c2c54c9250d0de544316dcca'
  })
})
