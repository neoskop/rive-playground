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
  initialArtboard: string;
};

const RiveController = ({
  src,
  artboards,
  initialArtboard,
}: RiveControllerProps) => {
  const animateRef = useRef<SVGAnimateElement | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismantleDuration: number = 0.3;

  const [prevArtboard, setPrevArtboard] = useState<string>("Step-6");
  const [nextArtboard, setNextArtboard] = useState<string>(initialArtboard);
  const [artboard, setArtboard] = useState<string>(initialArtboard);

  const changeArtboard = (newArtboardName: string) => {
    setPrevArtboard(artboard);
    setNextArtboard(newArtboardName);

    animateRef?.current?.beginElement();

    timeoutRef.current = setTimeout(() => {
      setArtboard(newArtboardName);
    }, dismantleDuration * 1000);
  };

  const getNextMask = () => {
    const currentArtboardObj = artboards.find(
      (artboardObj) => artboardObj.name === nextArtboard
    );

    return currentArtboardObj?.mask;
  };

  useEffect(() => {
    console.log(prevArtboard);
  }, [prevArtboard]);

  const getPrevMask = () => {
    const prevArtboardObj = artboards.find(
      (artboardObj) => artboardObj.name === prevArtboard
    );

    return prevArtboardObj?.mask;
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
        <clipPath id="clip-path" clipPathUnits="objectBoundingBox">
          <path
            id="mask"
            d={getNextMask()}
            style={
              {
                "--dismantle-duration": `${dismantleDuration}s`,
              } as React.CSSProperties
            }
            className={styles["clip-path"]}
          />
          <animate
            href="#mask"
            attributeName="d"
            attributeType="XML"
            from={getPrevMask()}
            to={getNextMask()}
            repeatCount="1"
            begin="0s"
            dur={`${dismantleDuration}s`}
            fill="freeze"
            restart="whenNotActive"
            ref={animateRef}
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
