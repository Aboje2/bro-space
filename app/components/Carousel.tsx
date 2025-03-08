import React, { useRef, useState } from "react"
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
import { useNavigation } from "@react-navigation/native"
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
const data = [
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

  const navigation = useNavigation()
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE)

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

  const renderItem = ({ item }: { item: { id: string; image: ImageSourcePropType } }) => (
    <TouchableOpacity onPress={() => navigation.navigate("Wellness")} style={styles.imageContainer}>
      <Image source={item.image} style={styles.image} />
    </TouchableOpacity>
  )

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
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
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

// the beginnning of a new line to test right below here

// import * as React from "react"
// import {
//   StyleProp,
//   TextStyle,
//   View,
//   ViewStyle,
//   Dimensions,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native"
// import { observer } from "mobx-react-lite"
// import { colors, typography } from "app/theme"
// import { Text } from "app/components/Text"
// import Carousel, { Pagination } from "react-native-snap-carousel"

// export interface CarouselProps {
//   /**
//    * An optional style override useful for padding & margin.
//    */
//   // style?: StyleProp<ViewStyle>
// }

// /**
//  * Describe your component here
//  */
// export const Carousels = observer(function Carousels(props: CarouselProps) {
//   const { width: screenWidth } = Dimensions.get("window")
//   const carouselRef = React.useRef<any>(null)

//   const [activeIndex, setActiveIndex] = React.useState(0)
//   const data = [
//     { title: "Item 1", color: "#FF6347" },
//     { title: "Item 2", color: "#1E90FF" },
//     { title: "Item 3", color: "#32CD32" },
//   ]

//   const renderItem = ({ item }: { item: { title: string; color: string } }) => (
//     <View style={[styles.itemContainer, { backgroundColor: item.color }]}>
//       <Text style={styles.itemText}>{item.title}</Text>
//     </View>
//   )

//   const slideToNext = () => {
//     const nextIndex = (activeIndex + 1) % data.length // Go to the next slide, looping back to the first
//     carouselRef.current?.snapToItem(nextIndex)
//   }

//   const slideToPrevious = () => {
//     const prevIndex = (activeIndex - 1 + data.length) % data.length // Go to the previous slide, looping to the last
//     carouselRef.current?.snapToItem(prevIndex)
//   }

//   return (
//     <View style={styles.container}>
//       <Carousel
//         ref={carouselRef}
//         data={data}
//         renderItem={renderItem}
//         sliderWidth={screenWidth}
//         itemWidth={screenWidth / 3}
//         inactiveSlideScale={1}
//         inactiveSlideOpacity={1}
//         loop={true}
//         enableSnap={true}
//         onSnapToItem={(index) => setActiveIndex(index)} // Update active index
//         slideStyle={{ paddingHorizontal: 5 }}
//       />
//       <Pagination
//         dotsLength={data.length}
//         activeDotIndex={activeIndex}
//         containerStyle={styles.paginationContainer}
//         dotStyle={styles.activeDot}
//         inactiveDotStyle={styles.inactiveDot}
//         inactiveDotOpacity={0.4}
//         inactiveDotScale={0.6}
//       />
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.button} onPress={slideToPrevious}>
//           <Text style={styles.buttonText}>Previous</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button} onPress={slideToNext}>
//           <Text style={styles.buttonText}>Next</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   )
// })

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   itemContainer: {
//     // width: screenWidth / 1.5,
//     height: 150,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 10,
//   },
//   itemText: {
//     fontSize: 16,
//     color: "#FFF",
//   },
//   paginationContainer: {
//     paddingVertical: 10,
//   },
//   activeDot: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     backgroundColor: "blue",
//   },
//   inactiveDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: "gray",
//   },
// })
