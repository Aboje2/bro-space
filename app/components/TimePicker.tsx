import React, { useState } from "react"
import { StyleProp, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { Text } from "app/components"




export interface TimePickerProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  setDate: React.Dispatch<React.SetStateAction<Date | null>>
  date: Date | null
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  mode: string
}
type modeType = "time" | "date"
/**
 * Describe your component here
 */
export const TimePicker = observer(function TimePicker({
  date,
  setDate,
  open,
  setOpen,
  mode,
}: TimePickerProps) {
  const handleConfirm = (selectedDate: Date) => {
    setDate(selectedDate)
    setOpen(false)
  }
  console.log(date, "what is the current time")
  return (
    <DateTimePickerModal
      isVisible={open}
      mode={mode as modeType}
      onConfirm={handleConfirm}
      onCancel={() => setOpen(false)}
    />
  )
})
