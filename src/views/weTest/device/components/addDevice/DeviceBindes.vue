<template>
  <div class="app-container">
    <el-form
      ref="addDeviceForm"
      :model="deviceForm"
      status-icon
      :rules="rules"
      :show-message="false"
      label-width="120px"
      class="demo-deviceForm"
      label-position="left"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="绑定设备数" label-width="100px">
            <el-input v-model="deviceForm.imei" placeholder="0" :disabled="true" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item required>
            <!-- ElementUI上传 -->
            <el-upload
              ref="upload"
              :auto-upload="false"
              :on-change="elInFile"
              class="upload-demo"
              accept=".xlsx, .xls, .csv"
            >
              <el-button slot="trigger" size="mini" type="success" plain style="float:left">选取文件</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>

      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="序号" width="100" />
        <el-table-column prop="group" label="设备分组" width="120" />
        <el-table-column prop="groupId" label="子分组" width="120" />
        <el-table-column prop="imei" label="IMEI号" width="120" />
        <el-table-column prop="version" label="应用版本" width="120" />
        <el-table-column prop="model" label="型号" show-overflow-tooltip />
      </el-table>
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        class="dialog-pagination"
        @pagination="getDeviceList"
      />
    </el-form>

    <br>
    <div slot="footer" class="dialog-footer" float="right" />
  </div>
</template>

<script>
import XLSX from 'xlsx'
import pagination from '@/components/Pagination'

export default {
  name: 'DeviceBindesView',
  components: { pagination },
  data() {
    return {
      tableKey: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 20,
        search: undefined,
        field: 'id',
        isAsc: 1
      },
      files: null,
      tableData: [],
      checked: false,
      groupData: [],
      childrenData: [],
      deviceForm: {
        group: null,
        groupId: '',
        guid: '',
        model: '',
        imei: '',
        version: []
      },
      multipleSelection: []
    }
  },
  beforeCreate() {
  /**
     * 读取Excel文件，转为{@link Object}对象（自定义函数）
     * @return {@link Object}  kbook，整个文档对象；
     */
    FileReader.prototype.read2workbook = function() {
      const redABS = false // 是否将文件读取为二进制字符串
      const bytes = new Uint8Array(this.result) // 无符号整型数组
      if (redABS) {
        // let fix = new TextDecoder(encode || 'UTF-8').decode(bytes);
        const fix = fixdata(bytes)
        const b2a = btoa(fix) // js原生方法：将字符转为base64编码。对应的atob(base64)方法，将base64转字符
        var wb = XLSX.read(b2a, {
          type: 'base64'
        })
      } else {
        const len = bytes.byteLength
        const binarys = new Array(len) // 创建定长数组，存储文本
        for (let i = 0; i < len; i++) {
          binarys[i] = String.fromCharCode(bytes[i])
        }
        const binary = binarys.join('')
        wb = XLSX.read(binary, {
          type: 'binary'
        })
      }
      return wb // workbook
    }
    /**
     * 解析为...格式
     */
    FileReader.prototype.read2 = function(format = 'json') {
      const wb = this.read2workbook()
      if (!wb) return null

      const r = {}
      const formats = [
        'json',
        'formulae',
        'html',
        'txt',
        'csv',
        'dif',
        'slk',
        'eth'
      ]// 可被解析的格式
      format = formats.indexOf(format) === -1 ? 'json' : format
      wb.SheetNames.forEach(name => {
        // 遍历每张纸数据
        r[name] = XLSX.utils['sheet_to_' + format](wb.Sheets[name])
      })
      return r
    }
    /**
     * 解析为JSON
     * @description: 此解析方式，XLSX将使用表格首行的每列名称，当作sheet数组对象的Key。
     * 故Excel每个工作表格的第一行必须有表头，且名称不可重复。
     */
    FileReader.prototype.read2JS = function() {
      return this.read2()
    }
    /* 重写readAsBinaryString函数 */
    FileReader.prototype.readAsBinaryString = function(f) {
      if (!this.onload) {
        // 如果this未重写onload函数，则创建一个公共处理方式
        this.onload = e => {
          // 在this.onload函数中，完成公共处理
          const rs = this.read2workbook()
          console.log(rs)
        }
      }
      this.readAsArrayBuffer(f) // 内部会回调this.onload方法
    }

    /**
     * char值转String
     * @param data {@link Array}：char值；
     * @return {@link String}
     */
    function fixdata(data) {
      const w = 1024 << 10 // 每次读取1M字节
      const len = Math.floor(data.byteLength / w)
      const o = new Array(len)
      for (var i = 0; i < len; i++) {
        o[i] = String.fromCharCode.apply(
          null,
          new Uint8Array(data.slice(i * w, (i + 1) * w))
        )
      }
      o[i] = String.fromCharCode.apply(null, new Uint8Array(data.slice(i * w)))
      return o.join('')
    }
  },
  methods: {
    submitF(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(addDeviceForm) {
      this.$refs[addDeviceForm].resetFields()
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    selectedGroup(index) {
      this.deviceForm.groupId = ''
      this.childrenData = this.groupData[index].children
      this.deviceForm.groupId = this.childrenData[0].name
    },
    /**
     * input-file调用此函数时，默认传入"$event"
     * @param e {@link Object}：$event事件对象；
     */

    /**
     * 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用。
     * @param f {@link Object}：当前上传的文件；
     * @param fs {@link Array}：当前文件列表；
     */
    elInFile(f, fs) {
      this.read(f.raw)
    },
    /**
     * 解析
     * @param f {@link File}
     */
    read(f) {
      var self = this
      const rd = new FileReader()
      rd.onload = e => {
        // this.readAsArrayBuffer函数内，会回调this.onload函数。在这里处理结果
        const sheets = rd.read2JS()
        for (const name in sheets) {
          console.log(name + ' 工作表数据：', sheets[name])
          self.tableData = sheets[name]
        }
        ['formulae', 'html', 'txt', 'csv', 'dif', 'slk', 'eth'].forEach(
          item => {
            console.info('\r\n解析为：' + item)
            const sheets = rd.read2(item)
            for (const name in sheets) {
              console.log(name + ' 工作表数据：', sheets[name])
            }
          }
        )
      }
      rd.readAsBinaryString(f)
    }
  }
}
</script>
