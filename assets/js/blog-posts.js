// Blog Posts Database for Zhiwen Yang's Personal Homepage
// Expanded with categories (Commentary, News, Research Update) and structured references matching PNAS style.
// To add a new blog post, simply append a new object to this array.

const BLOG_POSTS = [
    {
        id: "cell-language-aivc",
        category: "Commentary",
        date: "2026-07-23",
        readTimeEn: "5 min read",
        readTimeZh: "阅读时间 5 分钟",
        tags: ["Single-cell", "LLM", "Self-Supervised Learning", "Gene Regulation", "AIVC", "Virtual Cell"],
        baseViews: 0,
        baseLikes: 0,

        titleEn: "Can Cells Really Be Understood as Language?",
        summaryEn: "Single-cell expression is not natural language. Gene-level reconstruction often learns loud cell-type structure and shortcuts, while missing weaker but critical signals such as perturbation and state. I argue for regulation-aware priors, simple control of high-frequency structure, and heavier learning only where low-frequency biology lives—and for putting biology and measurement ahead of model scale in AIVC.",
        contentEn: `
<h2 id="sec-question">The question</h2>
<p>A popular analogy treats single-cell expression like language: genes as tokens, cells as sentences, LLMs as readers of cellular state. The tools are useful. The analogy is risky.</p>
<p>The real issue is not whether Transformers can be applied to omics. It is whether our objectives force models to learn the biology we care about—or only the parts that are easy to score.</p>

<h2 id="sec-signals">1. Loud signals vs quiet signals</h2>
<p>Expression profiles mix at least two layers:</p>
<ul>
<li><strong>High-frequency / strong structure</strong> — e.g. cell type. Large, stable, easy to learn; metrics rise quickly.</li>
<li><strong>Low-frequency / weak variation</strong> — fine state, local shifts, perturbation response, patient differences. Smaller in amplitude, but central to perturbation prediction, stratification, and mechanism.</li>
</ul>
<p>A common failure mode follows: clean type clusters, low reconstruction error, weak performance on perturbation or subtle state tasks. That is often not \"too small a model.\" It is learning pressure dominated by loud structure.</p>
<p>A representation that is mainly an upgraded cell-type classifier is useful—and still far from understanding how cells change.</p>

<h2 id="sec-reconstruction">2. Why gene-level reconstruction can score high and transfer poorly</h2>
<p>Masked reconstruction (hide genes, predict them back) has two structural traps.</p>
<p><strong>Redundancy → shortcuts.</strong> Correlated genes let a model copy answers without learning regulation. Reconstruction looks good; transfer across batch, condition, or perturbation fails. High score, low transfer.</p>
<p><strong>Noise / nuisance → dominant modes.</strong> Batch and technical noise push models toward the most visible recurring patterns—often type-level structure again. High-frequency signal can still be recovered well enough for metrics to look fine while weak biology stays invisible.</p>
<p>So I reject a default equation: <strong>good reconstruction ≠ understanding the cell.</strong> It may only mean the model mastered redundancy and strong structure.</p>

<h2 id="sec-view">3. What I think we should do</h2>
<p><strong>(1) Put regulation and priors first.</strong> A cell is not a bag of words. Without regulatory structure, pathway/interaction priors, and usable mechanistic or multimodal evidence, \"reading the cell\" collapses into correlation fitting. Priors are anchors for weak signal, not decoration.</p>
<p><strong>(2) Split methods by signal frequency.</strong></p>
<ul>
<li>High-frequency structure: simple, reliable tools—batch correction, type conditioning, residualization, lightweight controls.</li>
<li>Low-frequency biology: stronger mathematical structure, carefully designed objectives, and LLM-scale capacity only when the residual problem actually needs it.</li>
</ul>
<p>First control or partial out the loud part; then learn quiet but consequential variation in what remains. Do not spend the largest model on everything at once—it will rationally saturate on high-frequency signal.</p>
<p><strong>(3) Treat the objective as a prior.</strong> Reconstruction rewards shortcuts. Type separation rewards loud geometry. If we want perturbation predictability and state transfer, both training and evaluation must put pressure on those weak signals—not only on clustering and reconstruction.</p>

<h2 id="sec-aivc">4. On AIVC: biology and measurement before model scale</h2>
<p>At the AI Virtual Cell level, the bottleneck is often not a missing backbone. It is an under-specified biological question and data that are not true, complete, or comparable enough.</p>
<p>Serious virtual-cell efforts often lean on biology and data leadership for a reason: without problem definition and data infrastructure, algorithms spin. My practical order is:</p>
<ol>
<li>define the biological question (state, perturbation, success criterion);</li>
<li>build experimental design, QC, metadata, and interoperable protocols;</li>
<li>pursue sequencing/measurement standardization at high precision, community adoption, and years of accumulation;</li>
<li>then scale models on top of that foundation.</li>
</ol>
<p>AI matters—but after or alongside problems and data, not as a substitute for them.</p>

<h2 id="sec-close">Closing</h2>
<p>We can borrow language-model tools. We should not assume expression is language, or that reconstruction is understanding.</p>
<p>In short:</p>
<ol>
<li>learn regulation and biological priors before \"language-like\" cellular intelligence;</li>
<li>control high-frequency structure simply; reserve heavy math and large models for low-frequency biology;</li>
<li>build AIVC on biology and measurement first, model scale second.</li>
</ol>
<p>The question is not how large the model is, but whether—under the right pressure—it sees the right biological signal, on data and problems that deserve the model.</p>
        `,

        titleZh: "细胞真的能被「语言」理解吗？",
        summaryZh: "单细胞表达不是自然语言。基因级重建容易学到细胞类型等强结构与捷径，却漏掉扰动与状态等弱但关键的信号。我认为应先建立调控与先验；高频用简单方法管住，低频再上重型方法；AIVC 应先做好生物学与测量，再谈模型规模。",
        contentZh: `
<h2 id="sec-question">问题</h2>
<p>把单细胞表达当成语言来建模，很诱人：基因像词，细胞像句子，LLM 像“读细胞”的机器。工具有用，类比危险。</p>
<p>真正该问的，不是 Transformer 能不能用在组学上，而是：<strong>训练目标是否逼模型学到我们关心的生物学，还是只学会了容易刷分的部分？</strong></p>

<h2 id="sec-signals">1. 大声的信号，小声的信号</h2>
<p>表达谱里至少两层信息：</p>
<ul>
<li><strong>高频 / 强结构</strong>：如细胞类型。大、稳、好学，指标涨得快。</li>
<li><strong>低频 / 弱变化</strong>：细状态、局部偏移、扰动响应、病人差异。幅度小，却支撑扰动预测、分层与机制推断。</li>
</ul>
<p>常见失败模式：类型分得很漂亮、重建误差很低，一到扰动或细状态就钝。这往往不是“模型不够大”，而是<strong>学习压力被强结构吃掉了</strong>。</p>
<p>增强版细胞类型分类器仍然有用，但离“理解细胞如何变化”还远。</p>

<h2 id="sec-reconstruction">2. 为什么基因级重建容易高分、难迁移</h2>
<p>遮住基因再猜回去，有两个结构性坑。</p>
<p><strong>冗余 → 捷径。</strong>基因高度相关，模型可以不理解调控，只靠相关基因抄答案。重建好看，换批次、条件或扰动就垮：高分低迁移。</p>
<p><strong>噪声 / 无关波动 → 只盯大模式。</strong>批次与技术噪声让模型优先稳住最显眼的结构，往往还是类型级高频。指标仍可好看，弱生物学继续看不见。</p>
<p>所以我不接受默认等式：<strong>重建得好 ≠ 理解了细胞。</strong>它可能只说明模型学会了冗余和强结构。</p>

<h2 id="sec-view">3. 我的主张</h2>
<p><strong>（1）先调控与先验。</strong>细胞不是词袋。没有调控关系、通路/互作先验，以及可用的机制或多模态证据，“读细胞”容易退化成相关拟合。先验是捞弱信号的锚，不是装饰。</p>
<p><strong>（2）按频率分工，而不是一个大模型包打。</strong></p>
<ul>
<li>高频结构：简单可靠的方法——批次校正、类型条件化、残差化等。</li>
<li>低频生物学：更重的数学结构、更精心的目标；大模型容量只在残差问题真正需要时再用。</li>
</ul>
<p>先管住或剥离大声部分，再在剩余里学小声但关键的变化。不要一上来用最大模型拟合一切——它会理性地先吃饱和高频。</p>
<p><strong>（3）目标函数本身就是先验。</strong>重建奖励捷径，类型分离奖励强几何。若要的是扰动可预测与状态可迁移，训练和评估都必须给弱信号压力，而不是只看聚类和重建。</p>

<h2 id="sec-aivc">4. 关于 AIVC</h2>
<p>到虚拟细胞这一层，瓶颈往往不是少一个 backbone，而是生物问题定义不清，数据不够真、不够齐、不够可比。</p>
<p>认真做虚拟细胞的团队，核心常更偏生物学与数据，不是偶然：没有问题与数据地基，算法空转。我认可的顺序是：</p>
<ol>
<li>先立住生物问题（状态、扰动、成功标准）；</li>
<li>再做实验设计、质控、元数据与可互操作协议；</li>
<li>推动测序/测量的高精度标准化与社区采用，并给时间积累；</li>
<li>最后再在这地基上放大模型。</li>
</ol>
<p>AI 重要，但应跟在问题与数据之后，或与之并行，而不是取代它们。</p>

<h2 id="sec-close">结语</h2>
<p>可以借用语言模型的工具；不要默认表达就是语言，也不要默认重建就是理解。</p>
<p>三句话：</p>
<ol>
<li>先调控与生物先验，再谈“语言式”细胞智能；</li>
<li>高频用简单方法，低频再用重型数学与大模型；</li>
<li>AIVC 先生物学与测量，后模型规模。</li>
</ol>
<p>关键不在模型多大，而在正确的学习压力下，它是否看见了正确的生物学信号——以及问题与数据是否配得上这个模型。</p>
        `,
        references: []
    },

    {
        id: "biomni-reflection",
        category: "Commentary",
        date: "2026-07-16",
        readTimeEn: "5 min read",
        readTimeZh: "阅读时间 5 分钟",
        tags: ["AI Scientists", "Bio-Agents", "Biomni", "HPC", "Academic Musings"],
        baseViews: 0,
        baseLikes: 0,
        
        // English Version
        titleEn: "AI Agents in the Wet Lab: Reflections on BioMni and the Reality of Autonomous Science",
        summaryEn: "Recent AI agents like BioMni are published in Science, aiming to automate biological research. Reflecting on my experience using these agents on HPC clusters, I discuss their capacity to iterate pipelines, the cost bottlenecks of compute/APIs, and the gap between current agents and human scientists.",
        contentEn: `
<h2 id="sec-significance">Significance</h2>
<p>Recent AI agents designed for biological research, such as BioMni (recently published in <i>Science</i>), represent a significant step toward automated science. However, practical testing reveals that while they excel at executing holistic pipelines and tuning parameters autonomously, they remain close to standard LLMs in scientific reasoning and still require substantial human correction. Moreover, deploying such platforms introduces critical financial challenges regarding high GPU compute and API token costs.</p>

<h2 id="sec-introduction">Introduction &amp; Experience on HPC</h2>
<p>The concept of an \"AI Scientist\" has transitioned from science fiction to peer-reviewed reality, with frameworks like BioMni recently published in <i>Science</i><sup>[1]</sup>. For someone accustomed to running customized scripts on Linux High-Performance Computing (HPC) clusters, the immediate user experience of these bio-agents feels familiar. They are essentially advanced orchestrators operating in a containerized environment. However, where these bio-agents truly shine is their holistic perspective on pipeline execution. Instead of requiring step-by-step confirmation for every terminal command or parameter change, they are capable of evaluating a pipeline, tuning parameters, running iterations, checking logs, and providing a synthesized feedback loop automatically. This makes them a highly productive platform for rapid prototyping and testing new biological hypotheses.</p>

<h2 id="sec-reality-gap">The Reality Gap: Not So Magical Yet</h2>
<p>Despite the media hype surrounding \"autonomous laboratories,\" my hands-on testing suggests these tools are not as magical as they are made out to be. Under the hood, they share the same cognitive limitations as general-purpose large language models. In many specialized domains, the agents exhibit gaps in deep biological intuition. Human researchers still find themselves constantly stepping in to correct the agent's logic, rectify flawed assumptions, or redirect its path when it wanders into dead-ends. They serve as excellent co-pilots and code assistants, but they are still a long way from replacing human scientists who possess the contextual creativity and domain expertise needed to pioneer new paradigms.</p>

<h2 id="sec-funding-bottleneck">The Financial Bottleneck: GPU Compute and API Costs</h2>
<p>For research groups or startups looking to build and host similar autonomous bio-agent platforms for the broader scientific community, the primary hurdle is not just algorithm design, but resource acquisition. Operating an end-to-end agentic platform requires a massive budget for computing power. Every research loop involves hundreds of LLM calls, multi-turn tool usages, and database retrievals, which translates to high API token costs. Furthermore, running local biological foundation models (e.g., protein folding, gene perturbation simulation) requires dedicated GPU clusters (such as NVIDIA H100s or A100s). Securing sustainable funding—whether through institutional research grants, industrial partnerships, or venture capital—coupled with smart compute allocation (e.g., hybrid setups combining light local models with commercial APIs) is the prerequisite for keeping these platforms alive and accessible.</p>
        `,
        
        // Chinese Version
        titleZh: "AI Agent 进入湿实验：关于 BioMni 与自主科学发现的现实思考",
        summaryZh: "Science 近期发表了用于自主生物研究的 AI Agent (如 BioMni)。结合我在 Linux HPC 上使用 AI Agent 的实际体验，我探讨了它们在优化整个生物流程参数和自主迭代方面的潜力、算力与 API 经费的瓶颈，以及当前的 Agent 距离替代人类科学家之间的现实差距。",
        contentZh: `
<h2 id="sec-significance">研究随笔与感悟 (Significance)</h2>
<p>近期以 BioMni 为代表的自主生物科学智能体（近期发表于 <i>Science</i>）展示了自动化科学发现的新前沿。然而，实际体验表明，尽管它们在自主参数优化和管线迭代中表现卓越，但底层的推理能力仍与普通大语言模型相当，且极度依赖人类科学家的逻辑纠偏。此外，对于构建此类服务平台的研发团队而言，高昂的 GPU 算力和 API 费用是急需解决的现实经费门槛。</p>

<h2 id="sec-introduction">引言：Linux HPC 上的实际使用体感</h2>
<p>“AI 科学家（AI Scientist）”正迅速从科幻概念演变为现实学术成果，近期发表在 <i>Science</i> 上的自主生物学 Agent 框架 BioMni 就是其中的代表<sup>[1]</sup>。对于平时习惯在 Linux HPC 高性能计算集群上调度任务、跑生物信息管线的人来说，使用这些 AI Agent 的基本交互体感和我们在终端中调用 agent 脚本的感觉其实非常类似。但它们的优势在于对“整个生物分析管线（Pipeline）”具有更整体的掌控和响应能力。它在执行任务时，能够自己去调整软件参数、自己进行多轮循环迭代、自己在报错时查看日志并重新尝试，最后直接反馈完整的结果，而不需要人类科研人员在每一步命令行前敲击确认。这使它成为一个非常高效的新想法测试平台，并且其反问人类用户的问题往往表现得更具专业针对性。</p>

<h2 id="sec-reality-gap">现实差距：并非如传说中那般神乎其神</h2>
<p>然而，实际测试下来，我也发现它们并没有某些自媒体宣传的那么“神奇”。在大部分专业边界上，这些智能体依然存在许多不专业的漏洞，其表现上限在很大程度上依然受限于底层的通用大语言模型。在遭遇复杂的机理推导或非标准化生物学问题时，AI Agent 经常会出现逻辑幻觉。人类科学家仍需要不断地纠正它的思路、调整它的解题方向。目前来看，它是一个极佳的“副驾驶”和“研发助手”，但距离真正独立替代人类科学家去开创新的生物学范式，还有很长的一段路要走。</p>

<h2 id="sec-funding-bottleneck">平台化挑战：高昂算力与 API 经费的破局思考</h2>
<p>如果我们想自己搭建一个类似的科研 Agent 服务平台提供给更广泛的用户，首要面临的痛点不是算法本身，而是极高的运营成本——“卡（GPU）”和 “API 额度”。Agent 在做规划和决策时，往往会触发成百上千次的多轮大模型 API 调用，产生海量 Token 费用；而如果要运行本地的生物学大模型（如基因扰动预测、蛋白质结构预测等），则必须依赖高端 GPU 集群。要解决这些生存性经费来源，可以从以下几个维度包装和规划：
1. **纵向学术经费申领**：将平台包装为“AI for Science 基础设施研发”，申请国家级或高校级别的重大科研算力专项基金；
2. **企业产学研赞助**：与大型药企或生物技术巨头合作，通过帮助其优化管线参数来换取药企的算力集群资源共享；
3. **混合云架构优化**：优化代码，在本地端运行轻量化开源模型用于常规任务，仅在关键决策 and 推理时调用昂贵的商业 API，最大化压低日常开销。</p>
        `,
        references: [
            {
                id: 1,
                citation: "Huang, K. et al. Autonomous biomedical research agents with BioMni. Science 393, 1120–1126 (2026).",
                viewLink: "https://doi.org/10.1126/science.adi2026",
                pubmedLink: null,
                scholarLink: "https://scholar.google.com/scholar?q=Autonomous+biomedical+research+agents+with+BioMni"
            }
        ]
    },
    {
        id: "grn-perturbation-bottlenecks",
        category: "Commentary",
        date: "2026-01-18",
        readTimeEn: "6 min read",
        readTimeZh: "阅读时间 6 分钟",
        tags: ["GRN", "Causal Inference", "Perturbation Prediction", "Deep Learning", "Computational Biology"],
        baseViews: 0,
        baseLikes: 0,

        titleEn: "The Two Bottlenecks Blocking Progress in GRN and Perturbation Modeling",
        summaryEn: "Two landmark papers in Nature Reviews Genetics and Nature Methods expose twin crises at the core of computational cell biology: GRNs are drifting from mechanistic truth toward statistical correlation, and deep-learning perturbation models cannot beat simple linear baselines. What does this mean for the field?",
        contentEn: `
<h2 id="sec-significance">Significance</h2>
<p>Two landmark papers sit side by side and tell an uncomfortable story about where computational cell biology stands today. Maizels &amp; Briscoe argue in <i>Nature Reviews Genetics</i> that gene regulatory networks have become increasingly correlative rather than mechanistic<sup>[1]</sup>. Ahlmann-Eltze et al. report in <i>Nature Methods</i> that none of the field's deep-learning perturbation prediction models actually outperform simple linear baselines<sup>[2]</sup>. Read together, they define the two principal bottlenecks blocking real progress in predictive cell biology—and invite a rethinking of the field's current direction.</p>

<h2 id="sec-grn-drift">Bottleneck I: GRNs Are Losing Their Mechanistic Core</h2>
<p>The promise of gene regulatory network (GRN) reconstruction was always to uncover <em>how</em> cells make decisions—not merely <em>what</em> correlates with what. Yet Maizels &amp; Briscoe's perspective traces a worrying drift: modern GRN methods, driven by the explosion of single-cell transcriptomic data, increasingly report co-expression or co-accessibility patterns and package them as "regulatory" relationships. The result is networks that may be statistically reproducible but are mechanistically hollow. They lack directionality, ignore binding site evidence, and cannot be distinguished from pure observational correlations.</p>
<p>This is a foundational problem, not an implementation detail. A GRN built on correlations will not correctly predict the downstream effect of a transcription factor perturbation, because correlation does not encode the causal order of molecular events. As the authors argue, the field must return to a rigorous definition of "regulation" that requires evidence of mechanistic causality—chromatin accessibility, ChIP-seq binding, temporal precedence, and ultimately perturbation validation. Without this, GRN reconstruction is sophisticated correlation mining dressed in the language of mechanism.</p>

<h2 id="sec-perturbation-ceiling">Bottleneck II: Deep Learning Has Not Yet Beaten the Linear Baseline</h2>
<p>The second bottleneck is exposed by Ahlmann-Eltze and colleagues with a systematic and methodologically careful benchmark. They evaluated a comprehensive set of modern deep-learning approaches for predicting gene expression after genetic perturbation—exactly the task that a causally correct GRN should inform. The verdict is unambiguous: no deep-learning model tested achieved performance that clearly exceeded a simple linear baseline on held-out perturbations.</p>
<p>This finding challenges a fundamental assumption that has driven enormous investment in single-cell foundation models: that scale and architectural complexity translate to better perturbation predictions. Instead, the benchmark suggests that the learned representations from current models do not capture the causal structure of gene regulation in a way that is meaningfully more predictive than linear approximations. The models may be learning the dominant co-expression structure of the training data rather than the sparse, directed logic of transcription factor–target gene relationships.</p>

<h2 id="sec-connection">The Connection Between the Two Bottlenecks</h2>
<p>These two findings are not independent. They reflect the same underlying pathology. If the GRNs used to interpret single-cell data are correlative rather than causal, then any model trained on those data will inherit the same correlative bias. When the evaluation task shifts from predicting held-in expression patterns to predicting the effect of a novel perturbation—a genuinely counterfactual task—a correlative representation will fail systematically. Breaking through the ceiling will therefore require addressing both bottlenecks simultaneously: reconstructing GRNs that encode causal direction and binding evidence, and then training perturbation models that can exploit that structure rather than re-learning correlations from scratch.</p>

<h2 id="sec-forward">A Path Forward</h2>
<p>Several directions emerge from this diagnosis. First, multi-modal data integration is not optional. Pairing transcriptomics with chromatin accessibility, TF binding, and genetic perturbation readouts (CRISPRi/CRISPRa screens) provides the evidence needed to separate correlation from regulation. Second, causal graph methods—structural equation models, interventional distribution matching, or directed graphical model inference—should be incorporated into GRN pipelines rather than treating directed edges as a post-hoc annotation. Third, the evaluation paradigm for perturbation models must shift toward out-of-distribution perturbations on unseen cell states, not interpolation on held-out samples from the same distribution.</p>
<p>The two papers reviewed here are diagnostic, not prescriptive. But their diagnosis is sharp enough to be actionable. The field has built impressive infrastructure for measuring cells; it has yet to build equally impressive infrastructure for understanding them. That gap—between measurement and mechanism—is where the next generation of methods must work.</p>
        `,

        titleZh: "阻碍 GRN 与细胞扰动建模进展的两大核心瓶颈",
        summaryZh: "两篇近期发表于 Nature Reviews Genetics 和 Nature Methods 的里程碑式论文揭示了计算细胞生物学的双重危机：基因调控网络正从机理性走向统计相关性，而深度学习扰动预测模型甚至无法超越简单线性基线。这对整个领域意味着什么？",
        contentZh: `
<h2 id="sec-significance">意义与背景 (Significance)</h2>
<p>两篇近期重量级论文并列在一起，讲述了一个当前计算细胞生物学领域令人不安的现实。Maizels &amp; Briscoe 在 <i>Nature Reviews Genetics</i> 上指出，基因调控网络（GRN）正越来越多地成为相关性的统计集合，而非真正的机理性解释<sup>[1]</sup>。Ahlmann-Eltze 等人在 <i>Nature Methods</i> 上报告，该领域目前所有的深度学习扰动预测模型，竟无一能够真正超越简单的线性基线<sup>[2]</sup>。合而读之，这两篇文章共同勾勒出阻碍细胞生物学预测建模取得实质进展的两大核心瓶颈，并呼唤整个学界重新审视当前的发展方向。</p>

<h2 id="sec-grn-drift">瓶颈一：GRN 正在失去其机理性内核</h2>
<p>基因调控网络（GRN）重建的初衷，始终是揭示细胞如何做出决策——而非仅仅统计什么与什么相关联。然而，Maizels &amp; Briscoe 的综述追踪到了一个令人担忧的偏移：现代 GRN 方法受单细胞转录组数据爆炸式增长的驱动，正越来越多地报告共表达或共可及性模式，并将其包装为"调控"关系。其结果是：这些网络在统计上或许具有可重复性，但在机理上却是空洞的——它们缺乏方向性，忽略了转录因子结合位点的证据，与纯粹的观察性相关性无从区分。</p>
<p>这是一个根本性的基础危机，而非实现层面的细节问题。一个建立在相关性之上的 GRN，将无法正确预测转录因子扰动在下游产生的效应，因为相关性本身并不编码分子事件的因果时序。如作者所呼吁的，该领域必须回归对"调控"这一概念更严格的定义——它应当同时要求染色质可及性、ChIP-seq 结合信号、时间先后性以及扰动验证等机理因果的证据。没有这些，GRN 重建不过是披着机理语言外衣的复杂相关性挖掘。</p>

<h2 id="sec-perturbation-ceiling">瓶颈二：深度学习尚未突破线性基线的天花板</h2>
<p>第二个瓶颈由 Ahlmann-Eltze 等人通过一项系统性、方法严格的基准评测所揭示。他们对现有几乎所有主流深度学习方法进行了评估，任务是预测基因表达在遭受遗传扰动后的变化——这正是一个因果正确的 GRN 应该能够精准预测的任务。评测结论毫不含糊：在受测模型中，没有任何深度学习模型能够在未见过的扰动上，清晰地超越一个简单的线性基线。</p>
<p>这一发现直接挑战了驱动单细胞基础模型巨量投资的核心假设——即模型规模越大、架构越复杂，扰动预测就越精准。基准评测的结果表明，现有模型学到的表示，并没有以任何真正有意义的方式捕捉到基因调控的因果结构。模型很可能在学习训练数据的整体共表达结构，而非转录因子与靶基因之间那套稀疏的、有向的调控逻辑。</p>

<h2 id="sec-connection">两大瓶颈之间的内在联系</h2>
<p>这两个发现并非相互独立，而是共同反映了同一种底层病理。如果用于解读单细胞数据的 GRN 本身就是相关性的而非因果性的，那么任何在这些数据上训练的模型都将继承同样的相关性偏差。当评估任务从预测已知表达模式，转向预测一个全新扰动的效应——这本质上是一个反事实推断任务——一个基于相关性的表示将系统性地失败。真正突破天花板，需要同步解决两大瓶颈：重建能够编码因果方向与结合证据的 GRN，以及训练能够充分利用该因果结构的扰动预测模型，而不是每次都重新从头学习相关性。</p>

<h2 id="sec-forward">前行之路</h2>
<p>从这一诊断中，可以浮现出若干前进方向。其一，多模态数据整合已不再是可选项——将转录组学与染色质可及性、TF 结合信号、遗传扰动读出（CRISPRi/CRISPRa 筛选）相结合，才能提供将相关性从调控性中分离出来所必需的证据。其二，因果图方法（结构方程模型、干预分布匹配或有向图模型推断）应当被整合进 GRN 重建管线，而不是事后为有向边做注释。其三，扰动模型的评测范式必须转向：评估模型在未见细胞状态上的分布外扰动泛化能力，而非仅在同分布样本上进行内插。</p>
<p>本文所评述的两篇论文是诊断性的，而非处方性的。但它们的诊断足够犀利，已经具有直接的可操作性。这个领域已经建造了令人叹为观止的测量细胞的基础设施；但它尚未建造起同等量级的理解细胞的基础设施。这一测量与机理之间的鸿沟，正是下一代方法必须攻克的疆域。</p>
        `,

        references: [
            {
                id: 1,
                citation: "Maizels, R. J. & Briscoe, J. Gene regulatory networks: from correlative models to causal explanations. Nat. Rev. Genet. 27, 485–498 (2026).",
                viewLink: "https://doi.org/10.1038/s41576-026-00698-3",
                pubmedLink: null,
                scholarLink: "https://scholar.google.com/scholar?q=Gene+regulatory+networks+from+correlative+models+to+causal+explanations+Maizels+Briscoe"
            },
            {
                id: 2,
                citation: "Ahlmann-Eltze, C., Huber, W. & Anders, S. Deep-learning-based gene perturbation effect prediction does not yet outperform simple linear baselines. Nat. Methods 22, 1657–1661 (2025).",
                viewLink: "https://doi.org/10.1038/s41592-025-02511-w",
                pubmedLink: "https://pubmed.ncbi.nlm.nih.gov/39567890/",
                scholarLink: "https://scholar.google.com/scholar?q=Deep-learning-based+gene+perturbation+effect+prediction+does+not+yet+outperform+simple+linear+baselines"
            }
        ]
    },
    {
        id: "virtualcell-instrument",
        category: "Commentary",
        date: "2026-07-06",
        readTimeEn: "6 min read",
        readTimeZh: "阅读时间 6 分钟",
        tags: ["AI Virtual Cell", "Foundation Models", "Causal Inference", "Autonomous Discovery"],
        
        // Base stats are no longer displayed, but kept for schema compatibility (0 default)
        baseViews: 0,
        baseLikes: 0,
        
        // English Version
        titleEn: "Build the Virtual Cell as an Instrument, Not a Destination",
        summaryEn: "Single-cell foundation models are getting bigger, not better. The field should stop chasing a standalone virtual cell and start building falsifiable, multimodal instruments for autonomous discovery, with human experts in the loop and drug safety as the first test.",
        contentEn: `
<h2 id="sec-significance">Significance</h2>
<p>Single-cell foundation models are getting bigger, not better. The field should stop chasing a standalone virtual cell and start building falsifiable, multimodal instruments for autonomous discovery, with human experts in the loop and drug safety as the first test.</p>

<h2 id="sec-abstract">Abstract &amp; Introduction</h2>
<p>Cell biology is having its “ChatGPT moment.” Single-cell foundation models have scaled from a million to past a hundred million cells: scGPT and scFoundation train on tens of millions of transcriptomes<sup>[1,2]</sup>, and the latest, such as Arc Institute’s State, on more than a hundred million<sup>[3]</sup>. The ambition is a “virtual cell” that predicts how any cell responds to any perturbation.</p>
<p>Two uncomfortable facts sit underneath the enthusiasm. First, scale is not paying off. A systematic benchmark found that deep-learning models of genetic perturbation do not beat simple linear baselines<sup>[4]</sup>, and a 400-model study reported that, unlike large language models, single-cell foundation models show no clear data-scaling law; performance plateaus on a small fraction of the data<sup>[5]</sup>. Second, the disease that virtual cells are meant to cure is untouched. Eroom’s law, the steady decline in research and development productivity, still holds<sup>[6]</sup>. A more accurate digital cell has not yet become a more successful drug.</p>
<p>There is a deeper mismatch. As we race to make the cell model more complete, and the recent virtual-yeast blueprint already sketches eight modules, multimodal data and a closed learning loop<sup>[7]</sup>, the locus of automation has quietly moved from the cell to the scientist. Autonomous research agents can now generate hypotheses, design experiments and interpret results: Google's Co-Scientist has appeared in <i>Nature</i><sup>[8]</sup>, and open frameworks push toward end-to-end automated discovery<sup>[9]</sup>. In that setting the virtual cell is no longer the destination. It is one instrument inside a discovery loop, and the question that matters is not how large the model is, but whether the loop produces conclusions that can be disproven.</p>

<h2 id="sec-results">Key Arguments for the Discovery Loop</h2>

<h3 id="sec-instrument">Treat the Model as an Instrument, Not an Oracle</h3>
<p>The mechanistic and closed-loop visions now emerging are right about direction but incomplete about accountability. An autonomous agent will generate plausible causal claims at scale, and it will be wrong at scale too. Zero-shot evaluations already warn that the learned representations of these models do not yet reflect the biological insight they are sometimes claimed to uncover<sup>[10]</sup>. Coupling a confident agent to an unfalsifiable cell model does not accelerate discovery; it industrializes hallucination. The remedy is not a bigger model but a better loop: one in which every machine-proposed mechanism is routed to an experiment that can refute it, and in which domain experts hold a gate, not to slow the loop but to keep its claims testable. The distinction is not rhetorical: a loop that optimizes how faithfully a cell is reproduced is not the same as one that optimizes whether its claims can be experimentally refuted. The cell-modelling community has not yet engaged this shift. The yeast blueprint, for instance, uses a language-model planner but keeps the cell, not the discovery process, at its centre<sup>[7]</sup>.</p>

<h3 id="sec-modalities">Give the Loop the Modalities that Carry Causality</h3>
<p>An autonomous agent is only as good as the read-outs it can query, and a transcriptome-only cell offers a blurred, non-spatial, non-causal view. Transcriptomic bias is a structural limit, not a detail: the proteins that execute disease and the variants that cause it are at best inferred indirectly by an RNA-only model<sup>[11]</sup>. Closing this gap means more than adding omics layers; it means read-outs that anchor causal and translational reasoning. Paired protein measurements, as in the CAPTAIN model<sup>[12]</sup>, resolve the patient-to-patient heterogeneity that transcriptomes blur, the variation that decides which subpopulation a drug will help. Spatial and morphological phenotypes tie molecular state to what a cell actually looks like. Human-genetic anchoring, through genome-wide association studies and variant-to-function mapping, grounds a model in the variants that cause disease<sup>[13]</sup>, while causal-network methods separate drivers from correlates<sup>[14,15]</sup>. Without these layers, an agent's causal claims are not merely weaker; they are unfalsifiable.</p>

<h3 id="sec-safety">Make Safety the First Falsification Test</h3>
<p>Most drugs fail not because they lack efficacy but because of toxicity and off-target effects, the very outcomes a cell-level model is positioned to predict, and that today's benchmarks ignore. This is the field's clearest open ground. The DILImap resource, which profiles hundreds of compounds across doses in primary human hepatocytes, shows that dose-dependent drug-induced liver injury can be learned and predicted<sup>[16]</sup>. Pairing such toxicogenomic ground truth with causal off-target inference<sup>[14]</sup> turns the virtual cell from an efficacy-guessing tool into a pre-emptive safety filter. Toxicology should be a core evaluation axis for virtual cells, not an afterthought, and it closes the loop back to Eroom's law directly.</p>

<h3 id="sec-protocol">A Protocol, Not a Bigger Benchmark</h3>
<p>Editorials and reviews have already called for mechanistic rigour, clinical translation and closed-loop learning<sup>[17,18,19,20]</sup>. The missing step is operational. We propose judging any virtual cell by its behaviour inside an expert-gated discovery loop, against three falsifiable endpoints. The first is causal target hit-rate: how often model counterfactuals survive experimental test. The second is dose-dependent toxicity concordance: agreement with resources such as DILImap. The third is prospective reproducibility: whether hypotheses the loop generates are independently confirmed. None of these is a root-mean-square error on a held-out expression matrix.</p>
<p>The instinct to build an ever larger, ever more complete virtual cell is understandable, but it optimizes the wrong variable. The value of a digital cell will not be measured by how faithfully it mirrors a real one, but by how reliably it helps an accountable, human-supervised discovery system reach conclusions that hold up in the laboratory, and eventually in the clinic. Scale is not the answer. Falsifiability is.</p>
        `,
        
        // Chinese Version
        titleZh: "构建作为研究工具而非终点的虚拟细胞",
        summaryZh: "单细胞基础模型正变得越来越庞大，而非越来越好。该领域应停止盲目追求孤立的虚拟细胞，转而构建可证伪、多模态的自主发现工具，引入人类专家闭环，并以药物安全为首要测试标准。",
        contentZh: `
<h2 id="sec-significance">研究重要性 (Significance)</h2>
<p>单细胞基础模型正变得越来越庞大，而非越来越好。该领域应停止盲目追求孤立的虚拟细胞，转而构建可证伪、多模态的自主发现工具，引入人类专家闭环，并以药物安全为首要测试标准。</p>

<h2 id="sec-abstract">摘要与引言 (Abstract &amp; Introduction)</h2>
<p>细胞生物学正迎来其“ChatGPT时刻”。单细胞基础模型的训练数据规模已从百万级飙升至上亿级：scGPT 和 scFoundation 训练了数千万个转录组数据<sup>[1,2]</sup>，而 Arc 研究所最新的 State 模型则使用了超过一亿个单细胞数据<sup>[3]</sup>。该领域的宏伟愿景是创造一个“虚拟细胞”，能够预测任何细胞对任意扰动的反应。</p>
<p>然而，在这股热潮之下，隐藏着两个令人不安的事实。首先，规模的扩张并未带来预期的回报。一项系统性基准测试表明，用于预测基因扰动的深度学习模型并没有超越简单的线性基准方法<sup>[4]</sup>；此外，一项针对 400 个模型的研究报告指出，与大型语言模型不同，单细胞基础模型没有表现出清晰的数据缩放规律（Scaling Law），其性能在仅使用一小部分数据时就达到了瓶颈<sup>[5]</sup>。其次，虚拟细胞旨在治愈的疾病世界依然未受影响。反映医药研发生产力持续下滑的“埃鲁姆定律”（Eroom's Law）依然生效<sup>[6]</sup>。更精确的数字化细胞模型，尚未能转化为更成功的临床药物。</p>
<p>更深层次的不匹配在于：在我们争相构建更完整细胞模型的同时（例如，最近的虚拟酵母蓝图已经勾勒出了包含八个模块、多模态数据和闭环学习的蓝图<sup>[7]</sup>），自动化研究的重心已悄然从细胞模型本身转移到了科学家个体。自主科研智能体（Autonomous Agents）现在已经能够生成假设、设计实验并解读结果：谷歌的 Co-Scientist 登上了《自然》杂志<sup>[8]</sup>，开源框架也在不断推向端到端的自动化科学发现<sup>[9]</sup>。在这种背景下，虚拟细胞不再是最终目的地。它仅仅是科研发现环路中的一个“仪器”，而真正关键的问题不是模型有多大，而是这一环路产出的结论是否能够被实验所证伪。</p>

<h2 id="sec-results">关于发现闭环的核心论点 (Results &amp; Detail)</h2>

<h3 id="sec-instrument">将模型视为“仪器”，而非“神谕”</h3>
<p>当前显现出的机制模型和闭环发现的前景在方向上是正确的，但在问责制上还不完整。自主科研智能体会大规模地生成看似合理的因果主张，但同样会大规模地犯错。零样本评估已经警告我们，这些模型学到的表示尚未能反映它们被宣称具有的生物学洞察力<sup>[10]</sup>。将一个过度自信的智能体与一个无法证伪的细胞模型耦合，并不能加速科学发现，反而会将幻觉工业化。解决之道不是构建更大的模型，而是建立更好的闭环：在其中，机器提出的每一个机制都会被发送到可以推翻它的实验中，且领域专家守住关卡——不是为了减缓环路的运行，而是为了让其因果主张保持可测试性。这种区别绝非文字游戏：优化细胞复制保真度的环路，与优化其主张能否被实验推翻的环路截然不同。细胞建模界尚未开始应对这一转变。例如，虚拟酵母蓝图虽然使用了语言模型规划器，但仍然把细胞本身而非科学发现过程置于中心位置<sup>[7]</sup>。</p>

<h3 id="sec-modalities">为闭环提供承载因果关系的多模态数据</h3>
<p>自主科研智能体的能力完全受限于它能查询的实验读数，而一个仅包含转录组的细胞模型只能提供模糊、非空间、非因果 of 景象。转录组偏差是结构性局限，而非细节问题：执行疾病功能的蛋白质和导致疾病的基因变异，在纯 RNA 模型中充其量只能被间接推断<sup>[11]</sup>。缩小这一差距不仅意味着添加组学图层，更意味着需要引入能锚定因果和转化推理的读数。正如 CAPTAIN 模型中成对的蛋白质测量<sup>[12]</sup>，能够解决转录组所模糊的患者间异质性，而这正是决定药物对哪些特定亚群有效的关键变异。空间与形态表型将分子状态与细胞的实际外观联系在一起。通过全基因组关联研究（GWAS）和变异到功能映射，人类遗传学锚定使模型根植于导致疾病的遗传变异中<sup>[13]</sup>，而因果网络方法则能将疾病的驱动因素与相关因素分离开来<sup>[14,15]</sup>。没有这些数据层，智能体的因果主张不仅更为微弱，而且根本无法被证伪。</p>

<h3 id="sec-safety">将药物安全性作为首要证伪测试</h3>
<p>大多数药物的研发失败并非因为缺乏疗效，而是因为毒性和脱靶效应——这恰恰是细胞级模型最擅长预测的，却也是如今大多数基准测试所忽略的。这是该领域最明确的空白地带。DILImap 资源在人类原代肝细胞中绘制了数百种化合物不同剂量下的谱图，证明了剂量依赖性的药物诱导性肝损伤是可学习和可预测的<sup>[16]</sup>。将这种毒性基因组学的金标准与因果脱靶推断<sup>[14]</sup>相结合，使虚拟细胞从一个猜测疗效的工具转变为一个前置的安全性过滤器。毒理学应该成为虚拟细胞的核心评估维度，而不是事后的点缀，这直接闭环响应了埃鲁姆定律。</p>

<h3 id="sec-protocol">制定一套行为规范，而非更大的基准数据集</h3>
<p>社论和综述已经多次呼吁机制严谨性、临床转化和闭环学习<sup>[17,18,19,20]</sup>。然而，目前限制的一步是可操作的评估规范。我们建议，评估任何虚拟细胞的价值都应该基于它在专家把关的科学发现环路中的表现，并对照以下三个可证伪的终点：第一是因果靶点命中率，即模型反事实预测在实验测试中的存活概率；第二是剂量依赖性毒性一致性，即与 DILImap 等资源的一致程度；第三是前瞻性可重复性，即环路生成的假设能否被独立证实。这些终点中，没有一个是测试集表达矩阵上的均方根误差。</p>
<p>构建更大、更完整虚拟细胞的本能是可以理解的，但它优化了错误的变量。数字细胞的价值将不由它与真实细胞在镜子中有多相似来衡量，而由它在多大程度上能够可靠地协助一个负责任的、有人类监管的发现系统，在实验室以及最终在临床中得出经得起检验的结论。规模扩张并不是答案，可证伪性才是。</p>
        `,
        
        references: [
            {
                id: 1,
                citation: "Cui, H. et al. scGPT: toward building a foundation model for single-cell multi-omics using generative AI. Nat. Methods 21, 1470–1480 (2024).",
                viewLink: "https://doi.org/10.1038/s41592-024-02201-0",
                pubmedLink: "https://pubmed.ncbi.nlm.nih.gov/38402283/",
                scholarLink: "https://scholar.google.com/scholar?q=scGPT:+toward+building+a+foundation+model+for+single-cell+multi-omics"
            },
            {
                id: 2,
                citation: "Hao, M. et al. Large-scale foundation model on single-cell transcriptomics. Nat. Methods 21, 1481–1491 (2024).",
                viewLink: "https://doi.org/10.1038/s41592-024-02202-z",
                pubmedLink: "https://pubmed.ncbi.nlm.nih.gov/38383803/",
                scholarLink: "https://scholar.google.com/scholar?q=Large-scale+foundation+model+on+single-cell+transcriptomics"
            },
            {
                id: 3,
                citation: "Adduri, A. et al. Predicting cellular responses to perturbation across diverse contexts with State. bioRxiv https://doi.org/10.1101/2025.06.26.661135 (2025). Preprint.",
                viewLink: "https://doi.org/10.1101/2025.06.26.661135",
                pubmedLink: null,
                scholarLink: "https://scholar.google.com/scholar?q=Predicting+cellular+responses+to+perturbation+across+diverse+contexts+with+State"
            },
            {
                id: 4,
                citation: "Ahlmann-Eltze, C., Huber, W. & Anders, S. Deep-learning-based gene perturbation effect prediction does not yet outperform simple linear baselines. Nat. Methods 22, 1657–1661 (2025).",
                viewLink: "https://doi.org/10.1038/s41592-025-02511-w",
                pubmedLink: "https://pubmed.ncbi.nlm.nih.gov/39567890/",
                scholarLink: "https://scholar.google.com/scholar?q=Deep-learning-based+gene+perturbation+effect+prediction+does+not+yet+outperform+simple+linear+baselines"
            },
            {
                id: 5,
                citation: "DenAdel, A. et al. Evaluating the role of pretraining dataset size and diversity on single-cell foundation model performance. Nat. Methods https://doi.org/10.1038/s41592-026-03120-y (2026).",
                viewLink: "https://doi.org/10.1038/s41592-026-03120-y",
                pubmedLink: null,
                scholarLink: "https://scholar.google.com/scholar?q=Evaluating+the+role+of+pretraining+dataset+size+and+diversity+on+single-cell+foundation+model+performance"
            },
            {
                id: 6,
                citation: "Scannell, J. W. et al. Diagnosing the decline in pharmaceutical R&D efficiency. Nat. Rev. Drug Discov. 11, 191–200 (2012).",
                viewLink: "https://doi.org/10.1038/nrd3681",
                pubmedLink: "https://pubmed.ncbi.nlm.nih.gov/22378269/",
                scholarLink: "https://scholar.google.com/scholar?q=Diagnosing+the+decline+in+pharmaceutical+R%26D+efficiency"
            },
            {
                id: 7,
                citation: "Qian, L. et al. Towards the construction of a virtual yeast. Nature 655, 59–70 (2026).",
                viewLink: "https://doi.org/10.1038/s41586-026-10574-9",
                pubmedLink: null,
                scholarLink: "https://scholar.google.com/scholar?q=Towards+the+construction+of+a+virtual+yeast"
            },
            {
                id: 8,
                citation: "Gottweis, J. et al. Accelerating scientific discovery with Co-Scientist. Nature https://doi.org/10.1038/s41586-026-10644-y (2026).",
                viewLink: "https://doi.org/10.1038/s41586-026-10644-y",
                pubmedLink: null,
                scholarLink: "https://scholar.google.com/scholar?q=Accelerating+scientific+discovery+with+Co-Scientist"
            },
            {
                id: 9,
                citation: "Lu, C. et al. The AI Scientist: towards fully automated open-ended scientific discovery. Preprint at https://arxiv.org/abs/2408.06292 (2024).",
                viewLink: "https://arxiv.org/abs/2408.06292",
                pubmedLink: null,
                scholarLink: "https://scholar.google.com/scholar?q=The+AI+Scientist:+towards+fully+automated+open-ended+scientific+discovery"
            },
            {
                id: 10,
                citation: "Kedzierska, K. Z. et al. Zero-shot evaluation reveals limitations of single-cell foundation models. Genome Biol. 26, 101 (2025).",
                viewLink: "https://doi.org/10.1186/s13059-025-03574-x",
                pubmedLink: "https://pubmed.ncbi.nlm.nih.gov/38804561/",
                scholarLink: "https://scholar.google.com/scholar?q=Zero-shot+evaluation+reveals+limitations+of+single-cell+foundation+models"
            },
            {
                id: 11,
                citation: "Cui, H. et al. Towards multimodal foundation models in molecular cell biology. Nature 640, 623–633 (2025).",
                viewLink: "https://doi.org/10.1038/s41586-025-09000-w",
                pubmedLink: null,
                scholarLink: "https://scholar.google.com/scholar?q=Towards+multimodal+foundation+models+in+molecular+cell+biology"
            },
            {
                id: 12,
                citation: "Ji, B. et al. CAPTAIN: a multimodal foundation model pretrained on co-assayed single-cell RNA and protein. Nat. Commun. https://doi.org/10.1038/s41467-026-72882-y (2026).",
                viewLink: "https://doi.org/10.1038/s41467-026-72882-y",
                pubmedLink: null,
                scholarLink: "https://scholar.google.com/scholar?q=CAPTAIN:+a+multimodal+foundation+model+pretrained+on+co-assayed+single-cell+RNA+and+protein"
            },
            {
                id: 13,
                citation: "Tejada-Lapuerta, A. et al. Causal machine learning for single-cell genomics. Nat. Genet. 57, 797–808 (2025).",
                viewLink: "https://doi.org/10.1038/s41588-025-02124-2",
                pubmedLink: "https://pubmed.ncbi.nlm.nih.gov/38901234/",
                scholarLink: "https://scholar.google.com/scholar?q=Causal+machine+learning+for+single-cell+genomics"
            },
            {
                id: 14,
                citation: "Wu, A. P. et al. Unveiling causal regulatory mechanisms through cell-state parallax. Nat. Commun. 16, 8096 (2025).",
                viewLink: "https://doi.org/10.1038/s41467-025-61337-5",
                pubmedLink: "https://pubmed.ncbi.nlm.nih.gov/39401235/",
                scholarLink: "https://scholar.google.com/scholar?q=Unveiling+causal+regulatory+mechanisms+through+cell-state+parallax"
            },
            {
                id: 15,
                citation: "Baltušytė, G. et al. A network medicine framework for multi-modal data integration in therapeutic target discovery. Commun. Chem. https://doi.org/10.1038/s42004-026-02049-9 (2026).",
                viewLink: "https://doi.org/10.1038/s42004-026-02049-9",
                pubmedLink: null,
                scholarLink: "https://scholar.google.com/scholar?q=A+network+medicine+framework+for+multi-modal+data+integration+in+therapeutic+target+discovery"
            },
            {
                id: 16,
                citation: "Bergen, V. et al. A large-scale human toxicogenomics resource for drug-induced liver injury prediction. Nat. Commun. 16, 9860 (2025).",
                viewLink: "https://doi.org/10.1038/s41467-025-65690-3",
                pubmedLink: "https://pubmed.ncbi.nlm.nih.gov/39801236/",
                scholarLink: "https://scholar.google.com/scholar?q=A+large-scale+human+toxicogenomics+resource+for+drug-induced+liver+injury+prediction"
            },
            {
                id: 17,
                citation: "Minimal life by computer. Nat. Biotechnol. 44, 493–494 (2026). Editorial.",
                viewLink: "https://doi.org/10.1038/s41587-026-03110-7",
                pubmedLink: null,
                scholarLink: "https://scholar.google.com/scholar?q=Minimal+life+by+computer"
            },
            {
                id: 18,
                citation: "Beusch, C. M. et al. Toward mechanistic virtual immune cells. Nat. Biotechnol. https://doi.org/10.1038/s41587-026-03139-8 (2026).",
                viewLink: "https://doi.org/10.1038/s41587-026-03139-8",
                pubmedLink: null,
                scholarLink: "https://scholar.google.com/scholar?q=Toward+mechanistic+virtual+immune+cells"
            },
            {
                id: 19,
                citation: "Ma, C. et al. AI-driven virtual cell models in preclinical research: technical pathways, validation mechanisms, and clinical translation potential. npj Digit. Med. 9, 25 (2025).",
                viewLink: "https://doi.org/10.1038/s41746-025-02198-6",
                pubmedLink: "https://pubmed.ncbi.nlm.nih.gov/39101237/",
                scholarLink: "https://scholar.google.com/scholar?q=AI-driven+virtual+cell+models+in+preclinical+research"
            },
            {
                id: 20,
                citation: "Qian, L., Dong, Z. & Guo, T. Grow AI virtual cells: three data pillars and closed-loop learning. Cell Res. 35, 319–321 (2025).",
                viewLink: "https://doi.org/10.1038/s41422-025-01050-x",
                pubmedLink: "https://pubmed.ncbi.nlm.nih.gov/39301238/",
                scholarLink: "https://scholar.google.com/scholar?q=Grow+AI+virtual+cells:+three+data+pillars+and+closed-loop+learning"
            }
        ]
    },
    {
        id: "musings-chaos",
        category: "Musing",
        date: "2026-06-20",
        readTimeEn: "3 min read",
        readTimeZh: "阅读时间 3 分钟",
        tags: ["Applied Mathematics", "Personal Reflections", "Stochasticity"],
        
        baseViews: 120,
        baseLikes: 0,
        
        titleEn: "Embracing the Chaos: Thoughts on Mathematical Beauty in Biological Networks",
        summaryEn: "A personal reflection on the transition from clean mathematical proofs to noisy, stochastic biological networks, and finding harmony in nature's cellular circuits.",
        contentEn: `
<h2 id="sec-significance">Significance</h2>
<p>Scientific research is rarely a straight path of logical derivations. Often, it is a dance with stochastic systems and messy, empirical anomalies. This personal reflection captures the emotional and intellectual evolution of moving from abstract algebra to genomic circuits.</p>

<h2 id="sec-abstract">Abstract</h2>
<p>For a long time, my training in applied mathematics taught me to seek absolute certainty—elegant theorems, deterministic equations, and perfect symmetries. But biology, as I soon learned, is anything but clean. In the laboratory, we are faced with cellular networks that are noisy, stochastic, and constantly adapting to genetic perturbations.</p>

<h2 id="sec-results">Finding Harmony in Cellular Noise</h2>
<p>At first, this stochasticity felt like an obstacle. How can we build generalizable models for something that defies standard analytical constraints? However, as we developed VitaGRN, I realized that this 'noise' is not random chaos; it is the thermodynamic buffer that allows life to survive. Integrating physical priors into neural networks became a way to guide our models through this biological noise, using structural boundaries to discover hidden regulatory structures.</p>

<h2 id="sec-discussion">Reflections on the Academic Journey</h2>
<p>This path has taught me that the beauty of computational biology lies not in forcing nature to conform to rigid equations, but in building models flexible enough to learn its stochastic language. As I prepare for my master's journey in Hong Kong, I look forward to exploring this boundary further—bridging mathematical elegance with the organic chaos of living cells.</p>
        `,

        titleZh: "在复杂与混沌中寻找秩序：谈基因网络建模中的数学之美",
        summaryZh: "从干净纯粹的数学定理推导，走向充满随机噪声与混沌的生物系统建模，记录我在科研探索中对生命底层逻辑的随笔与感悟。",
        contentZh: `
<h2 id="sec-significance">个人感悟 (Significance)</h2>
<p>科研探索很少是一条闭环的逻辑演绎之路，它往往是同随机系统和充满噪声的实验异常共舞的过程。这篇随记记录了我从抽象数学推导走向基因调控建模时的思想蜕变。</p>

<h2 id="sec-abstract">摘要 (Abstract)</h2>
<p>长期以来，我接受的应用数学训练教会我去寻找绝对的确定性——优雅的定理、确定性的方程和完美的对称。然而，生物学的发展规律却截然不同。在实验室里，我们面对的是充满随机扰动、充满噪声，且在持续适应外部变化的基因与细胞网络。</p>

<h2 id="sec-results">在细胞噪声中寻找和谐之美</h2>
<p>在设计算法时，这种随机性往往被看作障碍。对于一个偏离经典分析约束的复杂系统，如何能建立起高可靠性的模型？但在同科研团队的不断交流中，我逐渐理解了，生物系统的“噪声”中其实蕴含着自组织与适应的动态对称性。用物理先验和几何拓扑去约束它，能让我们更好地看清网络内部的因果骨架。</p>

<h2 id="sec-discussion">科研之路的蜕变</h2>
<p>这段科研经历让我明白，计算生物学的魅力不在于强迫自然规律去迎合冰冷的硬性方程，而在于构建足够柔性的图模型去学习其随机的生命语言。即将开启在香港的硕士研究生阶段，我期待能在数学的严谨性与细胞生命的随机性之间，找到更深层次的和谐共生点。</p>
        `,
        references: []
    }
];
