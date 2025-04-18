import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle, StyleSheet, Image } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import { Text } from "app/components/Text"

export interface DisplayImageProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  selectedImage: string
}

/**
 * Describe your component here
 */
export const DisplayImage = observer(function DisplayImage({ selectedImage }: DisplayImageProps) {
  return (
    <View style={styles.modalContent}>
      <Image source={{ uri: selectedImage }} style={styles.fullImage} />
    </View>
  )
})

const styles = StyleSheet.create({
  fullImage: {
    minWidth: "100%",
    height: 500,
    resizeMode: "contain",
  },

  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
