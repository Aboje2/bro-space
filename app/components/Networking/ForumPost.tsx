import * as React from "react"
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  ActivityIndicator,
} from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import { Text, ForumModal, SuccessModal } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { AppNavigationProp, AppStackParamList } from "app/navigators/AppNavigator"
import useJoinForum from "app/hooks/forum/use-join-forum"
const bgImage = require("../../../assets/images/bg-frame.png")
const dev = require("../../../assets/images/dev.png")
export interface ForumPostProps {
  /**
   * An optional style override useful for padding & margin.
   */

  // handleJoinForum: () => void
  // joinForum: any
  display_picture: string
  title: string
  narration: string
  forumId: string
}

/**
 * Describe your component here
 */
export const ForumPost = observer(function ForumPost({
  forumId,

  display_picture,
  title,
  narration,
}: ForumPostProps) {
  const [openForum, setOpenForum] = React.useState<boolean>(false)
  const [openSuccess, setOpenSuccess] = React.useState<boolean>(false)
  const navigation = useNavigation<AppNavigationProp>()
  function formatNarration() {
    if (narration.length > 30) {
      return `${narration.slice(0, 23)}.............`
    } else {
      return `${narration}...................`
    }
  }
  const bgColor = [
    "#254863E5",
    "#0B1A25E5",
    "#596066E5",
    "#BBA770CC",
    colors.palette.secondary50,
    "#0B1A25E5",
    "#596066E5",
    "#BBA770CC",
    "#254863E5",
    "#9AC8EBB2",
    "#966132B2",
  ]

  return (
    <View style={{ borderRadius: 8, marginBottom: 10 }}>
      <ImageBackground resizeMode="cover" style={styles.imageStyle} source={bgImage}>
        <Image style={styles.imageBanner} source={{ uri: display_picture }} resizeMode="contain" />
        <View>
          <View style={styles.topItemSpacing}>
            <Text weight="semiBold" size="sm" style={styles.primaryColor} text={title} />

            <TouchableOpacity
              onPress={() => setOpenForum(true)}
              style={[styles.buttonStyle, { backgroundColor: "#660033" }]}
            >
              <Text weight="medium" size="xxs" style={styles.joinStyle} text="Join" />
            </TouchableOpacity>
          </View>

          <Text
            weight="medium"
            style={{ fontSize: 10, color: "#254863B2" }}
            text={formatNarration()}
          />

          <View style={styles.initialsWrapper}>
            {Array.from({ length: 5 }).map((_, i) => (
              <View key={i}>
                <View style={[styles.initialWrapper, { backgroundColor: bgColor[i] }]}>
                  <Text weight="sansMd" style={styles.intialValue} text="AN" />
                </View>
              </View>
            ))}
            <Text weight="medium" style={styles.usersText} text="1,287 users" />
          </View>
        </View>
      </ImageBackground>

      <SuccessModal
        params={{ forumId: forumId }}
        routeName="ForumPost"
        openSuccessModal={openSuccess}
        setOpenSuccessModal={setOpenSuccess}
        text="You have successfully exited the forum of web developers"
      />

      <ForumModal
        openForum={openForum}
        setOpenForum={setOpenForum}
        forumId={forumId}
        setOpenSuccessModal={setOpenSuccess}
        title="Web Developers"
        text="You are about to join this forum. Are you sure you want to join the forum?"
      />
    </View>
  )
})

const styles = StyleSheet.create({
  imageStyle: {
    height: 100,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },

  imageBanner: {
    width: 98,
    height: 80,
    borderRadius: 6,
  },

  topItemSpacing: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  primaryColor: {
    color: colors.palette.primary100,
  },

  usersText: {
    fontSize: 11,
    color: "#254863B2",
  },
  joinStyle: {
    fontSize: 10,
    color: colors.palette.neutral100,
  },
  initialWrapper: {
    width: 22,
    height: 22,
    borderRadius: 50,
    marginLeft: -5,
    justifyContent: "center",
    alignItems: "center",
  },
  initialsWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  intialValue: {
    fontSize: 10,
    color: colors.palette.neutral100,
  },
  buttonStyle: {
    width: 64,
    height: 24,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
})
