export const ROUTES = {
  HOME: "/",
  BUY: "/buy",
  RENT: "/rent",
  COMMERCIAL: "/commercial",
  LUXURY: "/luxury",
  PROPERTY_DETAILS: "/property/:id",
  AGENTS: "/agents",
  AGENT_PROFILE: "/agent/:id",
  ABOUT: "/about",
  BLOG: "/blog",
  BLOG_DETAILS: "/blog/:slug",
  CONTACT: "/contact",
  FAQ: "/faq",
  PRIVACY: "/privacy",
  TERMS: "/terms",
  NOT_FOUND: "/404",
};

export const PUBLIC_ROUTES = Object.values(ROUTES);

export const PROTECTED_ROUTES = [];

export default ROUTES;
