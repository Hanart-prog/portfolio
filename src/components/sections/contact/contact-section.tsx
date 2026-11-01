import { useRef, type ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { SectionTitle } from '@/components/common/section-title';
import { ContactForm } from '@/components/sections/contact/form/contact-form';
import { ContactProfile } from '@/components/sections/contact/profile/contact-profile';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

export const ContactSection = (): ReactElement => {
  const { t } = useTranslation();
  const contentRef = useRef<HTMLDivElement>(null);

  useScrollReveal(contentRef, '[data-contact-reveal]');

  return (
    <section
      id="contact"
      className="scroll-mt-24 bg-gray-50 pt-[clamp(6rem,12vh,10rem)] pb-[clamp(7rem,14vh,12rem)] dark:bg-[#121212]"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-12">
        <SectionTitle description={t('contact.description')}>
          {t('contact.title')}
        </SectionTitle>
        <div
          ref={contentRef}
          className="grid grid-cols-1 gap-[clamp(2.5rem,5vw,5rem)] lg:grid-cols-3"
        >
          <div data-contact-reveal>
            <ContactProfile />
          </div>
          <div data-contact-reveal className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
