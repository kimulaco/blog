<script setup lang="ts">
import ArticleTagListItem from '@/components/modules/ArticleTagListItem/index.vue'
import type { ArticleTag } from '@/core/domains/article'

type Props = {
  tags: ArticleTag[]
}

withDefaults(defineProps<Props>(), {
  tags: () => [],
})
</script>

<template>
  <ul class="TagList">
    <li v-for="tag in tags" :key="tag.id" class="TagList_item">
      <ArticleTagListItem :href="`/tag/${tag.id}/`">
        {{ tag.name }}
      </ArticleTagListItem>
    </li>
  </ul>
</template>

<style scoped lang="scss">
$margin-top: 10px;
$margin-left: 10px;

.TagList {
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: -#{$margin-top} 0 0 -#{$margin-left};
  list-style: none;
}
.TagList_item {
  margin: #{$margin-top} 0 0 #{$margin-left};
}
</style>
