import { StyleSheet, Text, View } from "react-native";

export default function Message({
  loggedBy,
  fullName,
  activity,
  createdAt,
}: {
  loggedBy: string;
  fullName: string;
  activity: string;
  createdAt: string;
}) {
  return (
    <View
      style={[
        styles.messageRow,
        loggedBy === "system" ? styles.userRow : styles.botRow,
      ]}
    >
      <Text
        style={{
          color: "#888",
          fontSize: 12,
        }}
      >
        {loggedBy}
      </Text>
      <Text style={[styles.messageText, styles.messageBox]}>
        {fullName} đã {activity}
      </Text>
      <Text
        style={{
          color: "#888",
          fontSize: 12,
        }}
      >
        {createdAt}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  messageRow: {
    flexDirection: "column",
    marginVertical: 32,
    paddingHorizontal: 12,
  },
  userRow: {
    justifyContent: "flex-end",
  },
  botRow: {
    justifyContent: "flex-start",
  },
  messageText: {
    fontSize: 16,
    padding: 10,
    borderRadius: 12,
    maxWidth: "80%",
  },
  messageBox: {
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  userText: {
    backgroundColor: "#DCF8C6",
    color: "#222",
    alignSelf: "flex-end",
  },
  botText: {
    backgroundColor: "#ECECEC",
    color: "#222",
    alignSelf: "flex-start",
  },
});
