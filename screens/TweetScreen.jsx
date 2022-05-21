import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { Entypo, EvilIcons } from "@expo/vector-icons";

export default function TweetScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <TouchableOpacity style={styles.flexRow}>
          <Image
            style={styles.avatar}
            source={{
              uri: 'https://reactnative.dev/img/tiny_logo.png'
            }}
          />
          <View>
            <Text style={styles.tweetName}>Jon Doe</Text>
            <Text style={styles.tweetHandle}>@somename</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Entypo name="dots-three-vertical" size={24} color="gray" />
        </TouchableOpacity>
      </View>

      <View style={styles.tweetContentContainer}>
        <Text style={styles.tweetContent}>Space suits wobble with modification at the vital planet!
          Planetas ire! Aww, dead treasure!
        </Text>
      </View>

      <View style={styles.tweetEngagement}>
        <View style={styles.flexRow}>
          <Text style={styles.tweetEngagementNumber}>333</Text>
          <Text style={styles.tweetEngagementLabel}>Retweets</Text>
        </View>
        <View style={[styles.flexRow, styles.ml4]}>
          <Text style={styles.tweetEngagementNumber}>13</Text>
          <Text style={styles.tweetEngagementLabel}>Quote tweets</Text>
        </View>
        <View style={[styles.flexRow, styles.ml4]}>
          <Text style={styles.tweetEngagementNumber}>665</Text>
          <Text style={styles.tweetEngagementLabel}>Likes</Text>
        </View>
      </View>

      <View style={[styles.tweetEngagement, styles.spaceAround]}>
        <TouchableOpacity style={styles.flexRow}>
          <EvilIcons
            name="comment"
            size={32}
            color="gray"
            style={{ marginRight: 2 }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.flexRow}>
          <EvilIcons
            name="retweet"
            size={32}
            color="gray"
            style={{ marginRight: 2 }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.flexRow}>
          <EvilIcons
            name="heart"
            size={32}
            color="gray"
            style={{ marginRight: 2 }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.flexRow}>
          <EvilIcons
            name={Platform.OS === 'ios' ? 'share-apple' : 'share-google'}
            size={32}
            color="gray"
            style={{ marginRight: 2 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  flexRow: {
    flexDirection: 'row',
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 8,
    borderRadius: 25,
  },
  tweetName: {
    fontWeight: 'bold',
    color: '#222222'
  },
  tweetHandle: {
    color: 'gray',
    marginTop: 4,
  },
  tweetContentContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb'
  },
  tweetContent: {
    fontSize: 20,
    lineHeight: 30,
  },
  tweetEngagement: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb'
  },
  tweetEngagementNumber: {
    fontWeight: 'bold',
  },
  tweetEngagementLabel: {
    color: 'gray',
    marginLeft: 6,
  },
  spaceAround: {
    justifyContent: 'space-around',
  },
  ml4: {
    marginLeft: 16,
  }
});