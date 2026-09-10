import { FC } from 'react';
import OnboardingCommon from './OnboardingCommon';

interface Props {}

const OnboardingExport: FC<Props> = () => {
  return (
    <OnboardingCommon
      illustration={require('../../assets/scan_export.png')}
      headers={['Organize. Export.', 'Anywhere.']}
      subHeader="Save, share, and export your scans as PDF or images with ease."
    />
  );
};

export default OnboardingExport;
