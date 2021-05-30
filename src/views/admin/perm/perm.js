import {
  resetTemp,
  checkNodeEquals
} from '@/utils'
import {
  fetchMenuList,
  deleteMenu,
  addMenu,
  updateMenu,
  fetchApiList,
  deleteApi,
  addApi,
  updateApi,
  fetchMountList,
  getSelectList,
  setSelectList
} from '@/api/admin/perm'

export default {
  data() {
    return {
      permActStatus: true,
      activeName: 'webFront',
      /**
       * menu
       */
      menuFilterText: '',
      menuData: [],
      menuProps: {
        children: 'children',
        label: 'menuId'
      },
      menuDialogFormVisible: false, // 菜单添加form
      menuForm: {
        menuId: undefined,
        parentId: undefined,
        menuName: undefined,
        perm: undefined,
        isMenu: undefined,
        _operate: 'add'
        // _parentName: undefined
      },
      /**
       * api
       */
      apiFilterText: '',
      apiData: [],
      apiProps: {
        children: 'children',
        label: 'id'
      },
      apiDialogFormVisible: false,
      apiForm: {
        id: undefined,
        parentId: undefined,
        apiName: undefined,
        apiUrl: undefined,
        perm: undefined,
        isCtrl: undefined,
        _operate: 'add'
        // _parentName: undefined
      },
      /**
       * 接口挂载
       */
      mountFilterText: '',
      mountDialogFormVisible: false,
      mountApiFilterText: '',
      editMountMenuId: undefined,
      mountData: [],
      mountApiData: []
    }
  },
  computed: { },
  watch: {
    /**
     * 编辑框触发过滤方法
     */
    menuFilterText(val) {
      this.$refs.menuTree.filter(val)
    },
    apiFilterText(val) {
      this.$refs.apiTree.filter(val)
    },
    mountFilterText(val) {
      this.$refs.mountTree.filter(val)
    },
    mountApiFilterText(val) {
      this.$refs.mountApiTree.filter(val)
    }
  },
  created() {
    this.getMenuList()
    this.getApiList()
    this.getMountList()
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return checkNodeEquals(data, value)
    },
    /**
     * --------------------------
     * 菜单
     * --------------------------
     */

    handleAddMenu(parentId) {
      resetTemp(this.menuForm)
      this.menuForm.parentId = parentId
      this.menuForm.isMenu = 1
      this.menuForm._operate = 'add'
      this.menuDialogFormVisible = true
    },
    handleEditMenu(data) {
      resetTemp(this.menuForm)
      this.menuForm = Object.assign({}, data)
      this.menuForm._operate = 'edit'
      // this._parentName =
      this.menuDialogFormVisible = true
    },
    getMenuList() {
      fetchMenuList().then(response => {
        const res = response.data
        if (res.code === 1) {
          this.menuData = res.data
        }
      })
    },
    addMenuOne() {
      this.menuDialogFormVisible = false
      addMenu(this.menuForm).then(response => {
        if (response.data.code === 1) {
          this.getMenuList()
        }
      })
    },
    updateMenuOne() {
      this.menuDialogFormVisible = false
      updateMenu(this.menuForm.id, this.menuForm).then(response => {
        if (response.data.code === 1) {
          this.getMenuList()
        }
      })
    },
    deleteMenuOne(MenuId) {
      this.$confirm(this.$t('common.deleteTip'), this.$t('common.tip'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning',
        center: false
      }).then(() => {
        deleteMenu(MenuId).then(response => {
          if (response.data.code === 1) {
            this.getMenuList()
          }
        })
      })
    },
    /**
     * 接口
     */
    handleAddApi(parentId) {
      resetTemp(this.apiForm)
      this.apiForm.parentId = parentId
      if (parentId === 0) {
        this.apiForm.isCtrl = 1
      } else {
        this.apiForm.isCtrl = 0
      }
      this.apiForm._operate = 'add'
      this.apiDialogFormVisible = true
    },
    handleEditApi(data) {
      resetTemp(this.apiForm)
      this.apiForm = Object.assign({}, data)
      this.apiForm._operate = 'edit'
      // this._parentName =
      this.apiDialogFormVisible = true
    },
    getApiList() {
      fetchApiList().then(response => {
        const res = response.data
        if (res.code === 1) {
          this.apiData = res.data
        }
      })
    },
    addApiOne() {
      this.apiDialogFormVisible = false
      addApi(this.apiForm).then(response => {
        if (response.data.code === 1) {
          this.getApiList()
        }
      })
    },
    updateApiOne() {
      this.apiDialogFormVisible = false
      updateApi(this.apiForm.id, this.apiForm).then(response => {
        if (response.data.code === 1) {
          this.getApiList()
        }
      })
    },
    deleteApiOne(apiId) {
      this.$confirm(this.$t('common.deleteTip'), this.$t('common.tip'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning',
        center: false
      }).then(() => {
        deleteApi(apiId).then(response => {
          if (response.data.code === 1) {
            this.getApiList()
          }
        })
      })
    },
    /**
     * 挂载表
     */
    hanleMountApi(menuId) {
      this.getMountApiList(menuId)
      this.editMountMenuId = menuId
      this.mountDialogFormVisible = true
    },
    getMountList() {
      fetchMountList().then(response => {
        const res = response.data
        if (res.code === 1) {
          this.mountData = res.data
          console.table(res.data)
        }
      })
    },
    getMountApiList(menuId) {
      fetchApiList().then(response => {
        if (response.data.code === 1) {
          getSelectList(menuId).then(response => {
            if (response.data.code === 1) {
              this.$refs.mountApiTree.setCheckedKeys([])
              this.$refs.mountApiTree.setCheckedKeys(response.data.data)
            } else {
              this.mountDialogFormVisible = false
            }
          })
          this.mountApiData = response.data.data
        } else {
          this.mountDialogFormVisible = false
        }
      })
    },
    setSelectApi(menuId) {
      setSelectList(menuId, this.$refs.mountApiTree.getCheckedKeys()).then(response => {
        if (response.data.code === 1) {
          this.getMountList()
          this.$notify.success({
            title: this.$t('common.success'),
            message: this.$t('perm.mountSuccessTip'),
            duration: 1000
          })
        }
        this.mountDialogFormVisible = false
      })
    },
    handlePermEdit() {
      var param = this.$refs.mountTree.getCurrentNode()
      this.getMountApiList(param.id)
      this.editMountMenuId = param.id
      this.mountDialogFormVisible = true
    },
    handlePermNode(param) {
      this.permActStatus = !!(param === null || !param.hasOwnProperty('children'))
    }
  }
}
