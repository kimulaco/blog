<script setup lang="ts">
type Props = {
  content: string
}

defineProps<Props>()
</script>

<template>
  <div class="PostContent" v-html="content" />
</template>

<style lang="scss">
@use '@/assets/scss/variables' as variables;
@use '@/assets/scss/mixins' as mixins;

.PostContent {
  line-height: 1.8;
  word-wrap: break-word;
  @include mixins.reset-child-margin();
  a {
    text-decoration: none;
    padding: 0 2px 2px;
    position: relative;
    @include mixins.media() {
      @include mixins.active() {
        text-decoration: underline;
      }
    }
    > code {
      font-size: 15px;
      display: inline-block;
      background: #f1f1f1;
      padding: 2px 6px;
      margin: 0 4px;
      border-radius: 4px;
      line-height: 1.2;
    }
  }
  strong {
    color: variables.$COLOR_RED;
  }
  p {
    margin: 16px 0;
  }
  p,
  li,
  h2,
  h3,
  h4,
  h5,
  h6 {
    > code {
      display: inline-block;
      color: variables.$COLOR_DARKGRAY;
      background: #f1f1f1;
      padding: 2px 6px;
      margin: 0 4px;
      border-radius: 4px;
      line-height: 1.2;
    }
  }
  p,
  li {
    > code {
      font-size: 15px;
    }
  }
  h2 {
    font-size: 24px;
    padding: 0 0 4px;
    margin: 40px 0 24px;
    border-bottom: 1px solid rgba(variables.$COLOR_GRAY, 0.3);
  }
  h3 {
    font-size: 20px;
    padding: 0 0 4px;
    margin: 32px 0 16px;
  }
  h4 {
    font-size: 18px;
    margin: 32px 0 16px;
  }
  h5 {
    font-size: 16px;
    margin: 32px 0 16px;
  }
  h6 {
    font-size: 14px;
    margin: 32px 0 16px;
  }
  ul,
  ol {
    padding: 0 0 0 20px;
    margin: 16px 0;
    ul,
    ol {
      margin: 0;
    }
  }
  blockquote {
    padding: 8px;
    margin: 16px 0;
    background: variables.$COLOR_BLOCKGRAY;
    border-radius: 6px;
    @include mixins.reset-child-margin();
  }
  pre {
    margin: 24px 0;
    border-radius: 6px;
    overflow: auto;
    code {
      display: block;
      padding: 0;
      color: variables.$COLOR_BLOCKGRAY;
    }
  }
  .PostContent_index {
    padding: 16px;
    margin: 0 0 40px;
    border-radius: 6px;
    box-shadow: 0 0 4px rgba(variables.$COLOR_BLACK, 0.2);
    @include mixins.media() {
      margin: 20px 20px 40px;
    }
    ul {
      margin: 0;
      ul {
        display: none;
        @include mixins.media() {
          display: block;
        }
      }
    }
  }
  .PostContent_index-title {
    margin: 0 0 10px;
    font-size: 20px;
  }
}
</style>
