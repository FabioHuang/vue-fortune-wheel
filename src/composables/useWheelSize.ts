import { computed, ref } from 'vue'
import type { Data, ImgParams } from '@/types'

const MAX_FONT_SIZE = 40
const MARGIN = 20

interface Props {
  data: Data[]
  imgParams?: ImgParams
}

export function useWheelSize(props: Props) {
  const style = ref<{ width: number }>({ width: 600 })

  const wheelSize = computed(() => {
    if (typeof window !== 'undefined') {
      const screenWidth = window.innerWidth
      const width = Math.min(screenWidth, style.value.width) - MARGIN
      const height = Math.min(screenWidth, style.value.width) + 120

      return { width, height }
    }

    return { width: 600, height: 600 }
  })

  const fontSize = computed(() => {
    const longestStringLength = Math.max(...props.data.map(item => item.value.length), 0)
  
    if (longestStringLength < 10) return MAX_FONT_SIZE
    if (longestStringLength <= 20) return MAX_FONT_SIZE - (20 - longestStringLength)*2
    return MAX_FONT_SIZE / 8
  })

  const wheelStyle = computed(() => ({
    width: `${wheelSize.value.width}px`,
    height: `${wheelSize.value.height}px`,
    fontSize: `${fontSize.value}px`,
    margin: '0 auto'
  }))

  return { wheelSize, fontSize, wheelStyle }
}
