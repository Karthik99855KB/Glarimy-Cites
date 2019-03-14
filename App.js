
import React, { Component } from 'react';
import {Platform, StyleSheet, Text,Button, View,ScrollView, Animated,TouchableHighlight,TouchableOpacity,TouchableWithoutFeedback,FlatList,ImageBackground} from 'react-native';
import img from './b.jpg';
import PropTypes from 'prop-types';

import { Dimensions } from 'react-native';
import CollapseView from "react-native-collapse-view";
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import CardView from 'react-native-cardview';
import OfflineNotice from './OfflineNotice';

import * as Animatable from 'react-native-animatable';
//import for the animation of Collapse and Expand
import Collapsible from 'react-native-collapsible';
//import for the collapsible/Expandable view
import Accordion from 'react-native-collapsible/Accordion';
//import for the Accordion view





export default  class App extends Component {
  
  constructor(props)
  {
    super(props);
    this.cityn='';
    this.catname='';
    this.secname='';
    this.i='';
    this.k='';
    this.id='';
    this.itemh=[],
    this.state={
      showSections: false,
      showSecDetail: false,
      listshow:false,
      showCat:false,
      showDetails:false,
      showcol:false,
      collapsed: true,
      data:[],
      list:[], 
      listmore:[],
     
    };
  }

 
  componentDidMount()
  {
    fetch('https://4r5qkqzk35.execute-api.us-east-1.amazonaws.com/v1/activecities/')
    .then(res=> res.json())
    .then(res=> {
       this.setState({
         data:res
       })     
      })
    fetch('https://4r5qkqzk35.execute-api.us-east-1.amazonaws.com/v1/activecities/Tadepalligudem/Health/Hospitals/entry')
    .then(res => res.json())
    .then(res => {
      this.setState({
        list:res
      })
    })
   
  }

  city =(item,index) =>{
     
    this.cityn=item.city;
    this.catname='';
    this.secname='';
    
    this.setState({showSections:false});
    this.setState({showSecDetail:false});
    if(this.state.showCat === true)
    {
      this.setState({showCat:false});
    }
    else{
      this.setState({showCat:true});
    }
    
   }

   cat=(item,index)=>{
     this.catname=item.category;
     this.secname='';

     this.setState({showSecDetail:false});
     if(this.state.showSections === true)
     {
       this.setState({showSections:false});
     }
     else{
       this.setState({showSections:true});
     }
   }
   
   secDetails=(item,index)=>{
    this.secname=item.name;
    if(this.state.showSecDetail === true)
    {
      this.setState({showSecDetail:false});
    }
    else{
      this.setState({showSecDetail:true});
    }
  }

  secMoreDetails=(item,index)=>{
    this.id=item.id;
    console.log(this.id);
    this.setState({ collapsed: !this.state.collapsed });
    console.log(this.state.collapsed)
    fetch('https://4r5qkqzk35.execute-api.us-east-1.amazonaws.com/v1/activecities/Tadepalligudem/Health/Hospitals/entry/'+this.id)
    .then(res => res.json())
    .then(res => {
      this.setState({
        listmore:res
      })
    })

    
    if(this.state.showcol === true)
    {
      this.setState({showcol:false});
    }
    else{
      this.setState({showcol:true});
    }
    
    console.log("calling");
   
  }


  toggleExpanded = () => {
    //Toggling the state of single Collapsible
    console.log(this.state.collapsed);
    this.setState({ collapsed: !this.state.collapsed });
  };


