<script setup lang="ts">
type Props = {
  to: string
}

withDefaults(defineProps<Props>(), {
  to: '',
})
</script>

<template>
  <p class="LinkText">
    <a :href="to" class="LinkText_anchor">
      <slot />
    </a>
  </p>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/mixins' as mixins;

.LinkText {
  font-size: 15px;
  margin: 0;
}
.LinkText_anchor {
  display: inline-block;
  padding: 0 0 0 12px;
  position: relative;
  transition: 0.3s;
  @include mixins.active() {
    opacity: 0.7;
  }
  &::before {
    content: '';
    display: block;
    width: 4px;
    height: 4px;
    border-style: solid;
    border-color: inherit;
    border-width: 0 0 2px 2px;
    transform: rotate(225deg);
    position: absolute;
    top: 0.5em;
    left: 0;
  }
}
.LinkText.-back {
  .LinkText_anchor {
    &::before {
      transform: rotate(45deg);
      left: 4px;
    }
  }
}
</style>
