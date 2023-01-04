<template>
    <div block p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800
        dark:border-gray-700 dark:hover:bg-gray-700>
        <slot></slot>

        <slot name="bottom"></slot>
    </div>
</template>