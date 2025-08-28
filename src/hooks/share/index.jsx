import { Share } from "react-native";
import { useCallback } from "react";

const ShareHook = () => {
  const urlApp = "https://play.google.com/store/apps/details?id=com.fut90.apk";

  const onShare = useCallback(async () => {
    try {
      const result = await Share.share({
        message:
          "Recomiendo esta aplicación para mirar los eventos deportivos 👌 " +
          "\n" +
          urlApp,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Share", result.activityType);
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Rechazado");
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [urlApp]);

  return { onShare };
};

export default ShareHook;
