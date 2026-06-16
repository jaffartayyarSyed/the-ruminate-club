import { useEffect, useMemo, useState } from "react";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Separator } from "./components/ui/separator";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import {
  ArrowRight,
  BookOpen,
  Clock,
  ChevronRight,
  Instagram,
  Menu,
  Rss,
  Search,
  Sparkles,
  Star,
  Twitter,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", path: "/" },
  { label: "Articles", path: "/articles" },
  { label: "Categories", path: "/categories" },
  { label: "About", path: "/about" },
] as const;

type RoutePath = (typeof NAV_ITEMS)[number]["path"];

const CATEGORIES = ["All", "Travel", "Food", "Technology", "Lifestyle", "Culture", "Nature"] as const;

const ARTICLES = [
  {
    id: 1,
    title: "The Quiet Art of Slow Travel: What Rushing Misses",
    excerpt:
      "There's a particular kind of seeing that only happens when you stop trying to collect experiences and simply let a place unfold around you.",
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
    excerpt:
      "The steam rising from a ceramic mug at 6am contains multitudes — patience, intention, and a quiet refusal to let the day begin without ceremony.",
    category: "Lifestyle",
    author: "James Okafor",
    date: "June 9, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1558210834-473f430c09ac?w=800&h=500&fit=crop&auto=format",
  },
  {
    id: 3,
    title: "Fermentation, Patience, and the Recipes That Take All Week",
    excerpt:
      "Some of the best food can't be hurried. Kimchi, sourdough, miso — they demand that you surrender control and trust in invisible life.",
    category: "Food",
    author: "Lena Park",
    date: "June 6, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1636647511729-6703539ba71f?w=800&h=500&fit=crop&auto=format",
  },
  {
    id: 4,
    title: "The Hidden Cost of Always-On: A Digital Detox Diary",
    excerpt:
      "Ten days without a smartphone, deep in the mountains of Albania. Here's what I learned — and what I missed less than I expected.",
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
    excerpt:
      "It starts with flour and water. Then it becomes something else entirely — a meditation, a discipline, a weekly anchor.",
    category: "Food",
    author: "Lena Park",
    date: "May 26, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1592837613828-4b65deb44f15?w=800&h=500&fit=crop&auto=format",
  },
  {
    id: 7,
    title: "Designing for Calm: What Software Can Learn from Architecture",
    excerpt:
      "The buildings we love don't shout for attention. They guide, contain, and reveal. What if every interface worked that way?",
    category: "Technology",
    author: "Remi Duval",
    date: "May 22, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=800&h=500&fit=crop&auto=format",
  },
  {
    id: 8,
    title: "Grasslands at Golden Hour: A Season of Stillness",
    excerpt:
      "You don't have to go far to find wildness. Sometimes it's just at the edge of your own ordinary field, waiting for you to notice.",
    category: "Nature",
    author: "James Okafor",
    date: "May 18, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1604715686140-d5bef96c8b9d?w=800&h=500&fit=crop&auto=format",
  },
] as const;

const FEATURED = ARTICLES[0];

type Article = (typeof ARTICLES)[number];

function normalizePath(pathname: string): RoutePath {
  if (pathname.startsWith("/articles")) return "/articles";
  if (pathname.startsWith("/categories")) return "/categories";
  if (pathname.startsWith("/about")) return "/about";
  return "/";
}

