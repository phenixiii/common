<template>
  <div class="aui-flex-col" style="margin-top:22px">
    <div class="aui-flex-offset-2 aui-flex-item-8">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="标题" prop="title">
          <el-input type="text" v-model.trim="ruleForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input type="textarea" rows="20" v-model="ruleForm.content"></el-input>
        </el-form-item>

        <el-form-item label="图片">
          <el-upload
            ref="upload"
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            :on-change="handleChange"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleChange"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>

        <el-form-item>
          <el-button style="width:200px" type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button style="width:200px" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var validateTitle = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入标题"));
      } else {
        callback();
      }
    };
    var validateContent = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入内容"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        title: "",
        content: "",
        fileList: []
      },
      rules: {
        title: [{ validator: validateTitle, trigger: "blur" }],
        content: [{ validator: validateContent, trigger: "blur" }]
      },
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: true
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$refs.upload.clearFiles();
      this.ruleForm.fileList = [];
    },

    handleChange(file, fileList) {
      this.ruleForm.fileList = fileList;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleExceed(files, fileList) {
      jsTools.Element.msgTip(this,'上传文件数量不能超过3个！','warning')
    }
  }
};
</script>

<style scoped>
</style>