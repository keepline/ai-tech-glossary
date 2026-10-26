import { motion, AnimatePresence } from 'framer-motion'
import {
  CATEGORY_META,
  RELATION_META,
  type RelationType,
} from '../types'
import { getRelated, getTermById } from '../data/terms'

interface Props {
  termId: string | null
  onClose: () => void
  onSelect: (id: string) => void
}

export default function DetailPanel({ termId, onClose, onSelect }: Props) {
  const term = termId ? getTermById(termId) : null
  const related = termId ? getRelated(termId) : []

  return (
    <AnimatePresence>
      {term && (
        <motion.aside
          key={term.id}
          initial={{ x: 28, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 28, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
          className="glass-strong absolute right-3 top-3 bottom-3 z-30 w-[min(100%-1.5rem,380px)] rounded-2xl overflow-hidden flex flex-col shadow-2xl shadow-black/40"
        >
          <div
            className="h-1.5 w-full shrink-0"
            style={{
              background: `linear-gradient(90deg, ${CATEGORY_META[term.category].color}, ${CATEGORY_META[term.category].color}44)`,
            }}
          />
          <div className="flex items-start justify-between gap-3 p-5 pb-3">
            <div className="min-w-0">
              <div
                className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2 py-0.5 rounded-full mb-2"
                style={{
                  color: CATEGORY_META[term.category].color,
                  background: CATEGORY_META[term.category].color + '22',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: CATEGORY_META[term.category].color }}
                />
                {term.category}
              </div>
              <h2 className="text-xl font-bold tracking-tight text-white truncate">
                {term.en}
              </h2>
              <p className="text-sm text-[#a0a0b8] mt-0.5">{term.zh}</p>
              {term.yearHint && (
                <p className="text-[11px] font-mono text-[#6b6b80] mt-1.5">
                  {term.yearHint}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-[#8b8ba0] hover:text-white hover:bg-white/8 transition-colors"
              aria-label="关闭"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 pb-5 space-y-5">
            <section>
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[#6b6b80] mb-2">
                解读
              </h3>
              <p className="text-[13.5px] leading-relaxed text-[#d0d0e0]">
                {term.explanation}
              </p>
            </section>

            <section>
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[#6b6b80] mb-2">
                为何重要
              </h3>
              <p className="text-[13.5px] leading-relaxed text-[#d0d0e0]">
                {term.whyItMatters}
              </p>
            </section>

            {related.length > 0 && (
              <section>
                <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[#6b6b80] mb-2">
                  相关词条 · {related.length}
                </h3>
                <ul className="space-y-1.5">
                  {related.map(({ term: r, type, direction }) => (
                    <li key={`${r.id}-${type}-${direction}`}>
                      <button
                        type="button"
                        onClick={() => onSelect(r.id)}
                        className="w-full text-left rounded-xl px-3 py-2.5 hover:bg-white/5 border border-transparent hover:border-white/8 transition-colors group"
                      >
                        <div className="flex items-center gap-2 mb-0.5">
                          <span
                            className="text-[10px] font-medium px-1.5 py-0.5 rounded"
                            style={{
                              color: RELATION_META[type as RelationType].color,
                              background:
                                RELATION_META[type as RelationType].color + '22',
                            }}
                          >
                            {direction === 'out' ? '→' : '←'}{' '}
                            {RELATION_META[type as RelationType].zh}
                          </span>
                          <span
                            className="text-[10px] px-1.5 py-0.5 rounded"
                            style={{
                              color: CATEGORY_META[r.category].color,
                              background: CATEGORY_META[r.category].color + '18',
                            }}
                          >
                            {CATEGORY_META[r.category].short}
                          </span>
                        </div>
                        <div className="text-[13px] font-medium text-white group-hover:text-[#c4b5fd] transition-colors">
                          {r.en}
                          <span className="text-[#8b8ba0] font-normal ml-1.5">
                            {r.zh}
                          </span>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
