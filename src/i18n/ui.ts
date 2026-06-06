export const ui = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      blog: "Blog",
      tags: "Tags",
      calculator: "Calculator",
      language: "Language",
    },

    page: {
      homeTitle: "Home Page",
      aboutTitle: "About Me",
      blogTitle: "My Astro Learning Blog",
      calculatorTitle: "Interest Calculator",
      tagsTitle: "Tag Index",
    },

    calc: {
      subtitle: "Plan your savings & investments with compound growth projections",
      parameters: "Parameters",
    },
  },

  de: {
    nav: {
      home: "Startseite",
      about: "Über",
      blog: "Blog",
      tags: "Tags",
      calculator: "Rechner",
      language: "Sprache",
    },

    page: {
      homeTitle: "Startseite",
      aboutTitle: "Über mich",
      blogTitle: "Blog",
      calculatorTitle: "Zinseszinsrechner",
      tagsTitle: "Tag-Index",
    },

    calc: {
      subtitle:
        "Plane deine Spar- und Investitionsentwicklung mit Zinseszins",
      parameters: "Parameter",
    },
  },
} as const;

export type UiDict = typeof ui;
export type Lang = keyof typeof ui;