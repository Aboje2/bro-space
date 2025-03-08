import * as React from "react"
import { StyleSheet, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import { Text, Icon, Modals, Button } from "app/components"

export interface FailedModalProps {
  /**
   * An optional style override useful for padding & margin.
   */
  openFailed: boolean
  setOpenFailed: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * Describe your component here
 */
export const FailedModal = observer(function FailedModal({
  openFailed,
  setOpenFailed,
}: FailedModalProps) {
  return (
    <Modals showModal={openFailed} setShowModal={() => setOpenFailed(false)}>
      <View>
        <Icon icon="info" />
      </View>
      <Text weight="sansMd" size="sm" style={styles.invalidText} text="Invalid email" />
      <Text
        weight="sansNormal"
        size="xs"
        style={styles.message}
        text="Kindly provide the right email to access your account"
      />
      <Button preset="primary" textStyle={{ color: "#fff" }} text="Continue" />
    </Modals>
  )
})

const styles = StyleSheet.create({
  invalidText: {
    color: "#000",
    marginVertical: 15,
  },

  message: {
    color: "#8C8CA1",
    width: 278,
    marginBottom: 20,
  },
})
