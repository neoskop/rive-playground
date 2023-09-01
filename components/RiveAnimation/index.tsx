import { Alignment, Fit, Layout, useRive } from "@rive-app/react-canvas";

import clsx from "clsx";
import styles from "./styles.module.scss";

type RiveAnimationProps = {
  src: string;
  artboard: string;
  prevArtboard: boolean;
  dismantleDuration?: number;
};

const RiveAnimation = ({
  src,
  artboard,
  prevArtboard,
  dismantleDuration = 300,
}: RiveAnimationProps) => {
  const { RiveComponent } = useRive({
    src: src,
    stateMachines: "State Machine",
    artboard: artboard,
    autoplay: true,
    layout: new Layout({
      fit: Fit.FitWidth,
      alignment: Alignment.Center,
    }),
  });

  return (
    <div
      className={clsx(styles.container, prevArtboard && styles.prev)}
      key={artboard}
      style={
        {
          "--dismantle-duration": `${dismantleDuration}ms`,
        } as React.CSSProperties
      }
    >
      <RiveComponent key={artboard} />
    </div>
  );
};

export default RiveAnimation;
