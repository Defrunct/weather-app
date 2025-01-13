import { defineStore } from 'pinia'

export const crossPageData = defineStore('cpd', {
  state: () => ({
    currentCityName: null,
    apiKey: ''
  })
})
