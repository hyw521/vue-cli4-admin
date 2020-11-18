<template>
  <div style="padding-bottom: 50px">
    <div class="search-flex-div">
      <searchInput :value="CodeObj" @handleFilter="handleFilter" />
      <searchSelect :value="regObj" @handleFilter="handleFilter" />
      <generalButton
        :value="{
          className: 'pan-btn blue-btn',
          text: '查询',
          icon: 'el-icon-search',
        }"
      />
    </div>

    <!-- <PictureMagnifier /> -->
    <div class="table-div">
      <el-table
        :data="tableData"
        :span-method="objectSpanMethod"
        border
        style="width: 100%; margin-top: 20px"
      >
        <el-table-column prop="id" label="ID" width="180" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="amount1" label="数值 1（元）" />
        <el-table-column prop="amount2" label="数值 2（元）" />
        <el-table-column prop="amount3" label="数值 3（元）" />
      </el-table>
    </div>
  </div>
</template>

<script>
import { getTenantId } from '@/api/demo'
import PictureMagnifier from '@/components/PictureMagnifier'
import searchInput from '@/components/Basic/searchInput'
import searchSelect from '@/components/Basic/searchSelect'
import generalButton from '@/components/Basic/generalButton'
export default {
  name: 'ApiDemo',
  components: {
    PictureMagnifier,
    searchInput,
    searchSelect,
    generalButton
  },
  data() {
    return {
      CodeObj: {
        key: 'Code',
        Code: '',
        placeholder: '请输入内容',
        className: 'normal-input',
        clearable: true
        // icon: "el-icon-search",
      },
      regObj: {
        key: 'reg',
        reg: '',
        placeholder: '请输入内容',
        className: 'normal-input',
        clearable: true,
        optionsKey: 'options',
        options: [
          {
            value: 'hyw',
            label: 'name'
          },
          { value: 'age', label: 24 }
        ]
      },
      tableData: [
        {
          id: '12987122',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        },
        {
          id: '12987123',
          name: '王小虎',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        },
        {
          id: '12987124',
          name: '王小虎',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        },
        {
          id: '12987125',
          name: '王小虎',
          amount1: '621',
          amount2: '2.2',
          amount3: 17
        },
        {
          id: '12987126',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }
      ]
    }
  },
  created() {
    // this.getTenantId();
  },
  methods: {
    handleFilter() {
      console.log(this.CodeObj)
    },
    async getTenantId() {
      try {
        await getTenantId(1)
      } catch (error) {
        this.$message.error(error.response.data)
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      console.log(row, column, rowIndex, columnIndex)
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
.table-div {
  margin-top: 100px;
  margin-left: 100px;
}
</style>
