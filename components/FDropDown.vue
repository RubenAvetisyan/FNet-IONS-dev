<script setup lang="ts">
import { PropType } from 'vue';

interface Item {
  [key: string]: string;
}
type MenuItemKey = string;

const props = defineProps({
  items: {
    type: Array as PropType<Item[]>,
    default: () => [{ item: 'first item' }],
  },
  menuItemKey: {
    type: String as PropType<MenuItemKey>,
    default: 'item'
  },
});

const myItems = props.items as Item[]
const myKey = props.menuItemKey as string

onMounted(() => {
  const isValid = myItems.every((item) => myKey in item);
  if (!isValid)
    throw showError(
      `"${props.menuItemKey}" не существует в элементе "items" объекта: ${JSON.stringify(
        props.items
      )}`
    );
});

const dropdownButtonText = ref<string>(myItems[0][myKey])
</script>


<template>
  <div class="flex items-center md:order-2">
    <dropdown-button>
      <svg-en-b-icon />
      <span class="sr-only sm:not-sr-only">{{ dropdownButtonText }}</span>
    </dropdown-button>
    <!-- Dropdown -->
    <dropdown-menu>
      <n-list-item v-for="item in (items as Item[])" :key="item[myKey]">
        <template #icon v-if="item?.icon">
          <component :is="item.icon" />
        </template>
        {{ item[menuItemKey as unknown as string] }}
      </n-list-item>
    </dropdown-menu>
    <MobileHeaderButton />
  </div>
</template>
