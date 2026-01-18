export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  role: string;
  twitter?: string;
  linkedin?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: Category;
  author: Author;
  publishedAt: string;
  readTime: number;
  featured: boolean;
  tags: string[];
}

export type Category =
  | "science"
  | "technology"
  | "artificial-intelligence"
  | "history"
  | "astronomy"
  | "future-innovation";

export const categoryInfo: Record<Category, { name: string; description: string; color: string }> = {
  science: {
    name: "Science",
    description:
      "Exploring the fundamental principles that govern our universe through research, discovery, and experimentation.",
    color: "hsl(142, 70%, 45%)",
  },
  technology: {
    name: "Technology",
    description: "The latest breakthroughs in computing, engineering, and digital innovation shaping our world.",
    color: "hsl(200, 75%, 55%)",
  },
  "artificial-intelligence": {
    name: "Artificial Intelligence",
    description: "Deep dives into machine learning, neural networks, and the future of intelligent systems.",
    color: "hsl(280, 70%, 60%)",
  },
  history: {
    name: "History",
    description: "Uncovering the stories, events, and people that shaped human civilization.",
    color: "hsl(25, 80%, 55%)",
  },
  astronomy: {
    name: "Astronomy & Space",
    description: "Journey through the cosmos exploring planets, stars, galaxies, and the mysteries of the universe.",
    color: "hsl(220, 80%, 60%)",
  },
  "future-innovation": {
    name: "Future Innovation",
    description: "Visionary ideas and emerging technologies that will define tomorrow's world.",
    color: "hsl(38, 92%, 55%)",
  },
};

export const authors: Author[] = [
  {
    id: "1",
    name: "Dr. Elena Vasquez",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    bio: "Astrophysicist and science writer with over 15 years of experience researching black holes and dark matter. Former NASA researcher.",
    role: "Senior Science Editor",
    twitter: "elenavasquez",
  },
  {
    id: "2",
    name: "Marcus Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    bio: "Technology journalist and AI researcher. Previously led machine learning teams at major tech companies.",
    role: "Technology Correspondent",
    linkedin: "marcuschen",
  },
  {
    id: "3",
    name: "Sarah Williams",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    bio: "Historian specializing in ancient civilizations and their technological achievements. Author of three bestselling books.",
    role: "History Editor",
    twitter: "sarahwhistory",
  },
  {
    id: "4",
    name: "James Okonkwo",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    bio: "Futurist and innovation strategist helping organizations prepare for emerging technologies.",
    role: "Innovation Editor",
    linkedin: "jamesokonkwo",
  },
];

