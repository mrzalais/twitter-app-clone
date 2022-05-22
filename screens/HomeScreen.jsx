import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Platform } from 'react-native';
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatDistanceToNowStrict } from "date-fns";
import locale from 'date-fns/locale/en-US'
import formatDistance from "./helpers/formatDistanceCustom";

export default function HomeScreen({navigation}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllTweets();
  }, [])

  function getAllTweets() {
    axios
      .get('http://127.0.0.1:8000/api/tweets')
      .then(response => {
        // console.log(response.data);
        setData(response.data);
      })
      .catch((function (error) {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
      }))
  }

  function gotoProfile() {
    navigation.navigate('Profile Screen');
  }

  function gotoSingleTweet() {
    navigation.navigate('Tweet Screen');
  }

  function gotoNewTweet() {
    navigation.navigate('New Tweet');
  }

  const renderItem = ({ item: tweet }) => (
    <View style={styles.tweetContainer}>
      <TouchableOpacity onPress={() => gotoProfile()}>
        <Image
          style={styles.avatar}
          source={{
            uri: tweet.user.avatar,
          }}
        />
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={styles.flexRow}
          onPress={() => gotoSingleTweet()}
        >
          <Text
            numberOfLines={1}
            style={styles.tweetName}
          >
            {tweet.user.name}
          </Text>
          <Text
            numberOfLines={1}
            style={styles.tweetHandle}
          >
            @{tweet.user.username}
          </Text>
          <Text>
            &middot;
          </Text>
          <Text
            numberOfLines={1}
            style={styles.tweetHandle}
          >
            {/*{formatDistanceToNowStrict(new Date(tweet.created_at))}*/}
            {formatDistanceToNowStrict(new Date(tweet.created_at), {
              locale: {
                ...locale,
                formatDistance,
              }
            })}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tweetContentContainer}>
          <Text
            style={styles.tweetContent}
            onPress={() => gotoSingleTweet()}
          >
            {tweet.body}
          </Text>
        </TouchableOpacity>

        <View style={styles.tweetEngagement}>
          <TouchableOpacity style={styles.flexRow}>
            <EvilIcons
              name="comment"
              size={22}
              color="gray"
              style={{ marginRight: 2 }}
            />
            <Text style={styles.textGray}>
              456
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.flexRow, styles.ml4]}>
            <EvilIcons
              name="retweet"
              size={22}
              color="gray"
              style={{ marginRight: 2 }}
            />
            <Text style={styles.textGray}>
              333
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.flexRow, styles.ml4]}>
            <EvilIcons
              name="heart"
              size={22}
              color="gray"
              style={{ marginRight: 2 }}
            />
            <Text style={styles.textGray}>
              1222
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.flexRow, styles.ml4]}>
            <EvilIcons
              name={Platform.OS === 'ios' ? 'share-apple' : 'share-google'}
              size={22}
              color="gray"
              style={{ marginRight: 2 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => (
          <View style={styles.tweetSeparator}></View>
        )}
      />
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => gotoNewTweet()}
      >
        <AntDesign name="plus" size={26} color="white" />
      </TouchableOpacity>
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
  tweetContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 12
  },
  tweetSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb'
  },
  avatar: {
    width: 42,
    height: 42,
    marginRight: 8,
    borderRadius: 21,
  },
  tweetName: {
    fontWeight: 'bold',
    color: '#222222'
  },
  tweetHandle: {
    marginHorizontal: 8,
    color: 'gray',
  },
  tweetContentContainer: {
    marginTop: 4,
  },
  tweetContent: {
    lineHeight: 20,
  },
  textGray: {
    color: 'gray',
  },
  tweetEngagement: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  floatingButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1d9bf1',
    position: 'absolute',
    bottom: 20,
    right: 12,
  },
  ml4: {
    marginLeft: 16,
  }
})