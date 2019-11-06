<template>
  <div class>
    <el-card class="box-card">
      <div slot="header">
        <div class="aui-flex-col">
          <div class="aui-flex-col aui-flex-item-3 aui-flex-middle">
            <el-date-picker
              v-model="search.date"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>

          <div class="aui-flex-col aui-flex-item-3 aui-flex-middle">
            <div class="aui-flex-item-4 aui-text-right">
              <span>用户名：</span>
            </div>
            <div class="aui-flex-item-8">
              <el-input placeholder="请输入用户名" v-model="search.name"></el-input>
            </div>
          </div>
          <div class="aui-flex-col aui-flex-item-3 aui-flex-middle">
            <div class="aui-flex-item-4 aui-text-right">
              <span>用户类型：</span>
            </div>
            <div class="aui-flex-item-8">
              <el-select v-model="search.type" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>

          <div class="aui-flex-col aui-flex-item-3 aui-flex-right">
            <el-button type icon="el-icon-search" @click="query()">查询</el-button>
            <el-button type="primary" icon="el-icon-plus" @click="add()">新增</el-button>
          </div>
        </div>

        <div></div>
      </div>

      <div style="margin-top: 15px;">
        <el-table
          v-loading="listLoading"
          :data="list"
          element-loading-text="Loading"
          max-height="400px"
          size="small"
          stripe
          fit
          highlight-current-row
        >
          <el-table-column label="开始日期" width="200" align="center">
            <template slot-scope="scope">{{ scope.row.startDt }}</template>
          </el-table-column>
          <el-table-column label="结束日期" width="200" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.endDt }}</span>
            </template>
          </el-table-column>
          <el-table-column label="用户名" width="200" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="用户类型" width="200" align="center">
            <template slot-scope="scope">
              <el-tag :type="scope.row.type | typeTags">{{ typeComputed(scope.row.type) }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="备注">
            <template slot-scope="scope">
              <span>{{ scope.row.remark }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="200" fixed="right" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type icon="el-icon-edit" @click="edit(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" icon="el-icon-delete" @click="remove(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <!-- 编辑框 -->
    <el-dialog v-if="model != null" v-el-drag-dialog :visible.sync="dialogVisible" title="编辑">
      <div class="aui-flex-row">
        <div class="aui-margin-b-20 aui-flex-col aui-flex-middle aui-flex-offset-2">
          <div class="aui-flex-item-2">日期周期：</div>
          <div class="aui-flex-auto">
            <el-date-picker
              v-model="model.date"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
        </div>

        <div class="aui-margin-b-20 aui-flex-col aui-flex-middle aui-flex-offset-2">
          <div class="aui-flex-item-2">用户名：</div>
          <div class="aui-flex-auto">
            <el-input style="width:350px" v-model="model.name"></el-input>
          </div>
        </div>
        <div class="aui-margin-b-20 aui-flex-col aui-flex-middle aui-flex-offset-2">
          <div class="aui-flex-item-2">用户类型：</div>
          <div class="aui-flex-auto">
            <el-select v-model="model.type" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="aui-flex-col aui-flex-middle aui-flex-offset-2">
          <div class="aui-flex-item-2">备注：</div>
          <div class="aui-flex-auto">
            <el-input style="width:350px" type="textarea" v-model="model.remark"></el-input>
          </div>
        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import elDragDialog from "@/directive/el-drag-dialog";

export default {
  name: "single2",
  directives: { elDragDialog },
  filters: {
    typeTags(ret) {
      const map = ["success", "gray", "danger"];

      return map[ret];
    }
  },
  computed: {
    typeComputed() {
      return ret => {
        const map = this.options;
        let item = null;
        item = map.filter(item => item.value == ret);
        return item == null ? "" : item[0].label;
      };
    }
  },
  data() {
    return {
      search: {
        date: ["2019-01-01", "2019-10-02"],
        name: "",
        type: 0
      },

      list: [],
      listLoading: false,
      dialogVisible: false,
      model: null,
      operation: 0,
      options: [
        {
          value: 0,
          label: "普通用户"
        },
        {
          value: 1,
          label: "VIP用户"
        },
        {
          value: 99,
          label: "全部"
        }
      ]
    };
  },
  methods: {
    query() {
      this.listLoading = true;
      this.list = [];
      for (let i = 0; i < 5; i++) {
        let li = {
          startDt: "2019-01-" + ("0" + (i + 1).toString()).slice(-2),
          endDt: "2019-01-" + ("0" + (i + 2).toString()).slice(-2),
          name: "zgghc",
          type: Math.floor(Math.random() * 2),
          remark: "123123"
        };
        li.date = [li.startDt,li.endDt];
        this.list.push(li);
      }

      this.listLoading = false;
      this.operation = 0;
    },
    add(){
      let ret = {
        date : [new Date().format('yyyy-MM-dd'),new Date().format('yyyy-MM-dd')],
        name :'',
        type : 0,
        remark : ''
      };
      this.model = ret;     
      this.dialogVisible = true;
      this.operation = 1;
    },

    edit(ret) {
      this.model = ret;
      this.dialogVisible = true;
       this.operation = 2;
    },
    save(){
      switch(this.operation){
        case  1:
          this.model.startDt = this.model.date[0];
          this.model.endDt = this.model.date[1];
          this.list.push(this.model);
          break;
        case 2:
          this.model.startDt = this.model.date[0];
          this.model.endDt = this.model.date[1];
          break;
      }
      this.operation = 0;
      this.dialogVisible = false;
    },
    remove(ret){
      this.list.forEach((element,index) => {
        if(element == ret)
          this.list.splice(index,1);
          return;
      });
    }
  }
};
</script>

<style>
.box-card {
  width: 100%;
  margin-top: 10px;
}

.el-card__header,
.el-card__body {
  padding: 10px;
}
</style>