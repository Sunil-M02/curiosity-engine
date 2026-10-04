import { articles, type Article, type Category } from '@/data/articles';

export interface TopicClusterDefinition {
  slug: string;
  name: string;
  description: string;
  category: Category;
  keywords: string[];
  priority: number;
  featured?: boolean;
  articleSlugs?: string[];
}

export const topicClusterDefinitions: TopicClusterDefinition[] = [
  {
    slug: 'how-ai-works',
    name: 'How AI Works',
    description: 'The models, neural networks, training methods, and core ideas behind modern AI.',
    category: 'artificial-intelligence',
    keywords: ['artificial intelligence', 'ai', 'machine learning', 'neural network', 'deep learning', 'transformer', 'llm', 'large language model', 'training'],
    priority: 100,
    featured: true,
  },
  {
    slug: 'ai-reliability',
    name: 'AI Reliability',
    description: 'Why AI systems fail, hallucinate, mislead, and how researchers evaluate reliability.',
    category: 'artificial-intelligence',
    keywords: ['hallucination', 'reliability', 'evaluation', 'benchmark', 'rag', 'retrieval augmented generation', 'fine-tuning', 'alignment'],
    priority: 95,
  },
  {
    slug: 'ai-agents',
    name: 'AI Agents',
    description: 'Autonomous AI systems, tools, memory, workflows, and real-world agent behavior.',
    category: 'artificial-intelligence',
    keywords: ['agent', 'ai agent', 'agents', 'autonomous', 'tool use', 'memory'],
    priority: 90,
  },
  {
    slug: 'ai-safety-society',
    name: 'AI Safety & Society',
    description: 'The safety, social, ethical, and governance questions surrounding increasingly capable AI.',
    category: 'artificial-intelligence',
    keywords: ['ai safety', 'safety', 'alignment', 'ethics', 'regulation', 'society', 'risk', 'deepfake'],
    priority: 85,
  },
  {
    slug: 'ai-infrastructure',
    name: 'AI Infrastructure',
    description: 'The chips, data centers, compute, and hardware that make modern AI possible.',
    category: 'artificial-intelligence',
    keywords: ['ai chip', 'ai chips', 'gpu', 'semiconductor', 'data center', 'compute', 'hardware', 'infrastructure'],
    priority: 80,
  },
  {
    slug: 'computing-semiconductors',
    name: 'Computing & Semiconductors',
    description: 'The chips, processors, architectures, and computing systems behind modern technology.',
    category: 'technology',
    keywords: ['semiconductor', 'chip', 'processor', 'cpu', 'gpu', 'quantum computing', 'quantum error correction', 'error correction', 'decoding', 'computing'],
    priority: 100,
    articleSlugs: ['quantum-error-correction-decoding-bottleneck-explained'],
  },
  {
    slug: 'internet-digital-systems',
    name: 'Internet & Digital Systems',
    description: 'The hidden systems, networks, protocols, and infrastructure that keep the digital world connected.',
    category: 'technology',
    keywords: ['internet', 'network', 'web', 'browser', 'server', 'cloud', 'data', 'digital'],
    priority: 90,
  },
  {
    slug: 'cybersecurity',
    name: 'Cybersecurity',
    description: 'How digital systems are attacked, protected, and made more resilient.',
    category: 'technology',
    keywords: ['cybersecurity', 'cyber security', 'security', 'hacking', 'hackers', 'malware', 'phishing', 'encryption', 'password'],
    priority: 85,
  },
  {
    slug: 'robotics-automation',
    name: 'Robotics & Automation',
    description: 'Machines that sense, move, learn, and increasingly operate in the physical world.',
    category: 'technology',
    keywords: ['robot', 'robotics', 'automation', 'autonomous', 'humanoid'],
    priority: 80,
  },
  {
    slug: 'physics-explained',
    name: 'Physics Explained',
    description: 'The laws, forces, particles, and strange phenomena that govern the physical universe.',
    category: 'science',
    keywords: ['physics', 'quantum', 'particle', 'gravity', 'relativity', 'energy', 'light'],
    priority: 100,
  },
  {
    slug: 'biology-life',
    name: 'Biology & Life',
    description: 'How living systems work, evolve, adapt, and interact with the world around them.',
    category: 'science',
    keywords: ['biology', 'cell', 'genetics', 'gene', 'evolution', 'animal', 'life', 'organism', 'amoeba', 'eukaryote', 'thermophile', 'thermophilic'],
    priority: 95,
  },
  {
    slug: 'brain-behavior',
    name: 'Brain & Behavior',
    description: 'The science of the brain, cognition, perception, behavior, and human decision-making.',
    category: 'science',
    keywords: ['brain', 'neuroscience', 'cognition', 'behavior', 'memory', 'consciousness', 'mind'],
    priority: 90,
  },
  {
    slug: 'earth-environment',
    name: 'Earth & Environment',
    description: 'The systems, processes, and changes shaping our planet.',
    category: 'science',
    keywords: ['earth', 'environment', 'climate', 'ocean', 'atmosphere', 'ecosystem', 'geology'],
    priority: 85,
  },
  {
    slug: 'scientific-discovery',
    name: 'Scientific Discovery',
    description: 'How researchers uncover surprising results and change what we know.',
    category: 'science',
    keywords: ['discovery', 'research', 'experiment', 'scientists', 'breakthrough'],
    priority: 80,
  },
  {
    slug: 'ancient-civilizations',
    name: 'Ancient Civilizations',
    description: 'The societies, cities, cultures, and achievements that shaped the ancient world.',
    category: 'history',
    keywords: ['ancient', 'civilization', 'egypt', 'rome', 'greece', 'mesopotamia', 'empire'],
    priority: 100,
  },
  {
    slug: 'archaeology-evidence',
    name: 'Archaeology & Evidence',
    description: 'What artifacts, excavations, and physical evidence reveal about the past.',
    category: 'history',
    keywords: ['archaeology', 'archaeological', 'artifact', 'excavation', 'evidence', 'burial', 'roman ruins', 'parch marks', 'cropmarks', 'aerial archaeology', 'Aventicum'],
    priority: 95,
  },
  {
    slug: 'ancient-technology',
    name: 'Ancient Technology',
    description: 'The engineering, inventions, and technical knowledge of earlier civilizations.',
    category: 'history',
    keywords: ['ancient technology', 'invention', 'engineering', 'technology', 'mechanism'],
    priority: 90,
  },
  {
    slug: 'historical-mysteries',
    name: 'Historical Mysteries',
    description: 'Unsolved historical questions examined through evidence rather than legend.',
    category: 'history',
    keywords: ['mystery', 'mysterious', 'lost', 'unknown', 'unsolved', 'forgotten'],
    priority: 85,
  },
  {
    slug: 'space-missions',
    name: 'Space Missions',
    description: 'The spacecraft, missions, and discoveries extending human reach beyond Earth.',
    category: 'astronomy',
    keywords: ['nasa', 'mission', 'spacecraft', 'telescope', 'artemis', 'rover'],
    priority: 100,
  },
  {
    slug: 'planetary-science',
    name: 'Planetary Science',
    description: 'Planets, moons, asteroids, comets, and the worlds of our solar system.',
    category: 'astronomy',
    keywords: ['planet', 'moon', 'asteroid', 'comet', 'mars', 'jupiter', 'solar system'],
    priority: 95,
  },
  {
    slug: 'stars-galaxies',
    name: 'Stars & Galaxies',
    description: 'How stars are born, evolve, die, and assemble into galaxies.',
    category: 'astronomy',
    keywords: ['star', 'stars', 'galaxy', 'galaxies', 'nebula', 'stellar'],
    priority: 90,
  },
  {
    slug: 'cosmology',
    name: 'Cosmology',
    description: 'The Big Bang, dark matter, dark energy, and the large-scale structure of the universe.',
    category: 'astronomy',
    keywords: ['cosmology', 'big bang', 'dark matter', 'dark energy', 'universe'],
    priority: 85,
  },
  {
    slug: 'future-energy',
    name: 'Future Energy',
    description: 'New ways of generating, storing, and using energy.',
    category: 'future-innovation',
    keywords: ['energy', 'battery', 'fusion', 'solar', 'power', 'storage'],
    priority: 100,
  },
  {
    slug: 'new-materials',
    name: 'New Materials',
    description: 'Materials research that could change electronics, construction, energy, and manufacturing.',
    category: 'future-innovation',
    keywords: ['material', 'materials', 'graphene', 'metamaterial', 'manufacturing'],
    priority: 95,
  },
  {
    slug: 'biotechnology',
    name: 'Biotechnology',
    description: 'Emerging biological technologies moving from research toward practical applications.',
    category: 'future-innovation',
    keywords: ['biotechnology', 'biotech', 'gene editing', 'crispr', 'synthetic biology'],
    priority: 90,
  },
  {
    slug: 'emerging-technologies',
    name: 'Emerging Technologies',
    description: 'Technologies moving from experimental research toward real-world deployment.',
    category: 'future-innovation',
    keywords: ['emerging technology', 'future technology', 'innovation', 'prototype', 'breakthrough'],
    priority: 85,
  },
  {
    slug: 'human-machine-futures',
    name: 'Human-Machine Futures',
    description: 'How emerging technologies could change the relationship between people and machines.',
    category: 'future-innovation',
    keywords: ['human machine', 'brain computer', 'interface', 'augmentation', 'future of'],
    priority: 80,
  },
  {
    slug: 'memory-cognition',
    name: 'Memory & Cognition',
    description: 'How the mind stores information, recognizes patterns, and constructs what we experience.',
    category: 'psychology-mind',
    keywords: ['memory', 'cognition', 'attention', 'learning', 'recall', 'forget'],
    priority: 100,
  },
  {
    slug: 'human-behavior',
    name: 'Human Behavior',
    description: 'Why people behave the way they do and what psychological research can actually explain.',
    category: 'psychology-mind',
    keywords: ['behavior', 'psychology', 'human behavior', 'social', 'emotion'],
    priority: 95,
  },
  {
    slug: 'decision-making',
    name: 'Decision Making',
    description: 'The biases, shortcuts, and mental models that shape everyday decisions.',
    category: 'psychology-mind',
    keywords: ['decision', 'decision making', 'bias', 'mental model', 'choice'],
    priority: 90,
  },
  {
    slug: 'consciousness',
    name: 'Consciousness',
    description: 'What science can—and cannot yet—tell us about subjective experience.',
    category: 'psychology-mind',
    keywords: ['consciousness', 'awareness', 'perception', 'self'],
    priority: 85,
  },
  {
    slug: 'habits-mental-models',
    name: 'Habits & Mental Models',
    description: 'How repeated behavior and mental frameworks influence how we think and act.',
    category: 'psychology-mind',
    keywords: ['habit', 'habits', 'mental model', 'routine', 'behavior change'],
    priority: 80,
  },
];

