<template>
  <div class="vue-demo">
    <div>
      <h2>🎉 textVueJs直接引用案例</h2>
      <textVueJs  :value="'------textVueJs直接引用案例文本'"></textVueJs>
    </div>
    <div>
      <h2>🎉 textRenderJsx直接引用案例</h2>
      <textRenderJsx  :value="'------textRenderJsx直接引用案例文本'"></textRenderJsx>
    </div>
    <h2>🎉 Hello from Vue 2!</h2>
    <p>这是使用 dumi-plugin-preset-vue2 渲染的 Vue 2 组件</p>

    <el-divider></el-divider>

    <h3>数据绑定示例</h3>
    <p>{{ message }}</p>

    <h3>Element UI 组件</h3>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-button type="primary" @click="handleClick">
          点击次数: {{ count }}
        </el-button>
      </el-col>
      <el-col :span="8">
        <el-button type="success">成功按钮</el-button>
      </el-col>
      <el-col :span="8">
        <el-button type="warning">警告按钮</el-button>
      </el-col>
    </el-row>

    <div v-if="showMessage" style="margin-top: 20px;">
      <el-alert
        title="恭喜！你点击了 3 次以上"
        type="success"
        description="Vue 2 和 Element UI 在 Dumi 中完美运行"
        show-icon
        :closable="false"
      ></el-alert>
    </div>

    <el-divider></el-divider>

    <h3>表单示例</h3>
    <el-form :inline="true" :model="form">
      <el-form-item label="名称">
        <el-input v-model="form.name" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border style="width: 100%; margin-top: 15px;">
      <el-table-column prop="date" label="日期"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import textVueJs from "./text-vue-js";
import textRenderJsx from "./text-render";

export default {
  name: 'VueDemo',
  components: {
    textVueJs,
    textRenderJsx
  },
  data() {
    return {
      message: '欢迎使用 dumi-plugin-preset-vue2 插件！',
      count: 0,
      showMessage: false,
      form: {
        name: '',
      },
      tableData: [
        { date: '2024-01-01', name: '张三', address: '北京市朝阳区' },
        { date: '2024-01-02', name: '李四', address: '上海市浦东新区' },
        { date: '2024-01-03', name: '王五', address: '广州市天河区' },
      ],
    }
  },
  methods: {
    handleClick() {
      this.count++;
      if (this.count >= 3) {
        this.showMessage = true;
      }
    },
    onSubmit() {
      this.$message.success(`查询: ${this.form.name || '全部'}`);
    },
  },
}
</script>

<style scoped>
.vue-demo {
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 8px;
}

.vue-demo h2 {
  color: #42b883;
  margin-bottom: 10px;
}

.vue-demo h3 {
  color: #303133;
  margin-top: 20px;
}
</style>
