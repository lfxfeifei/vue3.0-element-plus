import { App as VM } from "vue";

import {
  ElForm,
  ElInput,
  ElFormItem,
  ElDialog,
  ElMessage,
  ElButton
} from 'element-plus'

const components : Array<any> = [
  ElForm,
  ElInput,
  ElFormItem,
  ElButton,
  ElDialog
];
const plugins: Array<any> = [
  ElMessage,
  ElForm
];

export const elementPlus = {
  install: function(vm: VM) {
    components.forEach(item => {
      vm.component(item.name, item);
    });
    plugins.forEach(plugin => {
      vm.use(plugin)
    })
  }
};
