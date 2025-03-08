import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, StyleSheet, TouchableOpacity, TextInput } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import {
  Screen,
  Text,
  Icon,
  SelectInput,
  TextField,
  Button,
  AddressModal,
  SetTimeModal,
} from "app/components"
import { colors, spacing } from "app/theme"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface CreateEventsScreenProps extends AppStackScreenProps<"CreateEvents"> {}

export const CreateEventsScreen: FC<CreateEventsScreenProps> = observer(
  function CreateEventsScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    const [forumValue, setForumValue] = useState("")
    const [eventVenue, setEventVenue] = useState("")
    const [eventType, setEventType] = useState("")
    const [eventCategory, setEventCategory] = useState("")
    const [charge, setCharges] = useState("")
    const [address, setAddress] = useState("")
    const navigation = useNavigation()
    const [openAddress, setOpenAddress] = useState(true)
    const [openDate, setOpenDate] = useState(false)
    const [eventTime, setEventTime] = useState("")

    const forum = [
      { value: "web dev", label: "Web developer" },
      { value: "engineer", label: "Engineers" },
      { value: "pharmacist", label: "Pharmacists" },
    ]
    const venue = [
      { value: "online", label: "Online" },
      { value: "unknown", label: "To be announced" },
      { value: "onsite", label: "Onsite event" },
    ]

    const EventAddress = [
      { value: "google", label: "Use google address" },
      { value: "manual", label: "Input address mannually" },
    ]
    const typeEvent = [
      { value: "seminar", label: "Seminar or talk" },
      { value: "conference", label: "Conference" },
      { value: "party", label: "Party or social gathering" },
      { value: "concert", label: "Concert or performances" },
      { value: "meeting", label: "Meetings or networking event" },
    ]
    const charges = [
      { value: "paid", label: "Paid" },
      { value: "free", label: "Free" },
    ]
    const eventCat = [
      { value: "music", label: "Music" },
      { value: "drinks", label: "food and drinks" },
      { value: "community", label: "Community and culture" },
      { value: "business", label: "Business and professional" },
      { value: "performing", label: "Performing and visual art" },
    ]

    const handleOpenDate = () => {
      if(eventTime !==""){
        return
      }
      setOpenDate(true)
    }
    return (
      <Screen
        preset="scroll"
        safeAreaEdges={["top", "bottom"]}
        contentContainerStyle={$screenContentContainer}
      >
        <View style={styles.topContent}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContent}>
            <View style={styles.iconWrapper}>
              <Icon icon="backward" />
            </View>
            <Text weight="sansMd" size="md" style={styles.textColor} text="Create Event" />
          </TouchableOpacity>
        </View>
        <View style={styles.mainContent}>
          <Text
            weight="light"
            size="xxs"
            style={styles.textStyle}
            text="Please fill in the form below to create a new event."
          />

          <SelectInput title="forum" data={forum} value={forumValue} setValue={setForumValue} />
          <TextField
            inputWrapperStyle={[styles.textInputStyle, styles.inputSpacing]}
            placeholder="Event title"
          />
          <TextField
            inputWrapperStyle={[styles.textInputStyle, styles.inputSpacing]}
            placeholder="Event description"
          />
          <TouchableOpacity style={{marginBottom: 10}} onPress={handleOpenDate}>
            <TextField
              editable={false}
              value={eventTime}
              inputWrapperStyle={[styles.textInputStyle]}
              placeholder="Event date"
            />
          </TouchableOpacity>

          <View>
            {address == "" ? (
              <View>
                <SelectInput
                  title="Event Venue"
                  data={EventAddress}
                  value={address}
                  setValue={setAddress}
                />
              </View>
            ) : (
              <View>
                <TextField placeholder="Event address" inputWrapperStyle={[styles.textInputStyle, styles.inputSpacing]} />
                {address === "google" && (
                  <AddressModal openAddress={openAddress} setOpenAddress={setOpenAddress} />
                )}
              </View>
            )}
          </View>
          {/* <SelectInput title="Event" data={venue} value={eventVenue} setValue={setEventVenue} /> */}
          <TextField
            inputWrapperStyle={[styles.textInputStyle]}
            placeholder="Venue contact details"
          />
          <SelectInput title="forum" data={typeEvent} value={eventType} setValue={setEventType} />
          <SelectInput
            title="forum"
            data={eventCat}
            value={eventCategory}
            setValue={setEventCategory}
          />
          <SelectInput title="Add tickets" data={charges} value={charge} setValue={setCharges} />
          <TextField
            inputWrapperStyle={[styles.textInputStyle]}
            placeholder="Total number of guests"
          />

          <Button
            preset="primary"
            style={styles.btnStyle}
            textStyle={{ color: "#fff" }}
            onPress={() => navigation.navigate("Events")}
            text="Create event"
          />
        </View>
        <SetTimeModal openDate={openDate} setOpenDate={setOpenDate} setEventTime={setEventTime} />
      </Screen>
    )
  },
)

const styles = StyleSheet.create({
  iconWrapper: {
    width: 30,
    height: 30,
    padding: 10,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.palette.primary100,
    justifyContent: "center",
    alignItems: "center",
  },

  textColor: {
    color: colors.palette.primary100,
  },
  iconContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 40,
  },

  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },

  textStyle: {
    color: "#12030A",
  },
  topContent: {
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.palette.neutral100,
    paddingTop: 50,
  },
  mainContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: 30,
  },

  textInputStyle: {
    backgroundColor: "transparent",
  },
  inputSpacing: {
    marginBottom: 10,
  },
  btnStyle: {
    marginTop: 20,
    
  },
})

const $screenContentContainer: ViewStyle = {
  // paddingVertical: spacing.xxl,
  backgroundColor: "#0F0F0F1A",
  paddingBottom: 30
  // paddingHorizontal: spacing.lg,
}
