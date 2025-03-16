import React, { useRef, useState, useEffect } from "react"
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import { Text, Icon } from "app/components"
import { useStores } from "app/models"
import { useNavigation } from "@react-navigation/native"
import { AppNavigationProp } from "app/navigators/AppNavigator"
import useGetCategories from "app/hooks/category/get-category"
import Carousel, { Pagination } from "react-native-snap-carousel"
const fourthSlide = require("../../assets/images/slider4.png")
const firstSlide = require("../../assets/images/slider1.png")
const secondSlide = require("../../assets/images/slider2.png")
const thirdSlide = require("../../assets/images/slider3.png")

export interface CarouselProps {
  /**
   * An optional style override useful for padding & margin.
   */
  // style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
const datas = [
  { id: "1", image: fourthSlide },
  { id: "2", image: firstSlide },
  { id: "3", image: secondSlide },
  { id: "4", image: thirdSlide },
  { id: "5", image: secondSlide },
  { id: "6", image: fourthSlide },
]
const screenWidth = Dimensions.get("window").width
const ITEMS_PER_PAGE = 3


export const Carousels = observer(function Carousels(props: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const flatListRef = useRef<FlatList>(null)
  const categories = useGetCategories()
  const data = categories?.data?.data?.data || []
  // console.log("people that have what is to say", categories?.data?.data?.data[0], "the data in carousel")
  const navigation = useNavigation<AppNavigationProp>()
  
const totalPages = Math.ceil( data.length / ITEMS_PER_PAGE)
  
  
 

  
  const handleNext = () => {
    if (currentIndex < totalPages - 1) {
      setCurrentIndex((prev) => prev + 1)
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true })
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
      flatListRef.current?.scrollToIndex({ index: currentIndex - 1, animated: true })
    }
  }

  const renderItem = ({ item }: { item: { id: string; image: ImageSourcePropType, name: string, uuid: string } }) => {
    
    return(<TouchableOpacity onPress={()=> navigation.navigate("Wellness")} style={styles.imageContainer}>
      <Image source={{uri: item.image}} style={styles.image} />
      <Text style={{color: "#000"}} text={item.name} />
    </TouchableOpacity>)
}

  

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { left: 0, zIndex: 5 }]}
        onPress={handlePrev}
        disabled={currentIndex === 0}
      >
        {/* <Text style={[styles.buttonText, currentIndex === totalPages - 1 && styles.disabledText]}>
          Next
        </Text> */}
        <Icon icon="backward" />
      </TouchableOpacity>
      <View>
        <FlatList
          ref={flatListRef}
          data={categories?.data?.data?.data}
          renderItem={renderItem}
          keyExtractor={(item) => item.uuid}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          getItemLayout={(data, index) => ({
            length: screenWidth,
            offset: screenWidth * index,
            index,
          })}
          onMomentumScrollEnd={(event) => {
            const newIndex = Math.floor(event.nativeEvent.contentOffset.x / screenWidth)
            setCurrentIndex(newIndex)
          }}
          initialScrollIndex={0}
          snapToInterval={screenWidth} // Each page is the full screen width
        />
        <View style={styles.pagination}>
          {Array(totalPages)
            .fill(null)
            .map((_, index) => (
              <View
                key={index}
                style={[styles.dot, index === currentIndex ? styles.activeDot : styles.inactiveDot]}
              />
            ))}
        </View>
      </View>
      <TouchableOpacity
        onPress={handleNext}
        disabled={currentIndex === totalPages - 1}
        style={[styles.button, { right: -3 }]}
      >
        {/* <Text style={[styles.buttonText, currentIndex === 0 && styles.disabledText]}>Previous</Text> */}
        <Icon size={15} icon="forward" />
      </TouchableOpacity>
      {/* <View style={styles.buttonContainer}></View> */}
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    paddingHorizontal: 10,
    paddingBottom: 30,
  },
  imageContainer: {
    // width: screenWidth / ITEMS_PER_PAGE,
    width: (screenWidth - 10) / ITEMS_PER_PAGE,
    height: 80,
    paddingHorizontal: 5,
  },
  image: {
    width: 104,
    height: "100%",
    borderRadius: 10,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  dot: {
    width: 72,
    height: 3,
    borderRadius: 12,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: colors.palette.primary50,
  },
  inactiveDot: {
    backgroundColor: "#0E44904D",
  },
  // buttonContainer: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   marginTop: 20,
  //   width: "80%",
  // },
  button: {
    position: "absolute",
    top: "25%",
    width: 32,
    height: 32,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  // buttonText: {
  //   color: "#FFFFFF",
  //   fontSize: 16,
  // },
  disabledText: {
    color: "#CCCCCC",
  },
})


