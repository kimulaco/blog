<script setup lang="ts">
import LayoutInner from '@/components/layouts/LayoutInner/index.vue'
</script>

<template>
  <div
    class="SiteColumn"
    :class="{
      '--single': !$slots.sub,
    }"
  >
    <LayoutInner class="SiteColumn__inner">
      <div class="SiteColumn_main">
        <slot name="main" />
      </div>
      <div v-if="$slots.sub" class="SiteColumn_sub">
        <slot name="sub" />
      </div>
    </LayoutInner>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/mixins' as mixins;

.SiteColumn__inner {
  padding: 32px 10px;

  @include mixins.media() {
    display: flex;
    align-items: flex-start;
    padding: 32px 20px;
  }
}
.SiteColumn_main {
  width: 100%;

  @include mixins.media() {
    width: var(--app-main-width);

    .SiteColumn.--single & {
      width: 100%;
    }
  }
}
.SiteColumn_sub {
  @include mixins.media() {
    width: calc(var(--app-aside-width) - 20px);
    margin-left: 20px;
  }
}
</style>
