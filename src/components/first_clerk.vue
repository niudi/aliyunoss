<template>
  <div class="hello">
    <el-table
      ref="multipleTable"
      stripe
      border
      @click="aaa"
      :data="tableData3"
      tooltip-effect="dark"
      style="width: 100%"
      :selectable='checkboxInit'
      @selection-change="handleSelectionChange">



      <el-table-column
        label=""
        width="35">
        <template slot-scope="scope">
          <el-radio :label="scope.$index"  v-model="radio" @change.native="getCurrentRow(scope.row)">&nbsp;</el-radio>
        </template>
      </el-table-column>


      <el-table-column
        label="id"
        prop="id"
        width="120">
      </el-table-column>


      <el-table-column
        label="日期"
        width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>

      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        show-overflow-tooltip>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'mainPage',
    data () {
      return {
        radio: '1',
        checked: true,
        msg: 'Welcome to Your Vue.js App',
        tableData3: [{
          id:1,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id:2,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id:3,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id:4,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id:5,
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id:6,
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id:7,
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: [],
        seleOK:true
      }
    },
    methods: {
      aaa(){
        alert(111)
      },
      checkboxInit(row,index){
        if (index==1)
          return 0;//不可勾选
        else
          return 1;//可勾选
      },
      getCurrentRow(row){
        console.log(row)

      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(val)
        console.log(val.length)
        if(val.length>=2){

          this.$alert('不可多选')
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
