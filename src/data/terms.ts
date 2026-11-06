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
    id: 'latent-sparse-attention',
    en: 'Latent Sparse Attention',
    zh: '潜在稀疏注意力',
    category: '模型架构',
    explanation:
      'Latent Sparse Attention：在学习到的潜在空间对 key 做层次聚类，以亚二次复杂度支撑超长上下文（报道可达约 1000 万 token）。蒸馏变体在 Qwen/GLM 等上相对全注意力可带来大幅 prefill/decode 加速。有别于 MLA 的 KV 压缩与 GQA/MQA 的头共享，走的是潜在空间稀疏检索路径。',
    whyItMatters:
      '把「能塞进多长」与「算得起」拆开：在不退回稠密全注意力的前提下扩展上下文，是 2026 超长上下文架构的一条高信号路线，与 MLA、FlashAttention 互补而非简单替代。',
    yearHint: '2026',
  },

  {
    id: 'depthgraft',
    en: 'DepthGraft',
    zh: '层次化跨层 KV 嫁接',
    category: '模型架构',
    explanation:
      'DepthGraft：把 Transformer 按浅/中/深三段划分，浅层与中层正常算并缓存 KV，深层则用可学习通道系数、从步幅对齐的浅–中源对重构 KV。既把 KV 缓存大约压掉约三分之一并保留 prefill 早完成，又把跨层梯度做成对 KV 几何的结构性正则（arXiv 2611.03142）。在 GQA 与 MLA 上均可叠加。',
    whyItMatters:
      '跨层 KV 共享不只是「省显存」：合适的拓扑能 sharpen 检索方向并丰富 value 子空间。DepthGraft 相对相邻共享或全局锚点设计，是 2026 深度缩放与长上下文效率的一条可预训练级路线。',
    yearHint: '2026',
  },


  {
    id: 'looped-transformer',
    en: 'Looped Transformer / ARLoop',
    zh: '循环深度 Transformer',
    category: '模型架构',
    explanation:
      'Looped Transformer（亦称 recurrent-depth / Universal Transformer）：用同一组共享层反复迭代，以「循环次数 R」换有效深度，参数量几乎不增。ARLoop（2026-11）把 Attention Residuals 接到循环深度上，用滑动窗口深度注意力选择复用哪些中间残差；1.2B、0.5T token、R=3 的开源检查点可在多项基准上超过 Huginn-3.5B，并与更大预算的非循环模型接近（arXiv 2611.05234）。同期还有 Dory、Best-of-Depth、Ouro 等循环深度变体。',
    whyItMatters:
      '把「加深」从堆参数改成可调的测试时算力轴；与 MoE 的专家扩容互补。2026 开源循环 LLM 与残差设计密集出现，是参数高效预训练与推理深度缩放的关键架构叙事。',
    yearHint: '2025–2026',
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
    id: 'dtca',
    en: 'DTCA',
    zh: '去噪 Token 信用分配',
    category: '训练与对齐',
    explanation:
      'Denoising Token Credit Assignment：面向扩散语言模型（DLM）强化学习的 token 级信用分配框架。在去噪过程中，用「提交某 token 后剩余掩码位预测置信度的提升」估计贡献，按词性聚合后筛选信息量大的去噪步，再结合策略更新引起的熵变化校准优势信号。',
    whyItMatters:
      '自回归 RL（如 GRPO）默认按序列位置分配信用，但 DLM 是并行解掩码，位置与时间步语义不同；2026-10 DTCA 等结果表明，为去噪动力学专门设计信用分配，是把 RL 推理增益迁到扩散语言模型上的关键缺口。',
    yearHint: '2026',
  },
  {
    id: 'mpo',
    en: 'MPO',
    zh: '多尺度策略优化',
    category: '训练与对齐',
    explanation:
      'Multiscale Policy Optimization：面向长程 LLM Agent 的强化学习算法。观察到评论家（critic）价值主要在「助手回合」之间变化，因而先在回合尺度做广义优势估计，再在回合内做局部 token 校正，并用回合级重要性采样对齐策略更新，避免纯 token 级比率对长轨迹的额外惩罚。',
    whyItMatters:
      '搜索、工具调用与自动化等长程任务里，一次环境交互对应一整段助手输出；把信用锚定在回合再细化到 token，比直接套用 GRPO/PPO 的 token 级配方更贴合 Agent 轨迹结构，是 2026 长程 Agent 训练的代表性新算法之一。',
    yearHint: '2026',
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

  {
    id: 'mtp',
    en: 'Multi-Token Prediction',
    zh: '多词元预测',
    category: '训练与对齐',
    explanation:
      'Multi-Token Prediction：预训练时并行预测多个未来 token（DeepSeek / Meta 等路线），提高样本效率，并天然支持自投机解码。Soft-MTP（2026）进一步从 MTP 交叉熵梯度中剥离噪声残差，仅保留指向 NTP 的 KL 自蒸馏——改动一行、无额外参数，使 MTP 更稳、更利于投机解码与零样本。',
    whyItMatters:
      'MTP 已成为常见预训练配方；Soft-MTP 让其在投机解码与零样本场景下更便宜、更稳，是训练侧接到推理加速的代表性接口。',
  },


  {
    id: 'a-rsi',
    en: 'A-RSI (Adaptive Task Refresh)',
    zh: '自适应任务刷新自改进',
    category: '训练与对齐',
    explanation:
      'Adaptive Task Refresh for zero-data multimodal recursive self-improvement：把「何时刷新经验」与「答案是什么」解耦——前者仅根据训练日志中的奖励波动/准确率下滑决定刷新时机（不偷看验证/测试集），后者用模型自写程序构成的静态题库做可独立核验的答案。全程无外部训练样例与人工标注；约 800 道新任务可将 11 项基准均值从 57.77 提到 61.05（arXiv 2610.38568）。',
    whyItMatters:
      '为零数据多模态递归自改进给出可落地的任务池刷新机制；与 Sleep 等持续学习框架互补，把「自造题 + 可核验奖励」接到 GRPO/过程奖励训练环。',
    yearHint: '2026',
  },


  {
    id: 'weight-space-programming',
    en: 'Weight-Space Programming',
    zh: '权重空间编程',
    category: '训练与对齐',
    explanation:
      'Weight-Space Programming（MIT CSAIL，Takehi/Teoh/Zhang/Khattab，2026-11）：前沿 LLM 可直接读写神经网络权重——不经梯度下降/优化器，围绕自然语言规格诊断行为、一次性修补失败模式，甚至从零写出小型策略。例：仅编辑 Qwen3.5-0.8B 约 0.016% 权重，即可把 MATH-500 从 7.9% 提到 48.1%。',
    whyItMatters:
      '把「改模型」从训练循环挪到可解释的权重手术：相对 LoRA/SFT 的参数适配，提供可审计的局部编辑与可解释性接口，也给红队/自评估打开读权重诊断通道。',
    yearHint: '2026',
  },


  {
    id: 'loco',
    en: 'LoCo (Local Preference Learning)',
    zh: '局部偏好学习推理压缩',
    category: '训练与对齐',
    explanation:
      'LoCo（Think Less, Locally）：面向推理模型过长思维链的局部偏好学习。从模型自生成轨迹中检测「过度思考」状态，冻结该前缀、再从同一状态再生更短且可核验的续写，构造状态条件偏好对并用 DPO 训练——教模型何时继续推理、何时收束，而非笼统鼓励更短轨迹。数学完成长度可压约 41.7%–45.4%，代码约 23.4%–36.3%，准确率持平或提升（arXiv 2611.04814）。',
    whyItMatters:
      '推理模型的成本很大一部分来自「想够了还在想」；相对整条轨迹长度惩罚，状态局部的继续/收束偏好更贴合 CoT 决策点，是 2026 推理压缩与 DPO/过程奖励训练环的高信号新接口。',
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
    id: 'loopvq',
    en: 'LoopVQ',
    zh: '循环 Transformer 亚比特 KV 量化',
    category: '推理与效率',
    explanation:
      'LoopVQ：面向 looped Transformer 的 KV Cache 向量量化。循环模型每一步仍要存各自 KV，缓存随循环次数线性涨；LoopVQ 观察到循环轴冗余与各步对量化敏感度差异，把多步通道联合编码，并微调码本以贴合全精度输出。可到约 0.5 bit/元素（配合 TaSQ 甚至约 0.25），在 Ouro/Huginn 上接近 BF16，SGLang 实现上 32K 上下文解码延迟近乎减半、峰值吞吐最高约 4–6×（arXiv 2611.05304）。',
    whyItMatters:
      '循环深度省的是参数内存，KV 仍是服务瓶颈；LoopVQ 把「循环架构」与「亚比特 KV」接到同一条线上，是 2026 循环 LLM 真正可服务的关键拼图。',
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

  {
    id: 'lown',
    en: 'LOWN (Look Only When Needed)',
    zh: '按需视觉路由',
    category: '推理与效率',
    explanation:
      'Look Only When Needed：面向扩散视觉语言模型（DVLM）的免训练解码策略。每步先不看图像做预测；仅当该预测与上一轮「带图像条件」的预测不一致时，才重新处理视觉 token（证书引导的按需视觉路由）。在 LLaDA-V 类 DVLM 上可保留约 99.6% 分数，同时把解码 FLOPs 压到约 35%。',
    whyItMatters:
      '扩散 VLM 每个去噪步都要重编海量视觉 token；自适应跳过是与视觉 token 剪枝正交的主效率杠杆，直接砍解码算力。',
    yearHint: '2026',
  },


  {
    id: 'rimuru',
    en: 'Rimuru',
    zh: '异构张量统一内存服务',
    category: '推理与效率',
    explanation:
      '面向 LLM 服务的统一内存层：跨专家权重、KV/SSM/卷积状态等异构张量共享页池，配合内存视图、多级页分配器与页表感知的融合 MoE 内核（非连续专家无需拷贝）。负载感知的弹性专家卸载可在压力下重分配页；构建于 vLLM。相对基线最高约 19× 吞吐、TTFT 降低约 98%（arXiv 2610.40305）。',
    whyItMatters:
      '把分页注意力从 KV 推广到专家权重与多种状态张量，是 MoE 高并发服务里显存碎片与卸载拷贝的关键解法之一。',
    yearHint: '2026',
  },


  {
    id: 'acct',
    en: 'ACCT (Asymmetric Cross-LLM Context Transfer)',
    zh: '非对称跨模型上下文迁移',
    category: '推理与效率',
    explanation:
      'Asymmetric Cross-LLM Context Transfer：在同族不同规模模型之间迁移 KV Cache（token cartography、动态头分配与编译），让分层路由把长上下文交接出去而无需完整重 prefill。报道在约 19k token 交接上可大幅加速，并约减 75% KV 体积。',
    whyItMatters:
      '把「小模型接请求、大模型接手长上下文」做成可工程化的缓存交接，而不是每次冷启动；是推测解码与网关路由之外，直接砍 TTFT/算力的关键拼图。',
    yearHint: '2026',
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
    id: 'agentic-rag',
    en: 'Agentic RAG',
    zh: '智能体式检索增强',
    category: 'RAG与记忆',
    explanation:
      '相对一次性「检索→拼接→生成」的静态 RAG，让模型在多步推理中自主决定何时检索、用何种检索信号（语义/关键词等）、以及上下文粒度（句子级证据 vs 扩段阅读），并可经 RL/过程监督优化检索动作本身（如 GRASP、RAG-Gym / Re²Search++ 等路线）。',
    whyItMatters:
      '2025–2026 信息检索 Agent 与 Deep Research 产品把检索从管道步骤升格为可学习策略；近期 Adobe GRASP（粒度感知检索策略）与 Nature 侧 RAG-Gym 过程监督等工作，强化了「监督检索过程而非只盯最终答案」的共识。',
    yearHint: '2025–2026',
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
  {
    id: 'agent-skills',
    en: 'Agent Skills',
    zh: 'Agent 技能包',
    category: 'Agent与工具',
    explanation:
      '可被 Agent 运行时按需加载的能力模块：通常以含 SKILL.md（或等价清单）的目录形式打包提示词、脚本与资源，声明适用场景与操作步骤，使模型在特定任务上按约定流程行动，而无需改模型权重或重写整套 Harness。',
    whyItMatters:
      '把「领域能力」从一次性提示变成可版本化、可分发的插件单元；Anthropic 等开放 Skills 库与编辑器侧 Skills 插件后，Agent 工程从「只会调工具」走向「可组合的技能生态」，与 MCP/Harness 互补。',
    yearHint: '2025–2026',
  },


  {
    id: 'coral',
    en: 'CORAL (Cognitive Resource Self-Allocation)',
    zh: '认知资源自分配',
    category: 'Agent与工具',
    explanation:
      'Cognitive Resource Self-Allocation：长程 Agent 主动调用 Memory Management（把已验证事实与进度写入检查点）与 Context Optimization（修剪无用上下文并保留检查点），再从干净状态恢复——让模型自行管理工作记忆（arXiv 2610.40350）。相对 ReAct，在 GAIA 上以远更少输入 token 取得增益。',
    whyItMatters:
      '长程 Agent 常因认知过载失败；让 Agent 自己分配记忆与上下文，是超越静态记忆库的实用模式。',
    yearHint: '2026',
  },

  {
    id: 'strategist',
    en: 'Strategist / Strategy Blueprint',
    zh: '推理策略蓝图演化',
    category: 'Agent与工具',
    explanation:
      'Strategist（Princeton/Meta）：把「推理策略」写成可执行的 Strategy Blueprint（统一 execute 接口的代码），由元 Agent 在共享蓝图库上检索、提案、实测、回写——模型权重冻结，只演化如何调模型。30 项基准上相对最强基线平均准确率持平而加权推理成本约降 39%，策略可跨任务检索与跨模型迁移（arXiv 2611.03618）。',
    whyItMatters:
      '「模型只是一半，另一半是推理策略」；把策略从手写提示/固定工作流变成可积累的可执行库，与 Agent Harness / Skills 互补——Harness 管运行时壳，Strategist 管壳内怎么推理。',
    yearHint: '2026',
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
    id: 'world-model',
    en: 'World Model',
    zh: '世界模型',
    category: '多模态',
    explanation:
      '学习环境动态的预测模型：根据观测与动作（或相机/文本条件）预见下一状态或生成可交互的时空内容。2025–2026 在视频/交互世界生成与具身 VLA 中成为核心组件；2026 起 Genie 类与 L3G 等潜在三维记忆，以及 Cosmos 3 Nano 等开源交互仿真检查点（动作/空间控制→多视角与 LiDAR 观测），进一步把闭环、可流式的交互世界仿真推到可用。',
    whyItMatters:
      '连接「会看会说」的 VLM 与「会做」的 VLA/Agent：没有可复用的世界动态，长程规划与仿真迁移就很难扩展；实时交互世界生成把世界模型从控制论概念推到生成式媒体与机器人共用的技术层。',
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



  {
    id: 'flowshift',
    en: 'FlowShift',
    zh: '离散全能模型的连续流适配',
    category: '多模态',
    explanation:
      'FlowShift：参数高效后训练框架，把已预训练的离散 Unified Multimodal Model（UMM）改造成连续 rectified-flow 生成器——用连续潜在投影替换离散视觉接口，对注意力层施 LoRA，并以 Dual-Objective Velocity Vector Distillation（DOVD）同时对齐高保真连续教师与真实连续轨迹。报告称 COCO-30K FID 与美学分显著提升，同时保留逾 99.5% 多模态理解能力（arXiv 2611.05451）。',
    whyItMatters:
      '离散 token 带来语义推理却卡视觉细节；FlowShift 不重训骨干就能「离散理解 → 连续生成」，是 2026 统一多模态从量化瓶颈走向高保真生成的代表性后训练接口。',
    yearHint: '2026',
  },

  {
    id: 'l3g-world',
    en: 'L3G-World / Latent 3D Gaussian Memory',
    zh: '潜在三维高斯记忆世界模型',
    category: '多模态',
    explanation:
      '用紧凑的 Latent 3D Gaussian Memory（L3G）配合交替的记忆更新器与视频 DiT，实时生成空间一致的可交互世界。记忆随场景范围而非视频流长度增长；每个高斯存 VAE 潜在，可直接渲染进 DiT 潜在空间（无需 RGB 再编码）。相对既有 3D 记忆基线，记忆渲染最高约快 359×，可达约 9 FPS 实时（arXiv 2610.40614）。',
    whyItMatters:
      '把世界模型从「短视频生成」推向「可交互、空间一致的实时仿真」；潜在高斯记忆避免 RGB 回编，是 2026 交互世界路线的代表性效率设计。',
    yearHint: '2026',
  },

  {
    id: 'wave-forcing',
    en: 'Wave Forcing',
    zh: '波前强制流式视频生成',
    category: '多模态',
    explanation:
      'Wave Forcing（WF，SJTU DENG Lab）：面向实时长视频的块因果流式扩散。用 chunk-wise causal attention 让较新、更噪的块在去噪未完成前读取更早、更干净的块；再配合 Wave Parallelism / WaveRT，把错位去噪与历史缓存刷新分布到全模型副本上，实现流水填满后「每轮前向吐一块」（1F1C）。在 Wan2.1-T2V-1.3B 上 4-step 报道约 134.8 E2E FPS（8×H200）。',
    whyItMatters:
      '把「多步去噪质量」与「真·流式吞吐」一起做系统级共设计；相对 Rolling Forcing 等序列化路线，是 2026 实时视频生成与交互世界管线的高信号系统方案。',
    yearHint: '2026',
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
  {
    id: 'self-assessment',
    en: 'Self-Assessment',
    zh: '自我安全评估',
    category: '评测与安全',
    explanation:
      'Anthropic 提出的滥用监测手法：模型在每次回复后，利用已在 KV Cache 中的对话，再生成极短的安全评估（是否有害、类别、人工复核优先级、是否已拒绝等）。作为离线宽覆盖监控层，与实时拦截护栏互补；相对另开完整策略提示的分类器，增量算力通常不到约 2%。',
    whyItMatters:
      '2026 年 Anthropic 在生产流量中规模化落地，强调「评估质量随模型能力一起涨」且极低成本；把「模型自监视」从研究设想变成可运维的纵深防御组件，与 Guardrails / Red Teaming 并列讨论。',
    yearHint: '2026',
  },


  {
    id: 'flashprove',
    en: 'FlashProve / Provable Inference',
    zh: '可证明推理（FlashProve）',
    category: '评测与安全',
    explanation:
      'FlashProve（Anthropic，2026-11）：面向大模型服务的 zkSNARK 可证明推理原型。提供商先对权重做承诺，再为每次（或批后）推理生成短证明，使用户/审计方在不知权重的前提下验证「输出确由所承诺模型产生」。在 Llama 4 Maverick（约 400B MoE、4-bit）上单卡 H100 约 110 tok/s 出证、约 19 MB/1k-token 请求；证明本身隐藏权重，架构不隐藏。附 Lean 形式化顶层安全陈述与可执行验证器。',
    whyItMatters:
      '解决「你怎么知道对面真是你付费的那个模型」：路由偷换、攻击篡改 token、监管核验算力是否真在跑批准模型等场景需要密码学级归因。把 zkML 从研究数量级推到可开源复现的生产讨论门槛，与 Guardrails / Self-Assessment 互补。',
    yearHint: '2026',
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

  {
    id: 'route-anything',
    en: 'Route Anything / Model-Policy Routing',
    zh: '全能模型与策略路由',
    category: '基础设施与部署',
    explanation:
      'Route Anything：在质量–成本权衡下，为每个输入从异构候选池（语言模型、图像/视频/语音生成器、编码与职场 Agent、机器人策略等）动态选出期望价值减定价成本最高的路由。构建跨 25 基准、约 37 万次评分的全模态轨迹矩阵，并给出参考策略与质量容差下的定价与认证测试（arXiv 2611.05275）。相对最优固定候选，按输入 oracle 可高约 5.4 分；学习路由器在近零质量损失下平均效率约 8.82×。',
    whyItMatters:
      '「一个模型通吃」让位于「多候选编排」：路由成为通用 AI 系统的一等公民。与 Serving Gateway 的多模型灰度、ACCT 的跨模型上下文交接互补，是 2026 降本与能力编排的理论与实验标尺。',
    yearHint: '2026',
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

  { source: 'latent-sparse-attention', target: 'mla', type: 'evolved-from' },
  { source: 'latent-sparse-attention', target: 'long-context', type: 'stacks-with' },
  { source: 'latent-sparse-attention', target: 'kv-cache', type: 'stacks-with' },
  { source: 'latent-sparse-attention', target: 'gqa-mqa', type: 'alternative-to' },

  { source: 'depthgraft', target: 'kv-cache', type: 'enables' },
  { source: 'depthgraft', target: 'mla', type: 'stacks-with' },
  { source: 'depthgraft', target: 'gqa-mqa', type: 'stacks-with' },
  { source: 'depthgraft', target: 'transformer', type: 'part-of' },
  { source: 'depthgraft', target: 'long-context', type: 'stacks-with' },

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
  { source: 'dtca', target: 'diffusion-lm', type: 'stacks-with' },
  { source: 'dtca', target: 'grpo', type: 'alternative-to' },
  { source: 'dtca', target: 'process-reward', type: 'stacks-with' },
  { source: 'dtca', target: 'rlhf', type: 'evolved-from' },
  { source: 'mpo', target: 'grpo', type: 'evolved-from' },
  { source: 'mpo', target: 'react-agent', type: 'enables' },
  { source: 'mpo', target: 'agent-harness', type: 'stacks-with' },
  { source: 'mpo', target: 'tool-calling', type: 'stacks-with' },
  { source: 'mtp', target: 'transformer', type: 'stacks-with' },
  { source: 'mtp', target: 'speculative-decoding', type: 'enables' },
  { source: 'mtp', target: 'sft', type: 'stacks-with' },

  { source: 'a-rsi', target: 'sleep-framework', type: 'stacks-with' },
  { source: 'a-rsi', target: 'grpo', type: 'stacks-with' },
  { source: 'a-rsi', target: 'process-reward', type: 'stacks-with' },
  { source: 'a-rsi', target: 'vlm', type: 'stacks-with' },

  { source: 'weight-space-programming', target: 'lora', type: 'alternative-to' },
  { source: 'weight-space-programming', target: 'sft', type: 'alternative-to' },
  { source: 'weight-space-programming', target: 'process-reward', type: 'stacks-with' },
  { source: 'weight-space-programming', target: 'self-assessment', type: 'enables' },

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
  { source: 'lown', target: 'vlm', type: 'stacks-with' },
  { source: 'lown', target: 'diffusion-lm', type: 'stacks-with' },
  { source: 'lown', target: 'speculative-decoding', type: 'alternative-to' },

  { source: 'rimuru', target: 'vllm', type: 'stacks-with' },
  { source: 'rimuru', target: 'paged-attention', type: 'evolved-from' },
  { source: 'rimuru', target: 'moe', type: 'stacks-with' },
  { source: 'rimuru', target: 'kv-cache', type: 'enables' },
  { source: 'rimuru', target: 'inference-engine', type: 'part-of' },

  { source: 'acct', target: 'kv-cache', type: 'stacks-with' },
  { source: 'acct', target: 'speculative-decoding', type: 'stacks-with' },
  { source: 'acct', target: 'serving-gateway', type: 'stacks-with' },
  { source: 'acct', target: 'inference-engine', type: 'enables' },

  // RAG
  { source: 'rag', target: 'embedding', type: 'part-of' },
  { source: 'rag', target: 'vector-db', type: 'stacks-with' },
  { source: 'graphrag', target: 'rag', type: 'evolved-from' },
  { source: 'long-context', target: 'rag', type: 'alternative-to' },
  { source: 'long-context', target: 'rope', type: 'stacks-with' },
  { source: 'memory-agent', target: 'rag', type: 'stacks-with' },
  { source: 'memory-agent', target: 'react-agent', type: 'stacks-with' },
  { source: 'agentic-rag', target: 'rag', type: 'evolved-from' },
  { source: 'agentic-rag', target: 'react-agent', type: 'stacks-with' },
  { source: 'agentic-rag', target: 'graphrag', type: 'alternative-to' },
  { source: 'agentic-rag', target: 'tool-calling', type: 'stacks-with' },
  { source: 'agentic-rag', target: 'process-reward', type: 'stacks-with' },

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
  { source: 'agent-skills', target: 'agent-harness', type: 'stacks-with' },
  { source: 'agent-skills', target: 'mcp', type: 'stacks-with' },
  { source: 'agent-skills', target: 'tool-calling', type: 'part-of' },
  { source: 'coral', target: 'memory-agent', type: 'evolved-from' },
  { source: 'coral', target: 'react-agent', type: 'stacks-with' },
  { source: 'coral', target: 'long-context', type: 'alternative-to' },
  { source: 'coral', target: 'agentic-rag', type: 'stacks-with' },
  { source: 'strategist', target: 'agent-harness', type: 'stacks-with' },
  { source: 'strategist', target: 'react-agent', type: 'evolved-from' },
  { source: 'strategist', target: 'multi-agent', type: 'stacks-with' },
  { source: 'strategist', target: 'cot', type: 'enables' },
  { source: 'strategist', target: 'agent-skills', type: 'stacks-with' },

  // 多模态
  { source: 'vlm', target: 'transformer', type: 'stacks-with' },
  { source: 'diffusion', target: 'flow-matching', type: 'alternative-to' },
  { source: 'omni-model', target: 'vlm', type: 'evolved-from' },
  { source: 'omni-model', target: 'whisper-asr', type: 'stacks-with' },
  { source: 'computer-use', target: 'omni-model', type: 'stacks-with' },
  { source: 'vla', target: 'vlm', type: 'evolved-from' },
  { source: 'vla', target: 'computer-use', type: 'stacks-with' },
  { source: 'vla', target: 'omni-model', type: 'stacks-with' },
  { source: 'world-model', target: 'vla', type: 'enables' },
  { source: 'world-model', target: 'vlm', type: 'stacks-with' },
  { source: 'world-model', target: 'diffusion', type: 'stacks-with' },

  { source: 'l3g-world', target: 'world-model', type: 'evolved-from' },
  { source: 'l3g-world', target: 'dit', type: 'stacks-with' },
  { source: 'l3g-world', target: 'diffusion', type: 'stacks-with' },
  { source: 'l3g-world', target: 'vla', type: 'enables' },
  { source: 'wave-forcing', target: 'diffusion', type: 'evolved-from' },
  { source: 'wave-forcing', target: 'dit', type: 'stacks-with' },
  { source: 'wave-forcing', target: 'world-model', type: 'stacks-with' },
  { source: 'wave-forcing', target: 'l3g-world', type: 'stacks-with' },

  // 评测安全
  { source: 'llm-judge', target: 'arena-eval', type: 'stacks-with' },
  { source: 'arena-eval', target: 'benchmarks', type: 'alternative-to' },
  { source: 'red-teaming', target: 'guardrails', type: 'enables' },
  { source: 'prompt-injection', target: 'rag', type: 'stacks-with' },
  { source: 'prompt-injection', target: 'tool-calling', type: 'stacks-with' },
  { source: 'guardrails', target: 'prompt-injection', type: 'enables' },
  { source: 'llm-judge', target: 'benchmarks', type: 'stacks-with' },
  { source: 'self-assessment', target: 'guardrails', type: 'stacks-with' },
  { source: 'self-assessment', target: 'red-teaming', type: 'stacks-with' },
  { source: 'self-assessment', target: 'llm-judge', type: 'alternative-to' },

  // 基建
  { source: 'distributed-train', target: 'moe', type: 'enables' },
  { source: 'distributed-train', target: 'cuda-gpu', type: 'stacks-with' },
  { source: 'inference-engine', target: 'cuda-gpu', type: 'stacks-with' },
  { source: 'serving-gateway', target: 'inference-engine', type: 'stacks-with' },
  { source: 'mlops-llmops', target: 'serving-gateway', type: 'stacks-with' },
  { source: 'mlops-llmops', target: 'llm-judge', type: 'stacks-with' },
  { source: 'vllm', target: 'inference-engine', type: 'part-of' },

  { source: 'loco', target: 'dpo', type: 'stacks-with' },
  { source: 'loco', target: 'cot', type: 'enables' },
  { source: 'loco', target: 'grpo', type: 'stacks-with' },
  { source: 'loco', target: 'process-reward', type: 'alternative-to' },

  { source: 'flashprove', target: 'guardrails', type: 'stacks-with' },
  { source: 'flashprove', target: 'self-assessment', type: 'stacks-with' },
  { source: 'flashprove', target: 'moe', type: 'stacks-with' },
  { source: 'flashprove', target: 'inference-engine', type: 'stacks-with' },

  { source: 'route-anything', target: 'serving-gateway', type: 'evolved-from' },
  { source: 'route-anything', target: 'acct', type: 'stacks-with' },
  { source: 'route-anything', target: 'multi-agent', type: 'stacks-with' },
  { source: 'route-anything', target: 'vla', type: 'stacks-with' },
  { source: 'route-anything', target: 'omni-model', type: 'stacks-with' },

  { source: 'looped-transformer', target: 'transformer', type: 'evolved-from' },
  { source: 'looped-transformer', target: 'moe', type: 'alternative-to' },
  { source: 'looped-transformer', target: 'mamba', type: 'stacks-with' },
  { source: 'looped-transformer', target: 'cot', type: 'enables' },

  { source: 'loopvq', target: 'looped-transformer', type: 'stacks-with' },
  { source: 'loopvq', target: 'kv-cache', type: 'enables' },
  { source: 'loopvq', target: 'gptq-awq', type: 'stacks-with' },
  { source: 'loopvq', target: 'inference-engine', type: 'part-of' },

  { source: 'flowshift', target: 'omni-model', type: 'evolved-from' },
  { source: 'flowshift', target: 'flow-matching', type: 'stacks-with' },
  { source: 'flowshift', target: 'lora', type: 'stacks-with' },
  { source: 'flowshift', target: 'diffusion', type: 'alternative-to' },


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
