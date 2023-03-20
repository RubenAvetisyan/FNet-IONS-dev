<script setup>

const props = defineProps({
  name: {
    type: String,
    required: true,
    default: ''
  },
  options: {
    type: Object,
    default: {
      values: [],
      label: 'default-label-' + Date.now(),
      selected: false
    }
  },
  customFn: {
    type: Function,
    default: () => { }
  }
})

const removeSpace = (str) => str.replace(/\s/g, '')
const defaultOption = {
  value: 'default-value-' + Date.now(),
  label: 'default-label-' + Date.now(),
  selected: false
}
const getKey = (option = defaultOption) => removeSpace(`${option.value}-${option.label}`)
const value = ref()
const selectValue = computed(() => value.value)

const fn = (e) => {
  const target = e.target
  console.log('target: ', target);
  const newValue = target.value
  console.log('newValue: ', JSON.stringify(newValue));
  value.value = newValue
  props.customFn(newValue)
}

const options = computed(() => {
  console.log('props.options: ', props.options);
  const label = props.options.label
  const selected = props.options.selected
  return props.options.values.map((value, i) => {
    return {
      label,
      value,
      key: getKey({ value, label, selected: selected === i })
    }
  })
})

const id = computed(() => {
  const name = props.name
  return name.replace(/\s/gim, '-')
})
</script>

<template>
  <div flex flex-col justify="center" mx-auto rounded border border-gray-100 mx-0>
    <div flex inline-flex items-center w-full mx-auto justify="between">
      <label for="name" px-1>{{ name }}</label>
      <div h-full relative>
        <slot absolute top-0></slot>
      </div>
    </div>
      <select :id="id" :name="name || ''" :value="selectValue" flex w-full max-h-7 appearance-none border border-gray-500
      leading-tight focus:outline-none focus:shadow-outline rounded font-medium text=" xs gray-700 dark:white"
      @change="fn">
      <option value="" class="bg-light-300 dark:bg-dark-700" />
      <option v-for="option in options" :key="option.key" :value="option" class="bg-light-300 dark:bg-dark-700">
        {{ option.value }}
      </option>
    </select>
  </div>
</template>
