<script setup lang="ts">
import { computed } from 'vue'

type Props = {
  href?: string
}

const props = defineProps<Props>()

const rootTagName = computed(() => (props.href ? 'a' : 'span'))
</script>

<template>
  <component :is="rootTagName" :href="href" class="Tag">
    <slot />
  </component>
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables' as variables;
@use '@/assets/scss/mixins' as mixins;

.Tag {
  display: block;
  font-size: 14px;
  font-weight: bold;
  padding: 1px 10px 0;
  border-radius: 14px;
  box-shadow: 0 0 2px rgba(variables.$COLOR_BLACK, 0.3);
  transition: 0.3s;
  @include mixins.media() {
    @include mixins.active() {
      box-shadow: 0 0 4px rgba(variables.$COLOR_BLACK, 0.4);
    }
  }
}
</style>
