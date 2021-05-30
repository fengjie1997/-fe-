<template>

  <div>
    <fleet-single-table
      :show-tool-bar="true"
      :show-page="true"
    >
      <div slot="filter">

        <p style="font-size: 13px">{{ $t('sysConfig.deviceAlarm') }}</p>

      </div>

      <div slot="main-table" class="full-hw">
        table
      </div>
    </fleet-single-table>
  </div>

</template>

<script>
import FleetSingleTable from '@/components/FleetCardTable/single-table'
import { dataConfig, dataUpdate } from '@/api/system/sysconfig'
export default {
  name: 'DeviceAlarmConfig',
  components: {
    FleetSingleTable
  },
  data() {
    return {
    }
  },
  computed: {
    language() {
      return this.$store.getters.language
    }
  },
  created() {
  },
  methods: {
  }
}
</script>

<style scoped>
>>>.tool-bar {
  height: 0 !important;
}
</style>
