import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, StyleSheet, ViewStyle, Touchable } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Icon, Notification } from "app/components"
import { TouchableOpacity } from "react-native-gesture-handler"
import { spacing } from "app/theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface NotificationScreenProps extends AppStackScreenProps<"Notification"> {}

export const NotificationScreen: FC<NotificationScreenProps> = observer(
  function NotificationScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()
    const [toggle, setToggle] = React.useState<boolean>(false)
    const [filter, setFilter] = React.useState<string>("")
    const [currentStatus, setCurrentStatus] = React.useState<number>(0)
    const [openNotification, setOpenNotification] = React.useState<boolean>(false)
    const changeStatus = (status: string, num: number) => {
      setFilter(status)
      setCurrentStatus(num)
    }
    const notificationList = [
      { title: "All tickets sold successfully", day: "Friday, 23-09-2025", hour: "20 minutes ago" },
      { title: "Event created successfully", day: "Friday, 23-09-2025", hour: "20 minutes ago" },
      { title: "Password changed successfully", day: "Friday, 23-09-2025", hour: "20 minutes ago" },
      {
        title: "2 out of 5 tickets sold successfully",
        day: "Friday, 23-09-2025",
        hour: "20 minutes ago",
      },
      { title: "Event created successfully", day: "Friday, 23-09-2025", hour: "20 minutes ago" },
    ]

    const notificationType = ["All notifications", "Read notifications", "Unread notifications"]

    // Pull in navigation via hook
    // const navigation = useNavigation()
    return (
      <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$container}>
        <Text
          weight="semiBold"
          size="lg"
          style={[styles.textColor, styles.textAlignment]}
          text="Notificatons"
        />

        <View style={styles.container}>
          <View style={styles.notificationMenu}>
            <Text weight="semiBold" text="All notifications" />
            <Icon onPress={() => setToggle(!toggle)} icon="not_menu" />
          </View>
          {toggle && (
            <View style={styles.menuItem}>
              {notificationType.map((status, i) => (
                <TouchableOpacity
                  onPress={() => changeStatus(status, i)}
                  key={i + status}
                  style={[
                    { backgroundColor: i === currentStatus ? "#0A01051A" : "#fff" },
                    styles.menuItems,
                  ]}
                >
                  <Text
                    weight="normal"
                    size="xxs"
                    style={{ color: i === currentStatus ? "#070104" : "#939393" }}
                    text={status}
                  />
                </TouchableOpacity>
              ))}
            </View>
          )}

          {notificationList.map((item, i) => (
            <TouchableOpacity
              onPress={() => setOpenNotification(true)}
              key={i + item.title}
              style={styles.content}
            >
              <View style={styles.displayStyle}>
                <Text weight="normal" size="xs" style={styles.textColor} text={item.title} />
                <View style={styles.circleDot} />
              </View>
              <View style={styles.displayStyle}>
                <Text weight="normal" size="xxs" style={styles.timeText} text={item.day} />
                <Text weight="normal" size="xxs" style={styles.timeText} text={item.hour} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <Notification
          openNotification={openNotification}
          setOpenNotification={setOpenNotification}
        />
      </Screen>
    )
  },
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F6F5F5",
    paddingTop: 40,
    paddingHorizontal: 20,

    // marginHorizontal: 10,
  },
  notificationMenu: {
    backgroundColor: "#0A01050D",
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 6,
  },
  displayStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  content: {
    backgroundColor: "#EEEEEE",
    padding: 10,
    marginBottom: 5,
    borderRadius: 6,
  },

  menuItem: {
    width: 217,
    height: 162,
    paddingTop: 10,
    borderRadius: 6,
    zIndex: 20,
    position: "absolute",
    top: 60,
    right: 45,
    backgroundColor: "#fff",
  },
  textColor: {
    color: "#06141E",
  },
  textAlignment: {
    marginLeft: 20,
    marginBottom: 30,
  },
  circleDot: {
    height: 12,
    width: 12,
    borderRadius: 50,
    backgroundColor: "#06141ECC",
  },

  timeText: {
    color: "#254863B2",
  },
  menuItems: {
    paddingVertical: 10,
    paddingLeft: 30,
  },
})

const $container: ViewStyle = {
  backgroundColor: "#fff",

  paddingTop: spacing.lg + spacing.xl,
  //  paddingTop:  spacing.xl,
}
