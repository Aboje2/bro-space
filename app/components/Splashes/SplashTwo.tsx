import * as React from "react"
import { StyleSheet, View, Image } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import { Text } from "app/components/Text"

const ananymous = require("../../../assets/images/ananymous.png")

export interface SplashTwoProps {
  /**
   * An optional style override useful for padding & margin.
   */
}

/**
 * Describe your component here
 */
export const SplashTwo = observer(function SplashTwo(props: SplashTwoProps) {
  return (
    <View style={styles.contentStyle}>
      <View
        style={{ display: "flex", flexDirection: "row", justifyContent: "center", marginRight: 20 }}
      >
        <Image source={ananymous} resizeMode="contain" />
      </View>
      <View style={styles.textWrapper}>
        <Text size="lg" weight="semiBold" style={styles.headerStyle} text="Anonymous sharing" />
        <Text
          size="sm"
          weight="light"
          style={styles.bodyText}
          text="Express yourself freely without judgement. Your identity is always protected."
        />
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  headerStyle: {
    color: colors.palette.primary100,
    textAlign: "center",
  },

  bodyText: {
    color: colors.palette.secondary50,
    textAlign: "center",
    width: 288,
    marginTop: 10,
  },
  contentStyle: {
    marginTop: 100,
  },
  textWrapper: {
    display: "flex",
    alignItems: "center",
  },
})
