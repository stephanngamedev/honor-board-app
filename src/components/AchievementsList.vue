<template lang="pug">
  #achievements-list
    content-placeholder(active, :title="false", :rows="10", :loading="isLoading")

    template(v-if="!isLoading")
      .row.justify-end.q-pb-md
        q-btn(unelevated, color="primary", icon="mdi-plus", @click="openAchievementForm") Create achievement

      achievements-form(ref="achievementForm", @save-success="fetchAchievements")

      q-list
        achievements-list-item(
          v-for="achievement in achievements",
          :achievement="achievement",
          :key="achievement.title",
          @edit-requested="openAchievementForm",
          @destroy-requested="fetchAchievements"
        )
</template>

<script>
import AchievementsForm from 'components/AchievementsForm'
import AchievementsListItem from 'components/AchievementsListItem'
import ContentPlaceholder from 'components/shared/ContentPlaceholder'

export default {
  components: {
    AchievementsForm,
    AchievementsListItem,
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
    }
  },

  mounted () {
    this.fetchAchievements()
  }
}
</script>

<style lang="stylus" scoped>

</style>
