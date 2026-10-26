import type { Category } from '../types'
import { CATEGORIES } from '../types'
import { terms } from '../data/terms'

/** Deterministic category-cluster layout for the graph */
export function layoutPositions(): Record<string, { x: number; y: number }> {
  const byCat = new Map<Category, string[]>()
  for (const c of CATEGORIES) byCat.set(c, [])
  for (const t of terms) byCat.get(t.category)!.push(t.id)

  const cols = 4
  const clusterW = 420
  const clusterH = 320
  const padX = 80
  const padY = 100
  const positions: Record<string, { x: number; y: number }> = {}

  CATEGORIES.forEach((cat, i) => {
    const col = i % cols
    const row = Math.floor(i / cols)
    const cx = padX + col * clusterW + clusterW / 2
    const cy = padY + row * clusterH + clusterH / 2
    const ids = byCat.get(cat) ?? []
    const n = ids.length
    const r = 70 + Math.min(n, 8) * 8

    ids.forEach((id, j) => {
      if (n === 1) {
        positions[id] = { x: cx, y: cy }
        return
      }
      const angle = (j / n) * Math.PI * 2 - Math.PI / 2
      const jitter = ((j * 37) % 11) - 5
      positions[id] = {
        x: cx + Math.cos(angle) * (r + jitter) - 60,
        y: cy + Math.sin(angle) * (r * 0.85 + jitter * 0.5) - 24,
      }
    })
  })

  return positions
}
