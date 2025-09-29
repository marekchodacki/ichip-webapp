<script setup lang="ts">
import { ref, onUnmounted } from 'vue'

defineProps({
  badgeClasses: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['pattern'])

const size = 300
const dotRadius = 21
const activeDots = ref<number[]>([])
const lines = ref<
  { x1: number; y1: number; x2: number; y2: number; key: string }[]
>([])
const lockRef = ref<HTMLElement | null>(null)
let isDrawing = false

const dots = ref([
  { id: 1, x: 50, y: 50 },
  { id: 2, x: 150, y: 50 },
  { id: 3, x: 250, y: 50 },
  { id: 4, x: 50, y: 150 },
  { id: 5, x: 150, y: 150 },
  { id: 6, x: 250, y: 150 },
  { id: 7, x: 50, y: 250 },
  { id: 8, x: 150, y: 250 },
  { id: 9, x: 250, y: 250 },
])

// Start drawing (mouse)
function startDrawing(event: MouseEvent) {
  resetPattern()
  isDrawing = true
  document.addEventListener('mousemove', checkDot)
  document.addEventListener('mouseup', stopDrawing)
}

// Start drawing (touch)
function startTouchDrawing(event: TouchEvent) {
  event.preventDefault()
  resetPattern()
  isDrawing = true
  document.addEventListener('touchmove', checkTouchDot)
  document.addEventListener('touchend', stopDrawing)
}

// End drawing
function stopDrawing() {
  isDrawing = false
  document.removeEventListener('mousemove', checkDot)
  document.removeEventListener('mouseup', stopDrawing)
  document.removeEventListener('touchmove', checkTouchDot)
  document.removeEventListener('touchend', stopDrawing)
  emit('pattern', activeDots.value)
}

// Check cursor position and mark points (mouse)
function checkDot(event: MouseEvent) {
  checkCoordinates(event.clientX, event.clientY)
}

// Check cursor position and mark points (touch)
function checkTouchDot(event: TouchEvent) {
  const touch = event.touches[0]
  checkCoordinates(touch.clientX, touch.clientY)
}

// Check coordinates
function checkCoordinates(clientX: number, clientY: number) {
  if (!lockRef.value || !isDrawing) return

  const rect = lockRef.value.getBoundingClientRect()
  const offsetX = Math.min(Math.max(clientX - rect.left, 0), rect.width)
  const offsetY = Math.min(Math.max(clientY - rect.top, 0), rect.height)

  dots.value.forEach((dot) => {
    const distance = Math.hypot(offsetX - dot.x, offsetY - dot.y)
    if (distance < dotRadius && !activeDots.value.includes(dot.id)) {
      if (activeDots.value.length > 0) {
        const lastDot = dots.value.find(
          (d) => d.id === activeDots.value[activeDots.value.length - 1]
        )
        if (lastDot) {
          lines.value.push({
            x1: lastDot.x,
            y1: lastDot.y,
            x2: dot.x,
            y2: dot.y,
            key: `${lastDot.id}-${dot.id}`,
          })
        }
      }
      activeDots.value.push(dot.id)
    }
  })
}

// Reset pattern
function resetPattern() {
  activeDots.value = []
  lines.value = []
}

onUnmounted(() => {
  document.removeEventListener('mousemove', checkDot)
  document.removeEventListener('mouseup', stopDrawing)
  document.removeEventListener('touchmove', checkTouchDot)
  document.removeEventListener('touchend', stopDrawing)
})
</script>

<template>
  <div
    class="pattern-lock mx-auto rounded-md ring-1 ring-gray-400 transition-all peer-checked:bg-sky-100"
    ref="lockRef"
    @mousedown="startDrawing"
    @mouseup="stopDrawing"
    @touchstart="startTouchDrawing"
    @touchend="stopDrawing"
  >
    <svg :width="size" :height="size">
      <!-- Draw points -->
      <circle
        v-for="dot in dots"
        :key="dot.id"
        :cx="dot.x"
        :cy="dot.y"
        :r="dotRadius"
        :class="{ active: activeDots.includes(dot.id) }"
      />
      <!-- Draw lines -->
      <line
        v-for="line in lines"
        :key="line.key"
        :x1="line.x1"
        :y1="line.y1"
        :x2="line.x2"
        :y2="line.y2"
        stroke="#075985"
        stroke-width="2"
      />
    </svg>
  </div>
  <div v-if="activeDots.length > 0" class="w-fit mx-auto my-4">
    <span class="mx-auto" :class="badgeClasses">{{
      activeDots.join(' - ')
    }}</span>
  </div>
</template>

<style scoped>
.pattern-lock {
  width: 300px;
  height: 300px;
  position: relative;
  border: 1px solid #ccc;
}
svg {
  width: 100%;
  height: 100%;
}
circle {
  fill: #bae6fd;
}
circle.active {
  fill: #0369a1;
}
</style>
