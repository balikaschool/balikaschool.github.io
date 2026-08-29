/**
 * Central static-site config: ALL static copy, links, and config values
 * live here. Swapping placeholder → final means editing THIS file only.
 */
export const site = {
  name: "Shree Sharada Balika Namuna Secondary School",
  nepaliName: "श्री शारदा बालिका नमुना माध्यमिक विद्यालय, सुनसरी",
  location: 'Dharan-16, Sunsari, Nepal',
  email: 'info@sharadabalika.edu.np',
  phones: ['025-520962', '9842054429'],
  estYear: '1948 AD (2005 BS)',

  description:
    "Shree Sharada Balika Namuna Secondary School (श्री शारदा बालिका नमुना माध्यमिक विद्यालय) was established in 1948 AD (2005 BS) in Dharan-16, Sunsari, Nepal. An premier all-girls community-based institution affiliated with the National Examination Board (NEB) offering ECD to Grade 10 and Ten Plus Two (+2) in Management and Education.",

  nav: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Notices', href: '/notices' },
    { label: 'Faculty', href: '/teachers' },
    { label: 'Contact', href: '/contact' },
  ],

  web3formsKey: import.meta.env.PUBLIC_WEB3FORMS_KEY ?? '',

  youtubeStoryVideoId: '20NugF8viUM',

  social: {
    facebook: 'https://www.facebook.com/people/Shree-Sharada-Balika-Namuna-Secondary-School/100084429066857/',
    map: 'https://maps.app.goo.gl/vjXjs3914iKBhmpg8',
  },

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

  courses: [
    {
      title: 'Ten Plus Two (+2) Management',
      stream: 'Management',
      level: 'Higher Secondary (+2)',
      description: 'Prepares young women with fundamental leadership, business, accounting, and managerial skills for higher studies and careers.',
    },
    {
      title: 'Ten Plus Two (+2) Education',
      stream: 'Education',
      level: 'Higher Secondary (+2)',
      description: 'Fosters pedagogical expertise, child development awareness, and communication skills for future educators and academic leaders.',
    },
    {
      title: 'Basic & Secondary Education (ECD – Grade 10)',
      stream: 'General Academics',
      level: 'Primary & Secondary',
      description: 'Comprehensive curriculum from Early Childhood Development to SEE, focusing on empowering female students through holistic learning.',
    },
  ],

  copy: {
    home: {
      heroHeadline: 'Empowering Young Women Since 1948',
      heroSub:
        "Shree Sharada Balika Namuna Secondary School is a model all-girls community institution in Dharan-16, Sunsari. Affiliated with the NEB and approved by the Ministry of Education, we provide quality education with moderate fees and dedicated scholarships.",
      featuredHeading: 'Latest announcements & notices',
      videoHeading: 'School Campus & Periphery Overview',
      highlightsHeading: 'School & Student Activities',
    },

    about: {
      title: 'About Shree Sharada Balika Namuna Secondary School',
      intro:
        'Established in 1948 AD (2005 BS), Shree Sharada Balika Namuna Secondary School is a community-based all-girls educational institution located in Dharan-16, Sunsari, Nepal. We are affiliated with the National Examination Board (NEB) and approved by the Ministry of Education.',
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
