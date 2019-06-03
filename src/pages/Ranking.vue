<template lang="pug">
  q-page
    q-breadcrumbs.q-px-md.q-pt-lg
      q-breadcrumbs-el.text-grey-20(icon="mdi-podium", label="Ranking")
      q-breadcrumbs-el.text-weight-bolder(label="All time")

    .row.justify-center.q-pa-md
      .col-12
        q-card(flat)
          q-card-section
            ranking-list
</template>

<style>
</style>

<script>
import RankingList from 'components/RankingList'

export default {
  name: 'Ranking',
  components: {
    RankingList
  }
}
</script>
