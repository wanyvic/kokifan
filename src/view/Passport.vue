<template>
  <div class="content">
    <div class="b-page-header">
    </div>
      <div class="b-page-body">
      <!-- 顶部 -->
        <login></login>
      <div class="footer container">
        <a href="https://github.com/xyxiao001" target="_blank">footer</a>
        <a href="https://github.com/xyxiao001" target="_blank">goodboy</a>
        <p>看看超过会怎样</p>
      </div>
    </div>
  </div>
</template>

<script>
import login from '../components/Login'
export default {
  data () {
    return {
      privKey: ''
    }
  },
  components: {
      login
  },
  methods: {
    
  },
  // 页面进入执行
  mounted () {
    // 获取页面模块位置,更新数据

    window.addEventListener('resize', () => {
      this.updateSlide()
    })
  },
  // 页面切换
  destroyed () {
  }
}
</script>

<style lang="scss">
  html,body {
    margin: 0;
    padding: 0;
    font-size: 12px;
    font-family: "Microsoft YaHei",Arial,Helvetica,sans-serif;
    background: #fff;
    color: #222;
    min-height: 990px;
    -webkit-tap-highlight-color: transparent;
  }

  .body-bg {
    position: fixed;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
  }

  ul, span, p, h1, h2, h3, a {
    margin: 0;
    padding: 0;
  }

  a {
    color: black;
    text-decoration: none;
  }

  li {
    list-style-type: none;
  }

  .hide {
    display: none;
  }

  #index-top {
    height: 240px;
    margin-bottom: 20px;
  }

  .container {
    width: 1160px;
    clear: both;
    margin: auto;

    .b-l {
      float: left;
      width: 440px;
    }

    .b-r {
      float: right;
      width: 720px;
    }
  }

  .b-page-header {
    min-width: 1160px;
  }

  .b-section {
    height: 360px;
    margin-bottom: 20px;
    color: white;
    background-color: #00a1d6;
    font-size: 20px;
    text-align: center;
    line-height: 360px;
  }

  #donghua, #yinyue, #keji, #guanggao{
    background-color: #2ecc71;
  }

  #fanjv, #wudao, #shenghuo, #yule {
    background-color: #324057;
  }

  #guochuang, #youxi, #guichu, #dianying{
    background-color: #f05b72;
  }

  .footer {
    display: flex;
    flex-wrap: wrap;
    height: 1000px;
    color: #fffffb;
    background-color: #e5e9f2;

    a {
      width: 100%;
      text-align: center;
      text-decoration: none;
      font-size: 60px;
      color: #2980b9;
    }

    p {
      width: 100%;
      text-align: center;
      color: black;
    }
  }

  @media screen and (max-width: 1400px) {
    .container {
      width: 980px;

      .b-r {
        width: 540px;
      }
    }

    #promote {
      .b-l {
        width: 700px;
      }
    }
  }
</style>
