<template>
  <div id="register">
    <Button @click="create">create</Button>
    <br />
    <span>nodeid: {{nodeid}}</span>
    <br />
    <span>pubKey: {{pubKey}}</span>
    <br />
    <span>privKey: {{privKey}}</span>
    <br />
    <p>end</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      nodeid: "",
      pubKey: "",
      privKey: ""
    };
  },
  methods: {
    create() {
      this.$store
        .dispatch({
          type: "createNewKey"
        })
        .then(resolve => {
          console.log("register", resolve.toJSON());
          const node = resolve.toJSON();
          this.nodeid = node.id;
          this.pubKey = node.pubKey;
          this.privKey = node.privKey;
        });
    }
  }
};
</script>