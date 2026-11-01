import type { ReactElement, SubmitEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { usePortfolio } from '@/hooks/use-portfolio';
import type { About } from '@/types/portfolio/about/about';

export const ContactForm = (): ReactElement => {
  const { t } = useTranslation();
  const about: About = usePortfolio('about');

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const form = event.currentTarget;
    form
      .querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[required]')
      .forEach((field: HTMLInputElement | HTMLTextAreaElement): void => {
        field.value = field.value.trim();
      });

    if (!form.reportValidity()) {
      return;
    }

    const senderName =
      `${(form.elements.namedItem('firstName') as HTMLInputElement).value} ${(form.elements.namedItem('lastName') as HTMLInputElement).value}`.trim();
    const body = `${t('contact.name')}: ${senderName}\n${t('contact.email')}: ${(form.elements.namedItem('email') as HTMLInputElement).value}\n\n${t('contact.message')}:\n${(form.elements.namedItem('message') as HTMLTextAreaElement).value}`;

    window.open(
      `mailto:${about.contact.email}?subject=${encodeURIComponent(t('contact.emailSubject', { name: senderName }))}&body=${encodeURIComponent(body)}`,
      '_blank',
      'noopener,noreferrer',
    );
  };

  return (
    <div>
      <h3 className="mb-7 text-[clamp(1.375rem,2vw,1.875rem)] leading-[1.12] font-semibold tracking-[-0.035em] text-[#191919] dark:text-white">
        {t('contact.sendMessage')}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FieldGroup className="gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Field className="gap-0">
              <FieldLabel htmlFor="first-name" className="sr-only">
                {t('contact.firstName')}
              </FieldLabel>
              <Input
                id="first-name"
                type="text"
                name="firstName"
                placeholder={t('contact.firstName')}
                required
                className="h-auto rounded-xl border-0 bg-white px-4 py-3.5 text-[1.0625rem] font-medium text-gray-900 placeholder-gray-500 shadow-[0_3px_10px_rgb(25_25_25/0.08)] ring-1 ring-[#191919]/15 transition-shadow ring-inset focus-visible:ring-[#191919] dark:bg-[#1a1a1a] dark:text-white dark:placeholder-gray-400 dark:shadow-none dark:ring-0 dark:focus-visible:ring-white"
              />
            </Field>
            <Field className="gap-0">
              <FieldLabel htmlFor="last-name" className="sr-only">
                {t('contact.lastName')}
              </FieldLabel>
              <Input
                id="last-name"
                type="text"
                name="lastName"
                placeholder={t('contact.lastName')}
                required
                className="h-auto rounded-xl border-0 bg-white px-4 py-3.5 text-[1.0625rem] font-medium text-gray-900 placeholder-gray-500 shadow-[0_3px_10px_rgb(25_25_25/0.08)] ring-1 ring-[#191919]/15 transition-shadow ring-inset focus-visible:ring-[#191919] dark:bg-[#1a1a1a] dark:text-white dark:placeholder-gray-400 dark:shadow-none dark:ring-0 dark:focus-visible:ring-white"
              />
            </Field>
          </div>
          <Field className="gap-0">
            <FieldLabel htmlFor="email" className="sr-only">
              {t('contact.email')}
            </FieldLabel>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder={t('contact.email')}
              required
              className="h-auto rounded-xl border-0 bg-white px-4 py-3.5 text-[1.0625rem] font-medium text-gray-900 placeholder-gray-500 shadow-[0_3px_10px_rgb(25_25_25/0.08)] ring-1 ring-[#191919]/15 transition-shadow ring-inset focus-visible:ring-[#191919] dark:bg-[#1a1a1a] dark:text-white dark:placeholder-gray-400 dark:shadow-none dark:ring-0 dark:focus-visible:ring-white"
            />
          </Field>
          <Field className="gap-0">
            <FieldLabel htmlFor="message" className="sr-only">
              {t('contact.message')}
            </FieldLabel>
            <Textarea
              id="message"
              name="message"
              placeholder={t('contact.message')}
              rows={6}
              required
              className="resize-none rounded-xl border-0 bg-white px-4 py-3.5 text-[1.0625rem] font-medium text-gray-900 placeholder-gray-500 shadow-[0_3px_10px_rgb(25_25_25/0.08)] ring-1 ring-[#191919]/15 transition-shadow ring-inset focus-visible:ring-[#191919] dark:bg-[#1a1a1a] dark:text-white dark:placeholder-gray-400 dark:shadow-none dark:ring-0 dark:focus-visible:ring-white"
            />
          </Field>
        </FieldGroup>
        <Button
          type="submit"
          className="size-auto cursor-pointer rounded-xl border-2 border-transparent bg-[#191919] px-6 py-3.5 text-[1.0625rem] font-semibold whitespace-nowrap text-white transition-opacity duration-300 outline-none hover:bg-[#191919] hover:opacity-80 focus-visible:ring-2 focus-visible:ring-[#191919]/50 focus-visible:outline-none dark:bg-white dark:text-[#191919] dark:hover:bg-white dark:focus-visible:ring-white/50"
        >
          <span className="-translate-y-px">{t('contact.send')}</span>
          <ArrowRight className="size-5" aria-hidden="true" />
        </Button>
        <p className="text-[0.9375rem]/[1.45] font-medium tracking-[-0.005em] text-[#6b6b6b] dark:text-gray-400">
          {t('contact.orEmail')}{' '}
          <a
            href={`mailto:${about.contact.email}`}
            className="text-[#191919] underline underline-offset-4 dark:text-white"
          >
            {about.contact.email}
          </a>
        </p>
      </form>
    </div>
  );
};

export default ContactForm;