export default function App() {
  const [pathname, setPathname] = useState<RoutePath>(() => normalizePath(window.location.pathname));
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handlePopState = () => {
      setPathname(normalizePath(window.location.pathname));
      setMenuOpen(false);
      setSearchOpen(false);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (to: RoutePath) => {
    if (to === pathname) return;
    window.history.pushState({}, "", to);
    setPathname(to);
    setMenuOpen(false);
    setSearchOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredArticles = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return ARTICLES.filter((article) => {
      const categoryMatch = activeCategory === "All" || article.category === activeCategory;
      const searchMatch =
        query === "" ||
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query) ||
        article.author.toLowerCase().includes(query);

      return categoryMatch && searchMatch;
    });
  }, [activeCategory, searchQuery]);

  const categorySummaries = useMemo(
    () =>
      CATEGORIES.filter((category) => category !== "All").map((category) => {
        const articles = ARTICLES.filter((article) => article.category === category);
        return {
          category,
          count: articles.length,
          image: articles[0]?.image,
          title: articles[0]?.title,
          excerpt: articles[0]?.excerpt,
        };
      }),
    [],
  );

  const groupedByCategory = useMemo(
    () =>
      CATEGORIES.filter((category) => category !== "All").map((category) => ({
        category,
        articles: filteredArticles.filter((article) => article.category === category),
      })),
    [filteredArticles],
  );

  const scrollToNewsletter = () => {
    navigate("/");
    window.setTimeout(() => {
      document.getElementById("newsletter")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const selectCategory = (category: (typeof CATEGORIES)[number]) => {
    setActiveCategory(category);
    if (pathname !== "/articles") {
      navigate("/articles");
    }
  };

  return (
    <div style={{ fontFamily: "var(--font-body)" }} className="min-h-screen bg-background text-foreground">
      <SiteHeader
        pathname={pathname}
        menuOpen={menuOpen}
        searchOpen={searchOpen}
        searchQuery={searchQuery}
        onNavigate={navigate}
        onMenuToggle={() => setMenuOpen((open) => !open)}
        onSearchToggle={() => setSearchOpen((open) => !open)}
        onSearchQueryChange={setSearchQuery}
        onSubscribeClick={scrollToNewsletter}
      />

      <main>
        {pathname === "/" && (
          <HomePage
            featured={FEATURED}
            filteredArticles={filteredArticles}
            activeCategory={activeCategory}
            onSelectCategory={selectCategory}
            email={email}
            setEmail={setEmail}
            subscribed={subscribed}
            setSubscribed={setSubscribed}
          />
        )}

        {pathname === "/articles" && (
          <ArticlesPage
            articles={filteredArticles}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            onNavigate={navigate}
          />
        )}

        {pathname === "/categories" && (
          <CategoriesPage
            categorySummaries={categorySummaries}
            groupedByCategory={groupedByCategory}
            activeCategory={activeCategory}
            onSelectCategory={selectCategory}
          />
        )}

        {pathname === "/about" && <AboutPage onNavigate={navigate} />}
      </main>

      <SiteFooter onNavigate={navigate} onSubscribeClick={scrollToNewsletter} />
    </div>
  );
}

type SiteHeaderProps = {
  pathname: RoutePath;
  menuOpen: boolean;
  searchOpen: boolean;
  searchQuery: string;
  onNavigate: (path: RoutePath) => void;
  onMenuToggle: () => void;
  onSearchToggle: () => void;
  onSearchQueryChange: (value: string) => void;
  onSubscribeClick: () => void;
};

function SiteHeader({
  pathname,
  menuOpen,
  searchOpen,
  searchQuery,
  onNavigate,
  onMenuToggle,
  onSearchToggle,
  onSearchQueryChange,
  onSubscribeClick,
}: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <SiteLink to="/" pathname={pathname} onNavigate={onNavigate} className="flex items-center gap-2">
          <span style={{ fontFamily: "var(--font-display)" }} className="text-2xl tracking-tight text-foreground">
            The Ruminate Club<span style={{ color: "var(--accent)" }}>.</span>
          </span>
        </SiteLink>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <SiteLink
              key={item.path}
              to={item.path}
              pathname={pathname}
              onNavigate={onNavigate}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {item.label}
            </SiteLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onSearchToggle}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
            aria-label="Search articles"
          >
            <Search size={18} />
          </button>
          <Button
            type="button"
            size="sm"
            className="hidden md:flex rounded-full px-5 text-sm"
            style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
            onClick={onSubscribeClick}
          >
            Subscribe
          </Button>
          <button className="md:hidden p-2" onClick={onMenuToggle} aria-label="Open menu">
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
              placeholder="Search articles, authors, or categories…"
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              className="pl-9 bg-secondary border-0 rounded-full text-sm"
            />
          </div>
        </div>
      )}

      {menuOpen && (
        <div className="md:hidden border-t border-border bg-background px-6 py-4 flex flex-col gap-4">
          {NAV_ITEMS.map((item) => (
            <SiteLink
              key={item.path}
              to={item.path}
              pathname={pathname}
              onNavigate={onNavigate}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </SiteLink>
          ))}
        </div>
      )}
    </header>
  );
}

