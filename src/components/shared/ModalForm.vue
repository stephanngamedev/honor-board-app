<template lang="pug">
  q-dialog(
    persistent,
    maximized,
    v-model="isOpened",
    transition-show="slide-up",
    transition-hide="slide-down"
  )
    q-card.q-pa-sm
      .row.justify-center
        .col-md-6.col-xs-12
          content-placeholder(active, :title="false", :rows="10", :loading="isLoading")
            q-card-section
              slot(name="title")
            q-separator

            q-card-section
              slot(name="fields", :resource="resource", :errorFor="errorFor")

      .row.justify-center
        .col-md-6.col-xs-12.text-right.q-gutter-sm
          q-btn(flat, :disabled="isSubmitting", @click="close") Cancel
          q-btn(unelevated, :disabled="isLoading", :loading="isSubmitting", color="accent", @click="save") Save
</template>

<script>
import ContentPlaceholder from 'components/shared/ContentPlaceholder'

export default {
  components: {
    ContentPlaceholder
  },

  props: {
    resourceName: {
      type: String,
      required: true
    },

    resourcePath: {
      type: String,
      required: true
    },
  },

  data () {
    return {
      isOpened: false,
      isLoading: false,
      isSubmitting: false,
      resource: {},
      errors: {}
    }
  },

  methods: {
    // #############
    // # BEHAVIORS #
    // #############
    open (resource) {
      this.isOpened = true

      if (resource.id) {
        this.startLoading()
        this.load(resource.id)
      } else {
        this.resource = { ...resource }
      }
    },

    close () {
      this.isOpened = false
      this.isLoading = false
      this.isSubmitting = false
      this.clean()
    },

    save () {
      this.startSubmitting()

      if (this.resource.id) {
        this.update()
      } else {
        this.create()
      }
    },

    // ############
    // # SERVICES #
    // ############
    load (resourceId) {
      this.$axios.get(`${this.resourcePath}/${resourceId}`)
        .then(this.assignResource)
        .catch(this.handleErrors)
        .finally(this.stopLoading)
    },

    create () {
      this.$axios.post(`${this.resourcePath}`, { [this.resourceName]: this.resource })
        .then(this.emitCreateEvent)
        .then(this.close)
        .catch(this.handleErrors)
        .finally(this.stopSubmitting)
    },

    update () {
      this.$axios.put(`${this.resourcePath}/${this.resource.id}`, { [this.resourceName]: this.resource })
        .then(this.emitUpdateEvent)
        .then(this.clode)
        .catch(this.handleErrors)
        .finally(this.stopSubmitting)
    },

    // ############
    // # HANDLERS #
    // ############
    assignResource (response) {
      this.resource = response.data[this.resourceName]
    },

    emitCreateEvent (response) {
      this.$emit('create', { [this.resourceName]: response.data[this.resourceName] })
    },

    emitUpdateEvent (response) {
      this.$emit('update', { [this.resourceName]: response.data[this.resourceName] })
    },

    handleErrors (error) {
      let message

      if (error.response) {
        this.errors = error.response.data.errors || {}
        message = error.response.data.error
      }

      this.$q.notify({ message: message || 'An error occured', color: 'negative' })
    },

    // ###########
    // # HELPERS #
    // ###########
    clean () {
      this.errors = {}
      this.resource = {}
    },

    startLoading () {
      this.isLoading = true
    },

    stopLoading () {
      this.isLoading = false
    },

    startSubmitting () {
      this.isSubmitting = true
    },

    stopSubmitting () {
      this.isSubmitting = false
    },

    errorFor (attribute) {
      return this.errors[attribute] && this.errors[attribute][0]
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
