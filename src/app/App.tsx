import { useState } from "react";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Separator } from "./components/ui/separator";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { Search, Menu, X, ArrowRight, Clock, BookOpen, Twitter, Instagram, Rss, ChevronRight } from "lucide-react";

const CATEGORIES = ["All", "Travel", "Food", "Technology", "Lifestyle", "Culture", "Nature"];

const ARTICLES = [
  {
    id: 1,
    title: "The Quiet Art of Slow Travel: What Rushing Misses",
    excerpt: "There's a particular kind of seeing that only happens when you stop trying to collect experiences and simply let a place unfold around you.",
    category: "Travel",
    author: "Maya Chen",
    date: "June 12, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1498591100911-8c4880f7c580?w=800&h=500&fit=crop&auto=format",
    featured: true,
  },
  {
    id: 2,
    title: "Morning Rituals: How a Cup of Coffee Became My Philosophy",
    excerpt: "The steam rising from a ceramic mug at 6am contains multitudes — patience, intention, and a quiet refusal to let the day begin without ceremony.",
    category: "Lifestyle",
    author: "James Okafor",
    date: "June 9, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1558210834-473f430c09ac?w=800&h=500&fit=crop&auto=format",
  },
  {
    id: 3,
    title: "Fermentation, Patience, and the Recipes That Take All Week",
    excerpt: "Some of the best food can't be hurried. Kimchi, sourdough, miso — they demand that you surrender control and trust in invisible life.",
    category: "Food",
    author: "Lena Park",
    date: "June 6, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1636647511729-6703539ba71f?w=800&h=500&fit=crop&auto=format",
  },
  {
    id: 4,
    title: "The Hidden Cost of Always-On: A Digital Detox Diary",
    excerpt: "Ten days without a smartphone, deep in the mountains of Albania. Here's what I learned — and what I missed less than I expected.",
    category: "Technology",
    author: "Remi Duval",
    date: "June 3, 2026",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=500&fit=crop&auto=format",
  },
  {
    id: 5,
    title: "Mountain Roads and the People Who Know Every Bend",
    excerpt: "On a two-week drive through the Dolomites, I learned that the best guides are never found in apps.",
    category: "Travel",
    author: "Maya Chen",
    date: "May 30, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1610191434707-fc7b16541c1a?w=800&h=500&fit=crop&auto=format",
  },
  {
    id: 6,
    title: "Why I Started Baking Bread at 40 and Never Looked Back",
    excerpt: "It starts with flour and water. Then it becomes something else entirely — a meditation, a discipline, a weekly anchor.",
    category: "Food",
    author: "Lena Park",
    date: "May 26, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1592837613828-4b65deb44f15?w=800&h=500&fit=crop&auto=format",
  },
  {
    id: 7,
    title: "Designing for Calm: What Software Can Learn from Architecture",
    excerpt: "The buildings we love don't shout for attention. They guide, contain, and reveal. What if every interface worked that way?",
    category: "Technology",
    author: "Remi Duval",
    date: "May 22, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=800&h=500&fit=crop&auto=format",
  },
  {
    id: 8,
    title: "Grasslands at Golden Hour: A Season of Stillness",
    excerpt: "You don't have to go far to find wildness. Sometimes it's just at the edge of your own ordinary field, waiting for you to notice.",
    category: "Nature",
    author: "James Okafor",
    date: "May 18, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1604715686140-d5bef96c8b9d?w=800&h=500&fit=crop&auto=format",
  },
];

const FEATURED = ARTICLES[0];

