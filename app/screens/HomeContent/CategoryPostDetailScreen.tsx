import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import {
  ViewStyle,
  View,
  TouchableOpacity,
  StyleSheet,
  Share,
  Pressable,
  ActivityIndicator,
} from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { useRoute } from "@react-navigation/native"
import { Screen, Text, Icon, IfElse, DetailLoader } from "app/components"
import { formatDistanceToNow } from "date-fns"
import { colors, spacing } from "app/theme"
import useCreateConnection from "app/hooks/connections/use-creatConnection"
import useGetCategoryPost from "app/hooks/category/get-categoryPost"

interface CategoryPostDetailScreenProps extends AppStackScreenProps<"CategoryPostDetail"> {}
type RouteParams = {
  catId: string
  catPostId: string
}

export const CategoryPostDetailScreen: FC<CategoryPostDetailScreenProps> = observer(
  function CategoryPostDetailScreen(_props) {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()
    const createConnection = useCreateConnection()
    const { navigation } = _props

    const route = useRoute()
    const { catPostId, catId } = (route.params as RouteParams) || {}
    const categoryPostDetail = useGetCategoryPost(catId, catPostId)
    // console.log(categoryPostDetail.value?.data, "logging from post detail page")
    const initial = categoryPostDetail?.value?.data?.user?.username?.slice(0, 2).toUpperCase()
    const formatTime = (dateString: Date) => {
      if (!dateString) return
      return formatDistanceToNow(new Date(dateString), { addSuffix: true })
    }

    const submitConnection = () => {
      createConnection
        .mutateAsync({ receiver_uuid: "need userId" })
        .then((res) => {
          console.log(res)
        })
        .catch((error) => {
          error?.response?.data || error.message
        })
    }

    const onShare = async () => {
      try {
        const result = await Share.share({
          message: "Check out this awesome app! 🚀 Download it here: https://example.com",
        })

        if (result.action === Share.sharedAction) {
          console.log("Content shared successfully")
        } else if (result.action === Share.dismissedAction) {
          console.log("Share dismissed")
        }
      } catch (error) {
        console.error("Error sharing:", error)
      }
    }

    // Pull in navigation via hook
    // const navigation = useNavigation()
    return (
      <IfElse
        ifOn={!categoryPostDetail.isPending && !!categoryPostDetail?.value}
        ifOnElse={categoryPostDetail.isPending && !categoryPostDetail?.value}
        onElse={<DetailLoader />}
      >
        <Screen
          preset="scroll"
          safeAreaEdges={["top", "bottom"]}
          contentContainerStyle={$screenContentContainer}
        >
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContent}>
            <View style={styles.iconWrapper}>
              <Icon icon="backward" />
            </View>
            <Text weight="sansMd" size="md" style={styles.textColor} text="Category Postdetail" />
          </TouchableOpacity>

          <View style={styles.mainContentContainer}>
            <View>
              <View style={styles.topSpacing}>
                <View style={styles.initialsWrapper}>
                  <Text weight="sansMd" size="xs" style={styles.initials} text={initial} />
                </View>

                {categoryPostDetail?.value?.data?.allow_connection ? (
                  <TouchableOpacity onPress={submitConnection} style={styles.btnStyle}>
                    {createConnection.isPending ? (
                      <ActivityIndicator color="white" size="small" />
                    ) : (
                      <Text
                        weight="normal"
                        style={styles.privateConnect}
                        text="Connect privately"
                      />
                    )}
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={submitConnection} style={styles.btnStyle}>
                    {createConnection.isPending ? (
                      <ActivityIndicator color="white" size="small" />
                    ) : (
                      <Text weight="normal" style={styles.privateConnect} text="Public View" />
                    )}
                  </TouchableOpacity>
                )}
              </View>

              <Text
                weight="sansMd"
                size="xs"
                style={styles.accentColor}
                text={categoryPostDetail?.value?.data?.user.username}
              />
              <Text
                weight="sansNormal"
                size="xxs"
                style={styles.timeText}
                text={`${formatTime(categoryPostDetail?.value?.data?.created_at)} . ${
                  categoryPostDetail?.value?.data?.category.name
                }`}
              />

              <Text
                weight="light"
                size="sm"
                style={[styles.primaryTextColor, { marginBottom: 10 }]}
                text={categoryPostDetail?.value?.data?.topic}
              />
              <Text
                weight="light"
                size="xxs"
                style={styles.textStyle}
                text={categoryPostDetail?.value?.data?.text}
              />

              <View style={[styles.textIcon, { gap: 10, marginVertical: 10 }]}>
                <View style={[styles.textIcon, styles.textSpacing]}>
                  <Icon size={20} icon="heart" />
                  <Text weight="normal" style={styles.reactionText} text={`215 likes`} />
                </View>
                <View style={[styles.textIcon, styles.textSpacing]}>
                  <Icon size={20} icon="message" />
                  <Text weight="normal" style={styles.reactionText} text={`70 comments`} />
                </View>
                <Pressable onPress={onShare} style={[styles.textIcon, styles.textSpacing]}>
                  <Icon size={18} icon="share" />
                  <Text weight="normal" style={styles.reactionText} text="share" />
                </Pressable>
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
          </View>
        </Screen>
      </IfElse>
    )
  },
)

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
