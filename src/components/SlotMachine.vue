<template>
  <div class="slot-machine">
    <div class="columns">
      <div v-for="(column, index) in slotColumns" :key="index" class="slot-column">
        <img :src="column.currentImage" class="slot-image" />
      </div>
    </div>
    <div class="controls">
      <button @click="startSlot" :disabled="isSpinning || imageList.length === 0">スタート</button>
      <p v-if="isWinner" class="result">🎉 あたり！ 🎉</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

interface SlotColumn {
  currentImage: string
}

const imageList = ref<string[]>([])
const slotColumns = ref<SlotColumn[]>([])
const isSpinning = ref(false)
const isWinner = ref(false)

onMounted(async () => {
  try {
    const res = await axios.get<string[]>('http://localhost:3001/images') // ← Node.js 側APIのURL
    imageList.value = res.data

    // スロットの初期化（ランダム画像で埋める）
    slotColumns.value = Array.from({ length: 3 }, () => ({
      currentImage: getRandomImage(),
    }))
  } catch (err) {
    console.error('画像の取得に失敗しました:', err)
  }
})

function startSlot(): void {
  if (isSpinning.value || imageList.value.length === 0) return

  isSpinning.value = true
  isWinner.value = false

  const spinInterval = setInterval(() => {
    for (const column of slotColumns.value) {
      column.currentImage = getRandomImage()
    }
  }, 100)

  setTimeout(() => {
    clearInterval(spinInterval)
    isSpinning.value = false

    const [a, b, c] = slotColumns.value.map((col) => col.currentImage)
    isWinner.value = a === b && b === c
  }, 2000)
}

function getRandomImage(): string {
  const index = Math.floor(Math.random() * imageList.value.length)
  return imageList.value[index]
}
</script>

<style scoped>
/* スタイル部分は変更なし */
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
