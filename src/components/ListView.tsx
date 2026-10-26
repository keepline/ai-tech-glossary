import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { terms } from '../data/terms'
import { CATEGORIES, CATEGORY_META, type Category } from '../types'

interface Props {
  selectedId: string | null
  onSelect: (id: string) => void
  categoryFilter: string | null
  onCategoryFilter: (c: string | null) => void
}

export default function ListView({
  selectedId,
  onSelect,
  categoryFilter,
  onCategoryFilter,
}: Props) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return terms.filter((t) => {
      if (categoryFilter && t.category !== categoryFilter) return false
      if (!q) return true
      return (
        t.en.toLowerCase().includes(q) ||
        t.zh.includes(q) ||
        t.explanation.includes(q) ||
        t.id.includes(q)
      )
    })
  }, [query, categoryFilter])

  const grouped = useMemo(() => {
    const map = new Map<Category, typeof terms>()
    for (const c of CATEGORIES) map.set(c, [])
    for (const t of filtered) map.get(t.category)!.push(t)
    return CATEGORIES.map((c) => ({
      category: c,
      items: map.get(c) ?? [],
    })).filter((g) => g.items.length > 0)
  }, [filtered])

  return (
    <div className="absolute inset-0 overflow-y-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 pb-28">
        <div className="sticky top-0 z-10 -mx-4 sm:-mx-6 px-4 sm:px-6 py-3 mb-4 bg-[#07070c]/95 backdrop-blur-md border-b border-white/5">
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6b6b80] text-sm">
              ⌕
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索英文 / 中文 / 释义…"
              className="w-full rounded-xl bg-white/5 border border-white/10 pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-[#6b6b80] outline-none focus:border-[#7c6cff]/60 focus:ring-1 focus:ring-[#7c6cff]/30 transition"
            />
          </div>
          <div className="flex flex-wrap gap-1.5 mt-3">
            <FilterChip
              active={!categoryFilter}
              label="全部"
              onClick={() => onCategoryFilter(null)}
            />
            {CATEGORIES.map((c) => (
              <FilterChip
                key={c}
                active={categoryFilter === c}
                label={c}
                color={CATEGORY_META[c].color}
                onClick={() =>
                  onCategoryFilter(categoryFilter === c ? null : c)
                }
              />
            ))}
          </div>
          <p className="text-[11px] text-[#6b6b80] mt-2 font-mono">
            {filtered.length} / {terms.length} 词条
          </p>
        </div>

        <div className="space-y-8">
          {grouped.map((g, gi) => (
            <section key={g.category}>
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: CATEGORY_META[g.category].color }}
                />
                <h2 className="text-sm font-semibold text-white">
                  {g.category}
                </h2>
                <span className="text-[11px] text-[#6b6b80] font-mono">
                  {g.items.length}
                </span>
              </div>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {g.items.map((t, i) => {
                  const active = selectedId === t.id
                  return (
                    <motion.button
                      key={t.id}
                      type="button"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min((gi * 4 + i) * 0.02, 0.3) }}
                      onClick={() => onSelect(t.id)}
                      className={`text-left rounded-xl p-3.5 border transition-all ${
                        active
                          ? 'bg-white/8 border-white/20 shadow-lg'
                          : 'bg-white/[0.03] border-white/6 hover:bg-white/[0.06] hover:border-white/12'
                      }`}
                      style={
                        active
                          ? {
                              boxShadow: `0 0 0 1px ${CATEGORY_META[t.category].color}66`,
                            }
                          : undefined
                      }
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="font-semibold text-[14px] text-white">
                          {t.en}
                        </span>
                        {t.yearHint && (
                          <span className="text-[10px] font-mono text-[#5a5a70] shrink-0">
                            {t.yearHint}
                          </span>
                        )}
                      </div>
                      <div className="text-[12px] text-[#9a9ab0] mt-0.5">
                        {t.zh}
                      </div>
                      <p className="text-[12px] text-[#707088] mt-2 line-clamp-2 leading-relaxed">
                        {t.explanation}
                      </p>
                    </motion.button>
                  )
                })}
              </div>
            </section>
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-[#6b6b80] py-16 text-sm">
              没有匹配的词条，试试其他关键词。
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function FilterChip({
  active,
  label,
  color,
  onClick,
}: {
  active: boolean
  label: string
  color?: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-[11px] px-2.5 py-1 rounded-full border transition-colors ${
        active
          ? 'text-white border-transparent'
          : 'text-[#8b8ba0] border-white/10 hover:border-white/20 hover:text-white'
      }`}
      style={
        active
          ? {
              background: (color ?? '#7c6cff') + '33',
              borderColor: (color ?? '#7c6cff') + '66',
              color: color ?? '#c4b5fd',
            }
          : undefined
      }
    >
      {label}
    </button>
  )
}
