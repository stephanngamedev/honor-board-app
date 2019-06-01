<template lang="pug">
  q-item.q-pa-none(style="min-width: none")
    q-item-section(avatar)
      q-avatar.text-weight-bolder(
        square,
        rounded,
        size="2em",
        :color="rankColor",
        text-color="white"
      ) {{ rank.rank }}

    q-item-section
      q-item-label {{ rank.participantUsername }}

    q-item-section(v-if="$q.platform.is.desktop", side)
      q-item-label {{ rank.participationsCount }} seasons

    q-item-section(side)
      q-badge.text-weight-bolder(:color="rankColor", :label="rank.totalPoints")
</template>

<script>
export default {
  props: {
    rank: {
      type: Object,
      required: true
    }
  },

  computed: {
    rankColor () {
      switch(this.rank.rank) {
        case 1:
          return 'gold'
        case 2:
          return 'silver'
        case 3:
          return 'bronze'
        default:
          return 'grey-20'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
