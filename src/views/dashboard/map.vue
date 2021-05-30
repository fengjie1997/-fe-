<template>
  <div id="map" style="height: calc(100vh - 84px); width: 100%" />
</template>

<script>
import '@/utils/map/std/locale/fleetmap.en'
import FleetMap from '@/utils/map/std/fleet-map'

export default {
  data() {
    return {
      zoom: 7,
      center: [35.4145900000, 116.5872400000]
    }
  },
  mounted() {
    window.map = this.map = new FleetMap('map', {
      center: this.center,
      zoom: this.zoom
    })
  },
  destroyed() {
    this.map.remove()
  },
  methods: {
  }
}
</script>
