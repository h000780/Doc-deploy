export const pages = [
  {
    href: "/",
    title: "目录",
    chapter: "目录",
  },
  {
    href: "/chapter-1",
    title: "Chapter I: Apps Architecture",
    subtitle: "Apps Design",
    chapter: "第一章",
  },
  {
    href: "/chapter-2",
    title: "Chapter II: Records Architecture",
    subtitle: "Records Design",
    chapter: "第二章",
  },
  {
    href: "/chapter-3",
    title: "Chapter III: Lifecycle & Consistency Analysis",
    subtitle: "Lifecycle & Consistency",
    chapter: "第三章",
  },
  {
    href: "/chapter-4",
    title: "Chapter IV: Implementation Extensions",
    subtitle: "Advanced Topics",
    chapter: "第四章",
  },
  {
    href: "/appendix",
    title: "Appendices",
    subtitle: "Database Schema & Data Structures",
    chapter: "附录",
  },
]

export function getPageNav(currentHref: string) {
  const currentIndex = pages.findIndex((p) => p.href === currentHref)
  
  return {
    prev: currentIndex > 1 ? pages[currentIndex - 1] : undefined,
    next: currentIndex >= 0 && currentIndex < pages.length - 1 ? pages[currentIndex + 1] : undefined,
  }
}
