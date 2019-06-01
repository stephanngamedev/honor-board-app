<template lang="pug">
  .h-skeleton
    .h-skeleton-content(v-if="loading", :class="{ 'h-skeleton-active' : active }")
      h3.h-skeleton-title(v-if="title", :style="{ 'width': titleWidth }")

      ul.h-skeleton-paragraph.q-pa-none
        li(v-for="(item, index) in rows" :key="index")

    template(v-else)
      slot
</template>

<script>
export default {
  name: 'hSkeleton',
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
  skeleton-bg = #F2F2F2
	skeleton-height = 16px

  @keyframes h-skeleton-loading
    0%
      background-position: 100% 50%

    100%
      background-position: 0 50%


  .h-skeleton-content
    .h-skeleton-title
      height: skeleton-height
      margin-top: 16px
      background: skeleton-bg

    .h-skeleton-paragraph
      margin-top: 24px
      > li
        width: 100%
        height: skeleton-height
        list-style: none
        background: skeleton-bg

      > li+li
        margin-top: 16px


    &.h-skeleton-active
      .h-skeleton-title, .h-skeleton-paragraph>li
        background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%)
        background-size: 400% 100%
        animation: h-skeleton-loading 1.4s ease infinite
</style>

