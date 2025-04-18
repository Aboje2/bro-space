import * as React from "react"
import { View, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import { Text } from "app/components/Text"
import { Dropdown } from "react-native-element-dropdown"

export interface SelectInputProps {
  data: any[]
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  title: string
  bgColor?: boolean
  /**
   * An optional style override useful for padding & margin.
   */
}

/**
 * Describe your component here
 */
export const SelectInput = observer(function SelectInput({
  data,
  value,
  setValue,
  title,
  bgColor,
}: SelectInputProps) {
  return (
    <View style={[styles.container]}>
      <Dropdown
        style={[
          styles.dropdown,
          { backgroundColor: bgColor ? "#6600330D" : "", borderWidth: bgColor ? 0 : 1 },
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={title}
        searchPlaceholder="Search..."
        value={value}
        onChange={(item) => {
          setValue(item.value)
        }}
        // renderLeftIcon={() => <Icon icon="downPointer" />}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dropdown: {
    flex: 1,
    alignSelf: "stretch",
    marginVertical: 10,
    height: 45,
    paddingHorizontal: 10,
    borderColor: colors.palette.neutral400,

    // borderWidth: 1,
    borderRadius: 4,
  },

  placeholderStyle: {
    fontSize: 14,
    color: colors.palette.secondary50,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
})
