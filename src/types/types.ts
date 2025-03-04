import type { Component } from 'vue'

export interface Asset {
  cryptocurrency: string
  ticker: string
  rate: string
  amountToInvest: number
  allocation: string | number
  icon: Component
}
