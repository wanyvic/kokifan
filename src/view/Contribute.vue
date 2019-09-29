<template>
  <div class="content">
    <div class="contribute">
      <span>Name:</span>
      <input type="text" v-model="Contribution.name" />
      <el-upload
        ref="uploadExcel"
        action
        :limit="1"
        :auto-upload="false"
        accept=".jpeg"
        :before-upload="beforeUploadFile"
        :on-change="fileChange"
        :on-exceed="exceedFile"
        :on-success="handleSuccess"
        :on-error="handleError"
        :file-list="fileList"
      >
        <el-button size="small" plain>选择文件</el-button>
        <div slot="tip" class="el-upload__tip">只能上传xlsx(Excel2007)文件，且不超过10M</div>
      </el-upload>
      <Button @click="upload">submit</Button>
    </div>
  </div>
</template>
<script>
// import Upload from "../components/Upload";
export default {
  data() {
    return {
      Contribution: {
        name
      },
      fileList: []
    };
  },
  methods: {
    exceedFile(files, fileList) {
      this.$notify.warning({
        title: "警告",
        message: `只能选择 ${
          this.limitNum
        } 个文件，当前共选择了 ${files.length + fileList.length} 个`
      });
    },
    // 文件状态改变时的钩子
    fileChange(file, fileList) {
      console.log("change");
      console.log(file);
      console.log(fileList);
    },
    // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
    beforeUploadFile(file) {
      console.log("before upload");
      console.log(file);
      let extension = file.name.substring(file.name.lastIndexOf(".") + 1);
      let size = file.size / 1024 / 1024;
      if (extension !== "jpeg" && extension !==  "jpg") {
        this.$notify.warning({
          title: "警告",
          message: `只能上传Excel2017（即后缀是.xlsx）的文件`
        });
      }
      if (size > 10) {
        this.$notify.warning({
          title: "警告",
          message: `文件大小不得超过10M`
        });
      }
    },
    // 文件上传成功时的钩子
    handleSuccess(res, file, fileList) {
      this.$notify.success({
        title: "成功",
        message: `文件上传成功`
      });
    },
    // 文件上传失败时的钩子
    handleError(err, file, fileList) {
      this.$notify.error({
        title: "错误",
        message: `文件上传失败`
      });
    },
    upload() {
      console.log("upload");
    }
  }
};
</script>