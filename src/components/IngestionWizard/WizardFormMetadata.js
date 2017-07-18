import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import validate from './validate'
import {processInputFileMetadata} from './avroschema.js'

const calcDataFields = (fields) =>
     processInputFileMetadata((resData)=>{
        console.log(JSON.stringify(resData))
        resData.names.map((item, index) => {
           console.log(item)
           fields.push({nome : item, tipo : resData.props[index].type})
        }
        )
      })

const renderField = ({ input, label, type, value = '', meta: { touched, error } }) =>
  <div>
    <label>
      {label}
    </label>
    <div>
      <input {...input} type={type} placeholder={label} />
      {touched &&
        error &&
        <span>
          {error}
        </span>}
    </div>
  </div>

const renderHobbies = ({ fields, meta: { error } }) =>
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()}>
        Add Hobby
      </button>
    </li>
    {fields.map((hobby, index) =>
      <li key={index}>
        <button
          type="button"
          title="Remove Hobby"
          onClick={() => fields.remove(index)}
        />
        <Field
          name={hobby}
          type="text"
          component={renderField}
          label={`Hobby #${index + 1}`}
        />
      </li>
    )}
    {error &&
      <li className="error">
        {error}
      </li>}
  </ul>



const renderMembers = ({ fields, meta: { error, submitFailed } }) =>
  <ul>
    <li>
      <button type="button" onClick={() => fields.push({})}>
        Add Member
      </button>
      {submitFailed &&
        error &&
        <span>
          {error}
        </span>}
    </li>
    {fields.map((member, index) =>
      <li key={index}>
        <button
          type="button"
          title="Remove Member"
          onClick={() => fields.remove(index)}
        />
        <h4>
          Field #{index + 1}
        </h4>
        <Field
          name={`${member}.nome`}
          type="text"
          component={renderField}
          label="Nome Campo"
        />
        <Field
          name={`${member}.tipo`}
          type="text"
          component={renderField}
          label="Tipo"
        />
        <FieldArray name={`${member}.hobbies`} component={renderHobbies} />
      </li>
    )}
  </ul>


const addMetadataFromFile = ({ fields, meta: { error, submitFailed } }) =>   
 <ul>
     <li>
        <label htmlFor="ds_datafile">Add File</label>
            <input className="form-control" type="file" id="ds_datafile" accept=".csv, .txt, .json, .avro" />
            <input type="button" value="Calc Schema" onClick={() => calcDataFields(fields)}/>
        </li> 
    {fields.map((test, index) =>
      <li key={index}>
        <button
          type="button"
          title="Remove Member"

          onClick={() => fields.remove(index)}
        />
        <h4>
          Member #{index + 1}
        </h4>
        <Field
          name={`${test}.nome`}
          type="text"
          component={renderField}
          label="Nome Campo"
          value={`${test}.nome`}
        />
        <Field
          name={`${test}.tipo`}
          type="text"
          component={renderField}
          label="Tipo"
          value={`${test}.tipo`}
        />
      </li>
    )}
  </ul>


const WizardFormMetadata = props => {
  const { handleSubmit, previousPage, pristine, submitting, reset } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="namespace"
        type="text"
        component={renderField}
        label="namespace"
      />
      <FieldArray name="members" component={renderMembers} />
      <FieldArray name="tests" component={addMetadataFromFile}/>
      <div>
        <button type="submit" className="next">Next</button>
         <button type="button" className="previous" onClick={previousPage}>
          Previous
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>

    </form>
  )
}

export default reduxForm({
  form: 'wizard', //                 <------ same form name
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
})(WizardFormMetadata);