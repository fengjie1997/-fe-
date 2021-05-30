<template>
  <h2>{{ tip }}</h2>
</template>

<script>
import i18n from '@/lang'
export default {
  name: 'Page401',
  data() {
    return {
      tip: i18n.t('common.permNo')
    }
  }
}
</script>
