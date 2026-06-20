import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, ChevronLeft, ChevronRight, Heart, Download, Camera } from "lucide-react";

const CLAN_NAME = "The Anderson Clan";
const SHOOT_DATE = "June 2025 — Studio Portraits";

type Category = "All" | "Full Family" | "Parents" | "Kids" | "Portraits";

interface Photo {
  id: number;
  src: string;
  alt: string;
  caption: string;
  names: string;
  category: Category;
  span: "normal" | "tall" | "wide";
}

const photos: Photo[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1760328249117-18488466e34c?w=800&h=1000&fit=crop&auto=format",
    alt: "Family of five posing for a studio portrait",
    caption: "The Whole Crew",
    names: "Marcus, Diana, Tyler, Zoe & baby Leo",
    category: "Full Family",
    span: "tall",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1763013259097-ed4d8f95504f?w=800&h=700&fit=crop&auto=format",
    alt: "A happy family of four with two young children",
    caption: "Pure Joy",
    names: "James & Keisha with Oliver & Mia",
    category: "Full Family",
    span: "normal",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1772723246504-698d53af365f?w=800&h=900&fit=crop&auto=format",
    alt: "Three women smiling together against a red background",
    caption: "The Sisters",
    names: "Grandma Ruth, Diana & Keisha",
    category: "Portraits",
    span: "normal",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1760328249115-b66560f89840?w=800&h=1000&fit=crop&auto=format",
    alt: "Father and two sons in matching blue suits",
    caption: "Suited Up",
    names: "Marcus with Tyler & Oliver",
    category: "Kids",
    span: "tall",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1763013259096-65ff66387a73?w=800&h=700&fit=crop&auto=format",
    alt: "Family with two babies sitting on a plain background",
    caption: "Tiny Blessings",
    names: "James & Keisha with the littles",
    category: "Full Family",
    span: "normal",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1760328249118-d4fb01eb119c?w=800&h=900&fit=crop&auto=format",
    alt: "Mother adjusts son's suit jacket",
    caption: "Mama's Touch",
    names: "Diana & Tyler",
    category: "Parents",
    span: "normal",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1768657891755-8dbf6de5f2f5?w=800&h=1000&fit=crop&auto=format",
    alt: "Older brother holds his baby sibling",
    caption: "Big Brother",
    names: "Tyler & baby Leo",
    category: "Kids",
    span: "tall",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1758513359805-21892ae01928?w=800&h=700&fit=crop&auto=format",
    alt: "Family with two babies on a white backdrop",
    caption: "Brand New Love",
    names: "Keisha, James, Oliver & Mia",
    category: "Full Family",
    span: "normal",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1760328249114-48aa9d9e490f?w=800&h=900&fit=crop&auto=format",
    alt: "Woman and two boys in suits",
    caption: "My Boys",
    names: "Diana, Tyler & Oliver",
    category: "Parents",
    span: "normal",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1763013259000-da8b5c45ed64?w=800&h=700&fit=crop&auto=format",
    alt: "Family of four with two babies on plain background",
    caption: "Growing Up Fast",
    names: "The Johnson Branch",
    category: "Full Family",
    span: "normal",
  },
];

const CATEGORIES: Category[] = ["All", "Full Family", "Parents", "Kids", "Portraits"];

const CATEGORY_COLORS: Record<Category, string> = {
  All: "bg-primary text-primary-foreground",
  "Full Family": "bg-secondary text-secondary-foreground",
  Parents: "bg-[#F5A623] text-white",
  Kids: "bg-[#B5E5CF] text-foreground",
  Portraits: "bg-[#D4A5F5] text-foreground",
};

const BADGE_COLORS: Record<Category, string> = {
  All: "bg-primary/10 text-primary",
  "Full Family": "bg-secondary/20 text-secondary-foreground",
  Parents: "bg-[#F5A623]/20 text-[#B87800]",
  Kids: "bg-[#B5E5CF]/40 text-[#1A7A55]",
  Portraits: "bg-[#D4A5F5]/30 text-[#6B1FA0]",
};

