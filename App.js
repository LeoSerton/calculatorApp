import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';


const screenWidth = Dimensions.get('window').width;
const buttonWidthProportion = 0.2;


export default function App() {

  const [textValue, setTextValue] = useState('0');
  const [answerValue, setAnswerValue] = useState('0');
  const [readyToReplace, setReadyToReplace] = useState(true);
  const [memoryValue, setMemoryValue] = useState(null);
  const [operatorValue, setOperatorValue] = useState(null);
  const [equation, setEquation] = useState('');
 

  const updateTextValue = (value) => 
  {
    setTextValue (value);
    setAnswerValue (value);
  };

  const handlerNumber = (value) => 
  {
    if (readyToReplace)
    {
      setReadyToReplace(false);
      return value;
    }
    else
    {
      return answerValue + value;
    }
  };
  
  // Function that handles buttons pressed
  const buttonPressed = (value) => 
  {
    if (value === 'AC')
    // clear button pressed
    {
      setEquation ('');
      setAnswerValue ('0');
      setMemoryValue (null);
      setOperatorValue (null);
      setReadyToReplace (true);
      updateTextValue ('0');
    }
    else if (!isNaN(value))
    {
      const newValue = handlerNumber(value);
      updateTextValue (newValue);
      setAnswerValue (newValue);
      // Alert.alert('Button Pressed', 'Button: ' + newValue); ----- Dummy Alert
    }
    else if (['+', '-', 'x', '/'].includes(value))
    // Operator button is pressed
    {
      if (operatorValue !== null)
      {
        const result = calculateEquals();
        setAnswerValue (result);
        setMemoryValue(result);
      }

      setMemoryValue (answerValue);
      setReadyToReplace (true);
      setOperatorValue (value);

    }
    else if (value === '=')
    // equals button is pressed
    {
      const result = calculateEquals();
      updateTextValue (result);
      setAnswerValue (result);
      setMemoryValue (0);
      setReadyToReplace (true);
      // Alert.alert('Button Pressed', 'Button: ' + value); ----- Dummy Alert
    }
    else if (value === '+/-') 
    {
      // +/- button pressed
      const newValue = (parseFloat(answerValue) * -1).toString();
      updateTextValue (newValue);
      setAnswerValue (newValue);
      // Alert.alert('Button Pressed', 'Button: ' + value); ----- Dummy Alert
    } 
    else if (value === '%') 
    {
      // % button pressed
      const newValue = (parseFloat(answerValue) * 0.01).toString();
      updateTextValue (newValue);
      setAnswerValue (newValue);
      // Alert.alert('Button Pressed', 'Button: ' + value); ----- Dummy Alert
    }
    else if (value === ',') 
    {
      // , button pressed
      if (!answerValue.includes(',')) 
      {
        const newValue = answerValue + '.';
        updateTextValue(newValue);
        setAnswerValue(newValue);
      }
    }
    else
    {
      setEquation((prevEquation) => {
        const newEquation = prevEquation + value;
        console.log('Equation:', newEquation); // Add this line
        return newEquation;
      });
    }

  };

  const calculateEquals = () =>
  {
    const previous = parseFloat(memoryValue);
    const current = parseFloat(answerValue);

    let calculatedResult;
    let currentEquation;

    switch (operatorValue)
    {
      case '+':
        calculatedResult = previous + current;
        currentEquation = `${previous} + ${current}`;
        break;
      case '-':
        setEquation(`${equation} - ${current}`);
        return previous - current;
      case 'x':
        setEquation(`${equation} x ${current}`);
        return previous * current;
      case '/':
        setEquation(`${equation} / ${current}`);
        return previous / current;
      default:
        calculatedResult = current;
        currentEquation = current.toString();      
    }

    setEquation('');
    return calculatedResult;
  };

  

  return (
    <SafeAreaView style={styles.container}>

      <StatusBar style="light" />

      <View style = {styles.main}>
        <Text style={styles.equationText}>{equation}</Text>
        <Text style = {styles.text}>{textValue}</Text>

        {/* Row 1 */}
        <View style = {styles.row}>
          <TouchableOpacity 
            style = 
            {[
              styles.lightGreyButton,
              {
                width: screenWidth * buttonWidthProportion,
                height: screenWidth * buttonWidthProportion,
                borderRadius: (screenWidth * buttonWidthProportion) / 2,
              }
            ]}
            onPress={() => buttonPressed('AC')}>
            <Text style = {styles.lightGreyButtonText}>
              {memoryValue !== null || operatorValue !== null ? 'AC' : '  C'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style = 
            {[
              styles.lightGreyButton,
              {
                width: screenWidth * buttonWidthProportion,
                height: screenWidth * buttonWidthProportion,
                borderRadius: (screenWidth * buttonWidthProportion) / 2,
              }
            ]}
            onPress={() => buttonPressed('+/-')}>
            <Text style = {styles.lightGreyButtonText}>+/-</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style = 
            {[
              styles.lightGreyButton,
              {
                width: screenWidth * buttonWidthProportion,
                height: screenWidth * buttonWidthProportion,
                borderRadius: (screenWidth * buttonWidthProportion) / 2,
              }
            ]}
            onPress={() => buttonPressed('%')}>
            <Text style = {styles.lightGreyButtonText}> %</Text>
          </TouchableOpacity>

          {/* orange background */}
          <TouchableOpacity 
            style = 
            {[
              styles.orangeButton,
              {
                width: screenWidth * buttonWidthProportion,
                height: screenWidth * buttonWidthProportion,
                borderRadius: (screenWidth * buttonWidthProportion) / 2,
              }
            ]}
            onPress={() => buttonPressed('/')}>
            <Text style = 
            {[
              styles.buttontext,
               {
                color: 'white',
                fontSize: 40,
               }
            ]}>   /</Text>
          </TouchableOpacity>  
        </View>

        {/* Row 2 */}
        <View style = {styles.row}>
          <TouchableOpacity 
            style = 
            {[
              styles.darkGreyButton,
              {
                width: screenWidth * buttonWidthProportion,
                height: screenWidth * buttonWidthProportion,
                borderRadius: (screenWidth * buttonWidthProportion) / 2,
              }
            ]}
            onPress={() => buttonPressed('7')}>
            <Text style = {styles.buttonText}>  7</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style = 
            {[
              styles.darkGreyButton,
              {
                width: screenWidth * buttonWidthProportion,
                height: screenWidth * buttonWidthProportion,
                borderRadius: (screenWidth * buttonWidthProportion) / 2,
              }
            ]}
            onPress={() => buttonPressed('8')}>
            <Text style = {styles.buttonText}>  8</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style = 
            {[
              styles.darkGreyButton,
              {
                width: screenWidth * buttonWidthProportion,
                height: screenWidth * buttonWidthProportion,
                borderRadius: (screenWidth * buttonWidthProportion) / 2,
              }
            ]}
            onPress={() => buttonPressed('9')}>
            <Text style = {styles.buttonText}>  9</Text>
          </TouchableOpacity>

          {/* orange background */}
          <TouchableOpacity 
            style = 
            {[
              styles.orangeButton,
              {
                width: screenWidth * buttonWidthProportion,
                height: screenWidth * buttonWidthProportion,
                borderRadius: (screenWidth * buttonWidthProportion) / 2,
              }
            ]}
            onPress={() => buttonPressed('x')}>
            <Text style = 
            {[
              styles.buttontext,
               {
                color: 'white',
               fontSize: 40
               }
            ]}>  x</Text>
          </TouchableOpacity>   
        </View>

        {/* Row 3 */}
        <View style = {styles.row}>
          <TouchableOpacity 
            style = 
            {[
              styles.darkGreyButton,
              {
                width: screenWidth * buttonWidthProportion,
                height: screenWidth * buttonWidthProportion,
                borderRadius: (screenWidth * buttonWidthProportion) / 2,
              }
            ]}
            onPress={() => buttonPressed('4')}>
            <Text style = {styles.buttonText}>  4</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style = 
            {[
              styles.darkGreyButton,
              {
                width: screenWidth * buttonWidthProportion,
                height: screenWidth * buttonWidthProportion,
                borderRadius: (screenWidth * buttonWidthProportion) / 2,
              }
            ]}
            onPress={() => buttonPressed('5')}>
            <Text style = {styles.buttonText}>  5</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style = 
            {[
              styles.darkGreyButton,
              {
                width: screenWidth * buttonWidthProportion,
                height: screenWidth * buttonWidthProportion,
                borderRadius: (screenWidth * buttonWidthProportion) / 2,
              }
            ]}
            onPress={() => buttonPressed('6')}>
            <Text style = {styles.buttonText}>  6</Text>
          </TouchableOpacity>

          {/* orange background */}
          <TouchableOpacity 
            style = 
            {[
              styles.orangeButton,
              {
                width: screenWidth * buttonWidthProportion,
                height: screenWidth * buttonWidthProportion,
                borderRadius: (screenWidth * buttonWidthProportion) / 2,
              }
            ]}
            onPress={() => buttonPressed('-')}>
            <Text style = 
            {[
              styles.buttontext,
               {
                color: 'white',
               fontSize: 40
               }
            ]}>  -</Text>
          </TouchableOpacity>   
        </View>

        {/* Row 4 */}
        <View style = {styles.row}>
          <TouchableOpacity 
            style = 
            {[
              styles.darkGreyButton,
              {
                width: screenWidth * buttonWidthProportion,
                height: screenWidth * buttonWidthProportion,
                borderRadius: (screenWidth * buttonWidthProportion) / 2,
              }
            ]}
            onPress={() => buttonPressed('1')}>
            <Text style = {styles.buttonText}>  1</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style = 
            {[
              styles.darkGreyButton,
              {
                width: screenWidth * buttonWidthProportion,
                height: screenWidth * buttonWidthProportion,
                borderRadius: (screenWidth * buttonWidthProportion) / 2,
              }
            ]}
            onPress={() => buttonPressed('2')}>
            <Text style = {styles.buttonText}>  2</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style = 
            {[
              styles.darkGreyButton,
              {
                width: screenWidth * buttonWidthProportion,
                height: screenWidth * buttonWidthProportion,
                borderRadius: (screenWidth * buttonWidthProportion) / 2,
              }
            ]}
            onPress={() => buttonPressed('3')}>
            <Text style = {styles.buttonText}>  3</Text>
          </TouchableOpacity>

          {/* orange background */}
          <TouchableOpacity 
            style = 
            {[
              styles.orangeButton,
              {
                width: screenWidth * buttonWidthProportion,
                height: screenWidth * buttonWidthProportion,
                borderRadius: (screenWidth * buttonWidthProportion) / 2,
              }
            ]}
            onPress={() => buttonPressed('+')}>
            <Text style = 
            {[
              styles.buttontext,
               {
                color: 'white',
               fontSize: 40
               }
            ]}>  +</Text>
          </TouchableOpacity>  
        </View>

        {/* Row 5 */}
        <View style = {styles.row}>
          <TouchableOpacity style = 
          {[
            styles.darkGreyButton,
            {
              width: screenWidth * buttonWidthProportion * 2,
              borderRadius: (screenWidth * buttonWidthProportion * 3) / 2,
            }
          ]} onPress = {() => buttonPressed('0')}>
            <Text style = {styles.buttonText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style = 
            {[
              styles.darkGreyButton,
              {
                width: screenWidth * buttonWidthProportion,
                height: screenWidth * buttonWidthProportion,
                borderRadius: (screenWidth * buttonWidthProportion) / 2,
              }
            ]}
            onPress={() => buttonPressed(',')}>
            <Text style = {styles.buttonText}>  ,</Text>
          </TouchableOpacity>

          {/* orange background */}
          <TouchableOpacity 
            style = 
            {[
              styles.orangeButton,
              {
                width: screenWidth * buttonWidthProportion,
                height: screenWidth * buttonWidthProportion,
                borderRadius: (screenWidth * buttonWidthProportion) / 2,
              }
            ]}
            onPress={() => buttonPressed('=')}>
            <Text style = 
            {[
              styles.buttontext,
               {
                color: 'white',
               fontSize: 40
               }
            ]}>  =</Text>
          </TouchableOpacity>   
        </View>

        {/* Results field */}
        <Text style = {styles.resultsText}>{answerValue}</Text>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: 
  {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  main: 
  {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  text: 
  {
    fontSize: 70,
    color: 'white',
    margin: 10,
    textAlign: 'right',
  },

  row:
  {
    flexDirection: "row",
    justifyContent: 'center',
    marginTop: 10,
  },

  lightGreyButton:
  {
    backgroundColor: 'lightgrey',
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 50,
  },

  lightGreyButtonText:
  {
    fontSize: 40,
    color: 'black',
  },

  darkGreyButton:
  {
    backgroundColor: '#505050',
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 50,
  },

  orangeButton:
  {
    backgroundColor: 'orange',
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 50,
  },

  buttonText:
  {
    color: 'white',
    fontSize: 40,
  },

  equationText: 
  {
    fontSize: 25,
    color: 'white',
    margin: 5,
    textAlign: 'right',
  },
  

});
