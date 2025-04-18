import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, StyleSheet, ImageBackground, TouchableOpacity } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Icon, Post, IfElse, HomeLoader, EmptyState } from "app/components"
import { useRoute } from "@react-navigation/native"
import { colors, spacing } from "app/theme"
import useGetCategory from "app/hooks/category/use-getCategory"
const wellnessImg = require("../../../assets/images/categoryImg.png")

// import { useStores } from "app/models"

interface WellnessScreenProps extends AppStackScreenProps<"Wellness"> {}
type RouteParams = {
  catId?: string // Or number, depending on your data
}
export const WellnessScreen: FC<WellnessScreenProps> = observer(function WellnessScreen(_props) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  const route = useRoute()
  const { catId } = (route.params as RouteParams) || {}
  const getCategory = useGetCategory(catId!)
  const imgURl = getCategory?.value.data[0].category.image
  // console.log(getCategory?.value.data[0].category.image, "we are loggin in wellness screen right now")
  const { navigation } = _props
  const handlePress = () => {
    navigation.navigate("Ananymous", { catId })
  }

  return (
    <IfElse
      ifOn={!getCategory.isPending && (getCategory.value?.count ?? 0) > 0}
      ifOnElse={getCategory.isPending && !getCategory?.value}
      elseThen={
        <EmptyState
          heading="Oops !!!"
          content="There are no activities in this category yet !!!All discussions will appear here."
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
          buttonOnPress={handlePress}
        />
      }
      onElse={<HomeLoader />}
    >
      <View style={{ flex: 1 }}>
        <View style={styles.iconContainer}>
          <Icon
            onPress={() => navigation.navigate("Ananymous", { catId })}
            size={100}
            icon="addNew"
          />
        </View>
        <Screen
          preset="scroll"
          safeAreaEdges={["top", "bottom"]}
          contentContainerStyle={$screenContentContainer}
        >
          <View style={styles.imgOverlay}>
            <ImageBackground
              style={styles.bgImageStyle}
              resizeMode="contain"
              source={{ uri: imgURl }}
            >
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContent}>
                <View style={styles.iconWrapper}>
                  <Icon color="#fff" icon="backward" />
                </View>
                <Text weight="sansMd" size="md" style={styles.textColor} text="Wellness" />
              </TouchableOpacity>
            </ImageBackground>
          </View>

          {getCategory?.value?.data.map((post, i) => (
            <Post
              connectionStatus={post.allow_connection}
              username={post.user.username}
              topic={post.topic}
              text={post.text}
              media={post.media}
              postId={post.uuid}
              userId={post.user.uuid}
              categoryId={post.category.uuid}
            />
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
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
}
