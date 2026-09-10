import { FC } from 'react';
import OnboardingCommon from './OnboardingCommon';

interface Props {}

const OnboardingAutoScan: FC<Props> = () => {
  return (
    <OnboardingCommon
      illustration={require('../../assets/scan_doc.png')}
      headers={['Auto Detect', 'Scan Perfectly']}
      subHeader="Our AI finds edges and captures your documents with precision."
    />
  );
};

export default OnboardingAutoScan;
