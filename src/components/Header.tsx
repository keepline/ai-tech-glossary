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
      <div className="chrome-bar px-4 sm:px-6 py-3.5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={`${import.meta.env.BASE_URL}brand-logo.svg`}
              alt=""
              width={36}
              height={36}
              className="w-9 h-9 rounded-xl shrink-0"
              aria-hidden
            />
            <div className="min-w-0">
              <h1 className="text-[15px] sm:text-base font-bold tracking-tight text-white truncate">
                AI 技术术语图谱
                <span className="text-[var(--text-quiet)] font-medium ml-2 text-xs sm:text-sm">
                  2024–2026
                </span>
              </h1>
              <p className="text-[12px] text-[var(--text-secondary)] truncate leading-snug">
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
            <span className="text-[10px] uppercase tracking-wider text-[var(--text-quiet)] mr-1">
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
            <span className="hidden lg:inline text-[10px] uppercase tracking-wider text-[var(--text-quiet)] mr-1">
              关系
            </span>
            {(Object.keys(RELATION_META) as RelationType[]).map((k) => (
              <span
                key={k}
                className="hidden lg:inline-flex items-center gap-1 text-[11px] text-[var(--text-secondary)]"
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
          : 'text-[var(--text-secondary)] hover:text-white'
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
        active
          ? ''
          : 'text-[var(--text-secondary)] border-white/10 hover:border-white/20'
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
