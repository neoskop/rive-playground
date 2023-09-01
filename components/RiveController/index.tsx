"use client";

import { useEffect, useRef, useState } from "react";

import RiveAnimation from "../RiveAnimation";
import styles from "./styles.module.scss";

type Props = {
  src: string;
};

const RiveController = ({ src }: Props) => {
  const artboards = [
    "Step-1",
    "Step-2",
    "Step-3",
    "Step-4",
    "Step-5",
    "Step-6",
  ];

  const masks = [
    "M 0.680027 0.130411 C 0.859796 0.0915974 1.01431 0.286422 0.998944 0.508372 C 0.983582 0.730323 0.985995 0.788008 0.827781 0.884653 C 0.669566 0.981299 0.523981 0.808066 0.327933 0.861252 C 0.0942507 0.924647 0.0416383 0.767486 0.00559495 0.543183 C -0.0304484 0.31888 0.112154 0.0853882 0.303831 0.0853882 C 0.495508 0.0853882 0.500258 0.169225 0.680027 0.130411 Z",
    "M 0.674081 0.0979782 C 0.85278 0.0593638 1.02397 0.292359 0.997229 0.506226 C 0.97049 0.720094 0.986917 0.767751 0.829643 0.8639 C 0.67237 0.960049 0.529459 0.827661 0.334576 0.880573 C 0.102284 0.943643 0.0612312 0.772392 0.00978746 0.540858 C -0.0416562 0.309324 0.11733 0.139509 0.307867 0.139509 C 0.498404 0.139509 0.495381 0.136593 0.674081 0.0979782 Z",
    "M 0.680027 0.130411 C 0.859796 0.0915974 1.01431 0.286422 0.998944 0.508372 C 0.983582 0.730323 0.985995 0.788008 0.827781 0.884653 C 0.669566 0.981299 0.523981 0.808066 0.327933 0.861252 C 0.0942507 0.924647 0.0416383 0.767486 0.00559495 0.543183 C -0.0304484 0.31888 0.112154 0.0853882 0.303831 0.0853882 C 0.495508 0.0853882 0.500258 0.169225 0.680027 0.130411 Z",
    "M 0.674081 0.0979782 C 0.85278 0.0593638 1.02397 0.292359 0.997229 0.506226 C 0.97049 0.720094 0.986917 0.767751 0.829643 0.8639 C 0.67237 0.960049 0.529459 0.827661 0.334576 0.880573 C 0.102284 0.943643 0.0612312 0.772392 0.00978746 0.540858 C -0.0416562 0.309324 0.11733 0.139509 0.307867 0.139509 C 0.498404 0.139509 0.495381 0.136593 0.674081 0.0979782 Z",
    "M 0.680027 0.130411 C 0.859796 0.0915974 1.01431 0.286422 0.998944 0.508372 C 0.983582 0.730323 0.985995 0.788008 0.827781 0.884653 C 0.669566 0.981299 0.523981 0.808066 0.327933 0.861252 C 0.0942507 0.924647 0.0416383 0.767486 0.00559495 0.543183 C -0.0304484 0.31888 0.112154 0.0853882 0.303831 0.0853882 C 0.495508 0.0853882 0.500258 0.169225 0.680027 0.130411 Z",
    "M 0.674081 0.0979782 C 0.85278 0.0593638 1.02397 0.292359 0.997229 0.506226 C 0.97049 0.720094 0.986917 0.767751 0.829643 0.8639 C 0.67237 0.960049 0.529459 0.827661 0.334576 0.880573 C 0.102284 0.943643 0.0612312 0.772392 0.00978746 0.540858 C -0.0416562 0.309324 0.11733 0.139509 0.307867 0.139509 C 0.498404 0.139509 0.495381 0.136593 0.674081 0.0979782 Z",
  ];

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dismantleDuration: number = 300;

  const [index, setIndex] = useState(1);
  const [artboard, setArtboard] = useState<string>("Step-1");
  const [prevArtboard, setPrevArtboard] = useState<string>();

  const changeArtboard = (newIndex: number) => {
    setPrevArtboard(`Step-${index}`);
    setIndex(newIndex);
  };

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setArtboard(`Step-${index}`);
    }, dismantleDuration);

    return () => {
      timeoutRef.current && clearTimeout(timeoutRef.current);
    };
  }, [index]);

  return (
    <div className={styles.container}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1 1"
        width="480"
        height="480"
      >
        <clipPath id="mask" clipPathUnits="objectBoundingBox">
          <path
            style={
              {
                d: `path("${masks[index]}")`,
                "--dismantle-duration": `${dismantleDuration * 2}ms`,
              } as React.CSSProperties
            }
            className={styles["clip-path"]}
          />
        </clipPath>
      </svg>
      <div className={styles.mask}>
        <div className={styles.artboard}>
          {artboards.map(
            (artboardName, index) =>
              artboard === artboardName && (
                <RiveAnimation
                  key={artboardName}
                  src={src}
                  artboard={artboardName}
                  prevArtboard={artboardName === prevArtboard}
                  dismantleDuration={dismantleDuration}
                />
              )
          )}
        </div>
      </div>
      <div className={styles.infos}>Artboard: {artboard}</div>
      <div className={styles.pagination}>
        {artboards.map((artboardName, i) => (
          <button
            onClick={() => changeArtboard(i + 1)}
            key={`pagination-${i}`}
            disabled={artboardName === artboard}
          >
            {artboardName}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RiveController;
