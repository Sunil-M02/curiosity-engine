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
      <p>The race to build practical quantum computers has reached a pivotal moment. What was once theoretical physics confined to academic papers is now becoming engineering reality in laboratories across the world.</p>

      <h2>Understanding Quantum Advantage</h2>
      <p>Unlike classical computers that process information in bits (0s and 1s), quantum computers harness the strange properties of quantum mechanics—superposition and entanglement—to perform calculations in fundamentally different ways.</p>
      
      <p>A quantum bit, or qubit, can exist in multiple states simultaneously. This means a quantum computer with just 50 qubits can represent more states than there are atoms in the observable universe. The implications are staggering.</p>

      <blockquote>"We're not just building faster computers—we're building a new kind of computer that thinks differently about problems." — Dr. John Preskill, Caltech</blockquote>

      <h2>Real-World Applications Emerging</h2>
      <p>While full-scale quantum computers remain years away, early applications are already showing promise:</p>
      
      <ul>
        <li><strong>Drug Discovery:</strong> Simulating molecular interactions to identify new treatments</li>
        <li><strong>Financial Modeling:</strong> Optimizing portfolios and risk assessment</li>
        <li><strong>Climate Science:</strong> More accurate climate models and predictions</li>
        <li><strong>Cryptography:</strong> Both breaking existing encryption and creating unbreakable new methods</li>
      </ul>

      <h2>The Security Implications</h2>
      <p>Perhaps no area will be more affected than cybersecurity. Today's encryption methods rely on mathematical problems that would take classical computers billions of years to solve. A sufficiently powerful quantum computer could crack them in hours.</p>
      
      <p>This has sparked a global race to develop "quantum-safe" cryptography before quantum computers become powerful enough to threaten current systems. The stakes couldn't be higher—everything from banking to national security depends on encryption.</p>

      <h3>The Road Ahead</h3>
      <p>Major challenges remain. Qubits are incredibly fragile, requiring near-absolute-zero temperatures and perfect isolation from environmental interference. Error rates are still too high for many practical applications.</p>
      
      <p>Yet progress is accelerating. IBM, Google, and startups worldwide are pushing boundaries, with each year bringing significant advances. The quantum revolution may be closer than we think.</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&h=800&fit=crop",
    category: "technology",
    author: authors[1],
    publishedAt: "2024-12-20",
    readTime: 8,
    featured: true,
    tags: ["quantum computing", "technology", "cryptography", "future"],
  },
  {
    id: "2",
    slug: "james-webb-telescope-discoveries-changing-astronomy",
    title: "The James Webb Space Telescope: A Year of Discoveries That Changed Astronomy",
    excerpt:
      "From the earliest galaxies to potentially habitable exoplanets, JWST has revolutionized our understanding of the cosmos in just twelve months.",
    content: `
      <p>When the James Webb Space Telescope began sending back its first images, astronomers around the world held their breath. What they saw exceeded every expectation.</p>

      <h2>Peering Back in Time</h2>
      <p>JWST's infrared capabilities allow it to see light that has traveled for over 13 billion years—showing us galaxies that formed just a few hundred million years after the Big Bang.</p>
      
      <p>What surprised researchers was finding these ancient galaxies far more developed than expected. Massive, well-structured galaxies shouldn't exist so early in cosmic history, yet there they were, challenging our models of galaxy formation.</p>

      <h2>Exoplanet Atmospheres Revealed</h2>
      <p>Perhaps even more exciting for those searching for life beyond Earth, JWST has begun analyzing the atmospheres of exoplanets with unprecedented detail.</p>
      
      <p>The telescope detected carbon dioxide in the atmosphere of WASP-39b, marking the first definitive detection of this molecule on an exoplanet. More tantalizingly, it found hints of water vapor and other organic molecules on several worlds.</p>

      <blockquote>"Every week brings a new discovery that would have been the highlight of a career just a decade ago. We're drinking from a firehose of cosmic knowledge." — Dr. Jane Rigby, JWST Operations Project Scientist</blockquote>

      <h2>Stellar Nurseries in Detail</h2>
      <p>The telescope's images of star-forming regions like the Carina Nebula have revealed never-before-seen details of how stars are born from clouds of gas and dust.</p>

      <h3>What's Next</h3>
      <p>With a planned operational lifetime of at least 20 years and a queue of observations stretching years into the future, JWST is just getting started. The best discoveries may still lie ahead.</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1200&h=800&fit=crop",
    category: "astronomy",
    author: authors[0],
    publishedAt: "2024-12-18",
    readTime: 7,
    featured: true,
    tags: ["space", "astronomy", "JWST", "exoplanets"],
  },
  {
    id: "3",
    slug: "artificial-general-intelligence-closer-than-expected",
    title: "Is Artificial General Intelligence Closer Than We Think?",
    excerpt:
      "Recent breakthroughs in large language models and multimodal AI have reignited debates about the timeline to AGI. Experts weigh in.",
    content: `
      <p>The question of when—or if—we'll achieve artificial general intelligence has taken on new urgency. Recent advances in AI capabilities have surprised even optimistic researchers.</p>

      <h2>Defining the Goal</h2>
      <p>AGI refers to AI systems that can match or exceed human cognitive abilities across virtually any intellectual task. Unlike narrow AI (which excels at specific tasks), AGI would be able to transfer knowledge between domains, reason abstractly, and learn from minimal examples.</p>

      <h2>Signs of Progress</h2>
      <p>Modern language models demonstrate remarkable emergent abilities—capabilities that appear suddenly as models scale up, without being explicitly programmed. These include:</p>
      
      <ul>
        <li>Multi-step reasoning and problem-solving</li>
        <li>Understanding context and nuance</li>
        <li>Generating creative content across formats</li>
        <li>Learning new tasks from just a few examples</li>
      </ul>

      <h2>The Skeptical View</h2>
      <p>Not everyone is convinced. Critics argue that current AI systems, however impressive, are fundamentally different from human intelligence. They lack true understanding, consciousness, and the ability to form genuine goals.</p>

      <blockquote>"We've built very sophisticated pattern matchers, not thinking machines. The gap between what we have and AGI may be much larger than it appears." — Dr. Gary Marcus, NYU</blockquote>

      <h3>Preparing for Either Scenario</h3>
      <p>Whether AGI arrives in years or decades, the implications are profound. Societies must prepare for both the opportunities and risks of increasingly capable AI systems.</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop",
    category: "artificial-intelligence",
    author: authors[1],
    publishedAt: "2024-12-15",
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
    publishedAt: "2024-12-12",
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
    publishedAt: "2024-12-10",
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
    publishedAt: "2024-12-08",
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
    publishedAt: "2024-12-05",
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
    publishedAt: "2024-12-01",
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
