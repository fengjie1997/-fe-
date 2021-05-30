<template>
  <p>{{ message }}</p>
</template>

<script>

export default {
  name: 'Page404',
  computed: {
    message() {
      return this.$t('common.404')
    }
  }
}
</script>
