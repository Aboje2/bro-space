import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import { Text, Modals, Icon, Button } from "app/components"
import useJoinForum from "app/hooks/forum/use-join-forum"

export interface ForumModalProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  setOpenForum: React.Dispatch<React.SetStateAction<boolean>>
  setOpenSuccessModal: React.Dispatch<React.SetStateAction<boolean>>
  openForum: boolean
  title: string
  text: string
  forumId: string
}

/**
 * Describe your component here
 */
export const ForumModal = observer(function ForumModal({
  openForum,
  setOpenForum,
  title,
  text,
  forumId,
  setOpenSuccessModal,
}: ForumModalProps) {
  const joinForum = useJoinForum()

  const handleJoinForum = () => {
    console.log("Hello the join forum endpoint has been clicked")
    joinForum
      .mutateAsync({ forum_uuid: forumId })
      .then((res) => {
        setOpenForum(false)
        setOpenSuccessModal(true)

        // console.log(res?.data, "getting value from join forum endpoint")
      })
      .catch((error) => {
        error?.response?.data || error.message
      })
  }
  return (
    <Modals showModal={openForum} setShowModal={setOpenForum}>
      <View>
        <Icon icon="mouse" />
        <Text style={styles.titleText} weight="sansMd" size="sm" text={title} />
        <Text style={styles.TextStyle} weight="sansNormal" size="xs" text={text} />

        <View style={styles.buttonWrapper}>
          <Button
            textStyle={[{ color: "#06141E" }, styles.textSize]}
            onPress={() => setOpenForum(false)}
            style={[styles.cancelBtn]}
            text="Cancel"
          />
          <Button
            textStyle={[styles.textSize, { color: "#fff" }]}
            style={styles.continueBtn}
            preset="primary"
            text="Continue"
            onPress={handleJoinForum}
            isLoading={joinForum.isPending}
          />
        </View>
      </View>
    </Modals>
  )
})

const styles = StyleSheet.create({
  titleText: {
    color: colors.palette.primary50,
    marginBottom: 20,
  },

  TextStyle: {
    color: "#8C8CA1",
    marginBottom: 30,
  },

  cancelBtn: {
    flex: 1,
    backgroundColor: "#0701041A",
  },
  continueBtn: {
    flex: 1,
  },
  buttonWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  textSize: {
    fontSize: 15,
    fontWeight: 500,
  },
})
