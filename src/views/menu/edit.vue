<template>
  <div class="menu-create">
    <menu-editor />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import MenuEditor from './components/MenuEditor.vue'

export default Vue.extend({
  name: 'MenuEdit',
  components: {
    MenuEditor
  },
  data () {
    return {}
  }
})
</script>

<style lang="scss" scoped>

</style>
