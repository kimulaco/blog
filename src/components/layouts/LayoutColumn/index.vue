<script setup lang="ts">
import LayoutInner from '../LayoutInner/index.vue'
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
@use '../../../assets/scss/variables' as variables;
@use '../../../assets/scss/mixins' as mixins;

.SiteColumn__inner {
  padding: 32px 20px;

  @include mixins.media() {
    display: flex;
    align-items: flex-start;
  }
}
.SiteColumn_main {
  width: 100%;

  @include mixins.media() {
    width: variables.$MAIN_WIDTH;

    .SiteColumn.--single & {
      width: 100%;
    }
  }
}
.SiteColumn_sub {
  @include mixins.media() {
    width: #{variables.$ASIDE_WIDTH - 20px};
    margin-left: 20px;
  }
}
</style>
