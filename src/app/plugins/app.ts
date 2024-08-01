export default defineNuxtPlugin(() => {
  const app = {
    name: 'app'
  }

  return {
    provide: {
      app,
    },
  }
});
