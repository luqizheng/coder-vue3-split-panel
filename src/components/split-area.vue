<template>
  <div :class="classes" style="">
    <slot></slot>
  </div>
</template>

<script lang="ts">
//import Emitter from "../mixins/emitter";

export default {
  name: "SplitArea",
  //mixins: [Emitter],
  props: {
    size: {
      type: Number,
      default: 50,
    },
    minSize: {
      type: Number,
      default: 100,
    },
  },
  computed: {
    classes() {
      return `split split-` + (this.$parent?.$props.direction || "horizontal");
    },
  },
  watch: {
    size() {
      // this.$parent.changeAreaSize();
    },
    minSize() {
      // this.$parent.changeAreaSize();
    },
  },
};
</script>