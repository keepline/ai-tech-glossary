import type { Edge, Term } from '../types'

export const terms: Term[] = [
  // ── 模型架构 ──────────────────────────────────────────
  {
    id: 'transformer',
    en: 'Transformer',
    zh: 'Transformer 架构',
    category: '模型架构',
    explanation:
      '基于自注意力机制的序列建模架构，通过并行计算全局依赖关系取代了循环网络。几乎所有当代大语言模型都以 Transformer 解码器（或其变体）为核心骨架。',
    whyItMatters:
      '它是当前 AI 浪潮的底层范式；理解注意力、位置编码与规模定律，是读懂后续几乎所有术语的前提。',
    yearHint: '2017→至今',
  },
  {
    id: 'moe',
    en: 'MoE',
    zh: '混合专家模型',
    category: '模型架构',
    explanation:
      'Mixture of Experts：把前馈层拆成多个「专家」子网络，由门控网络按 token 路由，每次只激活少数专家。从而在总参数量很大时保持单次前向的计算量可控。',
    whyItMatters:
      '是 2024–2026 开源与闭源旗舰模型扩大规模的主流路线，直接影响训练吞吐与推理成本结构。',
    yearHint: '2024–2026 主流',
  },
  {
    id: 'mamba',
    en: 'Mamba / SSM',
    zh: '状态空间模型',
    category: '模型架构',
    explanation:
      '一类基于选择性状态空间（Selective SSM）的序列模型，以近线性复杂度处理超长上下文，并在部分任务上挑战 Transformer 的主导地位。常与注意力层混合组成混合架构。',
    whyItMatters:
      '为超长上下文与高效推理提供了注意力之外的可行路径，推动「混合骨干」成为新常态。',
    yearHint: '2024+',
  },
  {
    id: 'dit',
    en: 'DiT',
    zh: 'Diffusion Transformer',
    category: '模型架构',
    explanation:
      '用 Transformer 替换传统 U-Net 作为扩散模型去噪骨干的架构。缩放规律更清晰，已成为文生图 / 文生视频主流方案的基础。',
    whyItMatters:
      '把语言模型的扩展经验迁移到生成式视觉，是 Sora 类视频模型与开源图像模型的共同底座。',
    yearHint: '2023–2026',
  },
  {
    id: 'gqa-mqa',
    en: 'GQA / MQA',
    zh: '分组/多查询注意力',
    category: '模型架构',
    explanation:
      'Grouped / Multi-Query Attention：让多个查询头共享同一组键值头，大幅压缩 KV Cache 体积，同时尽量保留多头注意力的表达力。',
    whyItMatters:
      '长上下文推理的「内存税」主要来自 KV Cache；GQA/MQA 是几乎所有量产 LLM 的默认配置。',
  },
  {
    id: 'rope',
    en: 'RoPE',
    zh: '旋转位置编码',
    category: '模型架构',
    explanation:
      'Rotary Position Embedding：通过旋转矩阵把相对位置信息注入注意力，便于外推到训练长度之外，并与多种长度扩展技巧兼容。',
    whyItMatters:
      '长上下文能力高度依赖位置编码策略；RoPE 及其变体是开源模型的事实标准。',
  },
  {
    id: 'mla',
    en: 'MLA',
    zh: '多头潜在注意力',
    category: '模型架构',
    explanation:
      'Multi-head Latent Attention：将键值压缩到低维潜在向量再参与注意力，在保持质量的同时显著降低推理时的 KV 缓存占用。',
    whyItMatters:
      '代表了「架构级压缩 KV」的方向，与量化、分页注意力互补，是高效长上下文的关键拼图。',
    yearHint: '2024+',
  },

  {
    id: 'diffusion-lm',
    en: 'Diffusion LM / DLM',
    zh: '扩散语言模型',
    category: '模型架构',
    explanation:
      '用迭代去噪/解掩码并行生成多 token 的语言模型范式，与从左到右自回归解码相对。近年在吞吐与可控生成上受关注，但仍需缩小与同规模自回归模型的质量差距并补齐推理栈。',
    whyItMatters:
      '挑战「语言必须自回归」的默认假设；与图像扩散同源思想，是并行生成与统一多模态生成的重要交叉点。近两日 HF Papers 与 arXiv 上 ALoDLM、I-DLM、Speculative Diffusion 等持续出现。',
    yearHint: '2024–2026',
  },

  // ── 训练与对齐 ────────────────────────────────────────
  {
    id: 'sft',
    en: 'SFT',
    zh: '监督微调',
    category: '训练与对齐',
    explanation:
      'Supervised Fine-Tuning：用高质量「指令–回答」对继续训练预训练模型，使其遵循指令格式并习得特定技能与风格。是对齐流水线的第一步。',
    whyItMatters:
      '没有良好的 SFT 数据，后续 RLHF/DPO 很难「矫正」出可用助手行为；数据质量往往比算法更关键。',
  },
  {
    id: 'rlhf',
    en: 'RLHF',
    zh: '基于人类反馈的强化学习',
    category: '训练与对齐',
    explanation:
      '先训练奖励模型拟合人类偏好，再用 PPO 等强化学习算法优化策略模型，使其生成更符合偏好的回答。经典对齐路径，成本与稳定性要求较高。',
    whyItMatters:
      '塑造了 ChatGPT 时代「有用、诚实、无害」的交互范式，至今仍是闭源旗舰对齐的重要组成部分。',
  },
  {
    id: 'dpo',
    en: 'DPO',
    zh: '直接偏好优化',
    category: '训练与对齐',
    explanation:
      'Direct Preference Optimization：把偏好对齐重新表述为分类损失，直接在偏好对上优化策略，无需显式奖励模型与在线采样 RL。实现更简单、更稳定。',
    whyItMatters:
      '大幅降低了开源社区做偏好对齐的门槛，成为 2024–2026 最常用的对齐配方之一。',
    yearHint: '2023–2026',
  },
  {
    id: 'grpo',
    en: 'GRPO',
    zh: '组相对策略优化',
    category: '训练与对齐',
    explanation:
      'Group Relative Policy Optimization：对同一提示采样一组回答，用组内相对得分估计优势，减少对独立价值网络的依赖。广泛用于推理型模型的强化学习训练。',
    whyItMatters:
      '是「推理模型 / o1 风格」训练浪潮中的代表性算法变体，连接了可验证奖励与长链推理。',
    yearHint: '2024–2025',
  },
  {
    id: 'lora',
    en: 'LoRA / QLoRA',
    zh: '低秩适配微调',
    category: '训练与对齐',
    explanation:
      '在冻结的预训练权重旁插入可训练的低秩矩阵；QLoRA 再结合 4-bit 量化底座，使消费级显卡也能微调大模型。',
    whyItMatters:
      '把「定制模型」从实验室能力变成工程日常，是企业私有化与垂直微调的默认手段。',
  },
  {
    id: 'cot',
    en: 'CoT / ToT',
    zh: '思维链 / 思维树',
    category: '训练与对齐',
    explanation:
      'Chain-of-Thought 引导模型逐步推理；Tree-of-Thought 进一步在多条推理路径上搜索与回溯。既可作为提示策略，也可作为训练目标。',
    whyItMatters:
      '复杂推理能力的关键杠杆；也直接催生了「推理模型」与过程监督等后续方向。',
  },
  {
    id: 'process-reward',
    en: 'Process Reward',
    zh: '过程奖励模型',
    category: '训练与对齐',
    explanation:
      '不只评估最终答案，还对推理中间步骤打分，提供更稠密的训练信号，缓解稀疏奖励下的探索困难。',
    whyItMatters:
      '对数学、代码等可分解任务尤为关键，是提升推理可靠性的重要对齐手段。',
  },

  {
    id: 'sleep-framework',
    en: 'Sleep Framework',
    zh: '睡眠式持续学习',
    category: '训练与对齐',
    explanation:
      'Google Research 提出的持续学习范式：在「清醒」阶段用短时记忆交互，在离线「睡眠」阶段做记忆巩固（向扩展的低秩 MoE 参数蒸馏）与「做梦」式自改进（随机专家合成数据 + RL 精炼），缓解灾难性遗忘并吸收新知识。',
    whyItMatters:
      '挑战「预训练后静态冻结」假设，把参数更新与上下文学习接到同一生命周期；2026-10-27 公开后迅速成为持续学习与长上下文参数化记忆的讨论焦点。',
    yearHint: '2026',
  },

  // ── 推理与效率 ────────────────────────────────────────
  {
    id: 'speculative-decoding',
    en: 'Speculative Decoding',
    zh: '推测解码',
    category: '推理与效率',
    explanation:
      '用小草稿模型快速提出候选 token 序列，再由大模型并行验证接受或拒绝，在保证输出分布不变的前提下加速自回归生成。',
    whyItMatters:
      '是生产级 LLM 服务延迟优化的「免费午餐」之一，几乎不牺牲质量即可提升吞吐；草稿侧已从自回归小模型扩展到并行/块草稿（EAGLE、扩散与 flow-map 等）。',
  },
  {
    id: 'flashmap',
    en: 'FlashMap',
    zh: '流映射推测解码',
    category: '推理与效率',
    explanation:
      'Flow Map Speculative Decoding：用连续流映射（flow map）草稿模型一次前向生成整块候选 token，再由目标大模型并行验证。相对自回归草稿更省算力，相对块扩散草稿（如 DFlash）能保留块内 token 依赖，减少「各位置独立预测」导致的联合不一致。',
    whyItMatters:
      '把流匹配思想接到无损推测解码；2026-10 开源权重与 vLLM/SGLang 插件后，成为并行草稿路线的新标杆之一，直接影响推理延迟与服务成本。',
    yearHint: '2026',
  },
  {
    id: 'paged-attention',
    en: 'PagedAttention',
    zh: '分页注意力',
    category: '推理与效率',
    explanation:
      '把 KV Cache 按页管理（类似操作系统虚拟内存），消除连续分配造成的显存碎片，显著提高批处理并发度。',
    whyItMatters:
      'vLLM 等引擎的核心创新，直接决定了同卡能同时服务多少请求。',
    yearHint: '2023+',
  },
  {
    id: 'kv-cache',
    en: 'KV Cache',
    zh: '键值缓存',
    category: '推理与效率',
    explanation:
      '缓存已生成 token 的注意力键与值，避免逐步解码时重复计算。是自回归推理的内存与带宽瓶颈所在。',
    whyItMatters:
      '几乎所有推理优化（量化、分页、MLA、前缀缓存）都围绕如何缩小或复用 KV Cache。',
  },
  {
    id: 'gptq-awq',
    en: 'GPTQ / AWQ',
    zh: '权重量化（GPTQ/AWQ）',
    category: '推理与效率',
    explanation:
      '训练后权重量化方法：GPTQ 用二阶信息做逐层校准；AWQ 保护激活显著的通道。常把模型压到 4-bit 以降低显存与带宽压力。',
    whyItMatters:
      '让更大模型跑进更小硬件，是本地部署与边缘推理的关键使能技术。',
  },
  {
    id: 'gguf',
    en: 'GGUF',
    zh: 'GGUF 模型格式',
    category: '推理与效率',
    explanation:
      '面向 llama.cpp 生态的单文件模型格式，内嵌多种量化方案与元数据，便于跨平台本地推理与分发。',
    whyItMatters:
      '成为消费级本地跑模型的事实分发标准，极大降低了「自己跑大模型」的门槛。',
  },
  {
    id: 'flash-attention',
    en: 'FlashAttention',
    zh: 'FlashAttention',
    category: '推理与效率',
    explanation:
      '通过分块与 IO 感知的算法重构注意力计算，减少 HBM 读写，在精确注意力下大幅加速并降低显存占用。',
    whyItMatters:
      '训练与推理的基础设施级优化，几乎成为现代 Transformer 实现的默认内核。',
  },
  {
    id: 'continuous-batching',
    en: 'Continuous Batching',
    zh: '连续批处理',
    category: '推理与效率',
    explanation:
      '不等整批请求一起结束，而是在 token 粒度动态插入/移除请求，最大化 GPU 利用率。',
    whyItMatters:
      '与 PagedAttention 一起构成现代 LLM 服务引擎的吞吐基石。',
  },

  // ── RAG与记忆 ─────────────────────────────────────────
  {
    id: 'rag',
    en: 'RAG',
    zh: '检索增强生成',
    category: 'RAG与记忆',
    explanation:
      'Retrieval-Augmented Generation：先从外部知识库检索相关片段，再一并喂给模型生成回答，以降低幻觉并接入私有/时效数据。',
    whyItMatters:
      '企业落地 LLM 最常见的架构模式；决定了「模型知识」与「业务知识」如何协同。',
  },
  {
    id: 'graphrag',
    en: 'GraphRAG',
    zh: '图谱增强检索',
    category: 'RAG与记忆',
    explanation:
      '在文档之上构建实体关系图谱，支持多跳推理与社区摘要，改善传统向量检索对全局结构问题的乏力。',
    whyItMatters:
      '把 RAG 从「找相似段落」推进到「理解知识结构」，适合复杂调研与知识密集型问答。',
    yearHint: '2024+',
  },
  {
    id: 'embedding',
    en: 'Embedding Model',
    zh: '向量嵌入模型',
    category: 'RAG与记忆',
    explanation:
      '把文本（或图文）映射到稠密向量空间，使语义相近的内容在距离上靠近，是向量检索的基础。',
    whyItMatters:
      'RAG 质量的天花板很大程度由嵌入模型与分块策略决定，而非仅由生成模型决定。',
  },
  {
    id: 'vector-db',
    en: 'Vector Database',
    zh: '向量数据库',
    category: 'RAG与记忆',
    explanation:
      '专为高维向量近似最近邻搜索设计的存储与索引系统，支持过滤、混合检索与大规模召回。',
    whyItMatters:
      'RAG 与语义搜索的生产基础设施；选型影响延迟、召回率与运维成本。',
  },
  {
    id: 'long-context',
    en: 'Long Context',
    zh: '长上下文',
    category: 'RAG与记忆',
    explanation:
      '把可处理上下文窗口扩展到数十万甚至百万 token，使「把资料直接塞进提示」成为部分场景下 RAG 的替代或补充。',
    whyItMatters:
      '改变了应用架构选择：何时用检索、何时用全量上下文、何时两者混合。',
  },
  {
    id: 'memory-agent',
    en: 'Agent Memory',
    zh: 'Agent 记忆系统',
    category: 'RAG与记忆',
    explanation:
      '为 Agent 设计的短期工作记忆与长期持久记忆（摘要、向量库、结构化档案），使其跨会话保持一致性与个性化。',
    whyItMatters:
      '没有可靠记忆，Agent 很难从「单次工具调用」进化为「可持续助手」。',
  },

  // ── Agent与工具 ───────────────────────────────────────
  {
    id: 'react-agent',
    en: 'ReAct',
    zh: '推理–行动循环',
    category: 'Agent与工具',
    explanation:
      'Reasoning + Acting：让模型交替生成思考轨迹与工具调用，根据观察结果再规划下一步，形成可审计的决策循环。',
    whyItMatters:
      '奠定了工具调用 Agent 的基本交互范式，影响了后续几乎所有 Agent 框架的设计。',
  },
  {
    id: 'tool-calling',
    en: 'Tool Calling / Function Calling',
    zh: '工具调用',
    category: 'Agent与工具',
    explanation:
      '模型按约定 schema 输出函数名与参数，由运行时执行真实 API/代码后再把结果回注上下文，实现与外部世界的接口。',
    whyItMatters:
      '把 LLM 从「只会聊天」变成「能办事」的关键能力，是 Agent 产品化的前提。',
  },
  {
    id: 'mcp',
    en: 'MCP',
    zh: '模型上下文协议',
    category: 'Agent与工具',
    explanation:
      'Model Context Protocol：一种开放协议，标准化 AI 应用如何连接工具、数据源与上下文资源，降低「每个应用各写一套插件」的碎片化。',
    whyItMatters:
      '推动工具生态从专有插件走向可互换的标准接口，是 2025–2026 Agent 基建的热词。',
    yearHint: '2024–2026',
  },
  {
    id: 'computer-use',
    en: 'Computer-Use Agent',
    zh: '计算机操作 Agent',
    category: 'Agent与工具',
    explanation:
      '能看屏幕、控制鼠标键盘或 DOM，在真实桌面/浏览器中完成多步任务的 Agent。把 GUI 本身当作「通用工具接口」。',
    whyItMatters:
      '绕过「没有 API 就无法自动化」的限制，代表 Agent 能力边界的一次显著外扩。',
    yearHint: '2024–2026',
  },
  {
    id: 'multi-agent',
    en: 'Multi-Agent',
    zh: '多智能体协作',
    category: 'Agent与工具',
    explanation:
      '将任务拆给多个具有不同角色的 Agent（规划、执行、审查等）协作完成，通过消息传递或共享状态协调。',
    whyItMatters:
      '复杂工作流的组织方式；也带来编排、信任边界与成本控制等新工程问题。',
  },
  {
    id: 'a2a',
    en: 'A2A',
    zh: 'Agent 间通信协议',
    category: 'Agent与工具',
    explanation:
      'Agent-to-Agent 类协议探索不同厂商/框架的 Agent 如何互相发现、委派任务与交换结果，目标是跨系统协作。',
    whyItMatters:
      '与 MCP 互补：MCP 侧重连工具与数据，A2A 侧重 Agent 彼此协作的标准化。',
    yearHint: '2025+',
  },

  {
    id: 'agent-harness',
    en: 'Agent Harness',
    zh: 'Agent 运行时壳层',
    category: 'Agent与工具',
    explanation:
      '围绕基础模型的执行脚手架：工具路由、状态/记忆、权限与安全哨兵、子 Agent 编排、校验与重试等运行时组件。模型负责推理，Harness 负责把推理落到可靠、可审计的多步执行。',
    whyItMatters:
      '2025–2026 业界共识「模型能力只是一半，另一半是 Harness」；Harness²、Work Agents 等近期工作把它推成独立技术层，与 MCP/A2A 共同构成 Agent 工程栈。',
    yearHint: '2025–2026',
  },

  // ── 多模态 ────────────────────────────────────────────
  {
    id: 'vlm',
    en: 'VLM',
    zh: '视觉语言模型',
    category: '多模态',
    explanation:
      'Vision-Language Model：联合建模图像与文本，支持看图问答、OCR、UI 理解与图文生成等。通常由视觉编码器 + 投影层 + 语言模型组成。',
    whyItMatters:
      '是文档智能、GUI Agent、多模态助手的核心模型形态，2024 后迅速成为标配能力。',
  },
  {
    id: 'vla',
    en: 'VLA',
    zh: '视觉-语言-动作模型',
    category: '多模态',
    explanation:
      'Vision-Language-Action：在视觉-语言模型之上直接输出机器人控制动作（或动作专家头），把感知、指令理解与控制策略端到端（或近端到端）打通。常与世界模型、模仿学习与真机评测配套。',
    whyItMatters:
      '具身智能从「会看会说」走向「会做」的主流范式；OpenVLA / π0 等开源线与大量 2025–2026 论文把它推到工业与学术前线。',
    yearHint: '2024–2026',
  },
  {
    id: 'diffusion',
    en: 'Diffusion Model',
    zh: '扩散模型',
    category: '多模态',
    explanation:
      '通过逐步去噪从噪声中生成数据的生成模型家族，在图像、音频、视频合成上取得主导地位；常与 DiT、流匹配等变体结合。',
    whyItMatters:
      '定义了当代生成式媒体的技术底座，并持续向实时与可控生成演进。',
  },
  {
    id: 'flow-matching',
    en: 'Flow Matching',
    zh: '流匹配',
    category: '多模态',
    explanation:
      '学习从噪声分布到数据分布的连续流（常比经典扩散采样步数更少），成为新一代图像/视频生成模型的训练范式之一。',
    whyItMatters:
      '在质量与采样效率之间提供了新的帕累托前沿，影响 2025+ 生成模型设计。',
    yearHint: '2024–2026',
  },
  {
    id: 'whisper-asr',
    en: 'ASR / TTS',
    zh: '语音识别与合成',
    category: '多模态',
    explanation:
      '语音转文本（ASR）与文本转语音（TTS）构成语音交互两端；大模型时代二者常与 LLM 串联成端到端语音助手。',
    whyItMatters:
      '语音成为与文本、图像并列的一等交互模态，直接影响产品形态与延迟预算。',
  },
  {
    id: 'omni-model',
    en: 'Omni / Any-to-Any',
    zh: '全能多模态模型',
    category: '多模态',
    explanation:
      '追求在单一模型中理解与生成文本、图像、音频乃至视频的任意组合，统一 tokenizer 或模态专家路由。',
    whyItMatters:
      '代表多模态从「外挂编码器」走向「原生统一」的产品与研究方向。',
    yearHint: '2024–2026',
  },

  // ── 评测与安全 ────────────────────────────────────────
  {
    id: 'llm-judge',
    en: 'LLM-as-Judge',
    zh: '用 LLM 当评委',
    category: '评测与安全',
    explanation:
      '用强模型对其他模型输出打分或偏好比较，以近似人类评估。成本低、可扩展，但存在位置偏见与自我偏好等偏差。',
    whyItMatters:
      '已成为研发迭代的默认评估手段之一；也迫使社区更认真对待评测可信度。',
  },
  {
    id: 'arena-eval',
    en: 'Arena / Elo Eval',
    zh: '竞技场对战评测',
    category: '评测与安全',
    explanation:
      '让匿名模型两两对战，由人类（或模型）投票，用 Elo 等评分汇总相对强弱。比单一静态基准更贴近真实使用偏好。',
    whyItMatters:
      '改变了「刷榜」叙事，成为公众与业界感知模型实力的重要参考。',
  },
  {
    id: 'benchmarks',
    en: 'Benchmarks',
    zh: '能力基准测试',
    category: '评测与安全',
    explanation:
      'MMLU、GPQA、SWE-bench、τ-bench 等标准化数据集，用于量化知识、推理、编程与工具使用等能力，但也面临污染与饱和问题。',
    whyItMatters:
      '没有可信基准就无法比较进步；同时过拟合基准会扭曲研发方向。',
  },
  {
    id: 'red-teaming',
    en: 'Red Teaming',
    zh: '红队测试',
    category: '评测与安全',
    explanation:
      '主动攻击模型与系统，挖掘越狱、有害内容、提示注入与工具滥用等漏洞，再反馈到防护与对齐流程。',
    whyItMatters:
      '安全不是一次性过滤，而是持续对抗过程；Agent 与工具调用放大了攻击面。',
  },
  {
    id: 'prompt-injection',
    en: 'Prompt Injection',
    zh: '提示注入',
    category: '评测与安全',
    explanation:
      '攻击者在用户输入或外部检索内容中嵌入指令，试图覆盖系统提示、窃取数据或诱导危险工具调用。',
    whyItMatters:
      'RAG 与 Agent 系统最现实的安全风险之一，直接关系生产部署可否上线。',
  },
  {
    id: 'guardrails',
    en: 'Guardrails',
    zh: '护栏与安全层',
    category: '评测与安全',
    explanation:
      '在模型前后增加分类器、规则引擎与策略层，做输入过滤、输出审核与工具权限控制，形成纵深防御。',
    whyItMatters:
      '把对齐从「只靠模型内化」扩展为可运维的系统工程。',
  },

  // ── 基础设施与部署 ────────────────────────────────────
  {
    id: 'vllm',
    en: 'vLLM',
    zh: 'vLLM 推理引擎',
    category: '基础设施与部署',
    explanation:
      '高吞吐 LLM 服务引擎，以 PagedAttention、连续批处理等技术著称，广泛用于生产推理与实验平台。',
    whyItMatters:
      '开源推理栈的标杆实现之一，深刻影响了后续引擎的 API 与性能目标。',
  },
  {
    id: 'inference-engine',
    en: 'Inference Engine',
    zh: '推理引擎',
    category: '基础设施与部署',
    explanation:
      'TensorRT-LLM、TGI、llama.cpp、SGLang 等负责模型加载、批调度、内核执行与流式输出的运行时总称。',
    whyItMatters:
      '同样的权重，引擎差异可带来数倍延迟/吞吐差距，是成本结构的核心。',
  },
  {
    id: 'cuda-gpu',
    en: 'GPU / CUDA Stack',
    zh: 'GPU 与 CUDA 生态',
    category: '基础设施与部署',
    explanation:
      '以 GPU 加速器与 CUDA（及兼容软件栈）为中心的训练/推理硬件软件生态，包括通信库、算子与集群调度。',
    whyItMatters:
      '算力供给与利用率决定模型迭代速度；软硬件协同优化是行业瓶颈。',
  },
  {
    id: 'distributed-train',
    en: 'Distributed Training',
    zh: '分布式训练',
    category: '基础设施与部署',
    explanation:
      '数据并行、张量并行、流水线并行与 ZeRO 等策略，把大模型训练切分到多卡多机，并管理通信与容错。',
    whyItMatters:
      '没有高效并行，就无法训练当今规模的基础模型；也是 MoE 落地的必要条件。',
  },
  {
    id: 'serving-gateway',
    en: 'API Gateway / Serving',
    zh: '模型服务与网关',
    category: '基础设施与部署',
    explanation:
      '统一鉴权、限流、路由、多模型灰度与可观测性的服务层，把推理引擎包装成稳定的产品 API。',
    whyItMatters:
      '企业从「跑通 demo」到「可靠服务」的必经之路，直接影响 SLA 与成本治理。',
  },
  {
    id: 'mlops-llmops',
    en: 'LLMOps',
    zh: '大模型运维',
    category: '基础设施与部署',
    explanation:
      '面向 LLM 应用的数据飞轮、提示/版本管理、评测回归、监控漂移与反馈闭环等工程实践。',
    whyItMatters:
      '模型能力只是起点；持续交付与质量运营决定产品能否长期可用。',
  },
]

