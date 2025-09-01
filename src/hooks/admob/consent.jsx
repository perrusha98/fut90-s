import { useEffect, useState } from 'react';
import { AdsConsent } from 'react-native-google-mobile-ads';

const RewardHook = () => {
  const [consentFormLoaded, setConsentFormLoaded] = useState(false);
  const [timeoutStarted, setTimeoutStarted] = useState(false);

  const loadAndShowConsentForm = async () => {
    try {
      await AdsConsent.loadAndShowConsentFormIfRequired();
    } catch (error) {
      console.error('Error loading and showing consent form:', error);
    }
  };

  useEffect(() => {
    const checkConsentAvailability = async () => {
      try {
        const consentInfo = await AdsConsent.requestInfoUpdate({});
        if (
          consentInfo.isConsentFormAvailable &&
          consentInfo.status === 'REQUIRED'
        ) {
          setConsentFormLoaded(true);
        }
      } catch (error) {
        console.error('Error requesting consent info:', error);
      }
    };
    checkConsentAvailability();
  }, []);

  useEffect(() => {
    if (!timeoutStarted && consentFormLoaded) {
      setTimeout(() => {
        loadAndShowConsentForm();
      }, 5000);
      setTimeoutStarted(true);
    }
  }, [consentFormLoaded]);

  return null;
};

export default RewardHook;
