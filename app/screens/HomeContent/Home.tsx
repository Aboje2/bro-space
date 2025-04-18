import React, { FC, useState, useEffect } from "react"
import { View, ViewStyle, StyleSheet, TouchableOpacity } from "react-native"
import useGetPostList from "app/hooks/space/use-getAllPost"
import {
  Screen,
  Text,
  Icon,
  Interest,
  Post,
  Button,
  Carousels,
  IfElse,
  HomeLoader,
} from "../../components"
import { DemoTabScreenProps } from "../../navigators/DemoNavigator"
import { spacing, colors } from "../../theme"
import { BROSPACE } from "app/utils/constant"
import { saveString, loadString } from "app/utils/storage"

export const HomeScreen: FC<DemoTabScreenProps<"Home">> = function HomeScreen(_props) {
  const { navigation } = _props
  const getAllPost = useGetPostList()

  const allPost = getAllPost?.data?.data?.data || []

  // console.log(getAllPost?.value?.data, "changes some too getting all post from interest")
  return (
    <IfElse
      ifOn={!getAllPost.isPending && !!getAllPost?.value}
      ifOnElse={getAllPost.isPending && !getAllPost?.value}
      onElse={<HomeLoader />}
    >
      <View style={{ flex: 1 }}>
        <Screen preset="scroll" contentContainerStyle={$container} safeAreaEdges={["top"]}>
          <View style={[styles.textSpacing, styles.topContent]}>
            <Icon icon="logo" />
            <View style={[styles.spanWrapper, { gap: 20 }]}>
              <Icon onPress={() => navigation.navigate("Connections")} icon="message" />
              <Icon onPress={() => navigation.navigate("Notification")} icon="bell" />
            </View>
          </View>

          <View style={[styles.bannerStyle, styles.categoryPadding]}>
            <View style={styles.welcomeTextContainer}>
              <Text weight="light" style={styles.homeTextStyle} text="Welcome to" />
              <View style={styles.spanWrapper}>
                <Text weight="light" style={styles.spanText} text="BroSpace." />
                <Text weight="semiBold" style={styles.homeTextStyle} text="community hub." />
              </View>
            </View>

            <Text
              weight="normal"
              size="xxs"
              style={{ color: colors.palette.neutral100 }}
              text="Real Conversations, Real Connections—A Safe Space to Share, Vent, and Solve Life’s Challenges with people Who Understand."
            />
          </View>
          <View style={[styles.textSpacing, styles.categoryPadding]}>
            <TouchableOpacity onPress={() => navigation.navigate("Category")}>
              <Text weight="semiBold" size="sm" style={styles.textColor} text="Categories" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Category")}>
              <Text weight="sansMd" size="xs" style={styles.accentColor} text="See all" />
            </TouchableOpacity>
          </View>

          <Carousels />

          <View style={[styles.recentPost, styles.contentPadding]}>
            <Text
              weight="semiBold"
              size="sm"
              style={[styles.textColor, styles.posts]}
              text="Recent posts"
            />

            {getAllPost?.value?.data.map((posts, i) => (
              <View key={posts.user.uuid + i} style={styles.postBottomSpacing}>
                <Interest
                  images
                  username={posts?.user?.username}
                  connectionStatus={posts?.allow_connection}
                  text={posts?.text}
                  media={posts?.media}
                  postId={posts?.uuid}
                  userId={posts?.user.uuid}
                  // topic={posts.topic}
                />
              </View>
            ))}

            {/* <Interest /> */}
            <View style={styles.buttonPadding}>
              <Button
                preset="primary"
                textStyle={{ color: colors.palette.neutral100 }}
                style={styles.buttonStyle}
                text="See all posts"
                onPress={() => navigation.navigate("Ananymous", { catId: undefined })}
              />
            </View>
          </View>

          <View style={styles.bottomContent}>
            <Text
              weight="semiBold"
              size="sm"
              style={[styles.textColor, styles.posts]}
              text="Trending posts"
            />
            {/* <View>
              <Post />
            </View>

            <Post /> */}
            <View style={styles.buttonPadding}>
              <Button
                preset="primary"
                textStyle={{ color: colors.palette.neutral100 }}
                style={styles.buttonStyle}
                text="See all posts"
                onPress={() => navigation.navigate("Ananymous", { catId: undefined })}
              />
            </View>
          </View>
        </Screen>
        <View style={styles.iconContainer}>
          <Icon
            onPress={() => navigation.navigate("Ananymous", { catId: undefined })}
            size={100}
            icon="addNew"
          />
        </View>
      </View>
    </IfElse>
  )
}

const $container: ViewStyle = {
  // paddingTop: spacing.lg + spacing.xl,
  //  paddingTop:  spacing.xl,
}

const styles = StyleSheet.create({
  homeTextStyle: {
    fontSize: 22,
    color: colors.palette.neutral100,
  },
  topContent: {
    paddingHorizontal: spacing.lg,
    marginBottom: 10,
  },

  spanText: {
    color: "#812452",
  },
  spanWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  bannerStyle: {
    paddingVertical: 15,
    paddingLeft: 10,
    marginBottom: 20,
    backgroundColor: colors.palette.primary100,
  },
  textColor: {
    color: colors.palette.primary100,
  },

  accentColor: {
    color: colors.palette.primary50,
  },
  textSpacing: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  buttonStyle: {
    marginTop: 15,
    marginBottom: 25,
  },
  recentPost: {
    backgroundColor: "#EAEDF0",
  },
  posts: {
    // paddingVertical: 20,
    marginLeft: 20,
  },
  contentPadding: {
    // paddingHorizontal: spacing.lg,
    marginBottom: 10,
  },

  categoryPadding: {
    paddingHorizontal: spacing.lg,
  },
  bottomContent: {
    backgroundColor: colors.palette.neutral100,
    // paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },

  buttonPadding: {
    paddingHorizontal: 10,
  },

  postBottomSpacing: {
    marginBottom: 15,
  },
  welcomeTextContainer: {
    marginBottom: 20,
  },
  iconContainer: {
    position: "absolute",
    // top: "1%",
    right: 10,
    top: 470,
    transform: [{ translateY: -25 }],
    zIndex: 10,
  },
})