export const edges: Edge[] = [
  // 架构内部
  { source: 'moe', target: 'transformer', type: 'evolved-from' },
  { source: 'mamba', target: 'transformer', type: 'alternative-to' },
  { source: 'gqa-mqa', target: 'transformer', type: 'part-of' },
  { source: 'rope', target: 'transformer', type: 'part-of' },
  { source: 'mla', target: 'transformer', type: 'evolved-from' },
  { source: 'mla', target: 'kv-cache', type: 'enables' },
  { source: 'dit', target: 'transformer', type: 'stacks-with' },
  { source: 'dit', target: 'diffusion', type: 'part-of' },
  { source: 'diffusion-lm', target: 'diffusion', type: 'evolved-from' },
  { source: 'diffusion-lm', target: 'transformer', type: 'alternative-to' },
  { source: 'diffusion-lm', target: 'speculative-decoding', type: 'stacks-with' },

  // 训练链路
  { source: 'sft', target: 'transformer', type: 'stacks-with' },
  { source: 'rlhf', target: 'sft', type: 'evolved-from' },
  { source: 'dpo', target: 'rlhf', type: 'alternative-to' },
  { source: 'grpo', target: 'rlhf', type: 'evolved-from' },
  { source: 'lora', target: 'sft', type: 'stacks-with' },
  { source: 'cot', target: 'sft', type: 'stacks-with' },
  { source: 'process-reward', target: 'rlhf', type: 'stacks-with' },
  { source: 'process-reward', target: 'grpo', type: 'stacks-with' },
  { source: 'grpo', target: 'cot', type: 'enables' },
  { source: 'sleep-framework', target: 'moe', type: 'stacks-with' },
  { source: 'sleep-framework', target: 'memory-agent', type: 'alternative-to' },
  { source: 'sleep-framework', target: 'grpo', type: 'stacks-with' },
  { source: 'sleep-framework', target: 'long-context', type: 'enables' },

  // 推理效率
  { source: 'paged-attention', target: 'kv-cache', type: 'enables' },
  { source: 'speculative-decoding', target: 'kv-cache', type: 'stacks-with' },
  { source: 'gqa-mqa', target: 'kv-cache', type: 'enables' },
  { source: 'flash-attention', target: 'transformer', type: 'enables' },
  { source: 'gptq-awq', target: 'gguf', type: 'stacks-with' },
  { source: 'continuous-batching', target: 'paged-attention', type: 'stacks-with' },
  { source: 'vllm', target: 'paged-attention', type: 'part-of' },
  { source: 'vllm', target: 'continuous-batching', type: 'part-of' },
  { source: 'inference-engine', target: 'vllm', type: 'evolved-from' },
  { source: 'gguf', target: 'inference-engine', type: 'stacks-with' },
  { source: 'gptq-awq', target: 'inference-engine', type: 'stacks-with' },
  { source: 'speculative-decoding', target: 'inference-engine', type: 'part-of' },
  { source: 'flashmap', target: 'speculative-decoding', type: 'evolved-from' },
  { source: 'flashmap', target: 'flow-matching', type: 'stacks-with' },
  { source: 'flashmap', target: 'diffusion-lm', type: 'alternative-to' },
  { source: 'flashmap', target: 'vllm', type: 'stacks-with' },
  { source: 'flashmap', target: 'inference-engine', type: 'part-of' },

  // RAG
  { source: 'rag', target: 'embedding', type: 'part-of' },
  { source: 'rag', target: 'vector-db', type: 'stacks-with' },
  { source: 'graphrag', target: 'rag', type: 'evolved-from' },
  { source: 'long-context', target: 'rag', type: 'alternative-to' },
  { source: 'long-context', target: 'rope', type: 'stacks-with' },
  { source: 'memory-agent', target: 'rag', type: 'stacks-with' },
  { source: 'memory-agent', target: 'react-agent', type: 'stacks-with' },

  // Agent
  { source: 'react-agent', target: 'tool-calling', type: 'part-of' },
  { source: 'tool-calling', target: 'mcp', type: 'stacks-with' },
  { source: 'computer-use', target: 'vlm', type: 'stacks-with' },
  { source: 'computer-use', target: 'react-agent', type: 'evolved-from' },
  { source: 'multi-agent', target: 'react-agent', type: 'evolved-from' },
  { source: 'a2a', target: 'multi-agent', type: 'enables' },
  { source: 'a2a', target: 'mcp', type: 'stacks-with' },
  { source: 'mcp', target: 'tool-calling', type: 'enables' },
  { source: 'agent-harness', target: 'react-agent', type: 'stacks-with' },
  { source: 'agent-harness', target: 'multi-agent', type: 'stacks-with' },
  { source: 'agent-harness', target: 'tool-calling', type: 'part-of' },
  { source: 'agent-harness', target: 'computer-use', type: 'stacks-with' },
  { source: 'agent-harness', target: 'mcp', type: 'stacks-with' },

  // 多模态
  { source: 'vlm', target: 'transformer', type: 'stacks-with' },
  { source: 'diffusion', target: 'flow-matching', type: 'alternative-to' },
  { source: 'omni-model', target: 'vlm', type: 'evolved-from' },
  { source: 'omni-model', target: 'whisper-asr', type: 'stacks-with' },
  { source: 'computer-use', target: 'omni-model', type: 'stacks-with' },
  { source: 'vla', target: 'vlm', type: 'evolved-from' },
  { source: 'vla', target: 'computer-use', type: 'stacks-with' },
  { source: 'vla', target: 'omni-model', type: 'stacks-with' },

  // 评测安全
  { source: 'llm-judge', target: 'arena-eval', type: 'stacks-with' },
  { source: 'arena-eval', target: 'benchmarks', type: 'alternative-to' },
  { source: 'red-teaming', target: 'guardrails', type: 'enables' },
  { source: 'prompt-injection', target: 'rag', type: 'stacks-with' },
  { source: 'prompt-injection', target: 'tool-calling', type: 'stacks-with' },
  { source: 'guardrails', target: 'prompt-injection', type: 'enables' },
  { source: 'llm-judge', target: 'benchmarks', type: 'stacks-with' },

  // 基建
  { source: 'distributed-train', target: 'moe', type: 'enables' },
  { source: 'distributed-train', target: 'cuda-gpu', type: 'stacks-with' },
  { source: 'inference-engine', target: 'cuda-gpu', type: 'stacks-with' },
  { source: 'serving-gateway', target: 'inference-engine', type: 'stacks-with' },
  { source: 'mlops-llmops', target: 'serving-gateway', type: 'stacks-with' },
  { source: 'mlops-llmops', target: 'llm-judge', type: 'stacks-with' },
  { source: 'vllm', target: 'inference-engine', type: 'part-of' },
]

export function getTermById(id: string): Term | undefined {
  return terms.find((t) => t.id === id)
}

export function getRelated(
  id: string,
): { term: Term; type: Edge['type']; direction: 'in' | 'out' }[] {
  const result: { term: Term; type: Edge['type']; direction: 'in' | 'out' }[] =
    []
  for (const e of edges) {
    if (e.source === id) {
      const t = getTermById(e.target)
      if (t) result.push({ term: t, type: e.type, direction: 'out' })
    } else if (e.target === id) {
      const t = getTermById(e.source)
      if (t) result.push({ term: t, type: e.type, direction: 'in' })
    }
  }
  return result
}
