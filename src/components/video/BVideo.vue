<template>
  <div class="b_video">
    <video ref="video" controls></video>
  </div>
</template>
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