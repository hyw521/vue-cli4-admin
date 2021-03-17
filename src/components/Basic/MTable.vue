<template>
  <div id="table">
    <el-table
      :ref="tableInfo.ref"
      :data="formatData"
      :row-key="tableInfo.rowKey"
      :row-class-name="tableInfo.tableRowClassName"
      :tree-props="tableInfo.treeProps"
      :highlight-current-row="tableInfo.highlightCurrentRow"
      :default-expand-all="tableInfo.defaultExpandAll"
      border
      stripe
      style="width: 100%"
      @select="select"
      @selection-change="handleSelectionChange"
      @select-all="selectAll"
      @current-change="handleCurrentChange"
      @header-dragend="colChange"
    >
      >
      <!-- 表头 、表体-->
      <template v-for="column in tableInfo.columns">
        <el-table-column
          v-if="column.type && !['expand'].includes(column.type)"
          :fixed="column.fixed"
          :key="column.desc + new Date()"
          :label="column.name"
          :sortable="column.sortable ? 'custom' : false"
          :type="column.type"
          :width="column.width == undefined ? 'auto' : column.width"
          :selectable="
            (row, index) =>
              column.selectable
                ? selectableFunction(row, index, column.desc, column.descValue)
                : true
          "
          :align="column.align || 'center'"
        />
        <el-table-column
          v-if="['expand'].includes(column.type)"
          :fixed="column.fixed"
          :key="column.desc + new Date()"
          :label="column.name"
          :sortable="column.sortable ? 'custom' : false"
          :type="column.type"
          :width="column.width == undefined ? 'auto' : column.width"
          :selectable="
            (row, index) =>
              column.selectable
                ? selectableFunction(row, index, column.desc, column.descValue)
                : true
          "
          :align="column.align || 'center'"
        ><template slot-scope="scope">
          <component
            :is="tableInfo.childComponent"
            :scope="scope"
        /> </template
        ></el-table-column>
        <el-table-column
          v-if="!column.type"
          :fixed="column.fixed"
          :key="column.desc + new Date()"
          :label="column.name"
          :prop="column.desc"
          :show-overflow-tooltip="column.tooltip ? true : false"
          :sortable="column.sortable ? 'custom' : false"
          :width="column.width == undefined ? 'auto' : column.width"
          :align="column.align || 'center'"
        >
          <template slot-scope="scope">
            <!-- 可以设置样式，还可以加class -->
            <div
              v-if="
                ![
                  column.filterInner,
                  !!column.filterHTML,
                  column.innerType
                ].includes(true)
              "
              :style="
                scope.row[column.desc]
                  | filterInnerMethods(scope, 'style', column.styleMap, column)
              "
              :class="
                scope.row[column.desc]
                  | filterInnerMethods(scope, 'class', column.classMap, column)
              "
              @click="onTableClick(column, scope)"
            >
              {{
                column.format
                  ? column.format(scope.row[column.desc], scope.row)
                  : scope.row[column.desc]
              }}
            </div>
            <!-- 过滤内容为其他内容，并可以设置样式，还可以加class -->
            <div
              v-if="column.filterInner"
              :style="
                scope.row[column.desc]
                  | filterInnerMethods(scope, 'style', column.styleMap, column)
              "
              :class="
                scope.row[column.desc]
                  | filterInnerMethods(scope, 'class', column.classMap, column)
              "
              @click="onTableClick(column, scope)"
            >
              {{
                scope.row[column.desc]
                  | filterInnerMethods(scope, 'text', column.innerMap, column)
              }}
            </div>

            <!-- 过滤内容为其他html，并可以设置样式，还可以加class -->
            <div
              v-if="column.filterHTML"
              :style="
                scope.row[column.desc]
                  | filterInnerMethods(scope, 'style', column.styleMap, column)
              "
              :class="
                scope.row[column.desc]
                  | filterInnerMethods(scope, 'class', column.classMap, column)
              "
              @click="onTableClick(column, scope)"
              v-html="column.filterHTML(scope, column)"
            />

            <!-- 按钮支持显示隐藏，加style，加class,加icon -->
            <div v-if="column.newBtns">
              <el-button
                v-for="(btn, index) in column.newBtns"
                v-show="
                  btn.btnShow
                    ? btn.showList.includes(scope.row[btn.desc])
                      ? true
                      : false
                    : true
                "
                :key="index"
                :class="btn.btnClass | filterButtonMethods(scope, 'class', btn)"
                :type="btn.btnType"
                :disabled="
                  btn.btnDisabled | filterButtonMethods(scope, 'disabled', btn)
                "
                :size="btn.size || 'mini'"
                @click="handleBtnClick(btn.clickType, scope.row)"
              >
                <span>
                  {{ btn.name }}
                  <i v-if="btn.icon" :class="btn.icon" />
                </span>
              </el-button>
            </div>

            <div v-if="column.innerType">
              <el-select
                v-if="column.innerType === 'select'"
                :class="{
                  'select-border':
                    column.verify && scope.row.verify[column.desc]
                }"
                v-model="scope.row[column.desc]"
                :placeholder="column.placeholder"
                filterable
                clearable
                @change="
                  changeValue(scope.row, column.desc, scope.row[column.desc])
                "
                @blur="
                  changeValue(scope.row, column.desc, scope.row[column.desc])
                "
              >
                <el-option
                  v-for="(item, i) in column.Options"
                  :key="i"
                  :label="item.label"
                  :value="item"
                  :value-key="true"
                />
              </el-select>
              <el-input
                v-if="column.innerType === 'input'"
                :class="{
                  'input-border': column.verify && scope.row.verify[column.desc]
                }"
                v-model="scope.row[column.desc]"
                :placeholder="column.placeholder"
                clearable
                @input="
                  changeValue(scope.row, column.desc, scope.row[column.desc])
                "
                @blur="
                  changeValue(scope.row, column.desc, scope.row[column.desc])
                "
              />
              <el-date-picker
                v-if="column.innerType === 'date'"
                :class="{
                  'date-border': column.verify && scope.row.verify[column.desc]
                }"
                v-model="scope.row[column.desc]"
                :placeholder="column.placeholder"
                value-format="yyyy-MM-dd"
                type="date"
                @blur="
                  changeValue(scope.row, column.desc, scope.row[column.desc])
                "
              />
            </div>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
