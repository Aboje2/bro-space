import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, StyleSheet } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, SplashOne, SplashTwo, SplashThree, SplashFour, Button } from "app/components"
import Swiper from "react-native-swiper"
import { colors, spacing } from "app/theme"

import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface SplashScreenProps extends AppStackScreenProps<"Splash"> {}

export const SplashScreen: FC<SplashScreenProps> = observer(function SplashScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  return (
    <Screen preset="scroll" contentContainerStyle={$screenContentContainer}>
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        loop={false}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
      >
        <SplashOne />
        <SplashTwo />
        <SplashThree />
        <SplashFour />
        {/* <Login /> */}
      </Swiper>

      <Button
        preset="primary"
        style={styles.btnPosition}
        textStyle={{ color: colors.palette.neutral100 }}
        onPress={() => navigation.navigate("CreateAccount")}
        text="Get Started"
      />
    </Screen>
  )
})

const styles = StyleSheet.create({
  dot: {
    height: 6,
    width: 6,
    backgroundColor: colors.palette.neutral500,
    // position: "absolute",
    marginTop: -385,
  },

  activeDot: {
    height: 6,
    width: 18,
    backgroundColor: colors.palette.secondary50,
    marginTop: -385,
    // position: "absolute",
  },
  wrapper: {
    marginBottom: 0,
    backgroundColor: "#c41414g",
  },
  btnPosition: {
    position: "absolute",
    bottom: 110,
    right: 20,
    left: 20,
  },
})

const $screenContentContainer: ViewStyle = {
  paddingTop: spacing.xxxl,
  paddingHorizontal: spacing.lg,
}
