import { FC } from 'react';
import OnboardingCommon from './OnboardingCommon';

interface Props {}

const OnboardingWelcome: FC<Props> = () => {
  return (
    <OnboardingCommon
      headers={['Scan Anything.', 'Save Everything.']}
      illustration={require('../../assets/scanner.png')}
      subHeader="Scan documents, receipts, notes and more in high quality."
    />
  );
};

export default OnboardingWelcome;
