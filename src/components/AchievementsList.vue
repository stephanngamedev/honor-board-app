<template lang="pug">
  #achievements-list
    content-placeholder(active, :title="false", :rows="10", :loading="isLoading")
      .row.q-pb-md
        .col.text-right
          q-btn(unelevated, color="accent", icon="mdi-plus", @click="openAchievementForm") Create achievement

      achievements-form(ref="achievementForm", @save-success="fetchAchievements")

      q-list
        achievements-list-item(
          v-for="achievement in achievements",
          :achievement="achievement",
          :key="achievement.title",
          @edit-requested="openAchievementForm",
          @destroy-requested="askForConfirmationToDestroy"
        )

      confirm-destroy-dialog(ref="destroyDialog", @destroy-success="showDestroySuccessAlert")
</template>

<script>
import AchievementsForm from 'components/AchievementsForm'
import AchievementsListItem from 'components/AchievementsListItem'

import ConfirmDestroyDialog from 'components/shared/ConfirmDestroyDialog'
import ContentPlaceholder from 'components/shared/ContentPlaceholder'

export default {
  components: {
    AchievementsForm,
    AchievementsListItem,

    ConfirmDestroyDialog,
    ContentPlaceholder
  },

  data () {
    return {
      achievements: [],
      isLoading: false
    }
  },

  methods: {
    fetchAchievements () {
      this.isLoading = true
      this.$axios.get('/v1/achievements')
        .then(this.assignAchievements)
        .catch(this.showError)
        .finally(this.finishLoading)
    },

    assignAchievements (response) {
      this.achievements = response.data.achievements
    },

    showError (error) {
      this.$q.notify({ message: error.message, color: 'negative' })
    },

    finishLoading () {
      this.isLoading = false
    },

    openAchievementForm (options) {
      this.$refs.achievementForm.open(options.achievement)
    },

    askForConfirmationToDestroy (options) {
      this.$refs.destroyDialog.open({
        message: 'Are you SURE you want to destroy this resource?',
        destroyURL: `/v1/achievements/${options.achievement.id}`
      })
    },

    showDestroySuccessAlert () {
      // TODO RELOAD LIST

      this.$q.notify({
        message: 'Achievement destroyed',
        color: 'positive',
        textColor: 'primary',
        position: 'bottom-right'
      })
    }
  },

  mounted () {
    this.fetchAchievements()
  }
}
</script>

<style lang="stylus" scoped>

</style>
