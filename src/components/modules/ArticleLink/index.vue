<script setup lang="ts">
import ArticleTags from '@/components/modules/ArticleTags/index.vue'
import ArticleTimestamp from '@/components/modules/ArticleTimestamp/index.vue'
import type { Article } from '@/core/domains/article'

type Props = {
  article: Article
}

defineProps<Props>()
</script>

<template>
  <section class="ArticleLink">
    <div class="ArticleLink_inner">
      <h3 class="ArticleLink_heading">
        <a :href="`/article/${article.id}/`" class="ArticleLink_heading-link">
          {{ article.title }}
        </a>
      </h3>
      <div class="ArticleLink_meta">
        <ArticleTimestamp
          :created-at="article.created_at"
          :updated-at="article.updated_at"
          class="ArticleLink_timestamp"
        />
        <ArticleTags
          v-if="article.tag.length > 0"
          :tags="article.tag"
          class="ArticleLink_tags"
        />
      </div>
      <p class="ArticleLink_description">{{ article.description }}</p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as variables;
@use '@/assets/scss/mixins' as mixins;

.ArticleLink {
  border-bottom: 1px solid variables.$COLOR_LIGHTGRAY;
  position: relative;
  &:first-child {
    border-top: 1px solid variables.$COLOR_LIGHTGRAY;
  }
}
.ArticleLink_inner {
  display: block;
  padding: 20px 10px;
  color: variables.$COLOR_BLACK;
  @include mixins.media() {
    padding: 24px 20px;
  }
}
.ArticleLink_heading {
  font-size: 24px;
  padding: 5px 0;
  line-height: 1.4;
  margin: 0;
  color: variables.$COLOR_BLUE;
}
.ArticleLink_heading-link {
  transition: 0.3s;
  @include mixins.media() {
    @include mixins.active() {
      opacity: 0.8;
    }
  }
}
.ArticleLink_meta {
  display: flex;
  flex-wrap: wrap;
}
.ArticleLink_timestamp {
  margin: 0 16px 0 0;
}
.ArticleLink_description {
  font-size: 15px;
  margin: 7px 0 0;
  padding: 0;
}
</style>
