<script setup lang="ts">
import { defineProps, defineOptions } from 'vue'
import type { Asset } from '@/types/types'

defineOptions({ name: 'AssetAllocationChart' })
defineProps({
  assets: {
    type: Array as () => Asset[],
    required: true,
  },
})
</script>

<template>
  <div class="asset-allocation-container">
    <div
      class="asset"
      :class="`asset-${asset.ticker}`"
      :style="{ width: `${asset.allocation}%` }"
      :title="`${asset.allocation}%`"
      v-for="asset in assets"
      :key="asset.ticker"
    >
      {{ asset.ticker }}
    </div>
  </div>
</template>

<style scoped>
.asset-allocation-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 1.5rem;
}

.asset {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1;
}

.asset-BTC {
  background-color: var(--color-asset-btc-background);
  color: var(--color-asset-btc-foreground);
}

.asset-ETH {
  background-color: var(--color-asset-eth-background);
  color: var(--color-asset-eth-foreground);
}
</style>
