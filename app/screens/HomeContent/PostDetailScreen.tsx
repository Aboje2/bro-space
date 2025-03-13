import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TouchableOpacity, StyleSheet } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Icon } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { colors, spacing } from "app/theme"
// import { useStores } from "app/models"

interface PostDetailScreenProps extends AppStackScreenProps<"PostDetail"> {}

export const PostDetailScreen: FC<PostDetailScreenProps> = observer(function PostDetailScreen(
  _props,
) {
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
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContent}>
        <View style={styles.iconWrapper}>
          <Icon icon="backward" />
        </View>
        <Text weight="sansMd" size="md" style={styles.textColor} text="Post detail" />
      </TouchableOpacity>

      <View style={styles.mainContentContainer}>
        <View style={styles.topSpacing}>
          <View style={styles.initialsWrapper}>
            <Text weight="sansMd" size="xs" style={styles.initials} text="AN" />
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("Ananymous")}
            style={styles.btnStyle}
          >
            <Text weight="normal" style={styles.privateConnect} text="Connect privately" />
          </TouchableOpacity>
        </View>

        <Text weight="sansMd" size="xs" style={styles.accentColor} text="Anonymous user" />
        <Text
          weight="sansNormal"
          size="xxs"
          style={styles.timeText}
          text={`2 hours ago . Wellness`}
        />

        <Text
          weight="light"
          size="sm"
          style={[styles.primaryTextColor, { marginBottom: 10 }]}
          text="Best meditation techniques"
        />
        <Text
          weight="light"
          size="xxs"
          style={styles.textStyle}
          text="Contrary to popular belief, Lorem Ipsum is not simply just a random text. It has roots in a piece of classical Latin 45 BC. Contrary to popular belief, Lorem Ipsum is not simply just a random text. It has roots in a piece of classical Latin 45 BC. Contrary to popular belief, Lorem Ipsum is not simply just a random text. It has roots in a piece of classical Latin 45 BC."
        />

        <View style={[styles.textIcon, { gap: 10, marginVertical: 10 }]}>
          <View style={[styles.textIcon, styles.textSpacing]}>
            <Icon size={16} icon="heart" />
            <Text weight="normal" style={styles.reactionText} text={`215 likes`} />
          </View>
          <View style={[styles.textIcon, styles.textSpacing]}>
            <Icon size={16} icon="message" />
            <Text weight="normal" style={styles.reactionText} text={`70 comments`} />
          </View>
          <View style={[styles.textIcon, styles.textSpacing]}>
            <Icon size={14} icon="share" />
            <Text weight="normal" style={styles.reactionText} text="share" />
          </View>
        </View>

        <Text
          weight="sansNormal"
          size="xs"
          style={[styles.initials, { marginBottom: 10 }]}
          text="Comments"
        />
        <Text
          weight="normal"
          size="xxs"
          style={styles.commentText}
          text="Contrary to belief, Lorem is a weird stuff."
        />

        <View style={[styles.textIcon, styles.textSpacing]}>
          <Icon size={16} color="#CF3535" icon="redHeart" />
          <View style={styles.textIcon}>
            <Text weight="normal" style={styles.commentReaction} text={`5 likes`} />
            <TouchableOpacity onPress={() => {}}>
              <Text weight="normal" style={styles.commentReaction} text=" . Reply" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
}

const styles = StyleSheet.create({
  iconWrapper: {
    width: 30,
    height: 30,
    padding: 10,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.palette.primary100,
    justifyContent: "center",
    alignItems: "center",
  },

  textColor: {
    color: colors.palette.primary100,
  },
  iconContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 40,
  },

  mainContentContainer: {
    backgroundColor: "#d5d4d4",
    padding: 20,
    borderRadius: 4,
  },

  initials: {
    color: colors.palette.secondary50,
  },
  initialsWrapper: {
    height: 32,
    width: 32,
    borderRadius: 50,
    backgroundColor: "#2548631A",
    justifyContent: "center",
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
  privateConnect: {
    color: colors.palette.neutral100,
    fontSize: 10,
  },

  topSpacing: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  accentColor: {
    color: colors.palette.primary50,
  },
  primaryTextColor: {
    color: colors.palette.primary50,
  },
  textStyle: {
    color: "#0A161ECC",
  },

  reactionText: {
    fontSize: 9,
    color: colors.palette.secondary50,
  },
  textIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  textSpacing: {
    gap: 3,
  },
  commentText: {
    color: "#01080D",
    marginBottom: 5,
  },

  commentReaction: {
    fontSize: 9,
    color: "#254863B2",
  },
  timeText: {
    color: "#254863CC",
    marginBottom: 30,
  },
})
