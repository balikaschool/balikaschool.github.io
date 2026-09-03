import siteSettings from '../content/settings/site.json';
import homepageSettings from '../content/settings/homepage.json';
import aboutSettings from '../content/settings/about.json';

/**
 * Central static-site config: loaded dynamically from CMS settings in src/content/settings/
 */
export const site = {
  name: siteSettings.name_en,
  nepaliName: siteSettings.name_ne,
  headerMainNe: siteSettings.header_main_ne || 'श्री शारदा बालिका नमुना',
  headerSubNe: siteSettings.header_sub_ne || 'माध्यमिक विद्यालय',
  headerMainEn: siteSettings.header_main_en || 'Shree Sharada Balika Namuna',
  headerSubEn: siteSettings.header_sub_en || 'Secondary School',
  taglineNe: siteSettings.tagline_ne || 'नमुना बालिका माध्यमिक विद्यालय · धरान-१६, सुनसरी, नेपाल',
  taglineEn: siteSettings.tagline_en || 'Model All-Girls Secondary School · Dharan-16, Sunsari, Nepal',
  logo: siteSettings.logo,
  stampLogo: siteSettings.stampLogo,
  theme: siteSettings.theme || {
    bg: '#FAF7F2',
    dark: '#1E2E2D',
    primary: '#00706E',
    secondary: '#A23B24',
    accent: '#00A3A0',
  },
  location: siteSettings.location_en,
  locationNe: siteSettings.location_ne,
  email: siteSettings.email,
  phones: siteSettings.phones,
  estYear: siteSettings.estYear,
  mapEmbed: siteSettings.mapEmbed || '',
  mapUrl: siteSettings.mapUrl || '',

  description:
    `${siteSettings.name_en} (${siteSettings.name_ne}) — ${siteSettings.location_en}. Established in ${siteSettings.estYear}.`,

  nav: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Notices', href: '/notices' },
    { label: 'Faculty', href: '/teachers' },
    { label: 'Contact', href: '/contact' },
  ],

  web3formsKey: import.meta.env.PUBLIC_WEB3FORMS_KEY ?? '',

  youtubeStoryVideoId: homepageSettings.youtubeStoryVideoId || '20NugF8viUM',

  /** Flexible social media links — any platform, any number. Each entry: { platform, url } */
  socials: (siteSettings.socials ?? []) as Array<{ platform: string; url: string }>,

  facilities: [
    'Science Lab',
    'Computer Lab',
    'Library',
    'Multimedia Rooms',
    'Cafeteria',
    'Sports & Playground',
    'Transportation',
    'Counseling Services',
    'Dance & Music Studios',
    'Scholarship Schemes',
    'Educational Tours & ECA',
    'School Journal',
  ],

  courses: homepageSettings.programs.map((p) => ({
    title: p.title_en || p.title_ne,
    titleNe: p.title_ne,
    titleEn: p.title_en,
    level: p.level_en || p.level_ne,
    levelNe: p.level_ne,
    levelEn: p.level_en,
    description: p.desc_en || p.desc_ne,
    descNe: p.desc_ne,
    descEn: p.desc_en,
    tags: p.tags_en || p.tags_ne,
    tagsNe: p.tags_ne,
    tagsEn: p.tags_en,
  })),

  copy: {
    home: {
      heroHeadline: homepageSettings.heroHeadline_en || homepageSettings.heroHeadline_ne,
      heroHeadlineNe: homepageSettings.heroHeadline_ne,
      heroHeadlineEn: homepageSettings.heroHeadline_en,
      heroSub: homepageSettings.heroSub_en || homepageSettings.heroSub_ne,
      heroSubNe: homepageSettings.heroSub_ne,
      heroSubEn: homepageSettings.heroSub_en,
      programsHeadingNe: homepageSettings.programsHeading_ne,
      programsHeadingEn: homepageSettings.programsHeading_en,
      mediaType: homepageSettings.mediaType || 'video',
      mediaHeadingNe: homepageSettings.mediaHeading_ne || 'विद्यालय परिसर तथा वरपरको दृश्य',
      mediaHeadingEn: homepageSettings.mediaHeading_en || 'School Campus & Periphery Overview',
      youtubeStoryVideoId: homepageSettings.youtubeStoryVideoId,
      mediaImage: homepageSettings.mediaImage,
      mediaCaptionNe: homepageSettings.mediaCaption_ne,
      mediaCaptionEn: homepageSettings.mediaCaption_en,
      featuredHeading: 'Latest announcements & notices',
      highlightsHeading: 'School & Student Activities',
    },

    about: {
      title: aboutSettings.title_en || 'About Shree Sharada Balika Namuna Secondary School',
      titleNe: aboutSettings.title_ne || 'श्री शारदा बालिका नमुना माध्यमिक विद्यालयको परिचय',
      intro:
        aboutSettings.intro_en ||
        'Established in 1948 AD (2005 BS), Shree Sharada Balika Namuna Secondary School is a community-based all-girls educational institution located in Dharan-16, Sunsari, Nepal. We are affiliated with the National Examination Board (NEB) and approved by the Ministry of Education.',
      introNe:
        aboutSettings.intro_ne ||
        'वि.सं. २००५ (सन् १९४८) मा स्थापित श्री शारदा बालिका नमुना माध्यमिक विद्यालय धरान-१६, सुनसरीमा अवस्थित एक उत्कृष्ट सामुदायिक बालिका विद्यालय हो। राष्ट्रिय परीक्षा बोर्ड (NEB) सम्बन्धन प्राप्त तथा शिक्षा मन्त्रालय स्वीकृत यस विद्यालयमा गुणस्तरीय शिक्षा प्रदान गरिन्छ।',
      sections: [
        {
          heading: 'Our legacy & establishment',
          paragraphs: [
            'Founded in 2005 BS (1948 AD), Shree Sharada Balika Namuna Secondary School stands as one of the oldest and most respected community schools in eastern Nepal.',
            'As an institution dedicated exclusively to female education, no boys are enrolled. Our core mission has always been to break socio-economic barriers and empower young women through accessible, high-quality learning.',
          ],
        },
        {
          heading: 'Academic streams & affiliation',
          paragraphs: [
            'The school offers comprehensive educational programs from Early Childhood Development (ECD) through Grade 10, as well as Ten Plus Two (+2) programs in Management and Education streams.',
            'Fully approved by the Ministry of Education, Nepal, and affiliated with the National Examination Board (NEB), our graduates excel consistently in higher secondary examinations and university entrance assessments.',
          ],
        },
        {
          heading: 'Facilities & student support',
          paragraphs: [
            'Our school in Dharan-16 features modern science and computer laboratories, a well-stocked library, multimedia classrooms, music and dance studios, cafeteria, and sports grounds.',
            'We maintain moderate, accessible fee structures alongside merit-based and need-based scholarship schemes to ensure no deserving female student is denied an education.',
          ],
        },
      ],
    },

    notices: {
      title: 'Notices & Announcements',
      intro:
        'Official updates from Shree Sharada Balika Namuna Secondary School — SEE & +2 exam routines, admission notices, holiday schedules, and student events in Dharan.',
      emptyMessage:
        'No active notices at the moment. Please check back later.',
    },

    teachers: {
      title: 'Faculty & Administration',
      intro:
        'Meet our experienced educators and leadership team in Dharan, Sunsari, who guide our students with dedication and care.',
      memorialHeading: 'Former Teachers & Staff',
      memorialBlurb: 'Honoring our former teachers, leadership, and staff members who contributed to the school\'s legacy.',
    },

    contact: {
      title: 'Contact Us',
      intro:
        'Have questions about admissions for +2 Management, +2 Education, or school enrollment? Reach out to our administrative office in Dharan-16, Sunsari.',
      formHeading: 'Send a message to administration',
    },

    formPrivacyNote:
      'Messages sent here go directly to the school administrative team.',
    formSuccessNote: 'Thank you for reaching out. We will get back to you promptly.',
    formErrorNote:
      'Message could not be sent. Please contact us directly at',
  },
} as const;
