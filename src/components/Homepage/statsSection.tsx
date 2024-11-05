"use client";
import styles from "./statsSection.module.css";
import Water_Drop from "@/assets/Icons/Water_Drop.svg";
import Tree from "@/assets/Icons/tree.svg";
import Cloud from "@/assets/Icons/cloud.svg";
import { useEffect, useRef, useState } from "react";

const StatsSection = ({ show }: any) => {
  const [first, setFirst] = useState(0);
  const [second, setSecond] = useState(0);
  const [third, setThird] = useState(0);

  const ref = useRef(null);
  const rootRef: any = useRef(null);

  useEffect(() => {
    let observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateNumber();
            animateNumber2();
            animateNumber3();
            observerInstance.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      },
    );

    if (rootRef.current) observer.observe(rootRef.current);

    return () => {
      if (observer && rootRef.current) observer.unobserve(rootRef.current);
    };
  }, []);

  const animateNumber = () => {
    let start: any = null;
    const duration = 2000;
    const endValue = 25154410;

    const step = (timestamp: any) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const newValue = Math.min((progress / duration) * endValue, endValue);
      setFirst(Math.floor(newValue));
      if (progress < duration) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  };

  const animateNumber2 = () => {
    let start: any = null;
    const duration = 2000;
    const endValue = 20166;

    const step = (timestamp: any) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const newValue = Math.min((progress / duration) * endValue, endValue);
      setSecond(Math.floor(newValue));
      if (progress < duration) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  };

  const animateNumber3 = () => {
    let start: any = null;
    const duration = 2000;
    const endValue = 50250;

    const step = (timestamp: any) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const newValue = Math.min((progress / duration) * endValue, endValue);
      setThird(Math.floor(newValue));
      if (progress < duration) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  };

  return (
    <>
      <div ref={rootRef}>
        <div className={styles.static_four_cards}>
          <div className={styles.container}>
            <div id="document1">
              <Water_Drop />
              <h5>{first}+ </h5> <p>litres water saved </p>
            </div>
            <div id="document2">
              <Tree />
              <h5>{second}+ </h5> <p> trees planted </p>
            </div>
            <div id="document3">
              <Cloud />
              <h5>{third}+ </h5>
              <p> Kms carbon footprint avoided</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatsSection;
