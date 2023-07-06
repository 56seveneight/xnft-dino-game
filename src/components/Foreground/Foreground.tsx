import { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { gsap } from 'gsap'
import { useSpeed } from "../../state";

export function Foreground() {
  const foregroundRef = useRef<View | null>(null);
  const [speed] = useSpeed();
  const [isInitialized, setIsInitialized] = useState(false);
  const tl = useMemo(() => gsap.timeline({repeat: -1 }), [])

  useEffect(() => {
    if (!foregroundRef.current) {
      console.info('foreground.current is empty')
      return;
    }

    tl.to(foregroundRef.current, { backgroundPosition: "-1000px 0px", duration: speed, ease: "linear" });
    setIsInitialized(true);
  }, [foregroundRef, setIsInitialized]);

  useEffect(() => {
    if (isInitialized) {
      console.log('current speedssss: ', speed);
      tl.duration(speed)
    }
  }, [speed, isInitialized]);

  return <View ref={foregroundRef} style={styles.Foreground} ></View>
}

const styles = StyleSheet.create({
  Foreground: {
    backgroundColor: '#5c4033',
    backgroundImage: 'linear-gradient(90deg, #5c4033 2px, #000000 5px)',
    backgroundSize: '10px 100%',
    backgroundRepeat: 'repeat-x',
    height: '80px',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
  }
});