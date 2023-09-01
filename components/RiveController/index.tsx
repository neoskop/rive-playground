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
              <path d="M0.291654 0.0934261C0.102826 0.0682811 -0.0350499 0.301005 0.00787602 0.506934C0.0508019 0.712864 -0.0111784 0.753854 0.144684 0.849965C0.300546 0.946077 0.511652 0.83488 0.704786 0.887772C0.897919 0.940664 0.984216 0.778484 0.998899 0.540317C1.01358 0.30215 0.87988 0.152859 0.691053 0.152859C0.502225 0.152859 0.480481 0.118571 0.291654 0.0934261Z" />
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
