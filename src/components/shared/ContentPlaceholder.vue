<template lang="pug">
  .content-placeholder
    .content-placeholder-content(v-if="loading", :class="{ 'content-placeholder-active' : active }")
      h3.content-placeholder-title(v-if="title", :style="{ 'width': titleWidth }")

      ul.content-placeholder-paragraph.q-pa-none
        li(v-for="(item, index) in rows" :key="index")

    template(v-else)
      slot
</template>

<script>
export default {
  name: 'ContentPlaceholder',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    },
    title: {
      type: Boolean,
      default: true
    },
    paragraph: {
      type: Boolean,
      default: true
    },
    titleWidth: {
      type: String,
      default: '38%'
    },
    rows: {
      type: Number,
      default: 3
    }
  }
};
</script>

<style lang="stylus" scoped>
  content-placeholder-bg = #F2F2F2
	content-placeholder-height = 16px

  @keyframes content-placeholder-loading
    0%
      background-position: 100% 50%

    100%
      background-position: 0 50%


  .content-placeholder-content
    .content-placeholder-title
      height: content-placeholder-height
      margin-top: 16px
      background: content-placeholder-bg

    .content-placeholder-paragraph
      margin-top: 24px
      > li
        width: 100%
        height: content-placeholder-height
        list-style: none
        background: content-placeholder-bg

      > li+li
        margin-top: 16px


    &.content-placeholder-active
      .content-placeholder-title, .content-placeholder-paragraph>li
        background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%)
        background-size: 400% 100%
        animation: content-placeholder-loading 1.4s ease infinite
</style>

