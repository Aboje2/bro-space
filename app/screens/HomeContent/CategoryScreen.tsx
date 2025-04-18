import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TouchableOpacity, View, StyleSheet, Image } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Icon, IfElse } from "app/components"
import { pulseAnimationStyle } from "app/utils/styles"

import { colors, spacing } from "app/theme"
import useGetCategories from "app/hooks/category/get-categories"

const grid1 = require("../../../assets/images/slider1.png")
const grid2 = require("../../../assets/images/slider2.png")
const grid3 = require("../../../assets/images/slider3.png")
// import { useStores } from "app/models"

interface CategoryScreenProps extends AppStackScreenProps<"Category"> {}
const catImages = [
  { img: grid1, title: "Wellness" },
  { img: grid2, title: "Style" },
  { img: grid3, title: "Networking" },
  { img: grid2, title: "Finance" },
  { img: grid3, title: "Personal Development" },
  { img: grid1, title: "Adventure" },
]

export const CategoryScreen: FC<CategoryScreenProps> = observer(function CategoryScreen(_props) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  const { navigation } = _props
  const getCategory = useGetCategories()

  console.log(getCategory?.value.data, "checking the outcome from category")
  return (
    <IfElse
      ifOn={!getCategory.isPending && !!getCategory.value}
      ifOnElse={getCategory.isPending && !getCategory.value}
      onElse={
        <View>
          {Array.from({ length: 6 }).map((_, i) => (
            <View key={i + "1123"} style={[styles.contentWrapper]}>
              <View style={[styles.loaderStyle, pulseAnimationStyle]} />
            </View>
          ))}
        </View>
      }
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
          <Text weight="sansMd" size="md" style={styles.textColor} text="Categories" />
        </TouchableOpacity>

        <View style={styles.contentWrapper}>
          {getCategory?.value?.data.map((item) => (
            <View key={item.uuid}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Wellness", { catId: item.uuid })}
              >
                <Image style={styles.imageStyle} source={{ uri: item.image }} />
                {/* <Text weight="medium" text={item.title} /> */}
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </Screen>
    </IfElse>
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

  contentWrapper: {
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 5,
  },
  imageStyle: {
    width: 153.5,
    height: 140,
    borderRadius: 8,
  },

  loaderStyle: {
    width: 140,
    height: 160,
    borderRadius: 8,
    backgroundColor: "#e0e0e0",
  },
})
