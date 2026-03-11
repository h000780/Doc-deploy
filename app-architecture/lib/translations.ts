export const translations = {
  header: {
    title: {
      zh: "Nata 应用模块架构设计",
      en: "Nata Application Module Architecture",
    },
    subtitle: {
      zh: "应用模块架构",
      en: "Apps Module Architecture",
    },
  },
  languageSwitcher: {
    zh: {
      label: "中文",
      short: "中",
    },
    en: {
      label: "English",
      short: "EN",
    },
  },
  home: {
    title: {
      zh: "目录",
      en: "Table of Contents",
    },
    subtitle: {
      zh: "选择章节开始阅读",
      en: "Select a chapter to start reading",
    },
  },
  chapters: {
    chapter1: {
      zh: "第一章",
      en: "Chapter I",
    },
    chapter2: {
      zh: "第二章",
      en: "Chapter II",
    },
    chapter3: {
      zh: "第三章",
      en: "Chapter III",
    },
    chapter4: {
      zh: "第四章",
      en: "Chapter IV",
    },
    appendix: {
      zh: "附录",
      en: "Appendix",
    },
  },
  navigation: {
    previous: {
      zh: "上一页",
      en: "Previous",
    },
    next: {
      zh: "下一页",
      en: "Next",
    },
    backToHome: {
      zh: "返回首页",
      en: "Back to Home",
    },
  },
  pages: {
    "/chapter-1": {
      title: {
        zh: "应用设计",
        en: "Apps Architecture",
      },
      subtitle: {
        zh: "Apps Design",
        en: "Apps Design",
      },
    },
    "/chapter-2": {
      title: {
        zh: "记录设计",
        en: "Records Architecture",
      },
      subtitle: {
        zh: "Records Design",
        en: "Records Design",
      },
    },
    "/chapter-3": {
      title: {
        zh: "生命周期与一致性分析",
        en: "Lifecycle & Consistency Analysis",
      },
      subtitle: {
        zh: "Lifecycle & Consistency",
        en: "Lifecycle & Consistency",
      },
    },
    "/chapter-4": {
      title: {
        zh: "进阶实现",
        en: "Implementation Extensions",
      },
      subtitle: {
        zh: "Advanced Topics",
        en: "Advanced Topics",
      },
    },
    "/appendix": {
      title: {
        zh: "数据库架构与数据结构",
        en: "Database Schema & Data Structures",
      },
      subtitle: {
        zh: "完整参考",
        en: "Complete Reference",
      },
    },
  },
} as const

export type TranslationKey = keyof typeof translations
