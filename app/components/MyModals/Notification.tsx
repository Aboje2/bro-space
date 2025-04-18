import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import { Text, Modals, Icon, Button } from "app/components"

export interface NotificationProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  openNotification: boolean
  setOpenNotification: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * Describe your component here
 */
export const Notification = observer(function Notification({
  openNotification,
  setOpenNotification,
}: NotificationProps) {
  return (
    <Modals setShowModal={setOpenNotification} showModal={openNotification}>
      <View style={[styles.flexSpacing, styles.bottomSpacing]}>
        <Text weight="sansMd" size="sm" text="Notification details" />
        <Icon onPress={() => setOpenNotification(false)} icon="x" />
      </View>

      <View style={[styles.contentContainer]}>
        <Text
          style={styles.infoText}
          weight="medium"
          size="xs"
          text="All tickets sold out successfully."
        />
        <Text
          weight="light"
          size="xxs"
          style={styles.contentText}
          text="Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
        />

        <View style={styles.flexSpacing}>
          <Text weight="normal" size="xxs" text="Friday, 23-09-2025" />
          <Text weight="normal" size="xxs" text="5 hours ago" />
        </View>
      </View>

      <Button text="" />
    </Modals>
  )
})

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: "#0A01050D",
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  flexSpacing: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoText: {
    color: "#25486399",
    marginBottom: 20,
  },
  contentText: {
    color: "#1B334599",
    marginBottom: 20,
  },
  bottomSpacing: {
    marginBottom: 30,
  },
})
