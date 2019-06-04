<template lang="pug">
  q-dialog(persistent, v-model="isOpened")
    q-card
      q-card-section.row.items-center
        q-avatar(icon="mdi-alert", color="negative", text-color="white")
        span.q-ml-sm Are you sure you want to destroy this resource? This action is irrevesible.

      q-card-actions(align="right")
        q-btn(flat, label="Cancel", @click="close", :disabled="isSubmitting")
        q-btn(flat, label="Destroy", color="negative", @click="destroyResource", :loading="isSubmitting")
</template>

<script>
export default {
  data () {
    return {
      isOpened: false,
      isSubmitting : false,
      message: '',
      destroyURL: ''
    }
  },

  methods: {
    open ({ destroyURL }) {
      this.isOpened = true
      this.destroyURL = destroyURL
    },

    close () {
      this.isOpened = false
      this.stopSubmitting()
      this.destroyURL = ''
    },

    destroyResource () {
      this.startSubmitting()

      this.$axios.delete(this.destroyURL)
        .then(this.emitSuccessEvent)
        .catch(this.emitErrorEvent)
        .finally(this.close)
    },

    emitSuccessEvent () {
      this.$emit('destroy-success')
    },

    emitErrorEvent (error) {
      this.$emit('destroy-error')
    },

    startSubmitting () {
      this.isSubmitting = true
    },

    stopSubmitting () {
      this.isSubmitting = false
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>


