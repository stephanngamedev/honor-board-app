<template lang="pug">
  q-item.q-pa-none(style="min-width: none")
    q-item-section(avatar)
      q-avatar.text-weight-bolder(
        square,
        rounded,
        :icon="achievementIcon",
        :color="achievementColor",
        text-color="white"
      )

    q-item-section
      q-item-label {{ achievement.title }}

    q-item-section(side)
      q-badge.text-weight-bolder(:color="achievementColor", :label="achievement.points")

    q-item-section(side)
      .text-grey-20.q-gutter-xs
        q-btn(flat, dense, round, icon="mdi-dots-vertical")
          q-menu(transition-show="jump-down", transition-hide="jump-up")
            q-list
              q-item(clickable, v-close-popup, @click="requestEdit")
                q-item-section(side)
                  q-icon(name="mdi-pencil")
                q-item-section Edit
              q-item.text-negative(clickable, v-close-popup, @click="requestDestroy")
                q-item-section(side)
                  q-icon(name="mdi-delete", color="negative")
                q-item-section(col) Remove
</template>

<script>
export default {
  props: {
    achievement: {
      type: Object,
      required: true
    }
  },

  computed: {
    achievementIcon () {
      if (this.achievement.achievementType === 'title') {
        return 'mdi-trophy-variant'
      } else {
        return 'mdi-trophy-award'
      }
    },

    achievementColor () {
      if (this.achievement.achievementType === 'title') {
        return 'gold'
      } else {
        return 'grey-20'
      }
    }
  },

  methods: {
    // destroy () {
    //   this.$axios.delete(`/v1/achievements/${this.achievement.id}`)
    //     .then(this.emitDestroyEvent)
    //     .catch(this.showError)
    // },

    requestEdit () {
      this.$emit('edit-requested', { achievement: this.achievement })
    },

    requestDestroy (response) {
      this.$emit('destroy-requested', { achievement: this.achievement })
    },

    showError (error) {
      this.$q.notify({ message: error.message, color: 'negative' })
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
