<template>
  <div class="crypto">
    <div class="icon">
      <slot name="icon"></slot>
    </div>
    <h3 class="heading">
      <slot name="heading"></slot>
    </h3>
    <div>
      <slot name="amount"></slot>
    </div>
  </div>
</template>

<style scoped>
.crypto {
  display: flex;
  flex-direction: column;
  place-items: center;
  border-radius: 1rem;
  border: 1px solid #bbb;
  background-color: #fff;
  padding: 1rem;
}
.icon {
  width: 3rem;
  height: 3rem;
  margin-block-end: 1rem;
}
</style>
