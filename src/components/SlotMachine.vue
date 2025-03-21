<template>
  <div class="slot-machine">
    <div class="columns">
      <div v-for="(column, index) in slotColumns" :key="index" class="slot-column">
        <img :src="column.currentImage" class="slot-image" />
      </div>
    </div>
    <div class="controls">
      <button @click="startSlot" :disabled="isSpinning">スタート</button>
      <p v-if="isWinner" class="result">🎉 あたり！ 🎉</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 表示する画像リスト（public/images に配置）
const imageList = [
  '/images/a.png',
  '/images/b.png',
  '/images/c.png',
  '/images/d.png',
  '/images/e.png',
]

interface SlotColumn {
  currentImage: string
}

const slotColumns = ref<SlotColumn[]>([
  { currentImage: imageList[0] },
  { currentImage: imageList[1] },
  { currentImage: imageList[2] },
])

const isSpinning = ref(false)
const isWinner = ref(false)

function startSlot(): void {
  if (isSpinning.value) return

  isSpinning.value = true
  isWinner.value = false

  const spinInterval = setInterval(() => {
    for (const column of slotColumns.value) {
      column.currentImage = getRandomImage()
    }
  }, 100)

  // スロット停止までの時間
  setTimeout(() => {
    clearInterval(spinInterval)
    isSpinning.value = false

    const [a, b, c] = slotColumns.value.map((col) => col.currentImage)
    isWinner.value = a === b && b === c
  }, 2000)
}

function getRandomImage(): string {
  const index = Math.floor(Math.random() * imageList.length)
  return imageList[index]
}
</script>

<style scoped>
.slot-machine {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
}

.columns {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.slot-column {
  width: 100px;
  height: 100px;
  border: 2px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.slot-image {
  max-width: 80px;
  max-height: 80px;
}

.controls {
  text-align: center;
}

.result {
  color: green;
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 1rem;
}
</style>
