import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, StyleSheet, TouchableOpacity, Alert, Image } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Icon, TextField, Toggle, Button } from "app/components"
import { colors, spacing } from "app/theme"
import useCreatePost from "app/hooks/space/use-createPost"
import { useNavigation } from "@react-navigation/native"
import * as DocumentPicker from "expo-document-picker"
import useRecorder from "../../hooks/recording"
import { useRoute } from "@react-navigation/native"
import useCreateForumPost from "app/hooks/forum/use-create-forumPost"

// import { useStores } from "app/models"

interface CreateForumPostScreenProps extends AppStackScreenProps<"CreateForumPost"> {}
type RouteParams = {
  forumId: string // Or number, depending on your data
}

export const CreateForumPostScreen: FC<CreateForumPostScreenProps> = observer(
  function CreateForumPostScreen(_props) {
    const [toggler, setToggler] = React.useState(false)
    const [images, setImages] = React.useState<string[]>([])
    const [topic, setTopic] = React.useState<string>("")
    const [post, setPost] = React.useState<string>("")
    const route = useRoute()
    const { forumId } = route.params as RouteParams
    const { navigation } = _props
    const { startRecording, stopRecording, recording, recordingDuration, recordingUri } =
      useRecorder()
    const createForumPost = useCreateForumPost(forumId)

    // Pull in one of our MST stores
    // const {
    //     BroItems: {
    //      setCategory
    //     },
    //   } = useStores()

    // Pull in navigation via hook

    const pickImages = async () => {
      if (images.length >= 3) {
        Alert.alert("Limit Reached", "You can only select up to 3 images.")
        return
      }

      try {
        const result = await DocumentPicker.getDocumentAsync({
          type: "image/*",
          copyToCacheDirectory: true,
        })

        if (result.assets && result.assets?.length >= 1) {
          setImages([...images, result.assets[0].uri])
        }
      } catch (err) {
        console.error("Error picking image:", err)
      }
    }

    const formatDuration = (millis: number) => {
      const minutes = Math.floor(millis / 60000)
      const seconds = Math.floor((millis % 60000) / 1000)
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
    }

    const removeImage = (index: number) => {
      const updatedImages = images.filter((_, i) => i !== index)
      setImages(updatedImages)
    }

    const handleCreatePost = () => {
      const formData = new FormData()

      formData.append("text", post)
      formData.append("topic", topic)
      formData.append("allow_connections", toggler ? "true" : "false")

      images.forEach((imgUri, index) => {
        const fileType = imgUri.split(".").pop() // Extracts file extension
        const mimeType = fileType === "png" ? "image/png" : `image/${fileType}` // Assigns MIME type dynamically

        formData.append("upload_media", {
          uri: imgUri,
          name: `image_${index}.${fileType}`,
          type: mimeType,
        } as unknown as Blob)
      })

      if (!recordingUri) {
        // console.error("No recording available to send.")
      } else {
        const fileType = recordingUri.split(".").pop()
        const mimeType = `audio/${fileType}`
        formData.append("upload_media", {
          uri: recordingUri,
          name: `recording.${fileType}`,
          type: mimeType,
        } as unknown as Blob)
      }

      createForumPost
        .mutateAsync(formData)
        .then((response) => {
          console.log(response?.data?.data, "getting response from create forum post screen")
          navigation.navigate("ForumPost", { forumId })
        })
        .catch((error) => {
          console.log(error?.response?.data || error?.message)
        })
    }

    return (
      <Screen
        preset="scroll"
        safeAreaEdges={["top", "bottom"]}
        contentContainerStyle={$screenContentContainer}
      >
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContent}>
            <View style={styles.iconWrapper}>
              <Icon icon="backward" />
            </View>
            <Text weight="sansMd" size="md" style={styles.textColor} text="Create anonymous post" />
          </TouchableOpacity>

          <Text
            weight="normal"
            size="xs"
            style={styles.textStyle}
            text="Let’s talk about personal development. You can tell us what you have in mind now."
          />

          <TextField
            value={topic}
            onChangeText={(text) => setTopic(text)}
            inputWrapperStyle={styles.textFieldStyle}
            placeholder="Topic"
          />
          <TextField
            value={post}
            onChangeText={(text) => setPost(text)}
            inputWrapperStyle={styles.selectStyle}
            placeholder="Bro to bro, what’s on your mind??"
          />

          <View style={styles.viewInput}>
            <Text
              weight="light"
              size="xs"
              style={styles.inputText}
              text={recording ? "Recording" : "Record voice note"}
            />

            {recording && (
              <Text
                weight="light"
                size="xs"
                style={styles.inputText}
                text={formatDuration(recordingDuration)}
              />
            )}
            <Icon
              onPress={recording ? stopRecording : startRecording}
              icon={recording ? "recorder" : "microphone"}
            />
          </View>

          {images.length > 0 ? (
            <View style={styles.imageContentContainer}>
              <Text weight="light" size="xs" style={styles.inputText} text="Images" />
              <View style={styles.imageContainer}>
                {images.map((image, i) => (
                  <View key={i + 1} style={styles.imageWrapper}>
                    <TouchableOpacity style={styles.cancelImage} onPress={() => removeImage(i)}>
                      <Icon size={10} icon="x" />
                    </TouchableOpacity>
                    <Image style={styles.imageStyle} source={{ uri: image }} resizeMode="cover" />
                  </View>
                ))}
                {images.length < 3 && (
                  <TouchableOpacity
                    onPress={pickImages}
                    style={[styles.addImage, styles.imageWrapper]}
                  >
                    <View style={styles.plusIcon}>
                      <Icon size={13} icon="add" />
                    </View>
                    <Text
                      weight="light"
                      style={[styles.inputText, { fontSize: 10 }]}
                      text="Add Image"
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ) : (
            <View style={styles.viewInput}>
              <Text weight="light" size="xs" style={styles.inputText} text="Attach images" />
              <Icon onPress={pickImages} size={24} icon="add" />
            </View>
          )}
          <View style={styles.viewInput}>
            <Text weight="light" size="xs" style={styles.inputText} text="Allow connection" />
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
            onPress={handleCreatePost}
            isLoading={createForumPost.isPending}
          />
        </View>
      </Screen>
    )
  },
)

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
  selectStyle: {
    borderWidth: 0,
    marginBottom: 20,
    backgroundColor: "#6600330D",
    height: 165,
  },
  viewInput: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
    backgroundColor: "#6600330D",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  inputText: {
    color: "#25486380",
  },
  plusIcon: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: "#25486380",
    justifyContent: "center",
    alignItems: "center",
  },
  addImage: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#25486380",
    borderStyle: "dashed",
  },
  imageWrapper: {
    width: 90,
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

  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
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
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
}
