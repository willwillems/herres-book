<template>
  <div>
    <Nuxt />
  </div>
</template>

<style>
:root {
  --columns: 5;
  --column-scale: 6;
}

@media only screen and (max-width: 920px) and (min-width: 560px) {
  :root {
    --columns: 3
  }
}

@media only screen and (max-width: 560px) {
  :root {
    --columns: 2
  }
}

html {
  background-color: black;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
