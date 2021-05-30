<template>
  <div class="navbar">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container" />
    <breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <search class="right-menu-item" />
        <error-log class="errLog-container right-menu-item hover-effect" />
        <screenfull class="right-menu-item hover-effect" />
        <!--<el-tooltip :content="$t('navbar.size')" effect="dark" placement="bottom">
          <size-select class="right-menu-item hover-effect" />
        </el-tooltip>-->
        <lang-select class="right-menu-item hover-effect" />
        <!--<el-tooltip :content="$t('navbar.theme')" effect="dark" placement="bottom">
          <theme-picker class="right-menu-item hover-effect" />
        </el-tooltip>-->
      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <span>{{ $store.getters.account }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item divided>
            <span style="display:block;" @click="handleDialogVisible()">{{ $t('navbar.timeZone') }}</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span style="display:block;" @click="handleDia">{{ $t('navbar.updatePassword') }}</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <!--设置时区-->
    <el-dialog
      :title="$t('navbar.timeZone')"
      :visible.sync="dialogVisible"
      width="360px"
    >
      <div>
        <!-- <el-button @click="handlec"></el-button> -->
        <span style="padding-right: 20px">{{ $t('navbar.timeZone') }}</span>
        <el-select v-model="timezone">
          <el-option v-for="item in timezoneDict" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" @click="handleUpdateTimezone()">{{ $t('common.save') }}</el-button>
      </span>
    </el-dialog>

    <!--修改密码-->
    <el-dialog
      :title="$t('navbar.updatePassword')"
      :visible.sync="dialogVisibleUpdatePassword"
      width="400px"
    >
      <el-form ref="ruleForm" :model="password" :rules="rules" label-position="left" label-width="150px" class="demo-ruleForm">
        <el-form-item :label="$t('common.oldPassword')" prop="oldPassword">
          <el-input v-model="password.oldPassword" show-password />
        </el-form-item>
        <el-form-item :label="$t('common.newPassword')" prop="newPassword">
          <el-input v-model="password.newPassword" show-password />
        </el-form-item>
        <el-form-item :label="$t('common.confirmPassword')" prop="newPasswordSecond">
          <el-input v-model="password.newPasswordSecond" show-password />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" @click="handleUpdatePassword()">{{ $t('common.save') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCacheDict } from '@/utils/dictCache'
import { mapGetters } from 'vuex'
import { updateUserPassword } from '@/api/system/user'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
// import SizeSelect from '@/components/SizeSelect'
import LangSelect from '@/components/LangSelect'
// import ThemePicker from '@/components/ThemePicker'
import Search from '@/components/HeaderSearch'
import { switchTimeZone } from '@/api/system/user'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    // SizeSelect,
    LangSelect,
    // ThemePicker,
    Search
  },
  data() {
    return {
      password: {
        oldPassword: '',
        newPasswordSecond: '',
        newPassword: ''
      },
      dialogVisibleUpdatePassword: false,
      dialogVisible: false,
      timezone: '',
      timezoneDict: getCacheDict('timeZone'),
      rules: {
        oldPassword: [{ required: true, message: this.$t('common.oldPassword'), trigger: 'blur' }],
        newPassword: [{ required: true, message: this.$t('common.newPassword'), trigger: 'blur' }, { min: 6, message: this.$t('common.minPassword'), trigger: 'blur' }],
        newPasswordSecond: [{ required: true, message: this.$t('common.confirmPassword'), trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value !== this.password.newPassword) {
                callback(new Error(this.$t('common.errPassword')))
              } else {
                callback()
              }
            }, trigger: 'blur'
          }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'device'
    ]),
    apiUrl: {
      get() {
        return this.$store.getters.apiUrl
      },
      set(url) {
        this.$store.dispatch('setApiUrl', url)
      }
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    },
    handleDialogVisible() {
      this.timezone = this.$store.getters.timezone
      this.dialogVisible = true
    },
    handleDia() {
      this.password.oldPassword = ''
      this.password.newPassword = ''
      this.password.newPasswordSecond = ''
      this.dialogVisibleUpdatePassword = true
    },
    handleUpdatePassword() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          updateUserPassword(this.password.oldPassword, this.password.newPassword).then(response => {
            if (response.data.code === 1) {
              this.$notify({
                title: this.$t('common.success'),
                message: this.$t('common.updatePasswordSuccess'),
                type: 'success',
                duration: 2000
              })
              this.dialogVisibleUpdatePassword = false
            }
          })
        } else {
          this.$alert(this.$t('common.errParams'), this.$t('common.tip'), {
            confirmButtonText: this.$t('common.confirm'),
            callback: action => {
            }
          })
        }
      })
    },
    handleUpdateTimezone() {
      if (this.timezone !== this.$store.getters.timezone) {
        switchTimeZone(this.$store.getters.account, this.timezone).then(res => {
          const zone = this.timezone
          if (res.data.code === 1) {
            console.log(zone)
            this.$store.dispatch('updateTimeZone', zone)
            this.$notify({
              title: this.$t('common.success'),
              message: this.$t('common.updateSuccess'),
              type: 'success',
              duration: 2000
            })
          }
          this.dialogVisible = false
        })
      } else {
        this.dialogVisible = false
      }
    },
    handleCancel() {
      this.dialogVisibleUpdatePassword = false
      this.$refs['ruleForm'].resetFields()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    height: 50px;
    overflow: hidden;

    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background .3s;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }

    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background .3s;

          &:hover {
            background: rgba(0, 0, 0, .025)
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
