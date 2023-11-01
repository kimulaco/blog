<script setup lang="ts">
import LayoutInner from '@/components/layouts/LayoutInner/index.vue'
</script>

<template>
  <div class="SiteProfile">
    <LayoutInner class="SiteProfile_inner">
      <slot />
    </LayoutInner>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/mixins' as mixins;

.SiteProfile {
  padding: 32px 0 24px;
}
.SiteProfile_inner {
  @include mixins.media() {
    padding: 0 20px;
  }
}
</style>
