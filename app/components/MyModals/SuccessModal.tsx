import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import { Text, Icon, Modals, Button } from "app/components"

export interface SuccessModalProps {
  /**
   * An optional style override useful for padding & margin.
   */
  openSuccessModal: boolean
  setOpenSuccessModal: React.Dispatch<React.SetStateAction<boolean>>
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const SuccessModal = observer(function SuccessModal({
  openSuccessModal,
  setOpenSuccessModal,
}: SuccessModalProps) {
  return (
    <Modals showModal={openSuccessModal} setShowModal={() => setOpenSuccessModal(false)}>
      <View>
        <Icon icon="success" />
      </View>
      <Text weight="sansMd" size="sm" style={styles.invalidText} text="Congratulations" />
      <Text
        weight="sansNormal"
        size="xs"
        style={styles.message}
        text="Your password has been successfully changed."
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