export const articles: Article[] = [
  {
    id: "1",
    slug: "the-quantum-revolution-reshaping-computing",
    title: "The Quantum Revolution: How Quantum Computing Is Reshaping Our Digital Future",
    excerpt:
      "Quantum computers are no longer science fiction. As tech giants race to achieve quantum supremacy, we explore what this means for cryptography, medicine, and beyond.",
    content: `
      <p class="lead">The race to build practical quantum computers has shifted from theoretical physics to an engineering arms race. We are witnessing a fundamental change in how humanity processes information—one that will solve problems currently impossible for even the most powerful supercomputers.</p>

      <p>For decades, Moore’s Law governed the speed of digital progress. But as transistors shrink to the atomic scale, classical physics hits a hard wall. Enter quantum computing: a paradigm shift that doesn't just offer faster processing, but a completely new way of understanding data.</p>

      <p>This isn't just about faster smartphones. It’s about simulating molecular structures to cure diseases, optimizing global logistics in real-time, and—crucially—breaking the encryption that secures the internet. Here is everything you need to know about the quantum revolution.</p>

      <h2>What Is Quantum Computing? (A Non-Technical Definition)</h2>
      <p>Classical computers, from your laptop to the Summit supercomputer, operate on a binary system. They use <strong>bits</strong> as the smallest unit of data, which exist in a state of either 0 or 1. Think of a light switch: it is either on or off.</p>

      <p>Quantum computers use <strong>qubits</strong> (quantum bits). Thanks to a principle called <em>superposition</em>, a qubit can exist in a state of 0, 1, or both simultaneously. Imagine a spinning coin; while it's spinning, it is not heads or tails—it is a probability of both.</p>

      <h3>The Power of Exponential Scaling</h3>
      <p>This capability allows quantum machines to handle calculations that scale exponentially rather than linearly. Two classical bits can hold one of four values (00, 01, 10, 11) at a time. Two qubits can hold all four values simultaneously.</p>
      
      <p>By the time you reach just <strong>300 entangled qubits</strong>, you can represent more states than there are atoms in the observable universe. This creates a computational space vast enough to solve optimization problems that would take a classical computer millions of years.</p>

      <blockquote>"We're not just building faster computers—we're building a new kind of computer that thinks differently about problems." — Dr. John Preskill, Caltech</blockquote>

      <h2>Real-World Applications: Why It Matters Today</h2>
      <p>While a fully fault-tolerant quantum computer is still on the horizon, we are currently in the <strong>NISQ (Noisy Intermediate-Scale Quantum)</strong> era. Tech giants like Google, IBM, and startups like Rigetti are already demonstrating specific use cases where quantum creates massive value.</p>

      <h3>1. Pharmaceutical and Material Science Revolution</h3>
      <p>Classical computers struggle to simulate molecules because nature itself is quantum. To simulate a caffeine molecule perfectly on a classical computer would require immense resources. Quantum computers map naturally to these problems.</p>
      <ul>
        <li><strong>Drug Discovery:</strong> Researchers can simulate protein folding and molecular interactions with high precision, potentially cutting drug development timelines by years.</li>
        <li><strong>Battery Technology:</strong> Simulating new material structures to create batteries with higher density and faster charging capabilities for EVs.</li>
      </ul>

      <h3>2. Financial Modeling and Risk Assessment</h3>
      <p>The financial sector is actively investing in quantum algorithms to improve Monte Carlo simulations—a method used to predict the probability of different outcomes.</p>
      <p>Quantum advantage allows banks to:</p>
      <ul>
        <li>Calculate risk exposure in seconds rather than overnight.</li>
        <li>Optimize investment portfolios dynamically.</li>
        <li>Detect fraud patterns that are too complex for traditional AI.</li>
      </ul>

      <h3>3. Logistics and Supply Chain Optimization</h3>
      <p>This is often framed as the "Traveling Salesman Problem." If a delivery driver has 100 stops, calculating the absolute most efficient route involves more variables than there are stars in the galaxy. Quantum algorithms can analyze all potential routes simultaneously to find the global optimum, saving billions in fuel and time.</p>

      <h2>The "Q-Day" Threat: Cybersecurity and Encryption</h2>
      <p>The most pressing narrative in quantum computing is its impact on security. Most of the internet's security (HTTPS, banking, messaging) relies on RSA encryption. RSA works because factoring large numbers is incredibly difficult for classical computers.</p>

      <p>However, <strong>Shor’s Algorithm</strong>, a quantum concept derived in 1994, proved that a sufficiently powerful quantum computer could factor these numbers efficiently, rendering current encryption useless. This hypothetical day when encryption breaks is known as "Q-Day."</p>

      <h3>The "Harvest Now, Decrypt Later" Risk</h3>
      <p>Even though Q-Day is likely a decade away, the threat is immediate. Adversaries are currently stealing encrypted data—state secrets, intellectual property, private communications—and storing it. They are waiting until quantum technology matures to decrypt it.</p>
      
      <p><strong>Strategic Move:</strong> Organizations must transition to Post-Quantum Cryptography (PQC). The US National Institute of Standards and Technology (NIST) has already begun standardizing algorithms resistant to quantum attacks.</p>

      <h2>Challenges: Why We Aren't There Yet</h2>
      <p>If the potential is so high, why don't we have these machines on our desks? Engineering a quantum computer is one of the hardest tasks humanity has ever undertaken.</p>

      <ul>
        <li><strong>Decoherence:</strong> Qubits are incredibly fragile. Interaction with heat, light, or magnetic fields causes them to lose their quantum state (decoherence), leading to calculation errors.</li>
        <li><strong>Extreme Conditions:</strong> Most quantum processors must be kept at temperatures near absolute zero—colder than deep space—to function.</li>
        <li><strong>Error Correction:</strong> To make a logical qubit that is stable, you currently need thousands of physical qubits to correct errors. Scaling this remains the primary engineering hurdle.</li>
      </ul>

      <h2>Strategic Outlook: What to Expect Next</h2>
      <p>The roadmap for the next decade is aggressive. IBM has surpassed the 1,000-qubit mark with its Condor chip, and Google aims to build a useful, error-corrected quantum computer by the end of the decade.</p>

      <p>For businesses and developers, the action item is education and preparation. The barrier to entry is high, but the cost of being caught off guard—especially regarding security—is higher.</p>

      <h2>Frequently Asked Questions (FAQ)</h2>
      
      <h3>When will quantum computers be available to the public?</h3>
      <p>You likely won't have a quantum computer in your home anytime soon. Instead, quantum power will be accessed via the cloud. Services like Amazon Braket and IBM Quantum Experience already allow developers to run experiments on quantum hardware remotely.</p>

      <h3>Will quantum computers replace classical computers?</h3>
      <p>No. Quantum computers are specialized accelerators. They are excellent at optimization and simulation but terrible at running web browsers or streaming video. The future is hybrid: classical computers managing the workflow and offloading complex problems to quantum processors.</p>

      <h3>Is Bitcoin at risk from quantum computing?</h3>
      <p>Potentially. Bitcoin relies on Elliptic Curve Cryptography, which is vulnerable to quantum attacks. However, the blockchain network can upgrade to quantum-resistant encryption protocols (soft forks) before the threat becomes critical.</p>

      <h3>What is "Quantum Supremacy"?</h3>
      <p>Quantum supremacy (or advantage) is the milestone where a quantum computer performs a calculation that is practically impossible for a classical supercomputer. Google first claimed this in 2019 with its Sycamore processor, solving a task in 200 seconds that they claimed would take a supercomputer 10,000 years.</p>

      <h3>How can I start learning quantum computing?</h3>
      <p>You don't need a PhD in physics to start. Python libraries like Qiskit (IBM) and Cirq (Google) allow developers to write quantum circuits. Understanding linear algebra is helpful, but the software abstraction layers are improving rapidly.</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&h=800&fit=crop",
    category: "technology",
    author: authors[1],
    publishedAt: "2026-01-10",
    readTime: 8,
    featured: true,
    tags: ["quantum computing", "technology", "cryptography", "future"],
  },
  {
    id: "2",
    slug: "james-webb-telescope-discoveries-changing-astronomy",
    title: "James Webb Telescope Discoveries That Are Changing Astronomy",
    excerpt:
      "From uncovering unexpectedly mature early galaxies to decoding the atmospheres of distant exoplanets, the James Webb Space Telescope is transforming astronomy from theory-driven assumptions to data-driven reality. Here’s how JWST is reshaping what we know about the universe.",
    content: `
      <p>When the James Webb Space Telescope (JWST) released its first full-color images, it was immediately clear that astronomy had entered a new era. This was not a routine upgrade from previous space telescopes. JWST was designed to answer questions that older instruments simply could not reach: How did the first galaxies form? What are exoplanet atmospheres really made of? How do stars and planetary systems come into existence? Within its first year, JWST began delivering data that challenged long-standing theories and forced scientists to rethink the early history of the universe.</p>

<p>Unlike optical telescopes that see visible light, JWST observes primarily in the infrared spectrum. This allows it to detect extremely faint and distant objects whose light has been stretched by the expansion of the universe. In practical terms, it means JWST can see further back in time than any telescope before it, reaching closer to the moment when the first stars and galaxies formed.</p>

<h2>What Makes the James Webb Space Telescope Different</h2>

<p>JWST is not a replacement for the Hubble Space Telescope; it is a fundamentally different instrument. Hubble observes mostly visible and ultraviolet light, while JWST is optimized for infrared. This distinction is critical because the earliest galaxies emit light that has been shifted into the infrared by cosmic expansion. Without infrared sensitivity, those galaxies remain invisible.</p>

<p>JWST’s 6.5-meter segmented mirror is over six times larger than Hubble’s. This gives it far greater light-gathering power, allowing it to detect objects that are both older and fainter. Its position at the second Lagrange point (L2), about one million miles from Earth, keeps it thermally stable and away from Earth’s heat and light interference.</p>

<p>Its massive sunshield, roughly the size of a tennis court, blocks heat from the Sun, Earth, and Moon. This keeps the telescope cold enough to detect faint infrared signals. Without this extreme cooling, its instruments would be blinded by their own heat.</p>

<h2>Peering Back to the First Galaxies</h2>

<p>One of JWST’s most powerful achievements has been its ability to observe galaxies that formed only a few hundred million years after the Big Bang. These observations are not just pushing distance records; they are reshaping cosmology.</p>

<p>Before JWST, scientists believed that early galaxies were small, chaotic, and slow to assemble. JWST has shown something very different. Many early galaxies appear surprisingly massive, structured, and chemically evolved. This implies that galaxy formation happened much faster than existing models predicted.</p>

<p>This matters because cosmological models are built on assumptions about how matter collapses, how stars form, and how galaxies grow. JWST data suggests that these processes were far more efficient in the early universe than previously believed. That forces astronomers to revisit foundational theories of cosmic evolution.</p>

<h2>How Infrared Vision Changes What We See</h2>

<p>Infrared light penetrates cosmic dust that blocks visible wavelengths. Many star-forming regions are hidden inside dense clouds of gas and dust. Hubble could only see their outer surfaces. JWST can see inside them.</p>

<p>This has transformed the study of stellar nurseries. Regions like the Carina Nebula and the Pillars of Creation have been imaged with extraordinary clarity. JWST reveals:</p>

<ul>
  <li>Protostars forming inside dense gas clouds</li>
  <li>Jets of material being ejected from newborn stars</li>
  <li>Complex chemical structures previously undetectable</li>
  <li>Precise distributions of dust and molecular gas</li>
</ul>

<p>These details help scientists understand how stars acquire mass, how planetary systems form, and why different stars evolve in different ways.</p>

<h2>Rewriting Exoplanet Science</h2>

<p>Perhaps JWST’s most direct impact on public imagination comes from its work on exoplanets. For the first time, astronomers can analyze exoplanet atmospheres with high precision rather than inferring their composition indirectly.</p>

<p>JWST has already detected carbon dioxide, water vapor, methane, and sulfur compounds in several exoplanet atmospheres. One landmark result was the unambiguous detection of carbon dioxide in the atmosphere of WASP-39b, a gas giant located about 700 light-years away. This was not just a technical success; it validated JWST’s ability to perform real atmospheric chemistry on worlds beyond our solar system.</p>

<p>Atmospheric composition tells scientists:</p>

<ul>
  <li>How a planet formed</li>
  <li>Whether it migrated from another region of its solar system</li>
  <li>How stable its climate might be</li>
  <li>Whether basic ingredients for life could exist</li>
</ul>

<p>While JWST is not yet detecting life itself, it is building the toolkit required to identify potentially habitable environments with unprecedented confidence.</p>

<h2>Why These Discoveries Matter for Astrobiology</h2>

<p>Astrobiology is no longer theoretical. JWST allows scientists to examine whether rocky planets have atmospheres capable of supporting liquid water. It can identify gases that may indicate biological processes, such as oxygen, methane combinations, or chemical imbalances that are hard to explain through geology alone.</p>

<p>This does not mean JWST will announce alien life tomorrow. It means that for the first time, the search for life beyond Earth is grounded in measurable, testable data rather than speculation.</p>

<h2>Stellar Evolution in Unprecedented Detail</h2>

<p>JWST’s observations of dying stars and planetary nebulae have also been transformative. These are the environments where heavy elements like carbon, oxygen, and nitrogen are released into space. Those elements later become part of new stars, planets, and potentially living organisms.</p>

<p>By mapping these processes, JWST helps scientists understand how the chemical building blocks of life are recycled through the universe.</p>

<h2>How JWST Is Challenging Existing Models</h2>

<p>One of the most uncomfortable outcomes of JWST’s success is that it is exposing weaknesses in current theories. When data consistently contradicts predictions, theory must change.</p>

<p>JWST has shown:</p>

<ul>
  <li>Early galaxies formed faster than expected</li>
  <li>Star formation was more efficient in the early universe</li>
  <li>Complex chemical elements existed earlier than predicted</li>
</ul>

<p>This does not mean previous science was wrong. It means it was incomplete. JWST is filling gaps that could not be tested before.</p>

<h2>The Long-Term Scientific Impact</h2>

<p>JWST was designed for a mission life of at least 20 years, and fuel projections suggest it may operate even longer. This means today’s discoveries are only the beginning. As more observations accumulate, scientists will refine measurements, discover unexpected phenomena, and build entirely new frameworks for understanding the universe.</p>

<p>Unlike many scientific instruments that answer narrow questions, JWST is reshaping multiple disciplines simultaneously: cosmology, planetary science, stellar physics, and astrobiology.</p>

<h2>Why the James Webb Telescope Is a Turning Point</h2>

<p>The importance of JWST is not just about better images. It is about changing what questions are possible to ask. Before JWST, many aspects of the early universe and exoplanet atmospheres were beyond direct observation. Now they are measurable.</p>

<p>This shift from inference to observation is what makes JWST revolutionary. It turns theories into testable science. It replaces assumptions with data. And it forces astronomy to evolve based on evidence rather than expectation.</p>

<p>In that sense, the James Webb Space Telescope is not just observing the universe. It is redefining how humanity understands its place within it.</p>

<h2>Frequently Asked Questions</h2>

<h3>What makes the James Webb Space Telescope different from Hubble?</h3>
<p>The James Webb Space Telescope observes primarily in infrared light, while Hubble focuses on visible and ultraviolet wavelengths. This allows JWST to see much older and more distant objects, study star-forming regions hidden by dust, and analyze the chemical composition of exoplanet atmospheres in far greater detail.</p>

<h3>How far back in time can JWST see?</h3>
<p>JWST can observe light from galaxies formed over 13.5 billion years ago, meaning it can study objects that existed just a few hundred million years after the Big Bang. This makes it the most powerful telescope ever built for studying the early universe.</p>

<h3>Has the James Webb Telescope found life on other planets?</h3>
<p>No. JWST has not detected life. However, it has detected important atmospheric molecules such as water vapor, carbon dioxide, and methane, which help scientists evaluate whether planets could potentially support life.</p>

<h3>Why is infrared observation so important in astronomy?</h3>
<p>Infrared light can pass through cosmic dust that blocks visible light and can detect extremely distant galaxies whose light has been stretched by the expansion of the universe. This makes infrared astronomy essential for studying star formation, galaxy evolution, and planetary atmospheres.</p>

<h3>What was JWST’s most important exoplanet discovery so far?</h3>
<p>One of JWST’s most important achievements was the clear detection of carbon dioxide in the atmosphere of the exoplanet WASP-39b. This confirmed that the telescope can directly analyze the chemistry of distant worlds.</p>

<h3>Why are JWST’s early galaxy discoveries so surprising?</h3>
<p>Scientists expected early galaxies to be small and poorly organized. JWST has found large, structured, and chemically evolved galaxies much earlier than predicted, suggesting that galaxy formation happened faster and more efficiently than existing models assumed.</p>

<h3>How long will the James Webb Space Telescope operate?</h3>
<p>JWST was designed to operate for at least 10 years, but fuel efficiency projections suggest it could remain functional for 20 years or more, continuing to produce scientific discoveries for decades.</p>

    `,
    coverImage: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1200&h=800&fit=crop",
    category: "astronomy",
    author: authors[0],
    publishedAt: "2026-1-17",
    readTime: 7,
    featured: true,
    tags: ["space", "astronomy", "JWST", "exoplanets"],
  },
  {
    id: "3",
    slug: "artificial-general-intelligence-closer-than-expected",
    title: "Artificial General Intelligence: How Close Are We to Real Thinking Machines?",
    excerpt:
      "Artificial General Intelligence is the idea of machines that can think, learn, and reason like humans across any task. Recent breakthroughs in AI make AGI feel closer than ever, but how much of that is real progress and how much is illusion?",
    content: `
      <p>Artificial General Intelligence (AGI) represents the most ambitious goal in the history of artificial intelligence. Unlike today’s AI systems, which are designed to perform specific tasks such as language translation, image recognition, or recommendation systems, AGI refers to machines that can learn, reason, and adapt across any domain, much like humans. An AGI system would not need retraining for every new problem. It would be capable of understanding new situations, transferring knowledge between tasks, and solving unfamiliar challenges on its own.</p>

<p>This distinction is critical. Most of what we call “AI” today is better described as Artificial Narrow Intelligence (ANI). These systems are powerful but limited. A chess engine cannot write a business plan. A language model cannot drive a car. AGI would unify these abilities into a single, flexible intelligence.</p>

<h2>What Exactly Is Artificial General Intelligence?</h2>

<p>AGI is defined as a system that can perform any intellectual task a human can perform. That includes abstract reasoning, learning from experience, planning, creativity, and understanding cause and effect in the real world. Unlike narrow AI, AGI would not be confined to one function or dataset.</p>

<p>In simple terms, today’s AI is specialized. AGI would be universal. It would be capable of solving problems it has never seen before by applying general principles rather than memorized patterns.</p>

<h2>Why AGI Matters More Than Any Other AI Breakthrough</h2>

<p>AGI would represent a structural shift in civilization. It would not just automate physical labor or repetitive digital tasks. It would automate cognition itself. Research, design, strategy, medicine, law, and education could all be transformed.</p>

<p>This is why AGI is both promising and unsettling. If intelligence becomes scalable, then decision-making power changes fundamentally. Productivity could explode, but so could economic disruption and ethical risk.</p>

<h2>Why Recent AI Progress Makes AGI Feel Close</h2>

<p>Large language models and multimodal systems show abilities that were once considered uniquely human. They can reason through problems, summarize complex topics, write code, and interpret images. These behaviors create the impression that AGI is nearly achieved.</p>

<ul>
  <li>They perform multi-step reasoning.</li>
  <li>They generalize across different domains.</li>
  <li>They learn new tasks from limited examples.</li>
</ul>

<p>However, these systems are still fundamentally pattern-recognition engines. They predict likely outputs based on statistical correlations, not understanding.</p>

<h2>Why AGI Does Not Exist Yet</h2>

<p>Despite impressive results, today’s AI systems lack core attributes of general intelligence:</p>

<ul>
  <li>They do not possess real-world understanding.</li>
  <li>They cannot form independent goals.</li>
  <li>They lack common sense reasoning.</li>
  <li>They cannot truly explain why something is true.</li>
</ul>

<p>Human intelligence is grounded in physical experience, social interaction, and emotional context. Machines currently have none of these in a meaningful way.</p>

<h2>The Illusion of Intelligence</h2>

<p>One of the greatest dangers in AGI discussions is confusing fluency with understanding. When a system produces confident language, humans instinctively assume comprehension. In reality, the system may simply be generating statistically likely responses.</p>

<p>This illusion is powerful and misleading. It creates premature confidence in systems that do not truly reason.</p>

<h2>What Would True AGI Require?</h2>

<p>For a system to qualify as AGI, it would need:</p>

<ul>
  <li>General learning without massive labeled datasets</li>
  <li>Transfer of knowledge across unrelated tasks</li>
  <li>Persistent memory and self-reflection</li>
  <li>Goal-setting and decision-making ability</li>
  <li>Robust reasoning under uncertainty</li>
</ul>

<p>No existing system meets these requirements.</p>

<h2>When Could AGI Realistically Arrive?</h2>

<p>Predictions range from decades away to never. The uncertainty exists because we do not yet understand human intelligence well enough to reproduce it. Progress in computing power does not automatically translate into progress in cognition.</p>

<h2>Why Caution Matters More Than Hype</h2>

<p>AGI is not a product milestone. It is a scientific challenge. Overstating progress damages trust and distorts public understanding. Precision matters more than excitement when dealing with technology that could reshape society.</p>

<h2>The Core Question</h2>

<p>The real question is not whether machines will become more capable. They will. The question is whether intelligence itself can be engineered or whether it is inseparable from consciousness, biology, and lived experience.</p>

<p>AGI is not just a technological problem. It is a philosophical one.</p>

<h2>Frequently Asked Questions</h2>

<h3>What is the difference between AI and AGI?</h3>
<p>AI today is narrow and task-specific. AGI would be capable of performing any intellectual task a human can, including reasoning, learning, and adapting across completely new situations.</p>

<h3>Does Artificial General Intelligence exist today?</h3>
<p>No. All existing systems are forms of narrow AI. They can appear intelligent but do not possess general reasoning or true understanding.</p>

<h3>Why do some experts think AGI is close?</h3>
<p>Because modern AI systems show emergent abilities such as reasoning, creativity, and problem-solving that resemble human intelligence, even though they remain fundamentally statistical systems.</p>

<h3>Why do others believe AGI is still far away?</h3>
<p>Because current AI lacks common sense, real-world grounding, long-term memory, and independent goal formation, which are central to general intelligence.</p>

<h3>Will AGI replace human jobs?</h3>
<p>AGI would transform knowledge work. Humans would likely move toward roles involving oversight, ethics, creativity, and strategic judgment rather than routine cognition.</p>

<h3>Is AGI dangerous?</h3>
<p>It could be if its objectives are misaligned with human values or if it is deployed without safeguards. That is why safety research and governance are critical.</p>

<h3>When is AGI expected to be developed?</h3>
<p>There is no consensus. Estimates range from decades away to possibly never, because human intelligence itself is still not fully understood.</p>

    `,
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop",
    category: "artificial-intelligence",
    author: authors[1],
    publishedAt: "2026-01-18",
    readTime: 9,
    featured: true,
    tags: ["AI", "AGI", "machine learning", "future"],
  },
  {
    id: "4",
    slug: "lost-library-of-alexandria-what-we-really-lost",
    title: "The Lost Library of Alexandria: What Ancient Knowledge Did Humanity Truly Lose?",
    excerpt:
      "Separating myth from history, we explore what the great library actually contained and which works vanished forever.",
    content: `
      <p>The Library of Alexandria has become a symbol of lost knowledge, a cautionary tale about the fragility of human achievement. But what did we actually lose, and how much is mythologized?</p>

      <h2>The Reality of the Library</h2>
      <p>At its height, the Library of Alexandria was undoubtedly the ancient world's greatest repository of knowledge. Founded around 300 BCE under Ptolemy I, it aimed to collect every text in existence.</p>
      
      <p>Estimates of its holdings range from 40,000 to 400,000 scrolls—numbers that likely include copies and different editions of the same works. Still, it represented an unprecedented concentration of human knowledge.</p>

      <h2>What Was Lost</h2>
      <p>Many works from ancient Greece and Rome survived through other means—copied by medieval monks or preserved in Islamic scholarship. But others vanished entirely:</p>
      
      <ul>
        <li>Complete works of the pre-Socratic philosophers</li>
        <li>Aristotle's dialogues (we only have his lecture notes)</li>
        <li>Most of ancient Greek drama and poetry</li>
        <li>Scientific treatises we only know from references</li>
      </ul>

      <h2>The Multiple Destructions</h2>
      <p>Contrary to popular belief, the library didn't burn in a single dramatic event. Its decline was gradual, spanning centuries and involving multiple incidents.</p>

      <blockquote>"The library died not from fire but from neglect—a more common fate for institutions of learning." — Dr. Monica Hanna, Egyptologist</blockquote>

      <h3>Modern Echoes</h3>
      <p>Today's digital repositories face similar challenges. How do we preserve knowledge for future generations? The Library of Alexandria reminds us that civilization's achievements are never permanent.</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=800&fit=crop",
    category: "history",
    author: authors[2],
    publishedAt: "2026-01-02",
    readTime: 6,
    featured: false,
    tags: ["history", "ancient world", "libraries", "knowledge"],
  },
  {
    id: "5",
    slug: "crispr-gene-editing-transforming-medicine",
    title: "CRISPR Gene Editing: How It's Transforming Medicine Right Now",
    excerpt:
      "From curing genetic diseases to fighting cancer, CRISPR is moving from laboratory promise to clinical reality faster than anyone predicted.",
    content: `
      <p>Just over a decade since its discovery, CRISPR-Cas9 gene editing is already saving lives. What was once science fiction is becoming standard medical practice.</p>

      <h2>First Approved Treatments</h2>
      <p>In late 2023, the FDA approved the first CRISPR-based therapy for sickle cell disease. Patients who once faced a lifetime of pain crises and shortened lifespans are now functionally cured.</p>
      
      <p>The treatment, while complex and expensive, represents a paradigm shift: rather than managing symptoms, we're fixing the underlying genetic cause.</p>

      <h2>Cancer Immunotherapy Revolution</h2>
      <p>CRISPR is supercharging cancer treatment. By editing patients' own immune cells to better recognize and attack tumors, researchers are achieving remarkable results in previously untreatable cancers.</p>

      <h2>Challenges Ahead</h2>
      <p>Despite the progress, significant hurdles remain:</p>
      
      <ul>
        <li>Delivery methods need improvement for many organs</li>
        <li>Off-target edits remain a safety concern</li>
        <li>Cost puts treatments out of reach for many patients</li>
        <li>Ethical questions about editing human embryos persist</li>
      </ul>

      <blockquote>"We're at the Model T stage of gene therapy. The technology works, but we're just beginning to understand its full potential." — Dr. Jennifer Doudna, CRISPR co-inventor</blockquote>

      <h3>The Future of Medicine</h3>
      <p>With dozens of clinical trials underway for conditions from blindness to HIV, the next decade will likely see CRISPR become a standard tool in medicine's arsenal.</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1200&h=800&fit=crop",
    category: "science",
    author: authors[0],
    publishedAt: "2026-01-03",
    readTime: 7,
    featured: false,
    tags: ["science", "medicine", "CRISPR", "genetics"],
  },
  {
    id: "6",
    slug: "sustainable-cities-2050-urban-innovation",
    title: "Sustainable Cities of 2050: The Urban Innovations Being Built Today",
    excerpt:
      "From vertical forests to smart grids, the cities of tomorrow are already taking shape. A tour of the technologies defining urban futures.",
    content: `
      <p>By 2050, over 70% of humanity will live in cities. How we design these urban spaces will determine not just our quality of life, but the planet's future.</p>

      <h2>Green Architecture at Scale</h2>
      <p>The era of token rooftop gardens is giving way to buildings that function as vertical ecosystems. Milan's Bosco Verticale was just the beginning.</p>
      
      <p>New developments integrate thousands of plants into their structures, providing insulation, air purification, and biodiversity. Some generate more energy than they consume.</p>

      <h2>Smart Infrastructure</h2>
      <p>Cities are becoming sensing organisms, with networks of IoT devices optimizing everything from traffic flow to waste collection:</p>
      
      <ul>
        <li>Adaptive traffic systems that reduce congestion by 30%</li>
        <li>Smart grids that balance renewable energy in real-time</li>
        <li>Predictive maintenance preventing infrastructure failures</li>
        <li>Water systems that detect leaks before they become crises</li>
      </ul>

      <h2>Mobility Transformation</h2>
      <p>The car-centric city is giving way to multimodal transportation networks. Electric vehicles, autonomous shuttles, and vastly expanded cycling infrastructure are reshaping urban movement.</p>

      <blockquote>"The best-designed city is one where you don't need a car to live a full life." — Jan Gehl, Urban Designer</blockquote>

      <h3>Building Tomorrow</h3>
      <p>These aren't distant dreams—they're being implemented now in cities from Singapore to Copenhagen. The question is whether the transformation can happen fast enough.</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&h=800&fit=crop",
    category: "future-innovation",
    author: authors[3],
    publishedAt: "2026-01-05",
    readTime: 8,
    featured: false,
    tags: ["future", "cities", "sustainability", "innovation"],
  },
  {
    id: "7",
    slug: "dark-matter-mystery-what-we-know",
    title: "The Dark Matter Mystery: What We Know and What We're Getting Wrong",
    excerpt:
      "It makes up 85% of the universe's mass, yet we've never detected it directly. The latest experiments and theories trying to solve physics' greatest puzzle.",
    content: `
      <p>Dark matter is arguably the biggest mystery in modern physics. We know it exists—its gravitational effects are undeniable—but after decades of searching, we still don't know what it is.</p>

      <h2>The Evidence Is Overwhelming</h2>
      <p>Galaxies rotate too fast. The universe's large-scale structure shouldn't exist. Gravitational lensing bends light more than visible matter explains. Something massive is out there, invisible to all our instruments.</p>
      
      <p>The math suggests dark matter outweighs normal matter by about 5 to 1. Yet every experiment designed to detect dark matter particles directly has come up empty.</p>

      <h2>Leading Candidates</h2>
      <p>The most popular theories propose various particles:</p>
      
      <ul>
        <li><strong>WIMPs:</strong> Weakly Interacting Massive Particles, once the favorite, are increasingly constrained by null results</li>
        <li><strong>Axions:</strong> Ultra-light particles originally proposed to solve a different physics problem</li>
        <li><strong>Sterile Neutrinos:</strong> Heavier cousins of known neutrinos</li>
        <li><strong>Primordial Black Holes:</strong> Black holes formed in the early universe</li>
      </ul>

      <h2>Alternative Approaches</h2>
      <p>Some physicists question whether dark matter exists at all. Modified gravity theories attempt to explain the observations without invisible matter—though they face their own challenges.</p>

      <blockquote>"The absence of detection isn't evidence of absence, but it should make us humble about our assumptions." — Dr. Priya Natarajan, Yale</blockquote>

      <h3>The Search Continues</h3>
      <p>New experiments using different technologies and approaches are coming online. The answer, when it comes, could revolutionize our understanding of the universe.</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop",
    category: "astronomy",
    author: authors[0],
    publishedAt: "2026-01-07",
    readTime: 9,
    featured: false,
    tags: ["astronomy", "physics", "dark matter", "universe"],
  },
  {
    id: "8",
    slug: "ancient-computers-antikythera-mechanism",
    title: "Ancient Computers: The Antikythera Mechanism and Lost Technology",
    excerpt:
      "A 2,000-year-old device that predicted eclipses and tracked planets reveals ancient Greeks were far more advanced than we imagined.",
    content: `
      <p>In 1901, divers exploring a Roman shipwreck off the Greek island of Antikythera pulled up a corroded lump of bronze. It would take a century to understand what they had found.</p>

      <h2>A Computer From 100 BCE</h2>
      <p>The Antikythera Mechanism is the world's oldest known analog computer. Its system of interlocking gears could predict astronomical positions and eclipses decades in advance.</p>
      
      <p>Nothing approaching its complexity would appear again for over a thousand years. It represents technological sophistication we never expected from the ancient world.</p>

      <h2>How It Worked</h2>
      <p>The device contained at least 30 bronze gears, including a sophisticated differential gear—a technology we didn't think existed until the Renaissance. Turn a handle, and the mechanism would display:</p>
      
      <ul>
        <li>The position of the Sun and Moon</li>
        <li>The phase of the Moon</li>
        <li>Solar and lunar eclipses</li>
        <li>The positions of the five known planets</li>
        <li>The dates of the Olympic Games</li>
      </ul>

      <h2>Lost Knowledge</h2>
      <p>Perhaps most fascinating is what the mechanism implies: if one such device survived, there must have been others. An entire tradition of sophisticated mechanical engineering vanished from history.</p>

      <blockquote>"The Antikythera Mechanism is more valuable than the Mona Lisa. It shows us that ancient technology was not primitive—it was lost." — Dr. Michael Wright, Science Museum London</blockquote>

      <h3>Modern Reconstructions</h3>
      <p>Using CT scans and decades of research, scientists have now recreated working replicas, finally understanding how ancient astronomers compressed the cosmos into clockwork.</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?w=1200&h=800&fit=crop",
    category: "history",
    author: authors[2],
    publishedAt: "2026-01-09",
    readTime: 6,
    featured: false,
    tags: ["history", "technology", "ancient world", "archaeology"],
  },
];

export function getArticlesByCategory(category: Category): Article[] {
  return articles.filter((article) => article.category === category);
}

export function getFeaturedArticles(): Article[] {
  return articles.filter((article) => article.featured);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getRelatedArticles(article: Article, limit = 3): Article[] {
  return articles
    .filter(
      (a) =>
        a.id !== article.id && (a.category === article.category || a.tags.some((tag) => article.tags.includes(tag))),
    )
    .slice(0, limit);
}

export function getLatestArticles(limit = 6): Article[] {
  return [...articles]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

export function getAuthorById(id: string): Author | undefined {
  return authors.find((author) => author.id === id);
}
