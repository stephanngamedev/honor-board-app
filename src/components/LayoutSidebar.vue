<template lang="pug">
  q-drawer.bg-white(v-model="opened", :mini="mini", side="left")
    q-list
      q-item-label(v-if="$q.platform.is.mobile", header) FIFA Nintendo Switch BR

      q-item(v-for="menu in menus", clickable, exact, :key="menu.label", :to="menu.to")
        q-item-section(avatar)
          q-icon(:name="menu.icon")
        q-item-section
          q-item-label {{ menu.label }}

      q-item(clickable, tag="a", target="_blank", href="https://discord.gg/dVSzzA5")
        q-item-section(avatar)
          q-icon(name="mdi-discord")
        q-item-section
          q-item-label Community
</template>

<script>
import { openURL } from 'quasar'

export default {
  data () {
    return {
      opened:  this.$q.platform.is.desktop,
      mini: false,
      menus: [
        {
          icon: 'mdi-podium',
          label: 'Ranking',
          to: '/'
        },
        {
          icon: 'mdi-account-group',
          label: 'Participants'
        },
        {
          icon: 'mdi-soccer-field',
          label: 'Seasons'
        },
        {
          icon: 'mdi-trophy',
          label: 'Achievements',
          to: '/achievements'
        }
      ]
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
