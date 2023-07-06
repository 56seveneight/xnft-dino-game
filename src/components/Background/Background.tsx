import { StyleSheet, View } from "react-native";
import { gsap } from 'gsap'
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useSpeed } from "../../state";

const MIN_SPEED = 10;
const MAX_SPEED = 60;

export function Background() {
  const backgroundRef = useRef<View | null>(null);
  const [speed, setSpeed] = useSpeed();
  const [isInitialized, setIsInitialized] = useState(false);
  const tl = useMemo(() => gsap.timeline({repeat: -1 }), [])

  useEffect(() => {
    console.log('current speed: ', speed)
    function onKeyPress(e: KeyboardEvent) {
      // @TODO - speed is actually duration, so it's the inverse of what you'd expect
      if (e.code === 'ArrowLeft') {
        setSpeed((prevSpeed) => {
          if (prevSpeed + 2 <= 60) {
            return prevSpeed + 2;
          }

          return prevSpeed;
        });
      }

      if (e.code === 'ArrowRight') {
        setSpeed((prevSpeed) => {
          if (prevSpeed - 2 >= 10) {
            return prevSpeed - 2;
          }

          return prevSpeed;
        });
      }
    }

    document.addEventListener("keydown", onKeyPress);
    return () => document.removeEventListener("keydown", onKeyPress);
  }, []);

  useEffect(() => {
    if (!backgroundRef.current) {
      console.info('backgroundRef.current is empty')
      return;
    }

    tl.to(backgroundRef.current, { backgroundPosition: "-1000px 0px, -2000px 0px", duration: speed, ease: "linear" });
    setIsInitialized(true);
  }, [backgroundRef, setIsInitialized])

  useEffect(() => {
    if (isInitialized) {
      tl.duration(speed)
    }
  }, [speed, isInitialized]);

  return <View ref={backgroundRef} style={styles.Background}></View>
}

const foreground = require('../../../assets/nightsky_foreground.png');
const midground = require('../../../assets/nightsky_midground.png');
const styles = StyleSheet.create({
  Background: {
    backgroundImage: `url(${midground}), url(${foreground})`,
    backgroundRepeat: 'repeat, repeat',
    backgroundColor: "#000",
    height: '100%',
    width: '100%',
    position: 'relative'
  },
});