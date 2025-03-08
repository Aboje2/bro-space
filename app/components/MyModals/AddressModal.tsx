import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import { Text, Modals, TextField, Button, Toggle } from "app/components"

export interface AddressModalProps {
  /**
   * An optional style override useful for padding & margin.
   *
   */
  style?: StyleProp<ViewStyle>
  openAddress: boolean
  setOpenAddress: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * Describe your component here
 */
export const AddressModal = observer(function AddressModal({
  openAddress,
  setOpenAddress,
}: AddressModalProps) {
  const [toggler, setToggler] = React.useState(false)
  const saveGoogleAddress = ()=>{
     setOpenAddress(false)
  }
  return (
    <Modals showModal={openAddress} setShowModal={setOpenAddress}>
      <Text style={styles.googleText} weight="sansMd" size="sm" text="Google address" />

      <TextField />

     <View style={styles.centerContent}>
       <View style={styles.showMap}>
        <Text style={styles.showMapText} weight="light" size="xs" text="Show map on event page" />
        <Toggle
          value={toggler}
          onValueChange={() => setToggler(!toggler)}
          variant="switch"
          // labelPosition="left"
          inputOuterStyle={{ backgroundColor: "#6A7883", height: 27 }}
          inputInnerStyle={{ backgroundColor: "#660033", height: 27 }}
        />
      </View>
     </View>

      <Button onPress={saveGoogleAddress} preset="primary" text="Save changes" />
    </Modals>
  )
})

const styles = StyleSheet.create({
  googleText: {
    color: "#000",
    marginBottom: 20,
  },
  showMap: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
     marginBottom: 30,
    marginTop: 10,
    backgroundColor: "#6600330D",
    borderRadius: 6,
   
  },

  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },

  showMapText: {
    color: "#25486399",
  },
})
