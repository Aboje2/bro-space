import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle, Image, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import { Text } from "app/components"
const broImg = require("../../../assets/images/hello-bro.png")

export interface SplashOneProps {
  /**
   * An optional style override useful for padding & margin.
   */
}

/**
 * Describe your component here
 */
export const SplashOne = observer(function SplashOne(props: SplashOneProps) {
  return (
    <View style={styles.contentStyle}>
      <Image source={broImg} resizeMode="contain" />

      <View style={styles.textWrapper}>
        <Text size="lg" weight="semiBold" style={styles.headerStyle} text="Welcome to BroSpace" />
        <Text
          size="sm"
          weight="light"
          style={styles.bodyText}
          text="A safe space for men to connect, grow and share ideas"
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

  textWrapper: {
    display: "flex",
    alignItems: "center",
  },

  contentStyle: {
    marginTop: 100,
  },
})
