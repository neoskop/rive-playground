"use client";

import { useEffect, useRef, useState } from "react";

import RiveAnimation from "../RiveAnimation";
import styles from "./styles.module.scss";

type RiveControllerProps = {
  src: string;
};

type Artboard = {
  name: string;
  mask: string;
};

const RiveController = ({ src }: RiveControllerProps) => {
  const artboards: Artboard[] = [
    {
      name: "Step-1",
      mask: "M 0.680027 0.130411 C 0.859796 0.0915974 1.01431 0.286422 0.998944 0.508372 C 0.983582 0.730323 0.985995 0.788008 0.827781 0.884653 C 0.669566 0.981299 0.523981 0.808066 0.327933 0.861252 C 0.0942507 0.924647 0.0416383 0.767486 0.00559495 0.543183 C -0.0304484 0.31888 0.112154 0.0853882 0.303831 0.0853882 C 0.495508 0.0853882 0.500258 0.169225 0.680027 0.130411 Z",
    },
    {
      name: "Step-2",
      mask: "M 0.674081 0.0979782 C 0.85278 0.0593638 1.02397 0.292359 0.997229 0.506226 C 0.97049 0.720094 0.986917 0.767751 0.829643 0.8639 C 0.67237 0.960049 0.529459 0.827661 0.334576 0.880573 C 0.102284 0.943643 0.0612312 0.772392 0.00978746 0.540858 C -0.0416562 0.309324 0.11733 0.139509 0.307867 0.139509 C 0.498404 0.139509 0.495381 0.136593 0.674081 0.0979782 Z",
    },
    {
      name: "Step-3",
      mask: "M 0.672684 0.0771307C0.851829 0.0384964 0.978531 0.274046 0.996638 0.485589C1.01475 0.697133 0.962867 0.809738 0.763412 0.901452C0.563957 0.993166 0.491902 0.784725 0.289314 0.826414C0.0529825 0.875046 -0.036971 0.6211 0.013628 0.428292C0.064227 0.235484 0.146827 0.0363485 0.355103 0.159403C0.56338 0.282458 0.493538 0.115765 0.672684 0.0771307 Z",
    },
    {
      name: "Step-4",
      mask: "M 0.717059 0.113764C0.918726 0.136925 1.01382 0.331514 0.998392 0.553585C0.982968 0.775655 0.92832 0.849756 0.770397 0.880844C0.612474 0.911933 0.521857 0.847431 0.320682 0.880844C0.0508526 0.92566 0.0205228 0.734932 0.000651734 0.553585C-0.0192194 0.372237 0.0696676 0.195058 0.262114 0.195058C0.454561 0.195058 0.515392 0.0906038 0.717059 0.113764 Z",
    },
    {
      name: "Step-5",
      mask: "M 0.680027 0.130411 C 0.859796 0.0915974 1.01431 0.286422 0.998944 0.508372 C 0.983582 0.730323 0.985995 0.788008 0.827781 0.884653 C 0.669566 0.981299 0.523981 0.808066 0.327933 0.861252 C 0.0942507 0.924647 0.0416383 0.767486 0.00559495 0.543183 C -0.0304484 0.31888 0.112154 0.0853882 0.303831 0.0853882 C 0.495508 0.0853882 0.500258 0.169225 0.680027 0.130411 Z",
    },
    {
      name: "Step-6",
      mask: "M0.717059 0.113764C0.918726 0.136925 1.01382 0.331514 0.998392 0.553585C0.982968 0.775655 0.92832 0.849756 0.770397 0.880844C0.612474 0.911933 0.521857 0.847431 0.320682 0.880844C0.0508526 0.92566 0.0205228 0.734932 0.000651734 0.553585C-0.0192194 0.372237 0.0696676 0.195058 0.262114 0.195058C0.454561 0.195058 0.515392 0.0906038 0.717059 0.113764Z",
    },
  ];

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dismantleDuration: number = 300;

  const [artboard, setArtboard] = useState<string>("Step-1");
  const [prevArtboard, setPrevArtboard] = useState<string>();

  const changeArtboard = (newArtboardName: string) => {
    setPrevArtboard(artboard);
    timeoutRef.current = setTimeout(() => {
      setArtboard(newArtboardName);
    }, dismantleDuration);
  };

  const getCurrentMask = () => {
    const currentArtboard = artboards.find(
      (artboardObj) => artboardObj.name === artboard
    );

    return `path("${currentArtboard?.mask}")`;
  };

  useEffect(() => {
    return () => {
      timeoutRef.current && clearTimeout(timeoutRef.current);
    };
  }, []);

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
                d: getCurrentMask(),
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
            (artboardObj, index) =>
              artboard === artboardObj.name && (
                <RiveAnimation
                  key={artboardObj.name}
                  src={src}
                  artboard={artboardObj.name}
                  prevArtboard={artboardObj.name === prevArtboard}
                  dismantleDuration={dismantleDuration}
                />
              )
          )}
        </div>
      </div>
      <div className={styles.infos}>Artboard: {artboard}</div>
      <div className={styles.pagination}>
        {artboards.map((artboardObj, i) => (
          <button
            onClick={() => changeArtboard(artboardObj.name)}
            key={`pagination-${i}`}
            disabled={artboardObj.name === artboard}
          >
            {artboardObj.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RiveController;
