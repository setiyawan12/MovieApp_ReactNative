import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { View,Text, SafeAreaView, StatusBar, FlatList } from 'react-native'
import IonIcons from 'react-native-vector-icons/Ionicons'
import Variable from '../utils/Var';
import Var from "../utils/Var";

function Home (){
    const [genres,setGenres] = useState([]);

    useEffect(()=>{
        async function getGenres(){
            try {
                let response = await fetch(
                    Var.host+"genre/movie/list?api_key="+Var.api_key
                )
                let json = await response.json()
                setGenres(json.genres);
            } catch (error) {
                console.log(error);                
            }
        }
        getGenres();
        console.log(genres);
    },[])
    return(
        <SafeAreaView style={{backgroundColor:'#0F1028',flex:1}}>
            <StatusBar backgroundColor={"#0F1028"}/>
            <View style={{flexDirection:'row'}}>
                <View style={{flex:0.5,margin:10}}>
                    <Text style={{color:'white',fontSize:25}}>Like Movie</Text>
                </View>
                <View style={{flex:0.5,alignItems:'flex-end',justifyContent:'center',margin:10}}>
                    <IonIcons name='md-search' color={'white'} size={30}/>
                </View>
            </View>
            <FlatList 
            horizontal
            showsHorizontalScrollIndicator={false}
            data={genres}
            keyExtractor={item=>item.id} 
            renderItem={({item,index})=><RenderItem item={item}/>}
            />
        </SafeAreaView>
    )

    function RenderItem({item}){
        return(
            <View style={{backgroundColor:'#F09631',alignSelf:'flex-start',margin:5,padding:10,borderRadius:5}}>
                <Text style={{color:'#0F102B',fontWeight:'bold'}}>{item.name}</Text>
            </View>
        )
    }
}
export default Home