import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text
} from 'react-native';
import Button from './src/components/Button';
import Display from './src/components/Display'

const initialState = {
  displayValue: '0',
  operation: null,
  values: [0,0],
  clearDisplay: false,
  current: 0 // 0 ou 1, indice de values
}

export default class App extends Component {
  state = {...initialState}

  addDigit = n => {
    // console.debug(typeof this.state.displayValue)
    
    const clearD = this.state.displayValue === '0'
    || this.state.clearDisplay

    if(n==='.' && !clearD && this.state.displayValue.includes('.')){
      return
    }

    const currentValue = clearD ? '' : this.state.displayValue //true = '' OU será igual ao displayValue quando for digitado 'n'
    const displayValue = currentValue + n //'' + n
    this.setState({displayValue, clearDisplay:false})

    if(n !== '.'){
      const newValue = parseFloat(displayValue).toFixed(6)
      const values = [...this.state.values] //recebe os elementos de values
      values[this.state.current] /*indice*/ = newValue
      this.setState({values})
    }
  }

  clearMemory = () => {
    this.setState({...initialState})
  }

  setOperation = operation => {
    if(this.state.current === 0){
      this.setState({operation, current: 1, clearDisplay: true})
    }else{
      const equals = operation === '=' //true ou false
      const values = [...this.state.values] //copia de values de state
      try{
        values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]}`) //passado o valor da soma para values[0]
      }
      catch(e){
        values[0] = this.state.values[0]
      }

      values[1] = 0 //zerado para reutilizar pois o valor total ja esta em values[0] (linha 56)
      this.setState({
        displayValue: `${values[0]}`,
        operation: equals ? null : operation, //caso o igual for pressionado a sequencia de operações é zerada
        current: equals ? 0 : 1, //caso pressionado igual o valor resultante em values[0] das operações será reescrito para as proximas operações
        clearDisplay: true,
        values
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Display value={this.state.displayValue}/>
        <View style={styles.buttons}>
          <Button label="AC" triple onClick={this.clearMemory}/>
          <Button label="/" operation onClick={this.setOperation}/>
          <Button label="7" onClick={this.addDigit}/>
          <Button label="8" onClick={this.addDigit}/>
          <Button label="9" onClick={this.addDigit}/>
          <Button label="*" operation onClick={this.setOperation}/>
          <Button label="4" onClick={this.addDigit}/>
          <Button label="5" onClick={this.addDigit}/>
          <Button label="6" onClick={this.addDigit}/>
          <Button label="-" operation onClick={this.setOperation}/>
          <Button label="1" onClick={this.addDigit}/>
          <Button label="2" onClick={this.addDigit}/>
          <Button label="3" onClick={this.addDigit}/>
          <Button label="+" operation onClick={this.setOperation}/>
          <Button label="0" double onClick={this.addDigit}/>
          <Button label="." onClick={this.addDigit}/>
          <Button label="=" operation onClick={this.setOperation}/>      
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#000'
  },
});
