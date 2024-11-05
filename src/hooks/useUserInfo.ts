export const useUserInfo = () => {
    function getUserDeviceDetails() {
      const userAgent = navigator.userAgent;
      const browserName = getBrowserName(userAgent);
      const browserVersion = getBrowserVersion(userAgent);
      const platform = navigator.platform;
      const language = navigator.language;
      const screenWidth = window.screen.width;
      const screenHeight = window.screen.height;
      const pixelRatio = window.devicePixelRatio || 1;
      
      localStorage.setItem('userDeviceDetails',JSON.stringify({
          userAgent,
          browserName,
          browserVersion,
          platform,
          language,
          screenWidth,
          screenHeight ,
          pixelRatio,
      }));
    }

    function getBrowserVersion(userAgent:any) {
      const regex = /(Chrome|Firefox|Safari|Opera|OPR|MSIE|Trident)\/?(\d+)/;
      const match = userAgent.match(regex);
      return match ? match[2] : "Unknown";
    }

    function getBrowserName(userAgent:any) {
      if (userAgent.indexOf("Chrome") > -1) return "Chrome";
      if (userAgent.indexOf("Firefox") > -1) return "Firefox";
      if (
        userAgent.indexOf("Safari") > -1 &&
        userAgent.indexOf("Chrome") === -1
      )
        return "Safari";
      if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1)
        return "Opera";
      if (userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("Trident") > -1)
        return "Internet Explorer";
      return "Unknown";
    }

     return { getUserDeviceDetails };
}