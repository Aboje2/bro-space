import * as React from "react"
import { StyleSheet, View, Image } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import { Text } from "app/components/Text"
const community = require("../../../assets/images/community.png")

export interface SplashFourProps {
  /**
   * An optional style override useful for padding & margin.
   */
}

/**
 * Describe your component here
 */
export const SplashFour = observer(function SplashFour(props: SplashFourProps) {
  return (
    <View style={styles.contentStyle}>
      <View
        style={{ display: "flex", flexDirection: "row", justifyContent: "center", marginRight: 20 }}
      >
        <Image source={community} resizeMode="contain" />
      </View>

      <View>
        <Text size="lg" weight="semiBold" style={styles.headerStyle} text="Supportive community" />
        <Text
          size="sm"
          weight="light"
          style={styles.bodyText}
          text="Give and receive support from like minded individuals. You are not alone."
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
