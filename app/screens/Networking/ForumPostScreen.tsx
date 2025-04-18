import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, StyleSheet, ImageBackground, TouchableOpacity } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Icon, Post, IfElse, HomeLoader, EmptyState, ForumCard } from "app/components"
import { colors, spacing } from "app/theme"
import useGetForumListPost from "app/hooks/forum/use-get-forum-listPot"
import { useRoute } from "@react-navigation/native"

const wellnessImg = require("../../../assets/images/categoryImg.png")
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface ForumPostScreenProps extends AppStackScreenProps<"ForumPost"> {}

type RouteParams = {
  forumId?: string
}
export const ForumPostScreen: FC<ForumPostScreenProps> = observer(function ForumPostScreen(_props) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const route = useRoute()
  const { forumId } = (route.params as RouteParams) || {}

  const getForumListPost = useGetForumListPost(forumId!)
  // console.log(getForumListPost?.value?.data[0]?.forum_member.forum.title, "forum post screen")
  const forumData = getForumListPost?.value?.data || []
  const mediaImage = getForumListPost?.value?.data[0]?.forum_member.forum.display_picture
  const { navigation } = _props

  const handleOnPress = () => {
    navigation.navigate("CreateForumPost", { forumId })
  }
  return (
    <IfElse
      ifOn={!getForumListPost.isPending && (getForumListPost.value?.count ?? 0) > 0}
      ifOnElse={getForumListPost.isPending && !getForumListPost?.value}
      onElse={<HomeLoader />}
      elseThen={
        <EmptyState
          heading="Oops !!!"
          content="There are no activities in this forum yet !!!All discussions will appear here."
          style={{
            backgroundColor: "#0A01050D",
            paddingTop: 120,
            paddingBottom: 100,
            paddingHorizontal: 20,
            borderRadius: 8,
          }}
          button="Start a discussion in this forum"
          buttonTextStyle={{ fontWeight: 400, fontSize: 14 }}
          ButtonProps={{
            preset: "primary",
          }}
          buttonOnPress={handleOnPress}
        />
      }
    >
      <View style={{ flex: 1 }}>
        {/* <View style={styles.iconContainer}>
          <Icon onPress={handleOnPress} size={100} icon="addNew" />
        </View> */}
        <Screen
          preset="scroll"
          safeAreaEdges={["top", "bottom"]}
          contentContainerStyle={$screenContentContainer}
        >
          <View style={styles.imgOverlay}>
            <ImageBackground
              style={styles.bgImageStyle}
              resizeMode="contain"
              source={{ uri: mediaImage }}
            >
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContent}>
                <View style={styles.iconWrapper}>
                  <Icon color="#fff" icon="backward" />
                </View>
                <Text weight="sansMd" size="md" style={styles.textColor} text="Wellness" />
              </TouchableOpacity>
            </ImageBackground>
          </View>

          {forumData.map((posts, i) => (
            <View key={posts?.user?.uuid + i} style={styles.postBottomSpacing}>
              <ForumCard
                images
                username={posts?.user?.username}
                connectionStatus={posts?.allow_connection}
                text={posts?.text}
                title={posts?.forum_member.forum.title}
                media={posts?.media}
                forumPostId={posts?.uuid}
                forumId={posts?.forum_member?.forum?.uuid}
                topic={posts?.topic}
              />
            </View>
          ))}

          {/* <Post />
               <Post />
               <Post /> */}
        </Screen>
      </View>
    </IfElse>
  )
})

const styles = StyleSheet.create({
  iconWrapper: {
    width: 30,
    height: 30,
    padding: 10,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.palette.neutral100,
    justifyContent: "center",
    alignItems: "center",
  },

  textColor: {
    color: colors.palette.neutral100,
  },
  iconContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    // marginBottom: 40,
  },
  iconColor: {
    borderColor: colors.palette.neutral100,
  },

  bgImageStyle: {
    height: 95,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },

  imgOverlay: {
    backgroundColor: "rgba(15, 15, 15, 0.5)",
    borderRadius: 8,
    marginBottom: 30,
  },

  iconContainer: {
    position: "absolute",
    top: "50%",
    right: 20,
    transform: [{ translateY: -25 }],
    zIndex: 10,
  },
  postBottomSpacing: {
    marginBottom: 15,
  },
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
}
