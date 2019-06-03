<template lang="pug">
  q-page
    q-breadcrumbs.q-px-md.q-pt-lg
      q-breadcrumbs-el.text-grey-20(icon="mdi-trophy", label="Achievements")
      q-breadcrumbs-el.text-weight-bolder(label="List")

    .row.justify-center.q-pa-md
      .col-12
        q-card(flat)
          q-card-section
            achievements-list
  </q-page>
</template>

<script>
import AchievementsList from 'components/AchievementsList'

export default {
  name: 'Achievements',
  components: {
    AchievementsList
  }
}
</script>

<style>
</style>
