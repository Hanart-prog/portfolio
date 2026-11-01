import type { ReactElement, ReactNode } from 'react';

interface SubsectionTitleProps {
  children: ReactNode;
}

export const SubsectionTitle = ({
  children,
}: SubsectionTitleProps): ReactElement => (
  <h3 className="text-[clamp(2.5rem,4.5vw,5rem)] leading-[0.96] font-semibold tracking-[-0.055em] text-[#191919] dark:text-white">
    {children}
  </h3>
);

export default SubsectionTitle;
