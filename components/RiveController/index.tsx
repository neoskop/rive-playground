"use client";

import { useEffect, useRef, useState } from "react";

import RiveAnimation from "../RiveAnimation";
import styles from "./styles.module.scss";

type Props = {
  src: string;
};

const RiveController = ({ src }: Props) => {
  const [index, setIndex] = useState(1);
  const [artboard, setArtboard] = useState<string>("Step-1");
  const [prevArtboard, setPrevArtboard] = useState<string>();

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const artboards = [
    "Step-1",
    "Step-2",
    "Step-3",
    "Step-4",
    "Step-5",
    "Step-6",
  ];

  const dismantleDuration: number = 300;

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
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1" fill="none">
            <clipPath id="mask" clipPathUnits="objectBoundingBox">
              <path d="M0.277839 0.142257C0.0997645 0.112313 0 0.347432 0 0.474972C0 0.602513 0.0436291 0.741226 0.191667 0.824023C0.339704 0.906821 0.537441 0.805377 0.720879 0.850942C0.904317 0.896507 0.984772 0.7356 0.998717 0.530426C1.01266 0.325252 0.912898 0.141149 0.699424 0.172202C0.48595 0.203255 0.455913 0.172201 0.277839 0.142257Z" />
            </clipPath>
          </svg>
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
