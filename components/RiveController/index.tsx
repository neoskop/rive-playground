"use client";

import { useEffect, useRef, useState } from "react";

import RiveAnimation from "../RiveAnimation";
import styles from "./styles.module.scss";

type Artboard = {
  name: string;
  mask: string;
};

type RiveControllerProps = {
  src: string;
  artboards: Artboard[];
};

const RiveController = ({ src, artboards }: RiveControllerProps) => {
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
