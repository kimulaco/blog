<script setup lang="ts">
import { computed } from 'vue'

type Props = {
  tag?: string
  to?: string
}

const props = withDefaults(defineProps<Props>(), {
  tag: 'div',
})

const innerTagName = computed(() => {
  return props.to ? 'a' : 'div'
})
</script>

<template>
  <component :is="tag" class="Card">
    <component :is="innerTagName" :href="to" class="Card_inner">
      <slot />
    </component>
  </component>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/mixins' as mixins;

.Card {
  background: var(--app-color-white);
}
.Card_inner {
  @include mixins.reset-child-margin();

  & {
    display: block;
    width: 100%;
    padding: 16px;
    border: 1px solid var(--app-color-shadowblack);
    border-radius: 6px;
    color: var(--app-color-black);
    box-shadow: 0 2px 2px var(--app-color-shadowblack);
    transition: 0.3s;
  }
}
a.Card {
  &_inner {
    @include mixins.active() {
      transform: translateY(-3px);
      box-shadow: 0 2px 8px var(--app-color-shadowblack);
    }
  }
}
</style>
