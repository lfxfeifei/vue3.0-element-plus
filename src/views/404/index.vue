<template>
  <div class='base'>
    404
  </div>
</template>

<script lang='ts'>
import {
defineComponent,
reactive,
toRefs
} from 'vue'
export default defineComponent ({
  name: 'ERROR',
  setup() {
     const data: any = reactive({

    })
    return {
    ...toRefs(data)
    }
  },
})
</script>

<style lang='scss' scoped>
 .base {

 }
</style>