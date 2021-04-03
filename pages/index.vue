<template>
  <main>
    <section v-for="playlist in playlists" :key="playlist.id">
      <article :style="`height: calc(100vh - 80px);`">
        <iframe :src="`/pl/${playlist.id}`" frameborder="0"></iframe>
      </article>
      <hr/>
    </section>
  </main>
</template>

<script>
export default {
  data () {
    return {
      playlists: {}
    }
  },
  async asyncData({ params, payload }) {
    const playlists = payload.playlists // (await getPlaylists(channelID)).items

    return { playlists }
  },
  mounted() {
    const articles = document.querySelectorAll('article')

    const main = document.querySelector('main')

    const getRandom = () => (Math.floor(Math.random() * 4) + 2)

    const getRandomHeight = () => `height: ${getRandom() * 120}px`

    // set test elements to random height
    // articles.forEach(article => article.style = getRandomHeight())

    let zoom = 1
    let bucket = 0
    let scale = 1
    let scaleSteps = [1, 2, 3, 4, 5, 6]
    const render = () => {
      main.style = `transform: scale(${scale});`
    }

    document.addEventListener('click', (e) => {
      return (scale = 6, render())
    });

    document.addEventListener('wheel', (e) => {

      if (e.ctrlKey) {
        if (e.deltaY > 0) return (scale = 1, render())
        // zoom = Math.max(zoom - e.deltaY * 0.1, 0)
        // bucket = Math.min(Math.round(zoom), scaleSteps.length - 1)
        // scale = scaleSteps[bucket]


      } else {
        // posX -= e.deltaX * 2;
        // posY -= e.deltaY * 2;
      }

      ;
    });

  }
}
</script>

<style lang="postcss" scoped>
body {
  padding: 30px 20px;
}

body main {
  display: grid;
/*   gap: 40px; */
  grid-template-columns: repeat(10, 1fr);
  width: calc(100% * (10/6));
  
  transform-origin: top left;
  transition: transform ease-in-out .5s;
}

@media only screen and (max-width: 480px) {
  main {
    grid-template-columns: repeat(2, 1fr);
  }
}

section {
  display: grid;
  grid-auto-flow: row;
  align-content: start;
  
  scroll-snap-align: start
}

hr {
  width: 100%;
  height: 0px;
  margin: 0;
  border: none;
  
/*   scroll-snap-align: start; */
}

article {
  margin: 20px;
/*   X-axis scroll snap */
  border: solid 2px white;
  min-height: 100px;
  overflow: hidden;

  iframe {
    width: calc(100% * var(--columns));
    height: calc(100% * var(--columns));
    transform: scale(calc(1 / var(--columns)));
    transform-origin: top left;
  }
}


</style>