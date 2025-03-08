import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle, StyleSheet, TouchableOpacity } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import { Text, Icon } from "app/components"
import { useNavigation } from "@react-navigation/native"

export interface PostProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const Post = observer(function Post(props: PostProps) {
  const navigation = useNavigation()
  return (
    <View style={styles.contentContainer}>
      <View style={styles.textSpacing}>
        <View style={[styles.spanWrapper, styles.textGap]}>
          <Text weight="sansMd" size="xxs" style={styles.accentColor} text="@Soft king" />
          <Text weight="light" size="xxs" style={styles.yearsText} text="25Years old" />
        </View>
        <TouchableOpacity onPress={()=>navigation.navigate("Connections")} style={styles.btnStyle}>
          <Text weight="normal" style={styles.privateConnect} text="Connect privately" />
        </TouchableOpacity>
      </View>
      <Text weight="light" size="sm" style={styles.textColor} text="Best meditation techniques" />
      <Text
        weight="light"
        size="xs"
        style={{ color: "#0A161ECC" }}
        text="Contrary to popular belief, Lorem Ipsum is not simply just a random text. It has roots in a piece of classical Latin 45 BC."
      />

      <View style={[styles.textSpacing]}>
        <View style={[styles.spanWrapper, { gap: 20 }]}>
          <View style={[styles.spanWrapper, styles.textGap]}>
            <Icon size={20} icon="heart" />
            <Text weight="normal" style={styles.reactions} text="15 likes" />
          </View>
          <View style={[styles.spanWrapper, styles.textGap]}>
            <Icon size={20} icon="message" />
            <Text weight="normal" style={styles.reactions} text="20 comments" />
          </View>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("PostDetail")}
          
          style={[styles.textSpacing, styles.textGap]}
        >
          <Text weight="sansNormal" size="xxs" style={styles.accentColor} text="See more" />
          <Icon icon="forward" />
        </TouchableOpacity>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  spanWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  btnStyle: {
    backgroundColor: colors.palette.primary50,
    width: 124,
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textColor: {
    color: colors.palette.primary100,
  },
  yearsText: {
    color: "#254863CC",
    fontSize: 10,
  },
  textSpacing: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  accentColor: {
    color: colors.palette.primary50,
  },
  privateConnect: {
    color: colors.palette.neutral100,
    fontSize: 10,
    paddingVertical: 8,
  },

  reactions: {
    color: colors.palette.secondary50,
    fontSize: 9,
  },

  contentContainer: {
    backgroundColor: "#EAEDF0",
    borderRadius: 4,
    padding: 15,
    marginBottom: 10,
  },
  textGap: {
    gap: 4,
  },
})
