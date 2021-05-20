.<template>
  <div class='base'>
    base
  </div>
</template>

<script lang='ts'>
import {
defineComponent,
reactive,
toRefs
} from 'vue'
export default defineComponent ({
  name: 'base',
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