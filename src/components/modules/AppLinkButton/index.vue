<script setup lang="ts">
type Props = {
  href: string
}

defineProps<Props>()
</script>

<template>
  <a :href="href" class="LinkButton">
    <slot />
  </a>
</template>

<style scoped lang="scss">
.LinkButton {
  display: inline-block;
  color: var(--app-color-white);
  background: var(--app-color-black);
  font-size: 15px;
  text-align: center;
  min-width: 160px;
  padding: 8px 12px;
  margin: 0;
  border-radius: 4px;
}
</style>
