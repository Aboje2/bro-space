import React, { useState } from "react"
import { StyleProp, TextStyle, View, ViewStyle, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import { Text, Modals, Icon, Button, TimePicker } from "app/components"



function formatTimeTo12Hour(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  
  
  const ampm = hours >= 12 ? 'PM' : 'AM';

  
  const formattedHours = hours % 12 || 12; // '0' becomes '12'
  
  
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

export interface SetTimeModalProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  openDate: boolean
  setOpenDate: React.Dispatch<React.SetStateAction<boolean>>
  setEventTime: React.Dispatch<React.SetStateAction<string>>
}

/**
 * Describe your component here
 */
export const SetTimeModal = observer(function SetTimeModal({
  openDate,
  setOpenDate,
  setEventTime
}: SetTimeModalProps) {
  const [startDate, setStartDate] = useState<null | Date>(null)
  const [openStartDate, setOpenStartDate] = useState(false)
  const [startTime, setStartTime] = useState<null | Date>(null)
  const [openStartTime, setOpenStartTime] = useState(false)
  const [closeDate, setCloseDate] = useState<null | Date>(null)
  const [openCloseDate, setOpenCloseDate] = useState(false)
  const [closeTime, setCloseTime] = useState<null | Date>(null)
  const [openCloseTime, setOpenCloseTime] = useState(false)

  const saveChanges= ()=>{
    setEventTime(`from ${formatTimeTo12Hour(startTime)}, ${startDate.toDateString()} to ${formatTimeTo12Hour(closeTime)}, ${closeDate.toDateString()}`)
   setOpenDate(false)
  }
  return (
    <Modals showModal={openDate} setShowModal={() => setOpenDate(false)}>
      <View>
        <Text style={styles.setTime} weight="sansMd" size="sm" text="Set date" />
        <View style={styles.inputWrapper}>
          <View style={styles.dateInput}>
            <Text
              style={styles.startDate}
              weight="light"
              size="xxs"
              text={startDate ? startDate.toDateString() : "Starting date"}
            />
            <Icon onPress={() => setOpenStartDate(true)} icon="calendar" />
          </View>
          <View style={styles.dateInput}>
            <Text
              style={styles.startDate}
              weight="light"
              size="xxs"
              text={startTime ? formatTimeTo12Hour(startTime) : "Starting time"}
            />
            <Icon onPress={() => setOpenStartTime(true)} icon="clock" />
          </View>
        </View>

        <View style={styles.inputWrapper}>
          <View style={styles.dateInput}>
            <Text
              style={styles.startDate}
              weight="light"
              size="xxs"
              text={closeDate ? closeDate.toDateString() : "Close date"}
            />
            <Icon onPress={() => setOpenCloseDate(true)} icon="calendar" />
          </View>
          <View style={styles.dateInput}>
            <Text
              style={styles.startDate}
              weight="light"
              size="xxs"
              text={closeTime ? formatTimeTo12Hour(closeTime) : "Close time"}
            />
            <Icon onPress={() => setOpenCloseTime(true)} icon="clock" />
          </View>
        </View>
       

        <Button
          style={styles.btnStyle}
          preset="primary"
          textStyle={{ color: "#fff" }}
          text="Save changes"
          onPress={saveChanges}
        />
      </View>
      <TimePicker
        setDate={setStartDate}
        date={startDate}
        open={openStartDate}
        setOpen={setOpenStartDate}
        mode="date"
      />

      <TimePicker
        setDate={setStartTime}
        date={startTime}
        open={openStartTime}
        setOpen={setOpenStartTime}
        mode="time"
      />

      <TimePicker
        setDate={setCloseDate}
        date={closeDate}
        open={openCloseDate}
        setOpen={setOpenCloseDate}
        mode="date"
      />

      <TimePicker
        setDate={setCloseTime}
        date={closeTime}
        open={openCloseTime}
        setOpen={setOpenCloseTime}
        mode="time"
      />
    </Modals>
  )
})

const styles = StyleSheet.create({
  setTime: {
    color: "#000",
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
    marginBottom: 15,
  },
  dateInput: {
    width: 157,
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#6600330D",
  },
  startDate: {
    color: "#25486399",
  },

  btnStyle: {
    height: 42,
    marginTop: 10,
  },
})
