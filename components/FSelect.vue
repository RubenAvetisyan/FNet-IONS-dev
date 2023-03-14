<script lang="ts" setup>
const props = defineProps({
  name: {
    type: String,
    required: '',
  },
  options: {
    type: Array,
    default: [],
  },
  customFn: {
    type: Function,
    default: (): void => { },
  },
})

const removeSpace = (v: string) => v.replace(/\s/gim, '')
const id = computed(() => removeSpace(props.name + Date.now()))
const getKey = (v: string) => removeSpace(v)

const options = computed(() => props.options as (string | number | Date | boolean)[])
const value = ref()
const selectValue = computed(() => value.value)

const fn = (e: any) => {
  value.value = e
  props.customFn(e)
}
</script>

<template>
                  <div flex flex-col justify="center" mx-auto rounded border border-gray-100 mx-0>
                    <div flex inline-flex items-center w-full mx-auto justify="between">
                      <label for="name" px-1>{{ name }}</label>
                      <div h-full relative>
                        <slot absolute top-0></slot>
                      </div>
                    </div>
                    <select :id="id" :name="name" :value="selectValue" flex w-full max-h-7 appearance-none border border-gray-500
                      leading-tight focus:outline-none focus:shadow-outline rounded font-medium text=" xs gray-700 dark:white"
                      @change="fn">
                      <option value="" class="bg-light-300 dark:bg-dark-700" />
                      <option v-for="option in options" :key="getKey(option?.toString() || '')" :value="option"
                        class="bg-light-300 dark:bg-dark-700">
        {{ option }}
      </option>
    </select>
  </div>
</template>