  _renderView = (collapse) => {
    return(
      <View style={styles.view}>
        <Text style={{textAlign:"center",padding:10}}>view {collapse? 'less': 'more'}</Text>
      </View>
      
    )
  }

  
_renderCollapseView = (collapse) => {
    

return <View style={styles.collapseView}>
<FlatList
data={[this.state.listmore]}

renderItem={({item}) => {
 var d= item.data; 
 //console.log(d);
 return <FlatList
 data = {d}
 renderItem={({item}) => {
 
 return <View>
 <Text style={{fontSize:18,padding:15}}>{item.name} : {item.value}</Text>
 </View>
 }}/>
}
}
/>

</View>

}

render() {
  const { startpoint, endpoint, animation, collapse } = this.state;
return ( 



 <ParallaxScrollView
 
 contentBackgroundColor="#D3D3D3"
 parallaxHeaderHeight={190}
 renderForeground={() => (
     <ImageBackground style={{height: 200,justifyContent:"center",alignItems:"center" }} source={img}><Text style={{color:"white",fontSize:40}}>Glarimy Cities</Text></ImageBackground>
   
  
 )}>




<View  >


<OfflineNotice />
      <View style={{height:100,padding:15  }}>
  <FlatList
  horizontal
  data={this.state.data}
  renderItem={({item},index) =>{
    //console.log(item);
     if(item.category === "Default")
     {
       return <View style={{padding:10,height:90}}>
      <TouchableOpacity 
      onPress={()=>this.city(item,index)}>
     <CardView
     
         cardElevation={2}
         cardMaxElevation={2}
         cornerRadius={5}>
        <Text style={{fontSize:26,padding:5}}>{item.citydisplay}</Text>
          </CardView>
          </TouchableOpacity>
   </View>
     }
  }
     }
  />
   </View> 


   {(!this.state.showCat) &&  <FlatList
  horizontal
  data={this.state.data}
  renderItem={({item},index) =>{
    //console.log(this.cityn);
    if(item.city === this.cityn && item.category != "Default" )
    { 
      this.setState({showCat:true});
      return
    }
  }
}
  />}


   
   {(this.state.showCat) &&  <FlatList
  horizontal
  data={this.state.data}
  renderItem={({item},index) =>{
    //console.log(this.cityn);
    //console.log(item);
    if(item.city === this.cityn && item.category != "Default" )
    { 
      
      return <View style={{padding:10,flex:1}}>
      <TouchableOpacity 
      onPress={()=>this.cat(item,index)}>
     <CardView
         cardElevation={2}
         cardMaxElevation={2}
         height={50}
         cornerRadius={5}>
        <Text style={{fontSize:18,padding:15}}>{item.categorydisplay}</Text>
          </CardView>
          </TouchableOpacity>
   </View>
        

      
    }
  
  }

}
  />}

{(!this.state.showSections) &&  <FlatList
  horizontal
  data={this.state.data}
  renderItem={({item},index) =>{

    if(item.category === this.catname && item.city === this.cityn )
    {
       
      this.setState({showSections:true});
      return
    }
  }

}
  />}



{(this.state.showSections) &&  <FlatList
  
  data={this.state.data}
  
  renderItem={({item},index) =>{

    if(item.category === this.catname  && item.city === this.cityn  )
    {
      var d= item.sections;    
        
      return <FlatList
    horizontal
  data={d}
  renderItem={({item},index) =>{
    
     return  <View style={{padding:10,flexDirection:"row"}}>
     <TouchableOpacity 
      onPress={()=>this.secDetails(item,index)}>
    <CardView
        cardElevation={2}
        cardMaxElevation={2}
        height={50}
        cornerRadius={5}>
       <Text style={{fontSize:18,padding:15}}>{item.display}</Text>
         </CardView></TouchableOpacity>
  </View>
   
  }

}
  />
    }
    }
  }
  />}


{(!this.state.showSecDetail) &&  <FlatList
  horizontal
  data={this.state.data}
  renderItem={({item},index) =>{

    if(item.category === this.catname && item.city === this.cityn && item.name === this.secname)
    {
       
      this.setState({showSections:true});
     
      return
    }
  }

}
  />}
 
 
      

{(this.state.showSecDetail) &&  <FlatList
  
  data={this.state.list}
  
  renderItem={({item},index) =>{

    if(item.category === this.catname  && item.city === this.cityn && item.section === this.secname )
    {
      
    return  <View style={{padding:10,flexDirection:"row"}}> 
       <CardView
        cardElevation={2}
        cardMaxElevation={2}
        
        width={Dimensions.get('window').width-20}
        cornerRadius={5}>

        <Text style={{fontSize:20,padding:15}}>{item.name}</Text>
        <Text style={{fontSize:13,padding:15,fontStyle:"italic"}}>{item.address}</Text>
        <TouchableOpacity  onPress={()=>this.secMoreDetails(item,index)} >
       <Text>getId</Text>
       </TouchableOpacity>

       <CollapseView 
          renderView={this._renderView}
          renderCollapseView={this._renderCollapseView}>
        </CollapseView>
      </CardView>
         
    </View>
  
    }
    }
    }
  />}

      </View>    


 </ParallaxScrollView>

);
}
       
}
  

const styles = StyleSheet.create({
  green: {
    color: '#00ff00'
  },
  red: {
    color: '#ff0000'
  }
})
