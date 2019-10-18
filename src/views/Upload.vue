<template>
  <div id="upload">
    <div>
      {{ $formatMessage('videoName') }}
      <input type="text" v-model="vidObj.name" />
      <br />
      {{ $formatMessage('videoInfo')}}
      <input type="text" v-model="vidObj.info" />
      <br />
      {{ $formatMessage('videoCategory')}}
      <input type="text" v-model="vidObj.category" />
    </div>
    <div class="el-upload__tip" slot="tip">只能上传jpg/png</div>
    <el-upload
      drag
      ref="upload"
      :auto-upload="false"
      action="#"
      :limit="3"
      list-type="picture-card"
      accept="image/jpeg, image/png, image/jpg"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :http-request="addAttachment"
      :on-change="imgSaveToUrl"
      :on-exceed="handleExceed"
      multiple
    >
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>

    <Button @click="handleUpload">submit</Button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      vidObj: new Object({
        name: "",
        info: "",
        category: "",
        uploadAt: "",
        file: "",
        image: "",
        tanmu: ""
      })
    };
  },
  methods: {
    imgSaveToUrl(event) {
      console.log("imgSaveToUrl", event);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      console.log(file);
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    addAttachment(file) {
      this.vidObj.file = file.file;
      console.log(file);
    },
    handleUpload() {
      this.$refs.upload.submit();
      console.log("handleUpload", this.vidObj, this.vidObj.file.raw);
      if (this.$store.getters.node == undefined) {
        console.error(" node is undefined");
        return;
      }
      this.$store
        .dispatch({
          type: "upload",
          fileObj: this.vidObj
        })
        .then(resolve => {});
    },
    handleExceed() {
      console.log("exceed");
    }
  }
};
</script>