<template>
  <v-carousel
    cycle
    height="400"
    hide-delimiter-background
    delimiter-icon="mdi-minus"
    show-arrows-on-hover
  >
    <v-carousel-item
      v-for="(item, i) in items"
      :key="i"
      :src="item.src"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          src: "https://images.ctfassets.net/x7j9qwvpvr5s/5mVJvUTpRTQdsVDeoUSdX9/8428a6e6ccf997c2f32e9677ca8d5fd6/MY-22-SF-V4-SP-Model-Blocks-630x390.png",
        },
        {
          src: "https://images.ctfassets.net/x7j9qwvpvr5s/75SEQJtLwUcenTM5Z78sdF/fc6c9ff6f6801acc4a674dce8ac8e903/MY-22-SF-V2-Model-Blocks-630x390.png",
        },
        {
          src: "https://images.ctfassets.net/x7j9qwvpvr5s/3h6XJ4UPPocseDXmfRvIIO/6cbeabf0798c3361ea4a28372959e205/MY-22-PV2-Bayliss-01-Model-Blocks-630x390-v02.png",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
        },
      ],
    };
  },
};
</script>

<style>
</style>