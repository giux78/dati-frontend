import React, { Component } from 'react'
import categories from '../../data/categories.js'
import Autosuggest from 'react-autosuggest';

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());
  
  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  return categories.filter(category => regex.test(category.name));
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
}

class Autocomplete extends Component {
  constructor(props) {
    super(props);
    console.log('selectValue: ' + this.props.querystring);
    if(this.props.querystring)
      this.state = {
      value: this.props.querystring,
      suggestions: []
    };    
    else
    this.state = {
      value: '',
      suggestions: []
    };    
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };
  
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Inserisci criteri di ricerca",
      value,
      onChange: this.onChange
    };

    return (
           <Autosuggest 
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps} />
 
    );
  }
}

//<input className="Form-input Form-input--ultraLean Grid-cell u-sizeFill u-text-r-s u-color-black u-text-r-xs u-borderHideFocus " required="" id="esplora" name="cerca" value="trasporti" />

export default Autocomplete

