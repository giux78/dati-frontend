import React, { Component } from 'react';
import NewDsForm from '../components/IngestionForm/index.js'
import DataInputForm from '../components/IngestionForm/data_form.js'

const data_dcatap = DataInputForm.getDcatap()
const data_dataschema = DataInputForm.getDataschema()
const data_dataschema_field = DataInputForm.getDataschemaField()
const data_dataschema_field_metadata = DataInputForm.getDataschemaFieldMetadata()
const data_operational = DataInputForm.getOperational()

class IngestionForm extends Component {
  render() {
    return (
    <div>
    <NewDsForm dcatap={data_dcatap} dataschema={data_dataschema} operational={data_operational} />
    </div>
    );
  }
}

export default IngestionForm;
