import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text, TextInput, Button, ScrollView, Dimensions } from 'react-native';
import Todo from "./Todo"
import { BarChart, LineChart } from "react-native-chart-kit";
import moment from 'moment';

export default function HomePage({ navigation }) {

  // const [input, setInput] = useState("")
  const [amount, setAmount] = useState(0)
  const [description, setDescription] = useState("");
  const [total, setTotal] = useState(0)
  const [labels, setLabels] = useState([])
  const [data, setData] = useState([
    { date: moment().format("LL"), amount: 2000 },
    { date: moment().subtract(1, "days").format("LL"), amount: 2500 },
    { date: moment().subtract(2, "days").format("LL"), amount: 3500 },
    { date: moment().subtract(3, "days").format("LL"), amount: 4500 },
    { date: moment().subtract(4, "days").format("LL"), amount: 5500 },
  ])

  const [transformedData, setTransformedData] = useState([])

  useEffect(() => {
     setTransformedData(transformData(groupBy(data, "date")))
  }, [data])

  const groupBy = (array, key) =>
    array.reduce((rv, x) => {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {})

  const [gigs, setGigs] = useState([
    {
      description: "Freelance job with Qazi",
      amount: 499.99,
      timestamp: new Date()
    }
  ])

  const getDates = (dataset) => transformedData.map(pair => pair.date);
  const getAmounts = (dataset) => transformedData.map(pair => pair.amount);
  const transformData = (groupedData) => {
  const transformedArray = [];
  
  Object.entries(groupedData).forEach(entry => {
      const total = entry[1].reduce((total, pair) => total + pair.amount, 0)
      transformedArray.push({ date: moment(entry[0]).format("MM/DD"), amount: total})
    })

    const sortedArray = transformedArray.sort((a, b) => moment(a["date"]).diff(moment(b["date"])))
    
    return sortedArray;
  }

  console.log("date", getDates)
  console.log("amount", getAmounts) 

  useEffect(() => {
       setTotal(gigs.reduce((total, gig) => total + Number(gig.amount), 0))
  }, [gigs])

  useEffect(() => {

    setTotal(gigs.reduce((total, gig) => total + Number(gig.amount), 0)
    )
  }, [gigs])

  const addGig = () => {
    setGigs([...gigs, {
      description: description,
      amount: amount,
      timestamp: new Date()
    }])

    setData([
      ...data,
      {
        date: moment().format("LL"),
        amount: Number(amount)
      }
    ])

    setDescription("")
    setAmount("")
  }

  // const data = {
  //   labels: ["January", "February", "March", "April", "May", "June"],
  //   datasets: [
  //     {
  //       data: [20, 45, 28, 80, 99, 43]
  //     }
  //   ]
  // };



  // const [todos, setTodos] = useState([])

  // const addTodo = () => {
  //   setTodos([input, ...todos])
  //   setInput("")
  // }



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.firstLabel}>
        <Text>Hello world</Text>
      </View>
      <View>
       <Button title="Login" onPress={() => navigation.navigate("Login")} />
        <Text>Bezier Line Chart</Text>
        <LineChart
          data={{
            labels: getDates(),
            datasets: [
              {
                data: getAmounts()
              }
            ]
          }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisLabel="$"
          // yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "black",
            backgroundGradientTo: "blue",
            decimalPlaces: null, //-- null to remove dec and 1 to add 1dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      </View>
      <Text>Total Income ${total}</Text>
      {/* <ScrollView>
      {todos.map(todo => (
        <Todo title={todo} />
      ))}
      </ScrollView> */}
      {/* <Todo  title="take trash out"/>
      <Todo title="eat code sleep" />
      <Todo  title="react knowledge time"/> */}
      {/* <TextInput 
      style={styles.todoInput}
      value={description}
      onChangeText={text =>setInput(text) }
    /> */}
      <TextInput
        style={styles.todoInput}
        value={description}
        keyboardType="numeric"
        placeholder="Enter a description"
        onChangeText={text => setDescription(text)}
      />
      <TextInput
        style={styles.todoInput}
        value={amount}
        keyboardType="numeric"
        placeholder="Enter the amount you made in $"
        onChangeText={text => setAmount(text)}
      />
      <Button
        disabled={!amount && !description}
        onPress={addGig} title="ADD GIG"></Button>
      {gigs.map(gig => (
        <View>
          <Text>{gig.description}</Text>
          <Text>{gig.amount}</Text>
        </View>
      ))}


      {/* <Button title="Add Todo" onPress={addTodo}></Button> */}
    </SafeAreaView>
  );
}




const styles = StyleSheet.create({
  container: {
    marginTop: 70,
  },
  todoInput: {
    margin: 20,
    height: 40,
    borderColor: "red",
    borderWidth: 1
  },
  firstLabel: {
    backgroundColor: "red",
    fontSize: 30,
    fontWeight: "bold"
  },

})





// SafeAreaView stops views from going intothe boundaries of phone resolutions