import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {View, Text, SafeAreaView, StatusBar, FlatList, ImageBackground} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Variable from '../utils/Var';
import Var from '../utils/Var';

function Home() {
  const [genres, setGenres] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  useEffect(() => {
    async function getGenres() {
      try {
        let response = await fetch(
          Var.host + 'genre/movie/list?api_key=' + Var.api_key,
        );
        let json = await response.json();
        setGenres(json.genres);
      } catch (error) {
        console.log(error);
      }
    }
    getGenres();
    // console.log(genres);

    async function getNowPlaying(){
        try {
            let response = await fetch(
                Var.host+"movie/now_playing?api_key="+Var.api_key
            );
            let json = await response.json()
            setNowPlaying(json.results)
        } catch (error) {
            console.log(error);
        }
    }
    getNowPlaying()
    console.log(nowPlaying);
  }, []);
  return (
    <SafeAreaView style={{backgroundColor: '#0F1028', flex: 1}}>
      <StatusBar backgroundColor={'#0F1028'} />
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 0.5, margin: 10}}>
          <Text style={{color: 'white', fontSize: 25}}>Like Movie</Text>
        </View>
        <View
          style={{
            flex: 0.5,
            alignItems: 'flex-end',
            justifyContent: 'center',
            margin: 10,
          }}>
          <IonIcons name="md-search" color={'white'} size={30} />
        </View>
      </View>
      <FlatList
        style={{maxHeight: 50}}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={genres}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => <RenderItem item={item} />}
      />
        <Text style={{color: 'white', fontSize: 20,margin:10}}>Now Playing</Text>
      <FlatList
      contentContainerStyle={{paddingHorizontal:10}}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={nowPlaying}
      keyExtractor={item => item.id}
      renderItem={({item, index})=><RenderItemPlaying item={item}/>}
      />
    </SafeAreaView>
  );

  function RenderItem({item}) {
    return (
      <View
        style={{
          backgroundColor: '#F09631',
          alignSelf: 'flex-start',
          margin: 5,
          padding: 10,
          borderRadius: 5,
        }}>
        <Text style={{color: '#0F102B', fontWeight: 'bold'}}>{item.name}</Text>
      </View>
    );
  }
  function RenderItemPlaying({item}) {
      let tahun =item.release_date.split('-');
    return (
      <View>
          <ImageBackground source={{uri:'https://image.tmdb.org/t/p/w500'+item.poster_path}} style={{width:150,height:200,marginRight:10,justifyContent:'flex-end'}} resizeMode={"cover"}>
              <Text style={{color:'white',padding:5,backgroundColor:'rgba(0,0,0,0.4)'}} numberOfLines={2} ellipsizeMode={"tail"}>{item.title}</Text>
              <Text style={{backgroundColor:'#f09631',alignSelf:'flex-start',padding:5,position:'absolute',top:5,right:5}}>
                  {item.vote_average}
              </Text>
              <Text style={{color:'#f09641',backgroundColor:'rgba(0,0,0,0.4)',alignSelf:'flex-start',padding:5,position:'absolute',top:5}}>
                  {tahun[0]}
              </Text>
          </ImageBackground>
      </View>
    );
  }
}
export default Home;
