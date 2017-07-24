import React, { Component } from 'react'
import Autosuggest from 'react-autosuggest';

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// filterType is the variable that set the right filter depends on input data
//  1 - dataset
//  2 - ontologies
function getSuggestions(value, categories, filterType) {
  const escapedValue = escapeRegexCharacters(value.trim());
  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');
  switch (filterType){
    case '1':  return categories.filter(category => regex.test(category.name));
    case '2':  return ontologiesFilter(categories, regex);
    default: return categories
  }
  
}

function ontologiesFilter(categories, regex){
      var res = [];
      categories.forEach(function(entry) {
              //console.log('entry: ' + entry['http://www.w3.org/2000/01/rdf-schema#label']);
              var obj = entry['http://www.w3.org/2000/01/rdf-schema#label'];
              obj.forEach(function(lang) {
                //console.log('lang: ' + lang['xml:lang']);
                if(lang['xml:lang'] == 'it'){
                  //console.log('lang1: ' + lang['value']);
                  if(regex.test(lang['value'])){
                      //console.log('lang2: ' + lang['value']);
                      entry.name = lang['value'];
                      res.push(entry);
                  }
                }
              })
            });
      return res; 
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
      suggestions: getSuggestions(value, this.props.categories, this.props.filterType)
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

export default Autocomplete

