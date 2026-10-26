import { memo } from 'react'
import type { CSSProperties } from 'react'
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react'
import { CATEGORY_META, type Category } from '../types'

export type TermNodeData = {
  label: string
  zh: string
  category: Category
  selected?: boolean
}

export type TermFlowNode = Node<TermNodeData, 'term'>

function TermNodeComponent({ data, selected }: NodeProps<TermFlowNode>) {
  const meta = CATEGORY_META[data.category]
  return (
    <div
      className={`term-node rounded-xl px-3 py-2 min-w-[108px] max-w-[160px] cursor-pointer ${
        selected ? 'selected' : ''
      }`}
      style={
        {
          '--node-color': meta.color,
          '--node-glow': meta.glow,
          background: `linear-gradient(145deg, ${meta.color}22, rgba(12,12,20,0.92))`,
          border: `1px solid ${selected ? meta.color : meta.color + '55'}`,
        } as CSSProperties
      }
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!w-1.5 !h-1.5 !bg-white/30 !border-0"
      />
      <div
        className="text-[10px] font-medium tracking-wide uppercase mb-0.5"
        style={{ color: meta.color }}
      >
        {meta.short}
      </div>
      <div className="text-[13px] font-semibold text-white leading-tight truncate">
        {data.label}
      </div>
      <div className="text-[11px] text-[#8b8ba0] truncate mt-0.5">{data.zh}</div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-1.5 !h-1.5 !bg-white/30 !border-0"
      />
    </div>
  )
}

export default memo(TermNodeComponent)
