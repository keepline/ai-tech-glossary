import { useCallback, useState } from 'react'
import Header, { type ViewMode } from './components/Header'
import GraphView from './components/GraphView'
import ListView from './components/ListView'
import DetailPanel from './components/DetailPanel'
import { terms } from './data/terms'

export default function App() {
  const [view, setView] = useState<ViewMode>('graph')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)

  const handleSelect = useCallback((id: string | null) => {
    setSelectedId(id)
  }, [])

  return (
    <div className="app-bg h-full flex flex-col overflow-hidden">
      <Header
        view={view}
        onViewChange={setView}
        categoryFilter={categoryFilter}
        onCategoryFilter={setCategoryFilter}
        termCount={terms.length}
      />

      <main className="relative flex-1 min-h-0">
        {view === 'graph' ? (
          <GraphView
            selectedId={selectedId}
            onSelect={handleSelect}
            categoryFilter={categoryFilter}
          />
        ) : (
          <ListView
            selectedId={selectedId}
            onSelect={(id) => handleSelect(id)}
            categoryFilter={categoryFilter}
            onCategoryFilter={setCategoryFilter}
          />
        )}

        <DetailPanel
          termId={selectedId}
          onClose={() => setSelectedId(null)}
          onSelect={(id) => setSelectedId(id)}
        />
      </main>

      <footer className="relative z-10 shrink-0 px-4 py-2 text-center text-[10px] text-[#4a4a5c] border-t border-white/4">
        独立梳理的行业技术术语参考 · 不隶属任何公司或产品 · 仅供学习交流
      </footer>
    </div>
  )
}
