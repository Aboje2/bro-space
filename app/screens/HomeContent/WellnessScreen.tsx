import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, StyleSheet, ImageBackground, TouchableOpacity } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Icon, Post } from "app/components"

import { colors, spacing } from "app/theme"
const wellnessImg = require("../../../assets/images/categoryImg.png")
// import { useStores } from "app/models"

interface WellnessScreenProps extends AppStackScreenProps<"Wellness"> {}

export const WellnessScreen: FC<WellnessScreenProps> = observer(function WellnessScreen(_props) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook

  const { navigation } = _props
  return (
    <Screen
      preset="scroll"
      safeAreaEdges={["top", "bottom"]}
      contentContainerStyle={$screenContentContainer}
    >
      <View style={styles.imgOverlay}>
        <ImageBackground style={styles.bgImageStyle} resizeMode="contain" source={wellnessImg}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContent}>
            <View style={styles.iconWrapper}>
              <Icon color="#fff" icon="backward" />
            </View>
            <Text weight="sansMd" size="md" style={styles.textColor} text="Wellness" />
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <View style={styles.iconContainer}>
        <Icon onPress={() => navigation.navigate("Ananymous")} size={80} icon="addNew" />
      </View>
      <Post />
      <Post />
      <Post />
    </Screen>
  )
})

const styles = StyleSheet.create({
  iconWrapper: {
    width: 30,
    height: 30,
    padding: 10,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.palette.neutral100,
    justifyContent: "center",
    alignItems: "center",
  },

  textColor: {
    color: colors.palette.neutral100,
  },
  iconContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    // marginBottom: 40,
  },
  iconColor: {
    borderColor: colors.palette.neutral100,
  },

  bgImageStyle: {
    height: 95,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },

  imgOverlay: {
    backgroundColor: "rgba(15, 15, 15, 0.5)",
    borderRadius: 8,
    marginBottom: 30,
  },

  iconContainer: {
    position: "absolute",
    top: "50%",
    right: 20,
    transform: [{ translateY: -25 }],
    zIndex: 10,
  },
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
}
