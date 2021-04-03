<template>
  <main>
    <div v-for="(playlist, i) in playlists" :key="playlist.id" class="section-container">
      <section class="section">
        <a :href="`/pl/${playlist.id}`" class="playlist-link">
          <img src="@/assets/open_full.svg" alt="open">
        </a>
        <AppPlaylistCard class="playlist" :playlist="playlist" :playlistItems="playlistItems[i].items" />
        <!-- <iframe :src="`/pl/${playlist.id}`" frameborder="0"></iframe> -->
      </section>
      <hr/>
    </div>
    </div>
  </main>
</template>

<script>
import { getPlaylists, getAllPlayListItems, channelID } from '@/lib/ytapi'

import AppPlaylistCard from '@/components/AppPlaylistCard.vue'

/**
 *  Sorts all arrays together with the first. Pass either a list of arrays, or a map. Any key is accepted.
 *     Array|Object arrays               [sortableArray, ...otherArrays]; {sortableArray: [], secondaryArray: [], ...}
 *     Function comparator(?,?) -> int   optional compareFunction, compatible with Array.sort(compareFunction)
 */
function sortArrays(arrays, comparator = (a, b) => (a < b) ? -1 : (a > b) ? 1 : 0) {
    let arrayKeys = Object.keys(arrays);
    let sortableArray = Object.values(arrays)[0];
    let indexes = Object.keys(sortableArray);
    let sortedIndexes = indexes.sort((a, b) => comparator(sortableArray[a], sortableArray[b]));

    let sortByIndexes = (array, sortedIndexes) => sortedIndexes.map(sortedIndex => array[sortedIndex]);

    if (Array.isArray(arrays)) {
        return arrayKeys.map(arrayIndex => sortByIndexes(arrays[arrayIndex], sortedIndexes));
    } else {
        let sortedArrays = {};
        arrayKeys.forEach((arrayKey) => {
            sortedArrays[arrayKey] = sortByIndexes(arrays[arrayKey], sortedIndexes);
        });
        return sortedArrays;
    }
}

export default {
  data () {
    return {
      playlists: {}
    }
  },
  components: {
    AppPlaylistCard
  },
  async asyncData({ params, payload, isDev, $config }) {
    const playlists     = isDev ? (await getPlaylists($config.apiKey)(channelID)).items                   : payload.playlists
    const playlistItems = isDev ? (await getAllPlayListItems($config.apiKey)(playlists.map(pl => pl.id))) : payload.allPlaylistItems

    const [sortedplaylistItems, sortedplaylists] = sortArrays([playlistItems, playlists], (a, b) => {
      // ASC  -> a.length - b.length
      // DESC -> b.length - a.length
      return b.items.length - a.items.length
    })

    return { playlists: sortedplaylists, playlistItems: sortedplaylistItems }
  },
  mounted() {

  },
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
  width: calc(100% * (10/5));
  
  transform-origin: top left;
  transition: transform ease-in-out .5s;
}

@media only screen and (max-width: 560px) {
  body main {
    width: calc(100% * (10/2));
  }
}

.section-container {
  display: grid;
  grid-auto-flow: row;
  align-content: start;
  
  scroll-snap-align: start;
}

.section {
  margin: 20px;
  position: relative;
/*   X-axis scroll snap */
  border: solid 2px white;
  min-height: 100px;
  overflow: hidden;

  iframe, .playlist {
    width: calc(100% * var(--columns));
    height: calc(100% * var(--columns));
    transform: scale(calc(1 / var(--columns)));
    transform-origin: top left;
  }
}

hr {
  width: 100%;
  height: 0px;
  margin: 0;
  border: none;
  
/*   scroll-snap-align: start; */
}

.playlist-link {
  position: absolute;
  top: 20px;
  right: 15px;
  z-index: 10;
}

</style>