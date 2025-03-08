import React, { FC, useState, useEffect } from "react"
import { View, ViewStyle, StyleSheet, TouchableOpacity } from "react-native"

import { Screen, Text, Icon, Interest, Post, Button, Carousels } from "../../components"
import { DemoTabScreenProps } from "../../navigators/DemoNavigator"
import { spacing, colors } from "../../theme"

export const HomeScreen: FC<DemoTabScreenProps<"Home">> = function HomeScreen(_props) {
  const { navigation } = _props

  return (
    <Screen preset="scroll" contentContainerStyle={$container} safeAreaEdges={["top"]}>
      <View style={[styles.textSpacing, styles.topContent]}>
        <Icon icon="logo" />
        <View style={[styles.spanWrapper, { gap: 20 }]}>
          <Icon icon="message" />
          <Icon icon="bell" />
        </View>
      </View>

      <View style={[styles.bannerStyle, styles.contentPadding]}>
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
      <View style={[styles.textSpacing, styles.contentPadding]}>
        <TouchableOpacity onPress={() => navigation.navigate("Category")}>
          <Text weight="semiBold" size="sm" style={styles.textColor} text="Categories" />
        </TouchableOpacity>
        <Text weight="sansMd" size="xs" style={styles.accentColor} text="See all" />
      </View>

      <Carousels />

      <View style={[styles.recentPost, styles.contentPadding]}>
        <Text
          weight="semiBold"
          size="sm"
          style={[styles.textColor, styles.posts]}
          text="Recent posts"
        />

        <View style={styles.postBottomSpacing}>
          <Interest images />
        </View>
        <Interest />

        <View style={styles.iconContainer}>
          <Icon onPress={() => navigation.navigate("Ananymous")} size={80} icon="addNew" />
        </View>

        <Button
          preset="primary"
          textStyle={{ color: colors.palette.neutral100 }}
          style={styles.buttonStyle}
          text="See all posts"
          onPress={() => navigation.navigate("Ananymous")}
        />
      </View>

      <View style={styles.bottomContent}>
        <Text
          weight="semiBold"
          size="sm"
          style={[styles.textColor, styles.posts]}
          text="Trending posts"
        />
        <View style={styles.postBottomSpacing}>
          <Post />
        </View>

        <Post />
        <Button
          preset="primary"
          textStyle={{ color: colors.palette.neutral100 }}
          style={styles.buttonStyle}
          text="See all posts"
        />
      </View>
    </Screen>
  )
}

const $container: ViewStyle = {
  paddingTop: spacing.lg + spacing.xl,
}

const styles = StyleSheet.create({
  homeTextStyle: {
    fontSize: 22,
    color: colors.palette.neutral100,
  },
  topContent: {
    paddingHorizontal: spacing.lg,
    marginBottom: 30,
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
    paddingVertical: 20,
  },
  contentPadding: {
    paddingHorizontal: spacing.lg,
    marginBottom: 10,
  },
  bottomContent: {
    backgroundColor: colors.palette.neutral100,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },

  postBottomSpacing: {
    marginBottom: 15,
  },
  welcomeTextContainer: {
    marginBottom: 20,
  },
  iconContainer: {
    position: "absolute",
    top: "1%",
    right: 20,
    transform: [{ translateY: -25 }],
    zIndex: 10,
  },
})
