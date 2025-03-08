import * as React from "react"

import { View, Modal, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import { Text } from "app/components/Text"

export interface ModalsProps {
  children: React.ReactNode
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * Describe your component here
 */
export const Modals = observer(function Modals({ showModal, setShowModal, children }: ModalsProps) {
  return (
    <Modal
      transparent={true}
      visible={showModal}
      onRequestClose={() => {
        setShowModal(false)
      }}
      animationType="slide"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.mainContent}>{children}</View>
        </View>
      </View>
    </Modal>
  )
})

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  container: {
    display: "flex",
    justifyContent: "flex-end",
    backgroundColor: "#E5EAF0",
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 20,
  },

  mainContent: {
    paddingBottom: 20,
  },
})
