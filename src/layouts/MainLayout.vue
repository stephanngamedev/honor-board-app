<template lang="pug">
  q-layout(view="hHh LpR lFf")
    q-header.bg-grey-20.text-white
      q-toolbar
        q-btn(dense, flat, round, icon="mdi-menu", @click="toogleSidebar")

        q-toolbar-title
          span.text-weight-bolder FIFA
          span  NINTENDO SWITCH BR

    layout-sidebar(ref="sidebar")

    q-page-container.bg-body-background.text-grey-20
      router-view
</template>

<script>
import LayoutSidebar from 'components/LayoutSidebar'

export default {
  name: 'MainLayout',
  components: {
    LayoutSidebar
  },
  data () {
    return {}
  },

  methods: {
    toogleSidebar () {
      this.$refs.sidebar.toogle()
    }
  }
}
</script>

<style>
</style>
