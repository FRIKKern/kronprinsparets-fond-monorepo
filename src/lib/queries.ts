// Landing page query (from src/pages/index.js)
export const LANDING_PAGE_QUERY = `*[_id match "flytLandingPage"][0]{
  title,
  search,
  topImages[]{
    asset->{_id, url},
    hotspot
  },
  importantMessage,
  text1,
  firstImage{
    asset->{_id, url},
    hotspot
  },
  quote1{text, author},
  text2,
  bottomImages[]{
    asset->{_id, url},
    hotspot
  },
  quote2{text, author},
  text3
}`;

// Navigation query (from src/components/Nav/Nav.js)
// Fetch all navigation items including both links and document references
// Uses ...@->{} to dereference document references in the array
export const NAV_QUERY = `*[_id match "flyt-Navigation"][0]{
  navigationItems[]{
    _type,
    _key,
    _ref,
    // Inline object fields (for links)
    href,
    name,
    // Dereference and spread document fields (for references)
    ...@->{
      _id,
      _type,
      title
    }
  }
}`;

// Groups query for dynamic routes (from gatsby-node.js)
export const ALL_GROUPS_QUERY = `*[_type == "group" && defined(kommune)]{
  _id,
  year,
  name,
  kommune->{name, city, _id},
  employees[]->{
    _id,
    name,
    phone,
    email,
    stillinger[]{
      name,
      group->{_id}
    }
  },
  images[]{
    image{
      asset->{_id, url},
      hotspot
    },
    caption
  },
  importantMessage,
  recruitmentLink,
  introduction,
  content
}`;

// All theory pages (from gatsby-node.js)
export const ALL_THEORY_PAGES_QUERY = `*[_type == "theoryPage"]{
  _id,
  title,
  description,
  content,
  "slug": slug.current
}`;

// Theory overview page
export const THEORY_OVERVIEW_QUERY = `*[_id match "theoryOverview"][0]{
  title,
  theoryPages[]->{
    _id,
    title,
    description,
    slug
  }
}`;

// Contact page (from src/pages/kontakt.js)
export const CONTACT_PAGE_QUERY = `*[_id match "contactPage"][0]{
  title,
  description,
  "employees": mainEmployees[]{
    name,
    phone,
    email,
    position,
    image{
      asset->{_id, url}
    }
  }
}`;

// All employees
export const ALL_EMPLOYEES_QUERY = `*[_type == "flytEmployee"]{
  _id,
  name,
  phone,
  email,
  stilling,
  stillinger[]{
    name,
    group->{_id, year, kommune->{name}}
  }
}`;

// All kommuner
export const ALL_KOMMUNER_QUERY = `*[_type == "kommune"]{
  _id,
  name,
  city
}`;

// Om Flyt page
export const OM_FLYT_QUERY = `*[_id match "omFlyt"][0]{
  title,
  content
}`;

// Partners page
// Query page type by slug (matching Gatsby pattern)
// Gatsby uses: sanityPage(slug: { current: { regex: "/^partner/" } }, mainPage: { eq: true })
export const PARTNERS_QUERY = `*[
  _type == "page" 
  && defined(slug.current) 
  && slug.current match "^partner"
  && mainPage == true
][0]{
  title,
  content
}`;

// Fallback 1: try without mainPage filter
export const PARTNERS_FALLBACK_QUERY = `*[
  _type == "page" 
  && defined(slug.current) 
  && (slug.current match "^partner" || slug.current == "partnere")
][0]{
  title,
  content
}`;

// Fallback 2: try querying by _id (in case content is in the partners document)
export const PARTNERS_FALLBACK2_QUERY = `*[_id match "flyt-partners" || _id match "drafts.flyt-partners"][0]{
  title,
  content
}`;
