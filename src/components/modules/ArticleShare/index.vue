<script setup lang="ts">
import { copyToClipboard } from '../../../core/utilities/clipboard'
import { APP_CONFIG } from '../../../core/domains/app'

type Props = {
  title: string
  description: string
  url: string
  social?: string[]
}

type Emits = {
  (e: 'click', value: string): void
}

const props = withDefaults(defineProps<Props>(), {
  social: () => ['twitter', 'facebook', 'feedly', 'hatena', 'clipbord'],
})

const emits = defineEmits<Emits>()

const encodedTitle = encodeURI(props.title)
const encodedDesc = encodeURI(props.description)

const twitterUrl = `https://twitter.com/share?url=${props.url}&text=${encodedTitle} ${encodedDesc}`
const facebookUrl = `https://www.facebook.com/share.php?u=${props.url}`
const feedlyUrl = `https://feedly.com/i/subscription/feed${encodeURI(
  '/' + APP_CONFIG.FEED_URL
)}`
const hatenaUrl = `https://b.hatena.ne.jp/add?mode=confirm&url=${props.url}&title=${encodedTitle}`

const handleCopyToClipbord = async () => {
  emits('click', 'Clipbord')
  try {
    await copyToClipboard(window.location.href)
    // TODO: Add success toast
  } catch (error) {
    console.error(error)
    // TODO: Add error toast
  }
}
</script>

<template>
  <div class="Share">
    <ul class="Share_list">
      <li v-if="social.includes('twitter')" class="Share_item">
        <a
          :href="twitterUrl"
          class="Share_anchor -twitter"
          target="_blank"
          rel="noopener noreferrer"
          title="Twitterでシェアする"
          @click="emits('click', 'Twitter')"
        >
          <img
            src="../../../assets/img/icon-twitter.svg"
            alt=""
            class="Share_icon"
          />
          <span class="Share_text">Twitterでシェアする</span>
        </a>
      </li>

      <li v-if="social.includes('facebook')" class="Share_item">
        <a
          :href="facebookUrl"
          class="Share_anchor -facebook"
          target="_blank"
          rel="noopener noreferrer"
          title="Facebookでシェアする"
          @click="emits('click', 'Facebook')"
        >
          <img
            src="../../../assets/img/icon-facebook.svg"
            alt=""
            class="Share_icon"
          />
          <span class="Share_text">Facebookでシェアする</span>
        </a>
      </li>

      <li v-if="social.includes('feedly')" class="Share_item">
        <a
          :href="feedlyUrl"
          class="Share_anchor -feedly"
          target="_blank"
          rel="noopener noreferrer"
          title="Feedlyでフォローする"
          @click="emits('click', 'Feedly')"
        >
          <img src="../../../assets/img/icon-feedly.png" alt="" />
          <span class="Share_text">Feedlyでフォローする</span>
        </a>
      </li>

      <li v-if="social.includes('hatena')" class="Share_item">
        <a
          :href="hatenaUrl"
          class="Share_anchor -hatena"
          target="_blank"
          rel="noopener noreferrer"
          title="はてなブックマークでブックマークする"
          @click="emits('click', 'hatena')"
        >
          <img
            src="../../../assets/img/icon-hatena.svg"
            alt=""
            class="Share_icon"
          />
          <span class="Share_text">はてなブックマークでブックマークする</span>
        </a>
      </li>

      <li v-if="social.includes('clipbord')" class="Share_item">
        <button
          type="button"
          class="Share_anchor -clipbord"
          title="URLをクリップボードにコピーする"
          @click="handleCopyToClipbord"
        >
          <img
            src="../../../assets/img/icon-clipbord.svg"
            alt=""
            class="Share_icon"
          />
          <span class="Share_text">URLをクリップボードにコピーする</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@use '../../../assets/scss/variables' as variables;
@use '../../../assets/scss/mixins' as mixins;

.Share {
  margin: 0;
  font-size: 14px;
}
.Share_list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: -10px 0 0;
  @include mixins.media() {
    margin: -20px 0 0;
  }
}
.Share_item {
  margin: 10px 3px 0;
  @include mixins.media(356px) {
    margin: 10px 6px 0;
  }
  @include mixins.media() {
    margin: 20px 12px 0;
  }
}
.Share_icon {
  max-width: 20px;
  max-height: 20px;
}
.Share_text {
  font-size: 0;
  text-indent: -100vw;
}
.Share_anchor {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 8px;
  color: variables.$COLOR_WHITE;
  overflow: hidden;
  border-radius: 50%;
  box-shadow: 0 1px 4px rgba(#000, 0.2);
  &.-twitter {
    background: #1da1f2;
  }
  &.-facebook {
    background: #4267b2;
  }
  &.-feedly {
    background: #6cc655;
  }
  &.-line {
    background: #00b900;
  }
  &.-hatena {
    background: #00a4de;
    .Share_icon {
      max-width: 30px;
      max-height: 30px;
    }
  }
  &.-clipbord {
    background: #777;
  }
}
</style>
