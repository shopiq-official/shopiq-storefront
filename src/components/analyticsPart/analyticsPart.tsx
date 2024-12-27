"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const AnalyticsPart = () => {
  // Get search parameters from the URL
  const searchParams = useSearchParams();

  useEffect(() => {
    // Call the websiteView function when the component mounts
    websiteView();
  }, []);

  const websiteView = () => {
    // Check if the web view has already been recorded
    if (sessionStorage.getItem("WEB_VIEW") === "true") {
      return true; // If yes, exit the function
    } else {
      // Retrieve UTM parameters from the search parameters
      const utm_source = searchParams.get("utm_source");
      const utm_medium = searchParams.get("utm_medium");
      const utm_id = searchParams.get("utm_id");
      const utm_name = searchParams.get("utm_name");
      const utm_term = searchParams.get("utm_term");
      const utm_content = searchParams.get("utm_content");
      const utm_referrer = document.referrer; // Get the referrer URL

      const comingFrom = document.referrer; // Store the referrer URL

      // Mark the web view as recorded in session storage
      sessionStorage.setItem("WEB_VIEW", "true");

      // If any UTM parameters are present, store them in local storage
      if (
        utm_source ||
        utm_medium ||
        utm_id ||
        utm_name ||
        utm_term ||
        utm_content
      ) {
        localStorage.setItem(
          "UTM_DATA",
          JSON.stringify({
            utm_source,
            utm_medium,
            utm_id,
            utm_name,
            utm_term,
            utm_content,
            utm_referrer,
          })
        );
      } else {
        // If no UTM parameters, remove UTM_DATA from local storage
        localStorage.removeItem("UTM_DATA");
      }

      // Send a fetch request to the analytics endpoint
      fetch(
        `https://api.shopiq.app/api/analytics/websiteView?identifier=YOUR_IDENTIFIER&comingFrom=${comingFrom}`
      );

      return true; // Exit the function after processing
    }
  };

  return <></>; // Render nothing
};
