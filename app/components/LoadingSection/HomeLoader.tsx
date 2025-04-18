import { View, StyleSheet, Animated } from "react-native"
import { pulseAnimationStyle } from "app/utils/styles"

export const HomeLoader = () => (
  <View style={styles.contentStyle}>
    <View>
      <Animated.View style={[styles.bannerStyle, pulseAnimationStyle]} />
      <View style={styles.itemContainer}>
        <View style={styles.boxContainer}>
          {Array.from({ length: 3 }).map((_, i) => (
            <Animated.View key={i + "001"} style={[styles.boxes, pulseAnimationStyle]} />
          ))}
        </View>

        <View>
          <View style={styles.spaceWrapper}>
            <Animated.View style={[styles.loadItem, pulseAnimationStyle]} />
            <Animated.View style={[styles.loadItem, pulseAnimationStyle]} />
          </View>

          <Animated.View style={[styles.firstText, pulseAnimationStyle]} />
          <Animated.View style={[styles.secondText, pulseAnimationStyle]} />

          <View style={styles.boxContainer}>
            {Array.from({ length: 3 }).map((_, i) => (
              <Animated.View key={i + "001"} style={[styles.boxes, pulseAnimationStyle]} />
            ))}
          </View>
        </View>
      </View>
    </View>
  </View>
)

const styles = StyleSheet.create({
  contentStyle: {
    paddingTop: 60,
  },
  bannerStyle: {
    height: 144,
    marginBottom: 20,
    backgroundColor: "#e0e0e0",
  },

  itemContainer: {
    paddingHorizontal: 24,
  },

  boxes: {
    height: 80,
    width: 104,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
  },
  boxContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginBottom: 40,
  },

  //   cardStyle: {},
  spaceWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  loadItem: {
    width: 124,
    height: 24,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
  },

  firstText: {
    width: 200,
    height: 24,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    marginBottom: 20,
  },

  secondText: {
    width: 280,
    height: 24,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    marginBottom: 20,
  },
})
