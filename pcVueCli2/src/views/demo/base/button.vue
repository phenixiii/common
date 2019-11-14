<template>
  <div class="aui-margin-20">
    <div>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </div>

    <div style="margin: 20px 0">
      <el-button plain>朴素按钮</el-button>
      <el-button type="primary" plain>主要按钮</el-button>
      <el-button type="success" plain>成功按钮</el-button>
      <el-button type="info" plain>信息按钮</el-button>
      <el-button type="warning" plain>警告按钮</el-button>
      <el-button type="danger" plain>危险按钮</el-button>
    </div>

    <div style="margin: 20px 0">
      <el-button round>圆形按钮</el-button>
      <el-button type="primary" round>主要按钮</el-button>
      <el-button type="success" round>成功按钮</el-button>
      <el-button type="info" round>信息按钮</el-button>
      <el-button type="warning" round>警告按钮</el-button>
      <el-button type="danger" round>危险按钮</el-button>
    </div>

    <div>
      <el-button disabled>默认按钮</el-button>
      <el-button type="primary" disabled>主要按钮</el-button>
      <el-button type="success" disabled>成功按钮</el-button>
      <el-button type="info" disabled>信息按钮</el-button>
      <el-button type="warning" disabled>警告按钮</el-button>
      <el-button type="danger" disabled>危险按钮</el-button>
    </div>

    <div style="margin: 20px 0">
      <el-button type="primary" icon="el-icon-edit"></el-button>
      <el-button type="primary" icon="el-icon-share"></el-button>
      <el-button type="primary" icon="el-icon-delete"></el-button>
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
      <el-button type="primary">
        上传
        <i class="el-icon-upload el-icon--right"></i>
      </el-button>
    </div>

    <div>
      <el-button-group>
        <el-button type="info" plain icon="el-icon-search">查询</el-button>
        <el-button type="info" plain icon="el-icon-plus">新增</el-button>
        <el-button type="info" plain icon="el-icon-edit">编辑</el-button>
        <el-button type="info" plain icon="el-icon-delete">删除</el-button>
        <el-button type="info" plain icon="el-icon-share">分享</el-button>
        
      </el-button-group>

      <el-button-group style="margin-left:20px">
        <el-button type="info" icon="el-icon-search">查询</el-button>
        <el-button type="info" icon="el-icon-plus">新增</el-button>
        <el-button type="info" icon="el-icon-edit">编辑</el-button>
        <el-button type="info" icon="el-icon-delete">删除</el-button>
        <el-button type="info" icon="el-icon-share">分享</el-button>
        
      </el-button-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "buttons",
  data() {
    return {};
  }
};
</script>
