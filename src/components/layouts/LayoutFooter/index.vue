<script setup lang="ts">
import { computed } from 'vue'
import LayoutInner from '@/components/layouts/LayoutInner/index.vue'
import { APP_CONFIG } from '@/core/domains/app'

const feedUrl = computed(() => {
  return APP_CONFIG.FEED_URL
})
</script>

<template>
  <footer class="SiteFooter">
    <LayoutInner class="SiteFooter_inner">
      <ul class="SiteFooter_menu">
        <li class="SiteFooter_menu-item">
          <a class="SiteFooter_menu-link" href="/about/">About</a>
        </li>
        <li class="SiteFooter_menu-item">
          <a class="SiteFooter_menu-link" href="/about/#contact">Contact</a>
        </li>
        <li class="SiteFooter_menu-item">
          <a class="SiteFooter_menu-link" :href="feedUrl">Feed</a>
        </li>
      </ul>

      <p class="SiteFooter_copyright">&copy; 2023 kimulaco.</p>
    </LayoutInner>
  </footer>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/mixins' as mixins;

.SiteFooter {
  padding: 16px 0 24px;
  margin: 0;
  @include mixins.media() {
    margin: 30px 0 0;
  }
}
.SiteFooter_inner {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  @include mixins.media() {
    padding: 0 20px;
  }
}
.SiteFooter_menu {
  margin: 0;
  padding: 0;
  display: flex;
  list-style: none;
}
.SiteFooter_menu-item {
  margin: 0 0 0 16px;
}
.SiteFooter_menu-link {
  transition: 0.3s;
  @include mixins.media() {
    @include mixins.active() {
      opacity: 0.8;
    }
  }
}
.SiteFooter_copyright {
  margin: 0;
  text-align: center;
  font-size: 14px;
  @include mixins.media() {
    text-align: left;
  }
}
</style>
