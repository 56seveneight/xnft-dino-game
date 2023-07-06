import { useRecoilState } from 'recoil';
import { RefObject, useEffect, useRef, useState } from "react";
import { Text, Pressable, StyleSheet, Image, View } from "react-native";
import { gsap } from 'gsap';
import { useIsJumping } from '../../state';

export function Dino() {
  function onKeyPress(event: KeyboardEvent) {
    if (!dinoEl.current) {
      return      
    }

    if(event.code === 'ArrowUp'){
      if (isJumping) {
        return;
      }

      setIsJumping(true);
      jump(dinoEl.current);
    }
  
    if(event.code === 'ArrowLeft'){
      setKey('SLOW!!!');
    }
  
    if(event.code === 'ArrowRight'){
      setKey('FAST!!!');
    }
  }

  const [key, setKey] = useState('');
  const [isJumping, setIsJumping] = useIsJumping();
  const dinoEl = useRef<Image>(null);

  useEffect(() => {
    document.addEventListener("keydown", onKeyPress);
    return () => document.removeEventListener("keydown", onKeyPress);
  }, [])

  return (
    <Image ref={dinoEl} source={require('../../../assets/dinoskeleton.png')} style={{ width: 60, height: 60, position: 'absolute', bottom: '80px', left: 0 }} />
  )
}

export function jump(el: Image) {
  gsap.to(el, {
    duration: 0.5,
    y: -100,
    ease: "power1.inOut",
    onComplete: () => {
      gsap.to(el, {
        duration: 0.5,
        y: 0,
        ease: "power1.inOut",
      })
    }
  });
}