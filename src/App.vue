<script setup lang="ts">
import { ref, watchEffect, onMounted } from 'vue'
import CryptoAmountToBuy from './components/CryptoAmountToBuy.vue'
import IconBTCLogo from './components/icons/IconBTCLogo.vue'
import IconETHLogo from './components/icons/IconETHLogo.vue'

const coinbase = ref()
const BTCRate = ref(0)
const ETHRate = ref(0)
const totalMoneyToInvest = ref(100)
const BTCToBuy = ref('')
const ETHToBuy = ref('')

onMounted(async () => {
  try {
    const response = await fetch('https://api.coinbase.com/v2/exchange-rates?currency=USD')
    coinbase.value = await response.json()
    BTCRate.value = coinbase.value.data.rates.BTC
    ETHRate.value = coinbase.value.data.rates.ETH
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})

watchEffect(() => {
  BTCToBuy.value = (totalMoneyToInvest.value * 0.7).toFixed(2)
  // Find a way to not convert to Number first?
  ETHToBuy.value = (totalMoneyToInvest.value - Number(BTCToBuy.value)).toFixed(2)
})
</script>

<template>
  <main>
    <input type="number" min="0" step="0.01" v-model="totalMoneyToInvest" />
    <CryptoAmountToBuy>
      <template #icon>
        <IconBTCLogo />
      </template>
      <template #heading>Bitcoin (BTC)</template>
      <template #amount>{{ BTCToBuy }}</template>
    </CryptoAmountToBuy>
    <CryptoAmountToBuy>
      <template #icon>
        <IconETHLogo />
      </template>
      <template #heading>Ethereum (ETH)</template>
      <template #amount>{{ ETHToBuy }}</template>
    </CryptoAmountToBuy>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
