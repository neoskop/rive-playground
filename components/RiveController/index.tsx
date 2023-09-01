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
    "M0.643185 0.0979782C0.813695 0.0593638 0.977036 0.292359 0.951523 0.506226C0.926009 0.720094 0.941683 0.767751 0.791618 0.8639C0.641553 0.960049 0.505192 0.827661 0.319242 0.880573C0.097596 0.943643 0.0584247 0.772392 0.00933887 0.540858C-0.039747 0.309324 0.111953 0.139509 0.293757 0.139509C0.475561 0.139509 0.472676 0.136593 0.643185 0.0979782Z",
    "M0.648859 0.130411C0.820388 0.0915974 0.967817 0.286422 0.953159 0.508372C0.938501 0.730323 0.940804 0.788008 0.789841 0.884653C0.638878 0.981299 0.499965 0.808066 0.312903 0.861252C0.0899309 0.924647 0.0397299 0.767486 0.00533852 0.543183C-0.0290529 0.31888 0.107014 0.0853882 0.289906 0.0853882C0.472797 0.0853882 0.47733 0.169225 0.648859 0.130411Z",
    "M0.643185 0.0979782C0.813695 0.0593638 0.977036 0.292359 0.951523 0.506226C0.926009 0.720094 0.941683 0.767751 0.791618 0.8639C0.641553 0.960049 0.505192 0.827661 0.319242 0.880573C0.097596 0.943643 0.0584247 0.772392 0.00933887 0.540858C-0.039747 0.309324 0.111953 0.139509 0.293757 0.139509C0.475561 0.139509 0.472676 0.136593 0.643185 0.0979782Z",
    "M0.648859 0.130411C0.820388 0.0915974 0.967817 0.286422 0.953159 0.508372C0.938501 0.730323 0.940804 0.788008 0.789841 0.884653C0.638878 0.981299 0.499965 0.808066 0.312903 0.861252C0.0899309 0.924647 0.0397299 0.767486 0.00533852 0.543183C-0.0290529 0.31888 0.107014 0.0853882 0.289906 0.0853882C0.472797 0.0853882 0.47733 0.169225 0.648859 0.130411Z",
    "M0.643185 0.0979782C0.813695 0.0593638 0.977036 0.292359 0.951523 0.506226C0.926009 0.720094 0.941683 0.767751 0.791618 0.8639C0.641553 0.960049 0.505192 0.827661 0.319242 0.880573C0.097596 0.943643 0.0584247 0.772392 0.00933887 0.540858C-0.039747 0.309324 0.111953 0.139509 0.293757 0.139509C0.475561 0.139509 0.472676 0.136593 0.643185 0.0979782Z",
    "M0.648859 0.130411C0.820388 0.0915974 0.967817 0.286422 0.953159 0.508372C0.938501 0.730323 0.940804 0.788008 0.789841 0.884653C0.638878 0.981299 0.499965 0.808066 0.312903 0.861252C0.0899309 0.924647 0.0397299 0.767486 0.00533852 0.543183C-0.0290529 0.31888 0.107014 0.0853882 0.289906 0.0853882C0.472797 0.0853882 0.47733 0.169225 0.648859 0.130411Z",
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1 1"
            width="458"
            height="480"
          >
            <clipPath id="mask" clipPathUnits="objectBoundingBox">
              <path
                style={
                  {
                    d: `path("${masks[index]}")`,
                    "--dismantleDuration": `${dismantleDuration * 2}ms`,
                  } as React.CSSProperties
                }
                className={styles["clip-path"]}
              />
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
