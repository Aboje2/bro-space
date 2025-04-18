import { View, StyleSheet, Animated } from "react-native"
import { pulseAnimationStyle } from "app/utils/styles"

export const DetailLoader = () => (
  <View style={styles.container}>
    <View style={styles.firstStyleContainer}>
      <Animated.View style={[styles.firstStyle, pulseAnimationStyle]} />
      <Animated.View style={[styles.firstStyle, pulseAnimationStyle]} />
    </View>

    <Animated.View style={[styles.secondStyle, pulseAnimationStyle]} />
    <Animated.View style={[styles.secondStyle, pulseAnimationStyle]} />
    {Array.from({ length: 8 }).map((_, i) => (
      <Animated.View key={i + "001"} style={[styles.lastStyle, pulseAnimationStyle]} />
    ))}
  </View>
)

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
  },
  firstStyle: {
    width: 121,
    height: 24,
    backgroundColor: "#e0e0e0",
  },
  firstStyleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  secondStyle: {
    width: 150,
    height: 24,
    backgroundColor: "#e0e0e0",
    marginBottom: 20,
  },
  lastStyle: {
    width: 300,
    height: 24,
    backgroundColor: "#e0e0e0",
    marginBottom: 10,
  },
})
