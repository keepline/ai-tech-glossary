import { memo } from 'react'
import type { CSSProperties } from 'react'
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react'
import { CATEGORY_META, type Category } from '../types'

export type TermNodeData = {
  label: string
  zh: string
  category: Category
  selected?: boolean
  dimmed?: boolean
}

export type TermFlowNode = Node<TermNodeData, 'term'>

function TermNodeComponent({ data, selected }: NodeProps<TermFlowNode>) {
  const meta = CATEGORY_META[data.category]
  const dimmed = Boolean(data.dimmed)
  return (
    <div
      className={`term-node relative rounded-xl pl-3.5 pr-3 py-2 min-w-[124px] max-w-[180px] cursor-pointer overflow-hidden ${
        selected ? 'selected' : ''
      } ${dimmed ? 'dimmed' : ''}`}
      style={
        {
          '--node-color': meta.color,
          '--node-glow': meta.glow,
          background: `linear-gradient(145deg, ${meta.color}28, rgba(12,12,20,0.94))`,
          border: `1.5px solid ${selected ? meta.color : meta.color + '88'}`,
        } as CSSProperties
      }
    >
      {/* Category accent strip */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px]"
        style={{ background: meta.color }}
        aria-hidden
      />
      <Handle
        type="target"
        position={Position.Top}
        className="!w-2 !h-2 !bg-[#c8c8d8] !border !border-[#0a0a10]"
      />
      <div
        className="text-[10px] font-semibold tracking-wide uppercase mb-0.5"
        style={{ color: meta.color }}
      >
        {meta.short}
      </div>
      <div className="text-[13px] font-bold text-white leading-tight truncate">
        {data.label}
      </div>
      <div className="text-[11.5px] text-[#b4b4c6] truncate mt-0.5 leading-snug">
        {data.zh}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-2 !h-2 !bg-[#c8c8d8] !border !border-[#0a0a10]"
      />
    </div>
  )
}

export default memo(TermNodeComponent)
