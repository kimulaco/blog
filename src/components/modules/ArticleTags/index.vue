<script setup lang="ts">
import type { ArticleTag } from '../../../core/domains/article/index'

type Props = {
  tags: ArticleTag[]
}

withDefaults(defineProps<Props>(), {
  tags: () => [],
})
</script>

<template>
  <div class="ArticleTags">
    <b class="ArticleTags_heading">Tags: </b>
    <ul class="ArticleTags_list">
      <li v-for="tag in tags" :key="tag.id" class="ArticleTags_item">
        <a :href="`/tag/${tag.id}/`" class="ArticleTags_link">
          {{ tag.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@use '../../../assets/scss/variables' as variables;
@use '../../../assets/scss/mixins' as mixins;

$margin-top: 5px;
$margin-left: 8px;

.ArticleTags {
  font-size: 14px;
  display: flex;
  color: variables.$COLOR_GRAY;
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
  @include mixins.media() {
    @include mixins.active() {
      opacity: 0.8;
    }
  }
}
.ArticleTags_icon {
  fill: variables.$COLOR_GRAY;
  width: 14px;
  height: 14px;
  margin: 2px 8px 0 0;
  transform: translateY(1px);
}
</style>