function GeometricDeco() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute -top-8 -left-8 w-40 h-40 rounded-full bg-[#FFE566] opacity-60" />
      <div className="absolute top-24 right-0 w-24 h-24 bg-primary/20 rotate-45" />
      <div className="absolute bottom-8 left-1/3 w-16 h-16 rounded-full bg-secondary/30" />
      <div className="absolute -bottom-4 right-12 w-32 h-32 bg-[#F5A623]/20 rotate-12" />
      <div
        className="absolute top-12 left-1/2 w-8 h-8 bg-[#D4A5F5]"
        style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
      />
    </div>
  );
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [openPhoto, setOpenPhoto] = useState<Photo | null>(null);
  const [liked, setLiked] = useState<Set<number>>(new Set());

  const filtered =
    activeCategory === "All" ? photos : photos.filter((p) => p.category === activeCategory);

  const currentIndex = openPhoto ? filtered.findIndex((p) => p.id === openPhoto.id) : -1;

  const navigate = (dir: 1 | -1) => {
    if (currentIndex === -1) return;
    const next = (currentIndex + dir + filtered.length) % filtered.length;
    setOpenPhoto(filtered[next]);
  };

  const toggleLike = (id: number) => {
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "'Nunito', sans-serif" }}
    >
      {/* Hero */}
      <header className="relative py-20 px-6 text-center overflow-hidden">
        <GeometricDeco />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFE566] text-foreground text-sm font-bold mb-6 tracking-wide uppercase">
            <Camera size={14} />
            Studio Portraits
          </div>
          <h1
            className="text-6xl md:text-8xl font-black leading-none mb-3 tracking-tight"
            style={{ fontFamily: "'Fredoka One', cursive", color: "#1A1028" }}
          >
            {CLAN_NAME}
          </h1>
          <div className="flex items-center justify-center gap-3 mt-4 mb-2">
            <div className="h-1 w-16 rounded-full bg-primary" />
            <span className="text-muted-foreground font-semibold text-sm tracking-widest uppercase">
              {SHOOT_DATE}
            </span>
            <div className="h-1 w-16 rounded-full bg-secondary" />
          </div>
          <p className="mt-5 text-lg text-muted-foreground max-w-md mx-auto leading-relaxed font-medium">
            A celebration of family, love, and every joyful moment captured in the studio.
          </p>
        </div>
      </header>

      {/* Filter Tabs */}
      <div className="sticky top-0 z-30 bg-background/90 backdrop-blur-sm border-b border-border py-3 px-6">
        <div className="max-w-6xl mx-auto flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                activeCategory === cat
                  ? CATEGORY_COLORS[cat] + " shadow-md scale-105"
                  : "bg-card text-muted-foreground hover:bg-muted/30 border border-border"
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto flex-shrink-0 flex items-center gap-1.5 text-muted-foreground text-sm font-semibold">
            <span className="text-foreground font-bold">{filtered.length}</span> photos
          </span>
        </div>
      </div>

      {/* Gallery Grid */}
      <main className="max-w-6xl mx-auto px-4 py-10">
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gridAutoRows: "240px",
          }}
        >
          {filtered.map((photo) => (
            <div
              key={photo.id}
              className="group relative cursor-pointer overflow-hidden rounded-2xl bg-muted shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              style={{
                gridRow: photo.span === "tall" ? "span 2" : "span 1",
                gridColumn: photo.span === "wide" ? "span 2" : "span 1",
              }}
              onClick={() => setOpenPhoto(photo)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Category badge */}
              <div className="absolute top-3 left-3">
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full ${BADGE_COLORS[photo.category]} backdrop-blur-sm`}
                >
                  {photo.category}
                </span>
              </div>

              {/* Like button */}
              <button
                className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(photo.id);
                }}
                aria-label="Like photo"
              >
                <Heart
                  size={16}
                  className={liked.has(photo.id) ? "fill-primary text-primary" : "text-foreground"}
                />
              </button>

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <p
                  className="text-white font-black text-lg leading-tight"
                  style={{ fontFamily: "'Fredoka One', cursive" }}
                >
                  {photo.caption}
                </p>
                <p className="text-white/80 text-sm font-medium mt-0.5">{photo.names}</p>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24 text-muted-foreground font-semibold text-lg">
            No photos in this category yet.
          </div>
        )}
      </main>

      {/* Stats Strip */}
      <section className="border-t border-border bg-card py-10 px-6 mt-6">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          {[
            { label: "Photos", value: photos.length, color: "text-primary" },
            { label: "Liked", value: liked.size, color: "text-[#F5A623]" },
            { label: "Family Members", value: 12, color: "text-secondary" },
          ].map(({ label, value, color }) => (
            <div key={label}>
              <p
                className={`text-5xl font-black ${color}`}
                style={{ fontFamily: "'Fredoka One', cursive" }}
              >
                {value}
              </p>
              <p className="text-muted-foreground font-bold text-sm mt-1 uppercase tracking-widest">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 px-6 text-muted-foreground text-sm font-medium">
        <span style={{ fontFamily: "'Fredoka One', cursive" }} className="text-foreground text-base">
          {CLAN_NAME}
        </span>{" "}
        · Made with{" "}
        <Heart size={12} className="inline fill-primary text-primary mx-0.5" />
        · {SHOOT_DATE}
      </footer>

      {/* Lightbox */}
      <Dialog.Root open={!!openPhoto} onOpenChange={(o) => !o && setOpenPhoto(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-40 bg-black/85 backdrop-blur-sm" />
          <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {openPhoto && (
              <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col rounded-2xl overflow-hidden bg-card shadow-2xl">
                {/* Top bar */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-border flex-shrink-0">
                  <div>
                    <Dialog.Title
                      className="font-black text-xl leading-tight"
                      style={{ fontFamily: "'Fredoka One', cursive" }}
                    >
                      {openPhoto.caption}
                    </Dialog.Title>
                    <p className="text-muted-foreground text-sm font-medium">{openPhoto.names}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleLike(openPhoto.id)}
                      className="p-2.5 rounded-full hover:bg-muted transition-colors"
                      aria-label="Like"
                    >
                      <Heart
                        size={18}
                        className={
                          liked.has(openPhoto.id)
                            ? "fill-primary text-primary"
                            : "text-muted-foreground"
                        }
                      />
                    </button>
                    <a
                      href={openPhoto.src}
                      download
                      className="p-2.5 rounded-full hover:bg-muted transition-colors text-muted-foreground"
                      aria-label="Download"
                    >
                      <Download size={18} />
                    </a>
                    <Dialog.Close className="p-2.5 rounded-full hover:bg-muted transition-colors text-muted-foreground ml-1">
                      <X size={18} />
                    </Dialog.Close>
                  </div>
                </div>

                {/* Image */}
                <div className="relative flex-1 min-h-0 bg-black flex items-center justify-center overflow-hidden">
                  <img
                    src={openPhoto.src}
                    alt={openPhoto.alt}
                    className="max-w-full max-h-full object-contain"
                  />

                  {/* Nav arrows */}
                  {filtered.length > 1 && (
                    <>
                      <button
                        onClick={() => navigate(-1)}
                        className="absolute left-3 p-2.5 rounded-full bg-white/90 hover:bg-white text-foreground shadow-lg transition-all hover:scale-105"
                        aria-label="Previous"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={() => navigate(1)}
                        className="absolute right-3 p-2.5 rounded-full bg-white/90 hover:bg-white text-foreground shadow-lg transition-all hover:scale-105"
                        aria-label="Next"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}
                </div>

                {/* Bottom strip */}
                <div className="flex items-center justify-between px-5 py-3 border-t border-border flex-shrink-0 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${BADGE_COLORS[openPhoto.category]}`}
                  >
                    {openPhoto.category}
                  </span>
                  <span className="text-muted-foreground font-semibold">
                    {currentIndex + 1} / {filtered.length}
                  </span>
                </div>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <style>{`
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { scrollbar-width: none; }
      `}</style>
    </div>
  );
}
