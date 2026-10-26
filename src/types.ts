export type Category =
  | '模型架构'
  | '训练与对齐'
  | '推理与效率'
  | 'RAG与记忆'
  | 'Agent与工具'
  | '多模态'
  | '评测与安全'
  | '基础设施与部署'

export type RelationType =
  | 'enables'
  | 'part-of'
  | 'alternative-to'
  | 'stacks-with'
  | 'evolved-from'

export interface Term {
  id: string
  en: string
  zh: string
  category: Category
  explanation: string
  whyItMatters: string
  yearHint?: string
}

export interface Edge {
  source: string
  target: string
  type: RelationType
}

export const CATEGORY_META: Record<
  Category,
  { color: string; glow: string; short: string }
> = {
  模型架构: { color: '#7c6cff', glow: 'rgba(124,108,255,0.35)', short: '架构' },
  训练与对齐: { color: '#f472b6', glow: 'rgba(244,114,182,0.35)', short: '训练' },
  推理与效率: { color: '#22d3ee', glow: 'rgba(34,211,238,0.35)', short: '推理' },
  RAG与记忆: { color: '#34d399', glow: 'rgba(52,211,153,0.35)', short: 'RAG' },
  Agent与工具: { color: '#fbbf24', glow: 'rgba(251,191,36,0.35)', short: 'Agent' },
  多模态: { color: '#fb7185', glow: 'rgba(251,113,133,0.35)', short: '多模态' },
  评测与安全: { color: '#a78bfa', glow: 'rgba(167,139,250,0.35)', short: '评测' },
  基础设施与部署: { color: '#60a5fa', glow: 'rgba(96,165,250,0.35)', short: '基建' },
}

export const RELATION_META: Record<
  RelationType,
  { zh: string; color: string }
> = {
  enables: { zh: '赋能', color: '#22d3ee' },
  'part-of': { zh: '组成', color: '#a78bfa' },
  'alternative-to': { zh: '替代', color: '#fbbf24' },
  'stacks-with': { zh: '组合', color: '#34d399' },
  'evolved-from': { zh: '演进自', color: '#f472b6' },
}

export const CATEGORIES = Object.keys(CATEGORY_META) as Category[]
