import * as React from "react"
import { StyleSheet, Image, View } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import { Text } from "app/components/Text"

const holdingPen = require("../../../assets/images/holding-pen.png")

export interface SplashThreeProps {
  /**
   * An optional style override useful for padding & margin.
   */
}

/**
 * Describe your component here
 */
export const SplashThree = observer(function SplashThree(props: SplashThreeProps) {
  return (
    <View style={styles.contentStyle}>
      <Image source={holdingPen} resizeMode="contain" />

      <View style={styles.textWrapper}>
        <Text size="lg" weight="semiBold" style={styles.headerStyle} text="Diverse topics" />
        <Text
          size="sm"
          weight="light"
          style={styles.bodyText}
          text="From wellness to finance, personal development to adventure. Find your interests"
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
    width: 308,
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
