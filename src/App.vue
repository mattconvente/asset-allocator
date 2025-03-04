<script setup lang="ts">
import type { Asset } from './types/types'
import { ref, computed, watchEffect, onMounted, reactive, shallowRef } from 'vue'
import AppInput from './components/AppInput.vue'
import AssetAllocationChart from './components/AssetAllocationChart.vue'
import CryptoAmountToBuy from './components/CryptoAmountToBuy.vue'
import IconBTCLogo from './components/icons/IconBTCLogo.vue'
import IconETHLogo from './components/icons/IconETHLogo.vue'

const cryptoUSDExchangeRates = ref()
const BTCRate = ref('')
const ETHRate = ref('')
const totalInvestableAssets = ref(100)

const BTCDollarsToBuy = computed(() => totalInvestableAssets.value * 0.7)
const ETHDollarsToBuy = computed(() => totalInvestableAssets.value - BTCDollarsToBuy.value)
const BTCAllocationPercentage = computed(
  () => (BTCDollarsToBuy.value / totalInvestableAssets.value) * 100,
)
const ETHAllocationPercentage = computed(
  () => (ETHDollarsToBuy.value / totalInvestableAssets.value) * 100,
)

const assets = reactive<Asset[]>([
  {
    cryptocurrency: 'Bitcoin',
    ticker: 'BTC',
    rate: BTCRate.value,
    amountToInvest: BTCDollarsToBuy.value,
    allocation: BTCAllocationPercentage.value,
    icon: shallowRef(IconBTCLogo),
  },
  {
    cryptocurrency: 'Ethereum',
    ticker: 'ETH',
    rate: ETHRate.value,
    amountToInvest: ETHDollarsToBuy.value,
    allocation: ETHAllocationPercentage.value,
    icon: shallowRef(IconETHLogo),
  },
])

onMounted(async () => {
  try {
    const response = await fetch('https://api.coinbase.com/v2/exchange-rates?currency=USD')
    cryptoUSDExchangeRates.value = await response.json()
    BTCRate.value = cryptoUSDExchangeRates.value.data.rates.BTC
    ETHRate.value = cryptoUSDExchangeRates.value.data.rates.ETH
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})

const updateAsset = (index: number, updatedValues: Partial<Asset>) => {
  assets[index] = {
    ...assets[index],
    ...updatedValues,
  }
}

watchEffect(() => {
  updateAsset(0, {
    rate: BTCRate.value,
    amountToInvest: BTCDollarsToBuy.value,
  })
  updateAsset(1, {
    rate: ETHRate.value,
    amountToInvest: ETHDollarsToBuy.value,
  })
})
</script>

<template>
  <main class="container">
    <h1>Asset Allocation Calculator</h1>
    <AppInput
      :id="'total-investable-assets'"
      :label="'Amount to invest'"
      :type="'number'"
      :min="0"
      :step="0.01"
      v-model="totalInvestableAssets"
      :currency="'USD'"
    />
    <div>
      <h3 class="section-title">Cryptocurrencies to buy</h3>
      <div class="crypto-amounts-to-buy">
        <CryptoAmountToBuy
          v-for="asset in assets"
          :key="asset.ticker"
          :cryptocurrency="asset.cryptocurrency"
          :ticker="asset.ticker"
          :rate="asset.rate"
          :amountToInvest="asset.amountToInvest"
          :allocation="asset.allocation"
          :icon="asset.icon"
        />
      </div>
    </div>
    <div>
      <h3 class="section-title">Total allocation</h3>
      <AssetAllocationChart :assets="assets" />
    </div>
  </main>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem 2rem 2rem;
  width: 100%;
  border-radius: 1rem;
  background-color: oklch(0.968 0.007 247.896);
}
.section-title {
  margin-block-end: 0.25rem;
}
.crypto-amounts-to-buy {
  max-height: 384px;
  overflow-y: auto;
}

@media (min-width: 768px) {
  .container {
    max-width: 512px;
  }
}
</style>
