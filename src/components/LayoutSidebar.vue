<template lang="pug">
  q-drawer.bg-white(v-model="opened", :mini="mini", side="left")
    q-list
      q-item-label(v-if="$q.platform.is.mobile", header) FIFA Nintendo Switch BR

      q-item(clickable)
        q-item-section(avatar)
          q-icon(name="mdi-podium")
        q-item-section
          q-item-label Ranking

      q-item(clickable)
        q-item-section(avatar)
          q-icon(name="mdi-account-group")
        q-item-section
          q-item-label Participants

      q-item(clickable)
        q-item-section(avatar)
          q-icon(name="mdi-soccer-field")
        q-item-section
          q-item-label Seasons

      q-item(clickable)
        q-item-section(avatar)
          q-icon(name="mdi-trophy")
        q-item-section
          q-item-label Achievements
</template>

<script>
export default {
  data () {
    return {
      opened:  this.$q.platform.is.desktop,
      mini: false
    }
  },

  methods: {
    toogle () {
      this.opened = this.$q.platform.is.desktop || !this.opened
      this.mini = this.$q.platform.is.desktop && !this.mini
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>


