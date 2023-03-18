<script setup lang="ts">
import z from 'zod'
import { Accordion, initAccordions } from "flowbite";
import type { AccordionOptions, AccordionItem, AccordionInterface } from "flowbite";

const props = defineProps({
  headingSelectors: {
    type: Array,
    default: []
  },
  bodySelectors: {
    type: Array,
    default: []
  }
})

const selectors = (count: number) => Array.from({ length: count }, (_, i): [string, string] => {
  const heading = '#accordion-example-heading-' + (i + 1)
  const body = '#accordion-example-body-' + (i + 1)
  return [heading, body]
})
const getAccordionItems = (count: number) => {
  const result: AccordionItem[] = []
  props.headingSelectors.forEach(([triggerElSelector, targetElSelector], i) => {
    console.log('triggerElSelector: ', triggerElSelector);
    console.log('targetElSelector: ', targetElSelector);
    const isActive = i === 0
    const triggerEl = document.querySelector(triggerElSelector)
    const targetEl = document.querySelector(targetElSelector)

    if (triggerEl && targetEl) {
      result.push({
        id: triggerElSelector,
        triggerEl,
        targetEl,
        active: isActive
      })
    }
  })

  return result
}

// create an array of objects with the id, trigger element (eg. button), and the content element
const accordionItems = ref<AccordionItem[]>([]);

// options with default values
const options = ref<AccordionOptions>({
  alwaysOpen: true,
  activeClasses: 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white',
  inactiveClasses: 'text-gray-500 dark:text-gray-400',
  onOpen: (item) => {
    console.log('accordion item has been shown');
    console.log(item);
  },
  onClose: (item) => {
    console.log('accordion item has been hidden');
    console.log(item);
  },
  onToggle: (item) => {
    console.log('accordion item has been toggled');
    console.log(item);
  },
})

/*
* accordionItems: array of accordion item objects
* options: optional
*/
const accordion = computed<AccordionInterface>(() => {
  return new Accordion(accordionItems.value as AccordionItem[], options.value)
})

onMounted(() => {
  initAccordions()
  accordionItems.value = (getAccordionItems(3))

  // open accordion item based on id
  accordion.value.open('#accordion-example-heading-2');
})

</script>

<template>
  <div>
    <h2 id="accordion-example-heading-1">
      <button type="button"
        class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
        aria-expanded="true" aria-controls="accordion-example-body-1">
        <span>What is Flowbite?</span>
        <svg data-accordion-icon class="w-6 h-6 rotate-180 shrink-0" fill="currentColor" viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"></path>
        </svg>
      </button>
    </h2>
    <div id="accordion-example-body-1" class="hidden" aria-labelledby="accordion-example-heading-1">
      <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
        <p class="mb-2 text-gray-500 dark:text-gray-400">Flowbite is an open-source library of interactive components
          built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.</p>
        <p class="text-gray-500 dark:text-gray-400">Check out this guide to learn how to <a
            href="/docs/getting-started/introduction/" class="text-blue-600 dark:text-blue-500 hover:underline">get
            started</a> and start developing websites even faster with components on top of Tailwind CSS.</p>
      </div>
    </div>
    <h2 id="accordion-example-heading-2">
      <button type="button"
        class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
        aria-expanded="false" aria-controls="accordion-example-body-2">
        <span>Is there a Figma file available?</span>
        <svg data-accordion-icon class="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"></path>
        </svg>
      </button>
    </h2>
    <div id="accordion-example-body-2" class="hidden" aria-labelledby="accordion-example-heading-2">
      <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
        <p class="mb-2 text-gray-500 dark:text-gray-400">Flowbite is first conceptualized and designed using the Figma
          software so everything you see in the library has a design equivalent in our Figma file.</p>
        <p class="text-gray-500 dark:text-gray-400">Check out the <a href="https://flowbite.com/figma/"
            class="text-blue-600 dark:text-blue-500 hover:underline">Figma design system</a> based on the utility
          classes
          from Tailwind CSS and components from Flowbite.</p>
      </div>
    </div>
    <h2 id="accordion-example-heading-3">
      <button type="button"
        class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
        aria-expanded="false" aria-controls="accordion-example-body-3">
        <span>What are the differences between Flowbite and Tailwind UI?</span>
        <svg data-accordion-icon class="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"></path>
        </svg>
      </button>
    </h2>
    <div id="accordion-example-body-3" class="hidden" aria-labelledby="accordion-example-heading-3">
      <div class="p-5 border border-t-0 border-gray-200 dark:border-gray-700">
        <p class="mb-2 text-gray-500 dark:text-gray-400">The main difference is that the core components from Flowbite
          are
          open source under the MIT license, whereas Tailwind UI is a paid product. Another difference is that Flowbite
          relies on smaller and standalone components, whereas Tailwind UI offers sections of pages.</p>
        <p class="mb-2 text-gray-500 dark:text-gray-400">However, we actually recommend using both Flowbite, Flowbite
          Pro,
          and even Tailwind UI as there is no technical reason stopping you from using the best of two worlds.</p>
        <p class="mb-2 text-gray-500 dark:text-gray-400">Learn more about these technologies:</p>
        <ul class="pl-5 text-gray-500 list-disc dark:text-gray-400">
          <li><a href="https://flowbite.com/pro/" class="text-blue-600 dark:text-blue-500 hover:underline">Flowbite
              Pro</a></li>
          <li><a href="https://tailwindui.com/" rel="nofollow"
              class="text-blue-600 dark:text-blue-500 hover:underline">Tailwind UI</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