type SiteLinkProps = {
  to: RoutePath;
  pathname: RoutePath;
  onNavigate: (path: RoutePath) => void;
  className?: string;
  children: React.ReactNode;
};

function SiteLink({ to, pathname, onNavigate, className, children }: SiteLinkProps) {
  return (
    <a
      href={to}
      onClick={(event) => {
        event.preventDefault();
        onNavigate(to);
      }}
      className={className}
      aria-current={pathname === to ? "page" : undefined}
    >
      {children}
    </a>
  );
}

type HomePageProps = {
  featured: Article;
  filteredArticles: Article[];
  activeCategory: (typeof CATEGORIES)[number];
  onSelectCategory: (category: (typeof CATEGORIES)[number]) => void;
  email: string;
  setEmail: (value: string) => void;
  subscribed: boolean;
  setSubscribed: (value: boolean) => void;
};

function HomePage({
  featured,
  filteredArticles,
  activeCategory,
  onSelectCategory,
  email,
  setEmail,
  subscribed,
  setSubscribed,
}: HomePageProps) {
  return (
    <>
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-12">
        <div className="grid md:grid-cols-[1fr_420px] gap-10 items-center">
          <div className="order-2 md:order-1 space-y-6">
            <Badge
              className="rounded-full px-3 py-1 text-xs uppercase tracking-widest border"
              style={{ background: "rgba(200,82,42,0.1)", color: "var(--accent)", borderColor: "rgba(200,82,42,0.2)" }}
            >
              Featured
            </Badge>
            <h1 style={{ fontFamily: "var(--font-display)" }} className="text-4xl md:text-5xl lg:text-6xl leading-tight text-foreground">
              {featured.title}
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-lg">{featured.excerpt}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {featured.readTime}
              </span>
              <Separator orientation="vertical" className="h-4" />
              <span>{featured.author}</span>
              <Separator orientation="vertical" className="h-4" />
              <span>{featured.date}</span>
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
              <ImageWithFallback src={featured.image} alt={featured.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              <div className="absolute bottom-4 left-4">
                <Badge className="bg-background/90 text-foreground border-0 backdrop-blur-sm rounded-full px-3 text-xs">
                  {featured.category}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <Separator />
      </div>

      <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center gap-3 overflow-x-auto pb-1">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className="shrink-0 px-5 py-2 rounded-full text-sm transition-all duration-200"
              style={
                activeCategory === category
                  ? { background: "var(--foreground)", color: "var(--background)" }
                  : { background: "var(--secondary)", color: "var(--muted-foreground)" }
              }
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="flex items-baseline justify-between mb-8 gap-4 flex-wrap">
          <h2 style={{ fontFamily: "var(--font-display)" }} className="text-2xl text-foreground">
            {activeCategory === "All" ? "Latest Articles" : activeCategory}
          </h2>
          <span className="text-sm text-muted-foreground">
            {filteredArticles.length} {filteredArticles.length === 1 ? "article" : "articles"}
          </span>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground rounded-3xl border border-border bg-card">
            <BookOpen size={40} className="mx-auto mb-4 opacity-30" />
            <p>No articles found. Try a different search or category.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.slice(0, 6).map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </section>

      <section className="py-20 px-6" style={{ background: "var(--foreground)", color: "var(--background)" }}>
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <p style={{ fontFamily: "var(--font-display)", color: "var(--background)" }} className="text-3xl md:text-4xl italic leading-relaxed">
            "Good writing is not a performance. It's an invitation to see the world through someone else's eyes."
          </p>
          <span className="text-sm tracking-widest uppercase opacity-50">— The Folio Manifesto</span>
        </div>
      </section>

      <section id="newsletter" className="max-w-6xl mx-auto px-6 py-20">
        <div className="bg-card rounded-3xl p-10 md:p-16 text-center space-y-6 border border-border">
          <Badge
            className="rounded-full px-3 text-xs uppercase tracking-widest border"
            style={{ background: "rgba(200,82,42,0.1)", color: "var(--accent)", borderColor: "rgba(200,82,42,0.2)" }}
          >
            Newsletter
          </Badge>
          <h2 style={{ fontFamily: "var(--font-display)" }} className="text-3xl md:text-4xl text-foreground">
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
              onSubmit={(event) => {
                event.preventDefault();
                if (email) setSubscribed(true);
              }}
              className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto"
            >
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
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
    </>
  );
}

type ArticlesPageProps = {
  articles: Article[];
  activeCategory: (typeof CATEGORIES)[number];
  onSelectCategory: (category: (typeof CATEGORIES)[number]) => void;
  onNavigate: (path: RoutePath) => void;
};

function ArticlesPage({ articles, activeCategory, onSelectCategory, onNavigate }: ArticlesPageProps) {
  return (
    <>
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-12">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-stretch">
          <div className="space-y-6">
            <Badge
              className="rounded-full px-3 py-1 text-xs uppercase tracking-widest border"
              style={{ background: "rgba(200,82,42,0.1)", color: "var(--accent)", borderColor: "rgba(200,82,42,0.2)" }}
            >
              Articles Archive
            </Badge>
            <h1 style={{ fontFamily: "var(--font-display)" }} className="text-4xl md:text-5xl lg:text-6xl leading-tight">
              Reading room for travel, food, technology, and quieter ideas.
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
              Browse the full archive, narrow by topic, and jump between pieces that share the same calm editorial voice as the homepage.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button className="rounded-full px-5" style={{ background: "var(--foreground)", color: "var(--background)" }} onClick={() => onNavigate("/")}>Back to home</Button>
              <Button variant="outline" className="rounded-full px-5" onClick={() => onSelectCategory("Travel")}>
                View travel picks
              </Button>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden border border-border bg-card shadow-xl">
            <div className="grid grid-rows-[2fr_1fr] h-full">
              <div className="relative min-h-[280px]">
                <ImageWithFallback src={FEATURED.image} alt={FEATURED.title} className="w-full h-full object-cover" />
              </div>
              <div className="grid grid-cols-2 gap-4 p-5 bg-card">
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">Featured story</span>
                  <p style={{ fontFamily: "var(--font-display)" }} className="text-lg leading-snug">
                    {FEATURED.title}
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">Archive size</span>
                  <p style={{ fontFamily: "var(--font-display)" }} className="text-lg leading-snug">
                    {articles.length} matching pieces
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <Separator />
      </div>

      <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center gap-3 overflow-x-auto pb-1">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className="shrink-0 px-5 py-2 rounded-full text-sm transition-all duration-200"
              style={
                activeCategory === category
                  ? { background: "var(--foreground)", color: "var(--background)" }
                  : { background: "var(--secondary)", color: "var(--muted-foreground)" }
              }
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
          <div>
            <h2 style={{ fontFamily: "var(--font-display)" }} className="text-2xl text-foreground">
              {activeCategory === "All" ? "All articles" : `${activeCategory} articles`}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {articles.length} {articles.length === 1 ? "story" : "stories"} found in this view.
            </p>
          </div>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground rounded-3xl border border-border bg-card">
            <BookOpen size={40} className="mx-auto mb-4 opacity-30" />
            <p>No articles found. Try a different search or category.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

type CategoriesPageProps = {
  categorySummaries: Array<{
    category: string;
    count: number;
    image?: string;
    title?: string;
    excerpt?: string;
  }>;
  groupedByCategory: Array<{
    category: string;
    articles: Article[];
  }>;
  activeCategory: (typeof CATEGORIES)[number];
  onSelectCategory: (category: (typeof CATEGORIES)[number]) => void;
};

function CategoriesPage({ categorySummaries, groupedByCategory, activeCategory, onSelectCategory }: CategoriesPageProps) {
  return (
    <>
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-12">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 items-start">
          <div className="space-y-6">
            <Badge
              className="rounded-full px-3 py-1 text-xs uppercase tracking-widest border"
              style={{ background: "rgba(200,82,42,0.1)", color: "var(--accent)", borderColor: "rgba(200,82,42,0.2)" }}
            >
              Categories
            </Badge>
            <h1 style={{ fontFamily: "var(--font-display)" }} className="text-4xl md:text-5xl lg:text-6xl leading-tight">
              Browse by mood, topic, and pace.
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
              The same editorial palette, organized into the lanes our readers already care about.
            </p>
            <div className="flex flex-wrap gap-3">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => onSelectCategory(category)}
                  className="px-4 py-2 rounded-full text-sm transition-all duration-200"
                  style={
                    activeCategory === category
                      ? { background: "var(--foreground)", color: "var(--background)" }
                      : { background: "var(--secondary)", color: "var(--muted-foreground)" }
                  }
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {categorySummaries.map((summary) => (
              <article key={summary.category} className="rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:-translate-y-1 transition-transform duration-300">
                <div className="relative aspect-[4/3] bg-secondary">
                  {summary.image ? <ImageWithFallback src={summary.image} alt={summary.category} className="w-full h-full object-cover" /> : null}
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-background/90 text-foreground border-0 backdrop-blur-sm rounded-full px-2.5 py-0.5 text-xs">
                      {summary.category}
                    </Badge>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <h3 style={{ fontFamily: "var(--font-display)" }} className="text-lg leading-snug">
                      {summary.category}
                    </h3>
                    <span className="text-xs text-muted-foreground">{summary.count} posts</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {summary.excerpt ?? "A calm stack of pieces shaped around the same editorial tone as the homepage."}
                  </p>
                  <button onClick={() => onSelectCategory(summary.category as (typeof CATEGORIES)[number])} className="text-sm flex items-center gap-1" style={{ color: "var(--accent)" }}>
                    Explore
                    <ArrowRight size={14} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <Separator />
      </div>

      <section className="max-w-6xl mx-auto px-6 py-16 space-y-14">
        {groupedByCategory.map((group) => (
          <div key={group.category} className="space-y-6">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h2 style={{ fontFamily: "var(--font-display)" }} className="text-2xl text-foreground">
                  {group.category}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {group.articles.length} matching story{group.articles.length === 1 ? "" : "ies"}
                </p>
              </div>
              <button onClick={() => onSelectCategory(group.category as (typeof CATEGORIES)[number])} className="text-sm flex items-center gap-1" style={{ color: "var(--accent)" }}>
                Filter to category
                <ArrowRight size={14} />
              </button>
            </div>

            {group.articles.length === 0 ? (
              <div className="rounded-2xl border border-border bg-card p-8 text-sm text-muted-foreground">
                No stories in this category for the current search.
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {group.articles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            )}
          </div>
        ))}
      </section>
    </>
  );
}

type AboutPageProps = {
  onNavigate: (path: RoutePath) => void;
};

function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <>
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-12">
        <div className="grid lg:grid-cols-[1fr_420px] gap-10 items-center">
          <div className="space-y-6">
            <Badge
              className="rounded-full px-3 py-1 text-xs uppercase tracking-widest border"
              style={{ background: "rgba(200,82,42,0.1)", color: "var(--accent)", borderColor: "rgba(200,82,42,0.2)" }}
            >
              About the Club
            </Badge>
            <h1 style={{ fontFamily: "var(--font-display)" }} className="text-4xl md:text-5xl lg:text-6xl leading-tight">
              A quiet magazine about the things worth noticing.
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
              The Ruminate Club is a personal blog with a magazine rhythm: long reads, calm surfaces, and a visual language that leaves space for the story.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button className="rounded-full px-5" style={{ background: "var(--foreground)", color: "var(--background)" }} onClick={() => onNavigate("/")}>Back to home</Button>
              <Button variant="outline" className="rounded-full px-5" onClick={() => onNavigate("/articles")}>
                Browse articles
              </Button>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden border border-border bg-card shadow-xl">
            <ImageWithFallback src={FEATURED.image} alt="Editorial atmosphere" className="w-full h-full object-cover aspect-[4/5]" />
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <Separator />
      </div>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {[
            {
              title: "Editorial voice",
              icon: Sparkles,
              body: "Warm, observant, and deliberately paced. We value clarity over noise and atmosphere over spectacle.",
            },
            {
              title: "Visual rhythm",
              icon: Star,
              body: "The palette, spacing, and imagery all carry the same calm tone so every page feels like part of one club.",
            },
            {
              title: "Topic range",
              icon: BookOpen,
              body: "Travel, food, technology, lifestyle, culture, and nature all live under the same editorial roof.",
            },
          ].map((item) => (
            <article key={item.title} className="rounded-3xl border border-border bg-card p-8 space-y-4">
              <item.icon size={22} style={{ color: "var(--accent)" }} />
              <h2 style={{ fontFamily: "var(--font-display)" }} className="text-2xl text-foreground">
                {item.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
          <article className="rounded-3xl border border-border bg-card p-8 md:p-10 space-y-6">
            <Badge
              className="rounded-full px-3 text-xs uppercase tracking-widest border"
              style={{ background: "rgba(200,82,42,0.1)", color: "var(--accent)", borderColor: "rgba(200,82,42,0.2)" }}
            >
              What we publish
            </Badge>
            <h2 style={{ fontFamily: "var(--font-display)" }} className="text-3xl text-foreground">
              Articles with room to breathe.
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Every story is built from the same ingredients: a strong opening, a clear point of view, and imagery that matches the pace of the writing.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {ARTICLES.slice(0, 4).map((article) => (
                <div key={article.id} className="rounded-2xl overflow-hidden border border-border bg-background">
                  <div className="aspect-[4/3]">
                    <ImageWithFallback src={article.image} alt={article.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4 space-y-2">
                    <Badge className="bg-secondary text-foreground border-0 rounded-full px-2.5 py-0.5 text-xs">{article.category}</Badge>
                    <h3 style={{ fontFamily: "var(--font-display)" }} className="text-lg leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <aside className="space-y-6">
            <div className="rounded-3xl overflow-hidden border border-border bg-card shadow-sm">
              <ImageWithFallback src={ARTICLES[6].image} alt={ARTICLES[6].title} className="w-full h-full object-cover aspect-[4/3]" />
              <div className="p-6 space-y-3">
                <Badge className="rounded-full px-3 text-xs uppercase tracking-widest border bg-background/90 text-foreground">
                  Quiet interface
                </Badge>
                <h3 style={{ fontFamily: "var(--font-display)" }} className="text-xl leading-snug">
                  Matching the homepage means keeping the mood steady.
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The same typography, palette, image treatment, and spacing run through the pages so the site feels like one publication, not separate templates.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-8 space-y-4">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Contact</span>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Want to suggest a story or a photo set? The newsletter and article archive are the best way to start.
              </p>
              <Button className="rounded-full px-5" style={{ background: "var(--accent)", color: "var(--accent-foreground)" }} onClick={() => onNavigate("/categories")}>Explore categories</Button>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

type SiteFooterProps = {
  onNavigate: (path: RoutePath) => void;
  onSubscribeClick: () => void;
};

function SiteFooter({ onNavigate, onSubscribeClick }: SiteFooterProps) {
  return (
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
              {[Twitter, Instagram, Rss].map((Icon, index) => (
                <button key={index} className="p-2 rounded-full bg-secondary hover:bg-muted transition-colors text-muted-foreground hover:text-foreground" aria-label="Social link">
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm text-foreground tracking-widest uppercase">Explore</h4>
            <ul className="space-y-2">
              {NAV_ITEMS.slice(1).map((item) => (
                <li key={item.path}>
                  <SiteLink to={item.path} pathname="/" onNavigate={onNavigate} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {item.label}
                  </SiteLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm text-foreground tracking-widest uppercase">About</h4>
            <ul className="space-y-2">
              <li>
                <SiteLink to="/about" pathname="/" onNavigate={onNavigate} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  About the Club
                </SiteLink>
              </li>
              <li>
                <button className="text-sm text-muted-foreground transition-colors hover:text-foreground" onClick={onSubscribeClick}>
                  Newsletter
                </button>
              </li>
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
  );
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group cursor-pointer flex flex-col gap-4">
      <div className="relative rounded-xl overflow-hidden aspect-[3/2] bg-secondary">
        <ImageWithFallback src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
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
        <h3 style={{ fontFamily: "var(--font-display)" }} className="text-lg leading-snug text-foreground transition-colors duration-200 group-hover:text-accent">
          {article.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{article.excerpt}</p>
      </div>
      <div className="flex items-center justify-between pt-1">
        <span className="text-xs text-muted-foreground">{article.author}</span>
        <span className="text-xs flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--accent)" }}>
          Read <ArrowRight size={12} />
        </span>
      </div>
    </article>
  );
}