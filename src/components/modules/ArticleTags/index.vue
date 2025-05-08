<script setup lang="ts">
import type { ArticleTag } from '@/core/domains/article/index'

type Props = {
  tags: ArticleTag[]
}

withDefaults(defineProps<Props>(), {
  tags: () => [],
})
</script>

<template>
  <div class="ArticleTags">
    <ul class="ArticleTags_list">
      <li v-for="tag in tags" :key="tag.id" class="ArticleTags_item">
        <a :href="`/tag/${tag.id}`" class="ArticleTags_link">
          {{ tag.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/mixins' as mixins;

$margin-top: 5px;
$margin-left: 8px;

.ArticleTags {
  font-size: 14px;
  display: flex;
  color: var(--app-color-gray);
}
.ArticleTags_heading {
  font-weight: normal;
  margin: 0 4px 0 0;
}
.ArticleTags_list {
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: -#{$margin-top} 0 0 -#{$margin-left};
  list-style: none;
}
.ArticleTags_item {
  margin: #{$margin-top} 0 0 #{$margin-left};
}
.ArticleTags_link {
  transition: 0.3s;
  color: var(--app-color-blue);
  border: 1px solid var(--app-color-blue);
  border-radius: 4px;
  padding: 4px;
  @include mixins.media() {
    @include mixins.active() {
      opacity: 0.8;
    }
  }
}
</style>