const normalize = (value: string) => value.trim().toLowerCase();

export const getClusterArticles = (cluster: TopicClusterDefinition): Article[] => {
  const keywords = cluster.keywords.map(normalize);
  return articles.filter((article) => {
    if (article.category !== cluster.category) return false;
    if (cluster.articleSlugs?.includes(article.slug)) return true;

    // Prefer explicit article tags. Title/excerpt matching is a fallback for
    // descriptive phrases, while short/generic terms are never substring-matched.
    const tags = article.tags.map(normalize);
    const searchableText = normalize(`${article.title} ${article.excerpt}`);

    return keywords.some((keyword) => {
      if (tags.includes(keyword)) return true;
      if (keyword.length < 5) return false;
      return searchableText.includes(keyword);
    });
  });
};

export const getActiveTopicClusters = (): Array<TopicClusterDefinition & { articles: Article[] }> =>
  topicClusterDefinitions
    .map((cluster) => ({ ...cluster, articles: getClusterArticles(cluster) }))
    .filter((cluster) => cluster.articles.length >= 3)
    .sort((a, b) => b.priority - a.priority);

export const getTopicClustersByCategory = (category: Category) =>
  getActiveTopicClusters().filter((cluster) => cluster.category === category);

export const getFeaturedTopicCluster = () =>
  getActiveTopicClusters().find((cluster) => cluster.featured) ??
  getActiveTopicClusters()[0];

export const getClusterBySlug = (slug: string) =>
  getActiveTopicClusters().find((cluster) => cluster.slug === slug);

export const getClusterFeaturedArticle = (cluster: TopicClusterDefinition) => {
  const clusterArticles = getClusterArticles(cluster);
  return [...clusterArticles].sort((a, b) => {
    const aScore = (a.editorsPick ? 2 : 0) + (a.featured ? 1 : 0);
    const bScore = (b.editorsPick ? 2 : 0) + (b.featured ? 1 : 0);
    if (bScore !== aScore) return bScore - aScore;
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  })[0];
};

export const getArticleCluster = (article: Article) =>
  getActiveTopicClusters()
    .filter((cluster) => cluster.category === article.category && getClusterArticles(cluster).some((item) => item.id === article.id))
    .sort((a, b) => b.priority - a.priority)[0];
