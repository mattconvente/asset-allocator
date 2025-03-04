<script setup lang="ts">
import { defineProps, defineOptions } from 'vue'

type CurrencyType = 'USD' | 'GBP' | 'EUR' | 'JPY'

const currencySymbols: Record<CurrencyType, string> = {
  USD: '$',
  GBP: '£',
  EUR: '€',
  JPY: '¥',
}

defineOptions({ name: 'AppInput' })
defineProps({
  modelValue: [String, Number],
  id: String,
  label: String,
  type: {
    type: String,
    default: 'text',
    validator: (value: string) =>
      [
        'text',
        'number',
        'email',
        'password',
        'tel',
        'url',
        'search',
        'date',
        'datetime-local',
        'month',
        'week',
        'time',
        'color',
      ].includes(value),
  },
  placeholder: String,
  min: Number,
  max: Number,
  step: Number,
  currency: {
    type: String,
    required: false,
    validator: (value: string) => ['USD', 'GBP', 'EUR', 'JPY'].includes(value),
  },
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const handleInput = (event: Event) => {
  const keyboardEvent = event as KeyboardEvent
  const target = keyboardEvent.target as HTMLInputElement
  const value = target.value
  emit('update:modelValue', target.type === 'number' ? target.valueAsNumber : value)
}
</script>

<template>
  <div class="input-container-outer">
    <label class="label" :for="id">{{ label }}</label>
    <div class="input-container-inner">
      <span class="currency-symbol" v-if="currency">{{
        currencySymbols[currency as CurrencyType]
      }}</span>
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        @input="handleInput"
        :placeholder="placeholder"
        :min="min"
        :max="max"
        :step="step"
        class="input"
      />
    </div>
  </div>
</template>

<style scoped>
.label {
  display: inline-block;
}

.input-container-inner {
  display: flex;
  border-radius: 0.25rem;
  border: 1px solid var(--color-input-border);
  background-color: var(--color-background);
  overflow: hidden;
  height: 2.5rem;
  align-items: center;
  transition:
    border-color 200ms ease-in-out,
    box-shadow 200ms ease-in-out;
}

.input-container-inner:hover {
  border-color: var(--color-input-border-hover);
}

.input-container-inner:focus-within {
  border-color: var(--color-input-border-active);
  box-shadow: var(--color-input-shadow-active);
}

.input {
  border: none;
  outline: none;
  width: 100%;
  padding: 0.5rem;
  font-family: inherit;
  font-size: 1rem;
}
.currency-symbol {
  display: inline-flex;
  height: 100%;
  border-right: 1px solid var(--color-input-border);
  background-color: oklch(0.967 0.001 286.375);
  color: var(--color-text-dimmed);
  width: 2rem;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  line-height: 1;
}
</style>
