<template>
  <div :class="classes" style="">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed, getCurrentInstance } from 'vue';
const props = defineProps({
  size: {
    type: Number,
    default: 50,
  },
  minSize: {
    type: Number,
    default: 100,
  },
})

const classes = computed(() => {
  var parent = getCurrentInstance()?.parent;
  var a = parent?.props;
  return `split split-` + a?.direction;
})



</script>