import { CATEGORIES, CATEGORY_META, RELATION_META } from '../types'
import type { RelationType } from '../types'

export type ViewMode = 'graph' | 'list'

interface Props {
  view: ViewMode
  onViewChange: (v: ViewMode) => void
  categoryFilter: string | null
  onCategoryFilter: (c: string | null) => void
  termCount: number
}

export default function Header({
  view,
  onViewChange,
  categoryFilter,
  onCategoryFilter,
  termCount,
}: Props) {
  return (
    <header className="relative z-20 shrink-0 border-b border-white/6">
      <div className="glass px-4 sm:px-6 py-3.5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background:
                  'linear-gradient(135deg, #7c6cff44, #22d3ee33)',
                border: '1px solid #ffffff14',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 64 64" fill="none">
                <circle
                  cx="32"
                  cy="32"
                  r="16"
                  stroke="url(#hg)"
                  strokeWidth="3"
                />
                <circle cx="32" cy="18" r="3" fill="#7c6cff" />
                <circle cx="44" cy="38" r="3" fill="#22d3ee" />
                <circle cx="20" cy="38" r="3" fill="#f472b6" />
                <defs>
                  <linearGradient id="hg" x1="14" y1="14" x2="50" y2="50">
                    <stop stopColor="#7c6cff" />
                    <stop offset="1" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="min-w-0">
              <h1 className="text-[15px] sm:text-base font-bold tracking-tight text-white truncate">
                AI 技术术语图谱
                <span className="text-[#6b6b80] font-medium ml-2 text-xs sm:text-sm">
                  2024–2026
                </span>
              </h1>
              <p className="text-[11px] text-[#6b6b80] truncate">
                {termCount} 个高信号词条 · 关系链可视化 · 纯静态前端
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex rounded-xl p-0.5 bg-white/5 border border-white/8">
              <Tab
                active={view === 'graph'}
                onClick={() => onViewChange('graph')}
                label="图谱"
              />
              <Tab
                active={view === 'list'}
                onClick={() => onViewChange('list')}
                label="词条列表"
              />
            </div>
          </div>
        </div>

        {view === 'graph' && (
          <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-white/5">
            <span className="text-[10px] uppercase tracking-wider text-[#5a5a70] mr-1">
              分类
            </span>
            <Chip
              active={!categoryFilter}
              label="全部"
              onClick={() => onCategoryFilter(null)}
            />
            {CATEGORIES.map((c) => (
              <Chip
                key={c}
                active={categoryFilter === c}
                label={CATEGORY_META[c].short}
                title={c}
                color={CATEGORY_META[c].color}
                onClick={() =>
                  onCategoryFilter(categoryFilter === c ? null : c)
                }
              />
            ))}
            <span className="hidden lg:inline-block w-px h-4 bg-white/10 mx-2" />
            <span className="hidden lg:inline text-[10px] uppercase tracking-wider text-[#5a5a70] mr-1">
              关系
            </span>
            {(Object.keys(RELATION_META) as RelationType[]).map((k) => (
              <span
                key={k}
                className="hidden lg:inline-flex items-center gap-1 text-[10px] text-[#8b8ba0]"
              >
                <span
                  className="w-3 h-0.5 rounded-full"
                  style={{ background: RELATION_META[k].color }}
                />
                {RELATION_META[k].zh}
              </span>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}

function Tab({
  active,
  onClick,
  label,
}: {
  active: boolean
  onClick: () => void
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3.5 py-1.5 rounded-[10px] text-[12.5px] font-medium transition-all ${
        active
          ? 'bg-white/10 text-white shadow-sm'
          : 'text-[#8b8ba0] hover:text-white'
      }`}
    >
      {label}
    </button>
  )
}

function Chip({
  active,
  label,
  title,
  color,
  onClick,
}: {
  active: boolean
  label: string
  title?: string
  color?: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`text-[11px] px-2 py-0.5 rounded-full border transition-colors ${
        active ? '' : 'text-[#8b8ba0] border-white/10 hover:border-white/20'
      }`}
      style={
        active
          ? {
              color: color ?? '#c4b5fd',
              background: (color ?? '#7c6cff') + '28',
              borderColor: (color ?? '#7c6cff') + '55',
            }
          : undefined
      }
    >
      {label}
    </button>
  )
}
