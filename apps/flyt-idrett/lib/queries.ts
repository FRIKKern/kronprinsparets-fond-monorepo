// Navigation query
export const NAV_QUERY = `*[_id match "flyt-Navigation"][0]{
  navigationItems[]{
    _type,
    _key,
    _ref,
    href,
    name,
    ...@->{
      _id,
      _type,
      title
    }
  }
}`;

// Site settings query
export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  siteTitle,
  siteDescription,
  landingPageIntro,
  mainSections[]->{
    _id,
    title,
    slug,
    tagline,
    icon,
    themeColor
  }
}`;

// All sections query
export const ALL_SECTIONS_QUERY = `*[_type == "section"] | order(order asc) {
  _id,
  title,
  slug,
  tagline,
  description,
  icon,
  themeColor,
  sectionType,
  showSidebar
}`;

// Section by slug
export const SECTION_QUERY = `*[_type == "section" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  tagline,
  description,
  icon,
  iconName,
  themeColor,
  sectionType,
  showSidebar,
  videoUrl,
  pdfFile{
    asset{
      _ref,
      _type,
      extension
    }
  },
  content,
  parentSection->{
    _id,
    title,
    slug
  },
  children[]->{
    _id,
    _type,
    title,
    slug,
    subtitle,
    tagline,
    iconName
  }
}`;

// Lesson by slug
export const LESSON_QUERY = `*[_type == "lesson" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  subtitle,
  videoUrl,
  pdfFile{
    asset{
      _ref,
      _type,
      extension
    }
  },
  content,
  tips,
  relatedContent[]->{
    _id,
    _type,
    title,
    slug,
    tagline
  }
}`;

// Activity by slug
export const ACTIVITY_QUERY = `*[_type == "activity" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  shortDescription,
  videoUrl,
  pdfFile{
    asset{
      _ref,
      _type,
      extension
    }
  },
  category,
  duration,
  purpose,
  equipment,
  steps,
  reflectionQuestion,
  trainerTips,
  variations,
  ageGroups,
  groupSize
}`;

// Activities by category
export const ACTIVITIES_BY_CATEGORY_QUERY = `*[_type == "activity" && category == $category] | order(title asc) {
  _id,
  title,
  slug,
  shortDescription,
  duration,
  purpose,
  category
}`;

// All activities
export const ALL_ACTIVITIES_QUERY = `*[_type == "activity"] | order(title asc) {
  _id,
  title,
  slug,
  shortDescription,
  duration,
  purpose,
  category
}`;

// Game by slug
export const GAME_QUERY = `*[_type == "game" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  description,
  videoUrl,
  pdfFile{
    asset{
      _ref,
      _type,
      extension
    }
  }
}`;

// All games
export const ALL_GAMES_QUERY = `*[_type == "game"] | order(title asc) {
  _id,
  title,
  slug,
  description
}`;

// All FAQs
export const ALL_FAQS_QUERY = `*[_type == "faq"] | order(order asc) {
  _id,
  question,
  answer,
  pdfFile{
    asset{
      _ref,
      _type,
      extension
    }
  },
  order
}`;

// All videos
export const ALL_VIDEOS_QUERY = `*[_type == "video"] | order(title asc) {
  _id,
  title,
  description,
  videoUrl,
  pdfFile{
    asset{
      _ref,
      _type,
      extension
    }
  },
  thumbnail,
  category
}`;

// Handboka navigation - get subsections with proper hierarchy
export const HANDBOKA_NAV_QUERY = `{
  "sections": *[_type == "section" && parentSection->slug.current == "handboka"] | order(order asc) {
    _id,
    title,
    slug,
    iconName,
    tagline,
    description,
    sectionType,
    children[]->{
      _id,
      _type,
      title,
      slug
    }
  },
  "activities": *[_type == "activity"] | order(title asc) {
    _id,
    title,
    slug
  },
  "games": *[_type == "game"] | order(title asc) {
    _id,
    title,
    slug
  }
}`;

// Trenerhanda lessons for navigation
export const TRENERHANDA_LESSONS_QUERY = `*[_type == "lesson" && references(*[_type == "section" && slug.current == "trenerhanda"]._id)] | order(order asc) {
  _id,
  title,
  slug,
  subtitle
}`;
