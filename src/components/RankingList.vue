<template lang="pug">
  #ranking
    skeleton(active, :title="false", :rows="20", :loading="isLoading")

    q-list
      ranking-list-item(v-for="rank in ranking", :rank="rank", :key="rank.participantUsername")
</template>

<script>
import RankingListItem from 'components/RankingListItem'
import Skeleton from 'components/Skeleton'

export default {
  components: {
    RankingListItem,
    Skeleton
  },

  data () {
    return {
      ranking: [],
      isLoading: false
    }
  },

  methods: {
    fetchRanking () {
      this.isLoading = true
      this.$axios.get('/v1/ranking')
        .then(this.assignRanking)
        .catch(this.showError)
        .finally(this.finishLoading)
    },

    assignRanking (response) {
      this.ranking = response.data.ranking
    },

    showError (error) {
      this.$q.notify({ message: error.message, color: 'negative' })
    },

    finishLoading () {
      this.isLoading = false
    }
  },

  mounted () {
    this.fetchRanking()
  }
}
</script>

<style lang="stylus" scoped>

</style>
