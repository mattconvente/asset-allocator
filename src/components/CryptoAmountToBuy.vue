<script setup lang="ts">
import { computed, defineProps, defineOptions, toRefs } from 'vue'
import type { Asset } from '@/types/types'

defineOptions({ name: 'CryptoAmountToBuy' })
const props = defineProps<Asset>()
const { cryptocurrency, ticker, rate, amountToInvest, allocation, icon } = toRefs(props)

// Coinbase shows 8 decimal places for crypto:fiat exchange rates.
// I'm adjustting it based on length of the integer portion of `amountToInvest`.
const assetsToBuy = computed(() => {
  if (!amountToInvest.value) return ''
  const fullValue = amountToInvest.value * Number(rate.value)
  const integerValue = Math.floor(fullValue)

  let numFractionDigits = 8
  if (integerValue >= 1000) {
    numFractionDigits = 2
  } else if (integerValue >= 100) {
    numFractionDigits = 4
  } else if (integerValue >= 10) {
    numFractionDigits = 6
  }

  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: numFractionDigits,
    maximumFractionDigits: numFractionDigits,
  }).format(fullValue)
})

const formattedAmountToInvest = computed(() =>
  amountToInvest.value
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amountToInvest.value)
    : '',
)
</script>

<template>
  <div class="crypto" :class="[!amountToInvest ? 'empty' : '']">
    <div class="icon">
      <component :is="icon" />
    </div>
    <div>
      <h3>{{ cryptocurrency }}</h3>
      <h2 class="heading">{{ assetsToBuy || '0' }} {{ ticker }}</h2>
      <small class="amount-to-invest" v-if="formattedAmountToInvest">
        {{ `${formattedAmountToInvest} &bullet; ${allocation}%` }}
      </small>
      <small v-else>&mdash;</small>
    </div>
  </div>
</template>

<style scoped>
.crypto {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  padding: 1rem;
  transition: opacity 200ms ease-in-out;
}

.crypto.empty {
  opacity: 0.66;
}

.crypto + .crypto {
  border-top: 1px solid var(--color-divider);
}

.icon {
  width: 3rem;
  height: 3rem;
  margin-inline-end: 1rem;
  flex-shrink: 0;
}

.heading {
  font-variant-numeric: tabular-nums;
}

.amount-to-invest {
  font-variant-numeric: tabular-nums;
  color: var(--color-text-dimmed);
}
</style>
