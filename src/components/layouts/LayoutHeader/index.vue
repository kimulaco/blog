<script setup lang="ts">
import { computed } from 'vue'
import InfoIcon from '@/assets/img/icon-info.svg?component'
import InfoFeed from '@/assets/img/icon-feed.svg?component'
import LayoutInner from '@/components/layouts/LayoutInner/index.vue'
import { APP_CONFIG } from '@/core/domains/app'

type Props = {
  currentPath?: string
}

const props = defineProps<Props>()

const isHome = computed(() => {
  return props.currentPath === '/'
})

const titleTextTag = computed(() => {
  return isHome.value ? 'span' : 'a'
})

const titleTextHref = computed(() => {
  return isHome.value ? undefined : '/'
})

const feedUrl = computed(() => {
  return APP_CONFIG.URL.FEED
})
</script>

<template>
  <header class="SiteHeader">
    <LayoutInner class="SiteHeader_inner">
      <component :is="isHome ? 'h1' : 'p'" class="SiteHeader_title">
        <component
          :is="titleTextTag"
          :href="titleTextHref"
          class="SiteHeader_title-text"
        >
          @kimulaco/blog
        </component>
      </component>

      <ul class="SiteHeader_menu">
        <li class="SiteHeader_menu-item">
          <a class="SiteHeader_menu-anchor" href="/about/">
            <InfoIcon class="SiteHeader_menu-icon" />
            <span class="hidden">About</span>
          </a>
        </li>
        <li class="SiteHeader_menu-item">
          <a class="SiteHeader_menu-anchor" :href="`${feedUrl}`">
            <InfoFeed class="SiteHeader_menu-icon" />
            <span class="hidden">Feed</span>
          </a>
        </li>
      </ul>
    </LayoutInner>
  </header>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as variables;
@use '@/assets/scss/mixins' as mixins;

.SiteHeader {
  background: variables.$COLOR_WHITE;
  margin: 0;
  box-shadow: 0 2px 4px rgba(variables.$COLOR_BLACK, 0.1);
  @include mixins.media() {
    margin: 0 0 30px;
  }
  a {
    color: inherit;
  }
}
.SiteHeader_inner {
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.SiteHeader_title {
  margin: 0;
  font-size: 16px;
  font-weight: normal;
}
.SiteHeader_title-text {
  display: flex;
  align-items: center;
  font-size: 18px;
  color: variables.$COLOR_BLACK;
}
.SiteHeader_menu {
  display: flex;
  padding: 0;
  margin: -6px 0 0 -6px;
  list-style: none;
}
.SiteHeader_menu-item {
  margin: 6px 0 0 6px;
}
.SiteHeader_menu-anchor {
  display: block;
  width: 32px;
  height: 32px;
}
.SiteHeader_menu-icon {
  width: 32px;
  height: 32px;
  fill: variables.$COLOR_BLACK;
}
</style>
