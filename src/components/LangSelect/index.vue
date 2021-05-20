<template>
  <el-dropdown trigger="click" @command="handleSetSize">
    <div>
      <svg-icon class-name="size-icon" icon-class="size" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="item of sizeOptions" :key="item.value" :disabled="size===item.value" :command="item.value">{{
      item.label }}</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script lang="ts">
import { useStore } from "vuex"
import { useRoute, useRouter } from "vue-router";
import {
defineComponent,
reactive,
toRefs,
computed,
getCurrentInstance
} from 'vue'
export default defineComponent({
  name: 'LANGSELECT',
  serup(props: any, context: any) {
    const data: any = reactive({
      sizeOptions: [
        { label: 'Default', value: 'default' },
        { label: 'Medium', value: 'medium' },
        { label: 'Small', value: 'small' },
        { label: 'Mini', value: 'mini' }
      ]
    })
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const handleSetSize = (size: any) => {
      context.$ELEMENT.size = size
      store.dispatch('setSize', size)
      refreshView()
      context.ElMessage({
        message: 'Switch Size Success',
        type: 'success'
      })
    }
    const refreshView = () => {
      // In order to make the cached page re-rendered
      store.dispatch('delAllCachedViews', route)

      const { fullPath } = route

      context.$nextTick(() => {
        router.replace({
          path: '/redirect' + fullPath
        })
      })
    }

    const size = computed(() => {
      return store.getters.size
    })
    return {
    ...toRefs(data)
    }
  }
})
</script>
