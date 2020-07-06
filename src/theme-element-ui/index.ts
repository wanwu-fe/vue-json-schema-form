import Vue from 'vue'

import { Button } from 'element-ui'

import Form from './Form.vue'
import FormItem from './FormItem.vue'
import Selection from './Selection.vue'
import TextInput from './TextInput.vue'
import ColorPicker from './ColorPicker.vue'
import NumberInput from './NumberInput.vue'
import DatePicker from './DatePicker.vue'
import TimePicker from './TimePicker.vue'
import DateTimePicker from './DateTimePicker.vue'
import DateTimeRangePicker from './DateTimeRangePicker.vue'
import Switch from './Switch.vue'
import Alert from './Alert.vue'
// import ArrayItemActions from './ArrayItemActions.vue'
// import ArrayItemAddAction from './ArrayItemAddAction.vue'
import SingleTypeArrayWrapper from './SingleTypeArrayWrapper.vue'
import Constant from './Constant.vue'

function getComponentName(component: any) {
  const options = component.options
  const name = options.name || component.name
  if (!options.name) {
    throw new Error(`${name} has no name in option`)
  }
  return name
}

export default {
  install(vue: typeof Vue) {
    const gn = getComponentName
    vue.component(gn(Form), Form)
    // vue.component(gn(FormItem), FormItem)
    vue.component(gn(Selection), Selection)
    vue.component(gn(TextInput), TextInput)
    vue.component(gn(ColorPicker), ColorPicker)
    vue.component(gn(NumberInput), NumberInput)
    vue.component(gn(Alert), Alert)
    vue.component(gn(DatePicker), DatePicker)
    vue.component(gn(TimePicker), TimePicker)
    vue.component(gn(DateTimePicker), DateTimePicker)
    vue.component(gn(DateTimeRangePicker), DateTimeRangePicker)
    vue.component(gn(Switch), Switch)
    // vue.component(gn(ArrayItemActions), ArrayItemActions)
    // vue.component(gn(ArrayItemAddAction), ArrayItemAddAction)
    vue.component(gn(SingleTypeArrayWrapper), SingleTypeArrayWrapper)
    vue.component(gn(Constant), Constant)
    vue.component('JsfButton', Button)
  },
}

export const components = {
  Form,
  Selection,
  TextInput,
  ColorPicker,
  NumberInput,
  Alert,
  DatePicker,
  TimePicker,
  DateTimePicker,
  Switch,
  SingleTypeArrayWrapper,
  Constant,
  FormItem,
}

export {
  Form,
  Selection,
  TextInput,
  ColorPicker,
  NumberInput,
  Alert,
  DatePicker,
  TimePicker,
  DateTimePicker,
  Switch,
  SingleTypeArrayWrapper,
  Constant,
  FormItem,
}
