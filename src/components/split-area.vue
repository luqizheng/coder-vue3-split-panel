<template>
  <div :class="classes" style="">
    <slot></slot>
  </div>
</template>

<script lang="ts">
//import Emitter from "../mixins/emitter";
import { getCurrentInstance } from "vue";
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
    classes(): string {
      var parent = getCurrentInstance()?.parent;
      var a = parent?.props;
      return `split split-` + a?.direction;
    },
  },
};
</script>