export default function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = ARTICLES.filter((a) => {
    const matchCat = activeCategory === "All" || a.category === activeCategory;
    const matchSearch =
      searchQuery === "" ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ fontFamily: "var(--font-body)" }} className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <span style={{ fontFamily: "var(--font-display)" }} className="text-2xl tracking-tight text-foreground">
              The Ruminate Club<span style={{ color: "var(--accent)" }}>.</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {["Home", "Articles", "Categories", "About"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-full hover:bg-secondary transition-colors"
              aria-label="Search"
            >
              <Search size={18} />
            </button>
            <Button
              size="sm"
              className="hidden md:flex rounded-full px-5 text-sm"
              style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
            >
              Subscribe
            </Button>
            <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-border bg-background px-6 py-3">
            <div className="max-w-xl mx-auto relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                autoFocus
                placeholder="Search articles…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-secondary border-0 rounded-full text-sm"
              />
            </div>
          </div>
        )}

        {menuOpen && (
          <div className="md:hidden border-t border-border bg-background px-6 py-4 flex flex-col gap-4">
            {["Home", "Articles", "Categories", "About"].map((item) => (
              <a key={item} href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {item}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Hero / Featured */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-12">
        <div className="grid md:grid-cols-[1fr_420px] gap-10 items-center">
          <div className="order-2 md:order-1 space-y-6">
            <Badge
              className="rounded-full px-3 py-1 text-xs uppercase tracking-widest border"
              style={{ background: "rgba(200,82,42,0.1)", color: "var(--accent)", borderColor: "rgba(200,82,42,0.2)" }}
            >
              Featured
            </Badge>
            <h1
              style={{ fontFamily: "var(--font-display)" }}
              className="text-4xl md:text-5xl lg:text-6xl leading-tight text-foreground"
            >
              {FEATURED.title}
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-lg">{FEATURED.excerpt}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {FEATURED.readTime}
              </span>
              <Separator orientation="vertical" className="h-4" />
              <span>{FEATURED.author}</span>
              <Separator orientation="vertical" className="h-4" />
              <span>{FEATURED.date}</span>
            </div>
            <button
              className="group flex items-center gap-2 px-6 py-3 rounded-full text-sm transition-all duration-300 hover:opacity-90"
              style={{ background: "var(--foreground)", color: "var(--background)" }}
            >
              Read Article
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-secondary shadow-xl">
              <ImageWithFallback
                src={FEATURED.image}
                alt={FEATURED.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-4 left-4">
                <Badge className="bg-background/90 text-foreground border-0 backdrop-blur-sm rounded-full px-3 text-xs">
                  {FEATURED.category}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <Separator />
      </div>

      {/* Category Filter */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center gap-3 overflow-x-auto pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="shrink-0 px-5 py-2 rounded-full text-sm transition-all duration-200"
              style={
                activeCategory === cat
                  ? { background: "var(--foreground)", color: "var(--background)" }
                  : { background: "var(--secondary)", color: "var(--muted-foreground)" }
              }
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Article Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="flex items-baseline justify-between mb-8">
          <h2 style={{ fontFamily: "var(--font-display)" }} className="text-2xl text-foreground">
            {activeCategory === "All" ? "Latest Articles" : activeCategory}
          </h2>
          <span className="text-sm text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "article" : "articles"}
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <BookOpen size={40} className="mx-auto mb-4 opacity-30" />
            <p>No articles found. Try a different search or category.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </section>

      {/* Pull Quote */}
      <section className="py-20 px-6" style={{ background: "var(--foreground)", color: "var(--background)" }}>
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <p
            style={{ fontFamily: "var(--font-display)", color: "var(--background)" }}
            className="text-3xl md:text-4xl italic leading-relaxed"
          >
            "Good writing is not a performance. It's an invitation to see the world through someone else's eyes."
          </p>
          <span className="text-sm tracking-widest uppercase opacity-50">— The Folio Manifesto</span>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="bg-card rounded-3xl p-10 md:p-16 text-center space-y-6 border border-border">
          <Badge
            className="rounded-full px-3 text-xs uppercase tracking-widest border"
            style={{ background: "rgba(200,82,42,0.1)", color: "var(--accent)", borderColor: "rgba(200,82,42,0.2)" }}
          >
            Newsletter
          </Badge>
          <h2
            style={{ fontFamily: "var(--font-display)" }}
            className="text-3xl md:text-4xl text-foreground"
          >
            Words worth reading, once a week
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
            No algorithm, no noise. Just thoughtfully selected articles delivered quietly to your inbox every Sunday morning.
          </p>
          {subscribed ? (
            <div className="flex items-center justify-center gap-2" style={{ color: "var(--accent)" }}>
              <ChevronRight size={18} />
              <span className="text-sm">You're in. See you Sunday.</span>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSubscribed(true);
              }}
              className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto"
            >
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-secondary border-0 rounded-full text-sm flex-1"
              />
              <button
                type="submit"
                className="rounded-full px-6 py-2 text-sm shrink-0 transition-opacity hover:opacity-90"
                style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
              >
                Subscribe
              </button>
            </form>
          )}
          <p className="text-xs text-muted-foreground">No spam, ever. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-10">
            <div className="md:col-span-2 space-y-4">
              <span style={{ fontFamily: "var(--font-display)" }} className="text-2xl text-foreground">
                Folio<span style={{ color: "var(--accent)" }}>.</span>
              </span>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                A personal blog about travel, food, technology, and the things that make a quiet life interesting.
              </p>
              <div className="flex gap-3">
                {[Twitter, Instagram, Rss].map((Icon, i) => (
                  <button
                    key={i}
                    className="p-2 rounded-full bg-secondary hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                  >
                    <Icon size={16} />
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm text-foreground tracking-widest uppercase">Explore</h4>
              <ul className="space-y-2">
                {["All Articles", "Travel", "Food", "Technology", "Lifestyle"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      style={{ ["--hover-color" as string]: "var(--accent)" }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm text-foreground tracking-widest uppercase">About</h4>
              <ul className="space-y-2">
                {["About the Author", "Contact", "Newsletter", "RSS Feed"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-muted-foreground">
            <span>© 2026 Folio. A side project with love.</span>
            <span>Made with curiosity and too much coffee.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ArticleCard({ article }: { article: (typeof ARTICLES)[number] }) {
  return (
    <article className="group cursor-pointer flex flex-col gap-4">
      <div className="relative rounded-xl overflow-hidden aspect-[3/2] bg-secondary">
        <ImageWithFallback
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <Badge className="bg-background/90 text-foreground border-0 backdrop-blur-sm rounded-full px-2.5 py-0.5 text-xs">
            {article.category}
          </Badge>
        </div>
      </div>
      <div className="space-y-2 flex-1">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {article.readTime}
          </span>
          <span>{article.date}</span>
        </div>
        <h3
          style={{ fontFamily: "var(--font-display)" }}
          className="text-lg leading-snug text-foreground transition-colors duration-200 group-hover:text-accent"
        >
          {article.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{article.excerpt}</p>
      </div>
      <div className="flex items-center justify-between pt-1">
        <span className="text-xs text-muted-foreground">{article.author}</span>
        <span
          className="text-xs flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ color: "var(--accent)" }}
        >
          Read <ArrowRight size={12} />
        </span>
      </div>
    </article>
  );
}