export default {
  filters: {
    filterInnerMethods(value, scope, type, map, column) {
      if (!map) {
        return
      }
      if (type === 'text') {
        return map[value] || value
      } else if (type === 'style') {
        return map[value] || {}
      } else if (type === 'class') {
        if (column.noLimit) {
          return map[column.noLimit]
        }
        return map[value] || ''
      }
    },
    filterButtonMethods(value, scope, type, btn) {
      if (type === 'class') {
        if (!value) {
          return ''
        }
        return btn.classMap[btn.clickType] || ''
      } else if (type === 'disabled') {
        if (!value) {
          return false
        }
        return btn.disabledList.includes(scope.row[btn.desc])
      }
    }
  },
  props: {
    data: {
      type: [Array, Object],
      required: true
    },
    tableInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {}
  },
  computed: {
    formatData() {
      return this.data
    }
  },
  methods: {
    // 表格是多条新增时所需事件
    changeValue(obj, desc, value) {
      if (obj.verify) {
        value ? (obj.verify[desc] = false) : (obj.verify[desc] = true) // 单条校验
        if (value && obj.linkage.includes(desc)) {
          // 联动校验
          obj.linkage.forEach((key) => {
            obj.verify[key] = false
          })
        }
      }
      if (desc === 'itemCode' || desc === 'itemModel') {
        this.$emit('selectLinkage', { value, obj })
      }
    },
    // 表格某一列是开关时开关关闭打开事件
    changeSwitch(scope) {
      this.$emit('changeSwitch', scope)
    },
    // 点击表格行的按钮
    handleBtnClick(clickType, row) {
      this.$emit('handleBtnClick', { row: row, type: clickType })
    },
    // 点击表格行的文本文字
    onTableClick(column, scope) {
      console.log(this.$parent, 'this.$parent')
      this.$emit('onTableClick', { column: column, scope: scope })
    },
    // 表格的多选框值变化触发
    handleSelectionChange(val) {
      this.$emit('handleSelectionChange', val)
    },
    // 全选事件
    selectAll(val) {
      this.$emit('selectAll', val)
    },
    // 单选某一行事件
    handleCurrentChange(val) {
      this.$emit('handleCurrentChange', val)
    },
    // 当用户手动勾选数据行的 Checkbox 时触发的事件
    select(val) {
      this.$emit('select', val)
    },
    // 拖拽表格列的宽度触发事件
    colChange(newWidth, oldWidth, column, event) {
      console.log('拖动表头改变列宽', this.$refs.Distributor)
      this.tableInfo.columns.map((item) => {
        if (item.name === column.label) {
          item.width = newWidth
        }
      })
      console.log(this.tableInfo.columns)
    },
    selectableFunction(row, index, desc, value) {
      if (value.includes(row[desc])) {
        return false
      } else {
        return true
      }
    },
    // 防止表格渲染抖动
    doLayout() {
      this.$nextTick(() => {
        // 在数据加载完，重新渲染表格
        const ref = this.tableInfo.ref
        this.$refs[ref].doLayout()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixin.scss';
/*表格样式*/
::v-deep {
  .el-table__row:nth-of-type(odd) {
    background-color: white;
    font-size: 13px;
    color: #404040;
  }
  .el-table__row:nth-of-type(even) {
    background-color: white;
    font-size: 13px;
    color: #404040;
  }
  .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: rgba(67, 200, 200, 0.2);
  }
  //设置fixed定位时的颜色修改
  .el-table__body .el-table__row.hover-row td {
    background-color: rgba(67, 200, 200, 0.2) !important;
  }
  //单选中时的颜色
  .el-table--striped .el-table__body tr.current-row td {
    background-color: rgba(67, 200, 200, 0.2) !important;
  }

  .el-table--scrollable-x .el-table__body-wrapper {
    z-index: 0;
  }
  .el-table__fixed-right::before {
    height: 0px;
  }

  .select-border,
  .input-border,
  .date-border {
    input {
      border-color: red !important;
    }
  }
  #table {
    .el-date-editor {
      width: 140px;
    }
  }
  .el-table__body-wrapper {
    @include scrollBar(4px, 15px);
  }

  .el-table--medium td,
  .el-table--medium th {
    padding: 6px 0 4px !important;
  }
  .el-table__fixed-right {
    tr {
      & > th {
        height: 39px !important;
        padding: 6px 0 5px !important;
        color: rgba(0, 0, 0, 0.7);
        background-color: $tableTop !important;
      }
      & > td {
        .cell {
          font-size: 12px !important;
        }
      }
    }
    @media screen and (min-width: 1280px) and (max-width: 1499px) {
      tr {
        & > th {
          height: 39px !important;
          padding: 6px 0 5px !important;
          color: rgba(0, 0, 0, 0.7);
          background-color: $tableTop !important;
          .cell {
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>
