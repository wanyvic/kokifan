<template>
  <div id="login">
    <span>private Key:</span>
    <input type="text" placeholder="please input your private key..." v-model="PrivKey" />
    <Button @click="login">submit</Button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      PrivKey:
        "CAASqAkwggSkAgEAAoIBAQDAa/fDHDiLk9Nw6XV8xeKBBVVQobS0pk3USVReSbS+W1U65yF9C/oA3g7vvl64SZY8sDR0BvYYlKqcIgndeDxWmq3olq/US1DVhuc9PUCwN0XPdmTyXa+bwHziIAAweY0OIxhpZUiWjQrWBWOV7vonFoyeWjwpcDc9enWFa7JiNaCnsYbXzZfGMcXiT6D3SztXAILxFQ3vmhRjKfPV2lzhQbKcSUskDuLTBm1dycF+S6IlgWNDQ6jEQ1EXE6AphjX2Ho3B8P0T0Nyzv6T1/N9meXhy14mKnMJJsjE59JOsXlJNEA+rXUmsf73xL1yIKY4YuyUcQCIu/kRKQAiZUlSlAgMBAAECggEADcOrZXmPUeyxI1KP5O0C1tfa0nm+w21iA916+4OqOjOuVRhTfO5uY8F+sAeeHvCknpK8LdCRqhB4Y9LLgdwn9Mn7xreAvF7m2V9dCzRmfDR3+e8uKWgqN6n9RO+lE9KeFHTOOjvUhXBxZf3cscz2d/VU+b7artwoF227GmAp0nyDqf0pbsLBTadIidFUsrL9Ywcl8/KBa4+j8gyHhaZ3ptq/+pnt/6MtB5OE03qnpJBCr61VIBWilJgVzkYOHmZ5aOySO1f2teL88maxkTdjRlPz+3rOaGpJM44WkUOm0a3m69YPENMhzYVmsqiQ+Ik/HglerZ2w7URezVyGF0BiAQKBgQD0sX8Oz+oLl0lGM5++dRfdV5AVvNji8PPK4R4n7TcKCJIBxBAFaV/isxA4Pp7sEUW7gvC7yanBb+E/wTa7XIW/kEhU3u6TRrRoKI8mHW/kfdW9nu007qbCXbG5gMFf8L8jeXE1z2AW0LpX9w2nYS7xKvZK9EPz5qpFt5VS8cQeDQKBgQDJUCUtHRD6P+nod/o7aHFliF2WiWXQO8CGk36a3IQEW5z4MoyuDZ90nb9cDphQqcB7K7zzoTRoFOSOzcnecQKoO5JWKTlYcbby8FeYoCTDHYqz3ndVTplMDa3JA8gqtF/OL4aqTXPhkRyKO7NrsxcHH/szxJRJpKc2ZX0WbmkC+QKBgQCqP2zlw2dWFTaYL4bvnsyx5iCL308P5xHYkHTI1tU6l+fubpmvCjf6pRed6oPsP8BCzMHuBkukGNGh6C7KgX9VX2/UDR/1PHZ9GesvW7/kPGEgg5kLARjplwL2zEy/EeQLLI3GILj8ZtGgLnZDhOyCQ6AFWpqE8nJ5+1db1HbdaQKBgCW4lr61S5EYmMOud3zaPSVBQAgNBr7V82VEDd0GpNYMNIVtM18Jvm8jf8/IDFJQ/HgX4ffkpOU7xPfdJ44+rrjHMMxkPRKNfDJZRpCasUi+KFc7wDCD4cWWapHX25Hk6m7ACQOwL558ilR8i0oK7K2xGGjC1OZXq91NdvrVBWhBAoGBAKRTjbBRrjQ0uKE8utmC8MZ3USbBkT6lGm4t4m3qZv/mtEJ0XKFExYu+CSVwogK4I97078I4Nq7DoPNgDIbEaIM45gCnUUUqZRKKExnogXiL6CMkE8Nx7aqEZfF7pxWyqdO09AQt2WyLtUhfYC/+B9NgQu1EV8qRAHPH2qC3P2sa"
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch({
          type: "createIpfs",
          PrivKey: this.PrivKey
        })
        .then(
          node => {
            node.id().then(
              identity => {
                this.$router.push({ path: "/upload" });
              },
              err => console.error(err)
            );
          },
          err => console.error(err)
        );
    }
  }
};
</script>