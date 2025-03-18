import { View, Text } from "react-native"

const profile = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Profile</Text>
        </View>
    )
}

export default profile;

const styles = {
    container: {
        flex: 1,
        backgroundColor: "black",
      },
    text: {
        color: "white"
    }
}