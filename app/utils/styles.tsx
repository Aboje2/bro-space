// Using React Native's Animated
import { Animated } from "react-native"

const pulse = new Animated.Value(1)

Animated.loop(
  Animated.sequence([
    Animated.timing(pulse, {
      toValue: 0.4,
      duration: 700,
      useNativeDriver: true,
    }),
    Animated.timing(pulse, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }),
  ]),
).start()

export const pulseAnimationStyle = {
  opacity: pulse,
}
