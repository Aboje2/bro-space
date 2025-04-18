import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import { Text, Icon, Modals, Button } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { AppNavigationProp, AppStackParamList } from "app/navigators/AppNavigator"

export interface SuccessModalProps<T extends keyof AppStackParamList> {
  /**
   * An optional style override useful for padding & margin.
   */
  openSuccessModal: boolean
  setOpenSuccessModal: React.Dispatch<React.SetStateAction<boolean>>
  text: string
  routeName: T
  params: { [key: string]: string }

  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const SuccessModal = observer(function SuccessModal<T extends keyof AppStackParamList>({
  openSuccessModal,
  setOpenSuccessModal,
  text,
  routeName,
  params,
}: SuccessModalProps<T>) {
  // console.log(rou)
  const navigation = useNavigation<AppNavigationProp>()
  const handlePress = () => {
    navigation.navigate(routeName as any, params as any)
  }
  return (
    <Modals showModal={openSuccessModal} setShowModal={() => setOpenSuccessModal(false)}>
      <View>
        <Icon icon="success" />
      </View>
      <Text weight="sansMd" size="sm" style={styles.invalidText} text="Congratulations" />
      <Text weight="sansNormal" size="xs" style={styles.message} text={text} />
      <Button
        onPress={handlePress}
        preset="primary"
        textStyle={{ color: "#fff" }}
        text="Continue"
      />
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
