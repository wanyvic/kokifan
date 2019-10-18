<template>
  <div class="b_video">
      <span>{{videoName}}</span>
      <span>{{videoInfo}}</span>
      <span>{{createdAt}}</span>
    <video id="video" controls></video>
  </div>
</template>
<script>

import hls from 'hlsjs-ipfs-loader'
export default {
  name: "videoObject",
  data() {
      return {
          videoCid : this.props.videoCid
      }
  },
  // 首页传过来的
  props: ["videoCid", "videoName", "videoInfo", "createdAt"],
  mounted() {
      this.videoCid = "QmerHzFtTzsHB95Gc7zFQU72fghz4qVzWgQjhA3Yh8Qzjw"
      this.HlsPlayerBind(this.$refs.state.node,this.videoCid)
  },
  methods: {
    HlsPlayerBind(node,cid) {
      Hls.DefaultConfig.loader = HlsjsIpfsLoader;
      Hls.DefaultConfig.debug = false;
      if (Hls.isSupported()) {
        const video = document.getElementById('video');
        const hls = new Hls();
        hls.config.ipfs = node;
        hls.config.ipfsHash = cid;
        hls.loadSource('master.m3u8');
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play();
        });
      }
    }
  }
};
</script>