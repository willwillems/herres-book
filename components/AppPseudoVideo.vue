<template>
  <div class="video" @dragover="handleDragover" @drop="handleDrop">
      <img class="video__thumb" @click="showVideo" :src="thumbnailUrl" :alt="videoTitle" >
      <iframe v-if="videoVisible" class="video__player" :src="videoURL" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      <div class="video__tags">
        <img v-if="hasGold" src="/img/gold.webp" alt="GOLD">
      </div>
  </div>
</template>

<script>
import { getVideoData, setVideoData } from "@/lib/fb"

export default {
  props: {
    video: {
      type: Object,
      required: true
    }
  },
  data () {
     return {
        videoVisible: false,
        tags: {}
     }
  },
  mounted () {
    getVideoData(this.videoId).then((userTags) => this.tags = userTags)
  },
  computed: {
    thumbnailUrl () {
      return   this.video.snippet.thumbnails.maxres?.url
            || this.video.snippet.thumbnails.high?.url
            || this.video.snippet.thumbnails.default?.url
    },
    videoId () {
      return this.video.snippet.resourceId.videoId
    },
    videoURL () {
       // `https://www.youtube.com/embed/${videoId}?autoplay=1`
       return `https://www.youtube.com/embed/${this.videoId}?autoplay=1`
    },
    videoTitle () {
      return this.video.snippet.title
    },
    hasGold () {
      return !!this.tags.gold
    }
  },
  methods: {
    showVideo () {
      this.videoVisible = true
    },
    handleDragover (ev) {
      ev.preventDefault()
    },
    async handleDrop (ev) {
      ev.preventDefault()

      const data = ev.dataTransfer.getData("text")
      const newTagData = {
        ...this.tags,
        [data]: 1
      }

      await setVideoData(this.videoId, newTagData)
      this.tags = newTagData
    }
  }
}
</script>

<style lang="postcss" scoped>
.video {
   position: relative;
   margin: 0;
   height: min(90vh, 1080px);

   &__thumb {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;

    cursor: pointer;

    line-height: 1.3;
    color: #949494;

    /* Gives a nice consisstent sepia-like look but performance suffers */
    /* filter: sepia(1) hue-rotate(-19deg) contrast(1.3); */
    transition: filter .2s linear;
    filter: none;

    &:hover {
      filter: contrast(1.1) brightness(1.2);
    }
  }

  &__player {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
  }

  &__tags {
    position: absolute;
    top: 60px;
    right: 40px;
    width: 180px;

    & > * {
      width: 100%;
      transform: rotate(20deg);

      &:hover {
        animation: wiggle 1s 1;
      }
    }
  }
}

@keyframes wiggle {
  0% {transform: rotate(250deg);}
  25% {transform: rotate(15deg);}
  50% {transform: rotate(30deg);}
  75% {transform: rotate(15deg);}
  100% {transform: rotate(20deg);}
}
</style>