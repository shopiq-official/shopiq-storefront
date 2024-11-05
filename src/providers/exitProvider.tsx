"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ExitPopup = dynamic(() => import("../components/exitPopup/exitPopup"));

const ExitProvider = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleMouseLeave = () => {
      setShow(true);
      sessionStorage.setItem("showExitModal", "false");
      document.removeEventListener("mouseleave", handleMouseLeave);
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  return <>{show && <ExitPopup open={setShow} />}</>;
};

export default ExitProvider;
