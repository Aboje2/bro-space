import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, StyleSheet, TouchableOpacity, Image, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, TextField, Icon, Button, Toggle, SelectInput } from "app/components"
import * as DocumentPicker from "expo-document-picker"
import { useNavigation, useRoute } from "@react-navigation/native"
import { colors } from "app/theme"
import { setISOWeek } from "date-fns"
import { spacing } from "app/theme"
import useCreateForum from "app/hooks/forum/use-create-forum"
import useCreateForumPost from "app/hooks/forum/use-create-forumPost"
// import { useStores } from "app/models"

interface CreateForumScreenProps extends AppStackScreenProps<"CreateForum"> {}
type RouteParams = {
  forumId?: string // Or number, depending on your data
}

export const CreateForumScreen: FC<CreateForumScreenProps> = observer(function CreateForumScreen() {
  const [toggler, setToggler] = React.useState(false)
  const [images, setImages] = React.useState<string | null>(null)
  const [title, setTitle] = React.useState<string>("")
  const [detail, setDetail] = React.useState<string>("")
  const [forumCat, setForumCat] = React.useState<string>("")
  const route = useRoute()
  const createForum = useCreateForum()
  const { forumId } = route.params as RouteParams
  const createForumPost = useCreateForumPost(forumId!)

  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const categoryList = [
    { value: "Career Paths", label: "Career Paths" },
    { value: "Hobbies", label: "Hobbies" },
  ]

  const pickImages = async () => {
    // if (images.length >= 3) {
    //   Alert.alert("Limit Reached", "You can only select up to 3 images.")
    //   return
    // }

    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "image/*",
        copyToCacheDirectory: true,
      })

      if (result.assets && result.assets?.length >= 1) {
        setImages(result.assets[0].uri)
      }
    } catch (err) {
      console.error("Error picking image:", err)
    }
  }

  const handleCreateForum = () => {
    const formData = new FormData()

    formData.append("title", title)
    formData.append("narration", detail)
    formData.append("category", forumCat)
    formData.append("display_total_number_of_members", toggler ? "true" : "false")

    if (images) {
      const fileType = images.split(".").pop() // Extracts file extension
      const mimeType = fileType === "png" ? "image/png" : `image/${fileType}` // Assigns MIME type dynamically

      formData.append("upload_media", {
        uri: images,
        name: `image_.${fileType}`,
        type: mimeType,
      } as unknown as Blob)
    }

    if (forumId) {
      createForumPost
        .mutateAsync(formData)
        .then((res) => {
          console.log(res)
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      createForum
        .mutateAsync(formData)
        .then((res) => {
          console.log(res)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  const removeImage = () => {
    setImages(null)
  }
  return (
    <Screen contentContainerStyle={$container} preset="scroll" safeAreaEdges={["top"]}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContent}>
        <View style={styles.iconWrapper}>
          <Icon icon="backward" />
        </View>
        <Text weight="sansMd" size="md" style={styles.textColor} text="Create forum" />
      </TouchableOpacity>
      <View style={styles.contentContainer}>
        <Text
          weight="normal"
          size="xs"
          style={styles.textStyle}
          text="Let’s talk about personal development. You can tell us what you have in mind now."
        />

        <TextField
          value={title}
          onChangeText={(text) => setTitle(text)}
          inputWrapperStyle={styles.textFieldStyle}
          placeholder="Forum title"
        />

        <TextField
          value={detail}
          onChangeText={(text) => setDetail(text)}
          inputWrapperStyle={styles.textFieldStyle}
          placeholder="Forum detail"
        />
        {/* <TextField
          value={detail}
          onChangeText={(text) => setDetail(text)}
          inputWrapperStyle={styles.selectStyle}
          placeholder="Bro to bro, what’s on your mind??"
        /> */}

        <View>
          <SelectInput
            value={forumCat}
            setValue={setForumCat}
            title="Forum category"
            data={categoryList}
            bgColor
          />
        </View>

        {images ? (
          <View style={[styles.imageContentContainer]}>
            <Text weight="light" size="xs" style={styles.inputText} text="Images" />
            <View style={[styles.imageWrapper, styles.viewHeight]}>
              <TouchableOpacity style={styles.cancelImage} onPress={removeImage}>
                <Icon size={20} icon="x" />
              </TouchableOpacity>
              <Image style={styles.imageStyle} source={{ uri: images }} resizeMode="cover" />
            </View>
          </View>
        ) : (
          <View style={[styles.viewInput, styles.viewHeight]}>
            <Text weight="light" size="xs" style={styles.inputText} text="Attach images" />
            <Icon onPress={pickImages} size={24} icon="add" />
          </View>
        )}
        <View style={styles.viewInput}>
          <Text
            weight="light"
            size="xs"
            style={styles.inputText}
            text="Display total number of users"
          />
          <Toggle
            value={toggler}
            onValueChange={() => setToggler(!toggler)}
            variant="switch"
            // labelPosition="left"
            inputOuterStyle={{ backgroundColor: "#6A7883", height: 27 }}
            inputInnerStyle={{ backgroundColor: "#660033", height: 27 }}
          />
        </View>

        <Button
          preset="primary"
          textStyle={{ color: colors.palette.neutral100 }}
          text="Create post"
          onPress={handleCreateForum}
          isLoading={createForum.isPending || createForumPost.isPending}
        />
      </View>
    </Screen>
  )
})

const $container: ViewStyle = {
  paddingTop: spacing.lg + spacing.xl,
  backgroundColor: "#fff",
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
    paddingHorizontal: 24,
  },

  textStyle: {
    color: "#254863B2",
    width: 272,
    marginBottom: 20,
  },

  textFieldStyle: {
    borderWidth: 0,
    marginBottom: 20,
    backgroundColor: "#6600330D",
  },
  // selectStyle: {
  //   borderWidth: 0,
  //   marginBottom: 20,
  //   backgroundColor: "#6600330D",
  //   height: 165,
  // },
  viewInput: {
    paddingHorizontal: 20,
    paddingVertical: 10,

    marginBottom: 20,
    backgroundColor: "#6600330D",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  viewHeight: {
    height: 165,
  },

  inputText: {
    color: "#25486380",
  },
  // plusIcon: {
  //   width: 16,
  //   height: 16,
  //   borderWidth: 1,
  //   borderColor: "#25486380",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // addImage: {
  //   justifyContent: "center",
  //   alignItems: "center",
  //   borderWidth: 0.5,
  //   borderColor: "#25486380",
  //   borderStyle: "dashed",
  // },
  imageWrapper: {
    minWidth: "100%",
    height: 64,
    borderRadius: 8,
    position: "relative",
  },

  cancelImage: {
    width: 16,
    height: 16,
    borderRadius: 3,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 10,
  },

  // imageContainer: {
  //   flexDirection: "row",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   gap: 5,
  // },
  imageStyle: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },

  imageContentContainer: {
    backgroundColor: "#6600330D",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  contentContainer: {
    backgroundColor: "#9F9F9F1C",
    paddingTop: 30,
    paddingHorizontal: 24,
  },
})
