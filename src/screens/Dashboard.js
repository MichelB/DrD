import React, { memo,useEffect,useState} from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';

import LogoutButton from '../components/LogoutButton';

import { View, Text,Dimensions,FlatList,StyleSheet,ScrollView,TouchableOpacity} from 'react-native';
import {
  PieChart
} from 'react-native-chart-kit'
import { client} from '../../graphql/Client'
import { GetRecipes,GetMemberMealPlans ,createUser } from '../../graphql/Queries'

const Dashboard = ({ navigation }) => {
 const [nutritionRecipes, setNutritionRecipes] = useState([]);
 const [selectedNutritionIndex, setSelectedNutritionIndex] = useState(null)
 const [recipeNutritionChartObject, setRecipeNutritionChartObject] = useState([]);
 
 const [title, setTitle] = useState('');
 const [description, setDescription] = useState('');
 const [rating, setRating] = useState('');
 
    const GetRecipeNutritionChart = () => {
    const ClientRectListVariables = {pageSize:0,page:5,tagFilters:["title"]}
    client.query({
         query: GetRecipes,
         variables: ClientRectListVariables
      })
      .then(response => {
       setNutritionRecipes(response.data.listRecipes.recipes)
       
      }) 
      .catch(error => { 
        console.log('ERROR ==>', error)
      }) 
     
      // console.log('clientclient ==>', client.queryDeduplication)
  }
  useEffect(() => {
   GetRecipeNutritionChart()
  }, [recipeNutritionChartObject])

 const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item2, style]}>
    <Text style={[styles.title,{color:'#0e3478'},style]}>{item.title} {item.id}</Text>
  </TouchableOpacity>
);
   function selectRow(item){
    setSelectedNutritionIndex(item.id)

    var nutritions_g = [item.nutrition.values.carbs,
    item.nutrition.values.fat,
    item.nutrition.values.protein,
    item.nutrition.values.calories,
    item.nutrition.values.fiber]

    var nutritions_per = [item.nutrition.percentages.carbs,
      item.nutrition.percentages.fat,
      item.nutrition.percentages.protein]
    var names = ["g Carbs("+nutritions_per[0]+" %)", "g Fat("+nutritions_per[1]+" %)","g Protein("+nutritions_per[2]+" %)","Calories","g Fiber"]
    setTitle(item.title)
    setDescription(item.description)
    setRating(item.rating)
    var colors = ['#FF5733', '#C70039','blue','red','green']
    var legendFontColors= ['#FF5733', '#C70039','blue','red','green']
    for (let index = 0; index < names.length; index++) {
      recipeNutritionChartObject[index]={
        name: names[index] ,
        gram: nutritions_g[index],
        color: colors[index],
        legendFontColor: legendFontColors[index],
        legendFontSize: 15
      }
      setRecipeNutritionChartObject(recipeNutritionChartObject)
    }
  }
  const renderItem = ({ item }) => {
    const fontWeight = item.id === selectedNutritionIndex ? "bold" : "normal";
    return (
      <Item
        item={item}
        onPress={() => selectRow(item) }
        style={{ fontWeight:fontWeight }}
      />
    );
  };
  return(
    
  <Background>
     
     <LogoutButton navigation={navigation}/>

   
    {nutritionRecipes ? (
  <View style={styles.container}>
    
  <Header>Let’s start select a recipe:</Header>
      <View style={[styles.item]}>
        <FlatList 
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={nutritionRecipes}
          renderItem={renderItem}
          keyExtractor={item => item}

        />
       </View>
      
        {recipeNutritionChartObject.length>0 ?  (
         <View style={styles.item}>
          <SubHeader>{title}</SubHeader>
          <Text style={{fontWeight: 'bold'}}>Per serving </Text>
          <PieChart
              data={recipeNutritionChartObject}
              width={Dimensions.get('window').width-10}
              height={200}
              chartConfig={{
                backgroundColor: '#e26a00',
                backgroundGradientFrom: '#fb8c00',
                backgroundGradientTo: '#ffa726',
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16
                }
              }} 
              accessor="gram"
              backgroundColor="transparent"
              paddingLeft="1"
              absolute
            /> 
         <Text>{description}</Text>
          </View>  
          ) : null}
       
 </View>    
    ): null}
   
</Background>
 );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start' // if you want to fill rows left to right
  },
  item: {
    width: '100%', 
    marginTop:10,
    height: '35%' // is 50% of container width
  },
  item2: {
    width: '100%', 
    height: 40 // is 50% of container width
  },
});
//export default Dashboard;
export default memo(Dashboard);
