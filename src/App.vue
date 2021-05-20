<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
export default defineComponent({
  setup() {
    const state = reactive({
      flag: true
    });
    return { ...toRefs(state)};
  }
});
</script>

<style lang="scss">
/* @import url("https://fonts.font.im/css?family=PT+Sans"); */
* {
  padding: 0;
  margin: 0;
}
</style>
