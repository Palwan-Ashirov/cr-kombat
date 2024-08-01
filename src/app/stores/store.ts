import { defineStore } from 'pinia';

export const useStore = defineStore('store', {
  state: () => ({
    SECRET_TOKEN: '12314411'
  }),
  actions: {},
  getters: {}
});