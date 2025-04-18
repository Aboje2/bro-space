import React, { useRef, useMemo, useCallback, useEffect } from "react"
import { Pressable, View, ViewStyle, Modal, StyleSheet, Dimensions } from "react-native"
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated"
import { GestureDetector, Gesture } from "react-native-gesture-handler"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import { Text, Button } from "app/components"
import BottomSheet from "@gorhom/bottom-sheet"

export interface PopUpsProps {
  /**
   * An optional style override useful for padding & margin.
   */

  // children: React.ReactNode
  // showModal: boolean
  // setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  bottomSheetRef: React.RefObject<BottomSheet>
}
// const { height: SCREEN_HEIGHT } = Dimensions.get("window")
// const { height } = Dimensions.get("window")
// const SNAP_POINTS = {
//   fullyOpen: height * 0.3,
//   halfOpen: height * 0.6,
//   closed: height,
// }
/**
 * Describe your component here
 * children, showModal, setShowModa
 */
export const PopUps = observer(function PopUps({ bottomSheetRef }: PopUpsProps) {
  // const bottomSheetRef = useRef<BottomSheet>(null)
  // // const translateY = useSharedValue(SCREEN_HEIGHT)
  // const translateY = useSharedValue(SNAP_POINTS.closed)

  // // const SNAP_POINTS = [SCREEN_HEIGHT, SCREEN_HEIGHT * 0.5, SCREEN_HEIGHT * 0.1]
  // // useEffect(() => {
  // //   if (showModal) {
  // //     translateY.value = withSpring(SNAP_POINTS[2]) // Open at 50%
  // //   }
  // // }, [showModal])

  // const panGesture = Gesture.Pan()
  //   .onUpdate((event) => {
  //     // translateY.value = Math.max(SNAP_POINTS[0], event.translationY + SNAP_POINTS[1])
  //     translateY.value = Math.max(SNAP_POINTS.fullyOpen, event.translationY + translateY.value)
  //   })
  //   .onEnd((event) => {
  //     // Snap to the closest point
  //     const velocity = event.velocityY
  //     if (velocity > 200) {
  //       translateY.value = withSpring(SNAP_POINTS.closed, { damping: 10 }) // Close modal
  //       setShowModal(false)
  //     } else if (translateY.value > SNAP_POINTS.halfOpen) {
  //       translateY.value = withSpring(SNAP_POINTS.closed, { damping: 10 }) // Snap to 50%
  //       setShowModal(false)
  //     } else {
  //       translateY.value = withSpring(SNAP_POINTS.fullyOpen, { damping: 10 }) // Snap to 10%
  //     }
  //   })
  // // .onEnd((event) => {
  // //   // Decide where to snap based on drag distance
  // //   if (event.translationY > 100) {
  // //     setShowModal(false) // Close modal
  // //   } else if (event.translationY > -50) {
  // //     translateY.value = withSpring(SNAP_POINTS[2]) // Snap to 25%
  // //   } else {
  // //     translateY.value = withSpring(SNAP_POINTS[0]) // Snap to 90%
  // //   }
  // // })

  // const animatedStyle = useAnimatedStyle(() => ({
  //   transform: [{ translateY: translateY.value }],
  // }))

  // Define snap points (height options)

  // Function to open the bottom sheet

  return (
    // <Modal
    //   transparent={true}
    //   visible={showModal}
    //   onRequestClose={() => {
    //     setShowModal(false)
    //   }}
    //   animationType="slide"
    // >
    //   <Pressable
    //     style={styles.overlay}
    //     onPress={() => setShowModal(false)}
    //     // pointerEvents="box-none"
    //   >
    //     <Pressable onPress={() => {}}>
    //       {/* <GestureDetector gesture={panGesture}> */}
    //       <Animated.View style={[styles.modal, animatedStyle]}>
    //         <View style={styles.handle} />
    //         <View style={styles.mainContent}>{children}</View>
    //       </Animated.View>
    //       {/* </GestureDetector> */}
    //     </Pressable>
    //   </Pressable>
    // </Modal>
    <View style={styles.container}>
      <BottomSheet ref={bottomSheetRef} index={-1} snapPoints={["25%", "50%"]}>
        <View style={styles.contentContainer}>
          <Text>Swipe down to close</Text>
        </View>
      </BottomSheet>
    </View>
  )
})

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",

    position: "relative",
  },

  mainContent: {
    paddingBottom: 0,
  },

  modal: {
    flex: 1,
    position: "absolute",
    // bottom: 0,
    top: 0,
    width: "100%",
    // height: height * 0.9, // Max height

    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // padding: 16,
  },

  handle: {
    width: 40,
    height: 5,
    backgroundColor: "#ccc",
    alignSelf: "center",
    borderRadius: 10,
    marginBottom: 10,
  },

  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  contentContainer: { flex: 1, alignItems: "center", padding: 20 },
})
