<template lang="pug">
  modal-form(ref="form", resourceName="achievement", resourcePath="/v1/achievements")
    template(#title)
      .text-h6 Achievement form

    template(#fields="{ resource, errorFor }")
      q-option-group(inline, :options="achievementTypes", v-model="resource.achievementType")

      q-input.q-py-md(
        v-model="resource.title",
        label="Title",
        :error="errorFor('title') != null",
        :error-message="errorFor('title')"
      )

      q-input.q-py-md(
        v-model.number="resource.points",
        type="number",
        label="Points",
        :error="errorFor('points') != null",
        :error-message="errorFor('points')"
      )

      q-input.q-py-md(
        v-model="resource.order",
        label="Order",
        :error="errorFor('order') != null",
        :error-message="errorFor('order')"
      )
</template>

<script>
import ModalForm from 'components/shared/ModalForm'

export default {
  components: {
    ModalForm
  },

  data () {
    return {
      achievementTypes: [
        { label: 'Title', value: 'title' },
        { label: 'Other', value: 'other' }
      ],

      achievementTemplate: {
        id: '',
        title: '',
        points: '',
        achievementType: 'title',
        order: ''
      }
    }
  },

  methods: {
    open (achievement) {
      this.$refs.form.open(achievement || this.achievementTemplate)
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
