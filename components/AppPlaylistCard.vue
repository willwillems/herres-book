<template>
  <div class="playlist-card">
    <header class="playlist-card__header">
      <h1>{{ title }}</h1>
      <h3>{{ description }}</h3>
    </header>
    <main class="playlist-card__content">
      <article class="video" v-for="item in playlistItems" :key="item.id">
        <header class="video__header">
          <h1 class="video__title">{{ item.snippet.title }}</h1>
        </header>
        <AppPseudoVideo :video="item" />
      </article>
    </main>
  </div>
</template>

<script>
import AppPseudoVideo from '@/components/AppPseudoVideo.vue'

export default {
  props: {
    playlist: {
      type: Object,
      required: true
    },
    playlistItems: {
      type: Array,
      required: true
    }
  },
  components: {
    AppPseudoVideo
  },
  computed: {
    title () {
      return this.playlist.snippet.title
    },
    description () {
      return this.playlist.snippet.description
    }
  }
}
</script>

<style lang="postcss" scoped>
.playlist-card {
  display: grid;
  grid-template-rows: auto 1fr;

  font-size: 64px;

  &__header {
    border-bottom: solid 12px white;
    padding: 8rem 4rem;

    h1 {
      font-size: 2em;
      margin: 0 0 .25em 0;
    }

    h3 {
      margin: .1em 0;
      line-height: 1.375;
    }
  }
}

@media only screen and (max-width: 560px) {
  .playlist-card__header h1 {
    font-size: 72px;
  }

  .playlist-card__header h3 {
    font-size: 48px;
  }
}

.video {
  margin:0;

  &__header {
    padding: 2rem 3rem;
    background-color: white;
    color: black;
  }

  &__title {
    font-size: 64px;
    margin: 0;
  }

  &__player {
    width: 100%;
    height: min(80vh, 680px);
    
    /* Gives a nice consisstent look but performance suffers */
    /* filter: sepia(1) hue-rotate(-19deg) contrast(1.3);

    &:hover {
      filter: none;
    } */
  }
}
</style>