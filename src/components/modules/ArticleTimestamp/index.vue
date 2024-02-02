<script setup lang="ts">
import { computed } from 'vue'
import { parseISO, format, isValid } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
import { BUILD_CONFIG } from '@@/config/build'

type Props = {
  createdAt: string
  updatedAt?: string
}

const props = defineProps<Props>()

const formatedCreatedAt = computed(() => {
  const date = utcToZonedTime(parseISO(props.createdAt), BUILD_CONFIG.TIMEZONE)

  if (isValid(date)) {
    return format(date, 'yyyy-MM-dd')
  }

  return ''
})

const formatedUpdatedAt = computed(() => {
  if (!props.updatedAt) {
    return ''
  }

  const date = utcToZonedTime(parseISO(props.updatedAt), BUILD_CONFIG.TIMEZONE)

  if (isValid(date)) {
    return format(date, 'yyyy-MM-dd')
  }

  return ''
})
</script>

<template>
  <div class="Timestamp">
    <dl class="Timestamp_list">
      <div class="Timestamp_item">
        <dt class="Timestamp_title">投稿日:</dt>
        <dd class="Timestamp_date">{{ formatedCreatedAt }}</dd>
      </div>
      <div v-if="updatedAt" class="Timestamp_item">
        <dt class="Timestamp_title">更新日:</dt>
        <dd class="Timestamp_date">{{ formatedUpdatedAt }}</dd>
      </div>
    </dl>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as variables;

$margin-top: 5px;
$margin-left: 10px;

.Timestamp {
  font-size: 14px;
  color: variables.$COLOR_GRAY;
  display: flex;
  align-items: center;
}
.Timestamp_list {
  display: flex;
  flex-wrap: wrap;
  margin: -#{$margin-top} 0 0 -#{$margin-left};
}
.Timestamp_item {
  display: flex;
  margin: #{$margin-top} 0 0 #{$margin-left};
}
.Timestamp_date {
  margin: 0 0 0 4px;
}
.Timestamp_icon {
  fill: variables.$COLOR_GRAY;
  width: 15px;
  height: 15px;
  margin: 0 4px 0 0;
}
</style>
