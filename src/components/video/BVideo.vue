<template>

  <div class="b_video">
    <video ref="video" controls class="video-js vjs-default-skin"
    preload="auto" width="638" height="358"
    data-setup='{}'></video>
  </div>
</template>

<script src="https://unpkg.com/video.js/dist/video.min.js"></script>
<script>
import { mapGetters } from "vuex";
export default {
  name: "videoObject",
  // 首页传过来的
  mounted() {
    console.log(this.$route.params);
    console.log(this.$route.query);
    console.log(this.rows);
    this.$store
      .dispatch({
        type: "HasSwarmClient"
      })
      .then(
        () => {},
        () => {
          this.$store.dispatch({
            type: "CreateSwarmClient",
            config: {
              bzzUrl: "https://swarm-gateways.net",
              debug: true
            }
          });
        }
      )
      .then(() => {
        this.$store.dispatch("getContentRows").then(() => {
          this.$store
            .dispatch({
              type: "getRowsItem",
              aid: this.$route.params.vid
            })
            .then(res => {
              this.$store.dispatch({
                type: "hlsPlay",
                value: res,
                element: this.$refs.video
              });
            });
        });
      });
  },
  computed: {
    ...mapGetters(["rows"])
  },
  methods: {}
};
</script>
<style lang="stylus"> 
@import "https://unpkg.com/video.js/dist/video-js.min.css"
</style>