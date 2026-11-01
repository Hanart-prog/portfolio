import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  'en-US': {
    translation: {
      page: {
        title: 'Hanat Sharif — Software Engineer',
        description:
          'Computer Science student at Ohio State and two-time GoDaddy intern building full stack products and cloud infrastructure.',
      },
      brand: { goHome: 'Go to home page' },
      image: { expand: 'Expand image: {{alt}}' },
      navigation: {
        home: 'Home',
        about: 'About',
        experience: 'Experience',
        goToSection: 'Go to {{section}}',
        projects: 'Projects',
        contact: 'Contact',
        title: 'Main navigation',
        mobileMenu: 'Mobile menu',
        openMenu: 'Open menu',
        closeMenu: 'Close menu',
      },
      social: { linkedin: 'LinkedIn', github: 'GitHub' },
      theme: { toggle: 'Theme' },
      hero: {
        greeting: "Hi, I'm",
        role: 'Software Engineer · Seeking SWE internships',
        tagline:
          "I build full stack products and the cloud infrastructure behind them. I'm an engineer who loves to learn and loves to code.",
        scrollToAbout: 'About',
      },
      about: {
        title: 'About',
        education: 'Education',
        downloadCv: 'Download Resume',
        viewProjects: 'View projects',
      },
      experience: {
        title: 'Experience',
        description:
          'I work across the stack, from the React interfaces people use to the APIs, data, and AWS infrastructure behind them.',
        highlights: {
          platforms: {
            title: 'Frontend',
            description:
              'Built Luma, the React email builder that replaced legacy Salesforce workflows for GoDaddy marketers.',
          },
          systems: {
            title: 'Backend',
            description:
              'Built a Go replay engine that catches backend regressions and a Rust analyzer that ranks what a change will affect.',
          },
          data: {
            title: 'Cloud and Infrastructure',
            description:
              'Moved 10 Elasticsearch clusters to frozen storage and retired 12 unused Kinesis streams at GoDaddy.',
          },
        },
        trajectory: 'Career journey',
        trajectoryDescription:
          'From machine learning research at Ohio State to two internships at GoDaddy, plus community leadership along the way.',
        present: 'Present',
      },
      projects: {
        title: 'Projects',
        description:
          'A selection of what I have built, from AI planning tools to developer tooling for catching regressions before they ship.',
        showMore: 'Show more',
        showLess: 'Show less',
        viewProjectWebsite: 'View {{title}} website',
        previousImage: 'Previous',
        nextImage: 'Next',
      },
      techStack: {
        title: 'Tech Stack',
        description:
          'Tools I have used across internships, research, and projects, organized by area.',
        backend: 'Backend',
        frontend: 'Frontend',
        databases: 'Databases',
        infrastructure: 'Cloud and DevOps',
      },
      contact: {
        title: 'Contact',
        description:
          'I’m looking for software engineering internships. Have a role or opportunity in mind? Get in touch.',
        usefulLinks: 'Useful links:',
        sendMessage: 'Send me a message',
        emailSubject: 'Portfolio contact from {{name}}',
        name: 'Name',
        lastName: 'Last Name',
        firstName: 'First Name',
        email: 'Email',
        message: 'Message',
        send: 'Send',
        orEmail: 'Or email me directly:',
      },
      footer: {
        navigation: 'Navigation',
        contactNetworks: 'Contact',
        followMe: 'Follow me:',
        backToTop: 'Back to top',
        rights: 'All rights reserved.',
      },
    },
  },
} as const;

void i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en-US',
    fallbackLng: 'en-US',
    supportedLngs: ['en-US'],
    interpolation: { escapeValue: false },
    initAsync: false,
  });

export default i18n;
