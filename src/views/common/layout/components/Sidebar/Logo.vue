<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <svg-icon icon-class="FEIcon" class="logo" style="margin-top: 15px" />
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link expand-logo" to="/">
        <div class="abs-logo">
          <svg-icon icon-class="FEIcon" class="logo" />
        </div>
        <span class="logo-title" style="margin-left: 40px">FLEET EDGE</span>
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: 'Fleet Edge'
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .abs-logo {
    height: 25px;
    position: absolute;
    width: 25px;
    left: 16px;
    top: 9px;
  }

  & .logo {
    height: 22px;
    width: 22px;
  }

  & .logo-title {
    font-size: 22px;
    font-family: Arial,serif;
    color: white;
  }

  & .expand-logo {
    text-align: left;
    padding-left: 10px;
  }

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
