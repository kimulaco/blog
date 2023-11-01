<template>
  <div class="SiteInner">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@use '../../../assets/scss/extends';
@use '../../../assets/scss/mixins' as mixins;

.SiteInner {
  @extend %layout-inner;
  @include mixins.reset-child-margin();
}
</style>
