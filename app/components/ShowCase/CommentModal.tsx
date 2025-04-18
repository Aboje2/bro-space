import * as React from "react"
import { StyleSheet, View, Image } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import { Text } from "app/components/Text"
import { ScrollView } from "react-native-gesture-handler"
const myPics = require("../../../assets/images/profile.png")

export interface CommentModalProps {
  /**
   * An optional style override useful for padding & margin.
   */

  text: string
}

/**
 * Describe your component here
 */
export const CommentModal = observer(function CommentModal({ text }: CommentModalProps) {
  // const { style } = props
  // const $styles = [$container, style]

  return (
    <View style={styles.contentContainer}>
      <Image style={styles.imageStyle} source={myPics} resizeMode="contain" />
      <View style={styles.commentContainer}>
        <Text text="Ayo Dele" size="xxs" weight="semiBold" />
        <Text style={styles.comment} text="This should be my first comment on this app" />
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  commentContainer: {
    backgroundColor: "#ccc",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20,
  },

  imageStyle: {
    width: 40,
    height: 40,
  },

  comment: {
    width: 257,
  },
})
