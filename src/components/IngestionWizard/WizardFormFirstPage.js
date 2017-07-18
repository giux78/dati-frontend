import React from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import renderField from './renderField'

const WizardFormFirstPage = props => {
  const { handleSubmit } = props
  return (
    <form className="form-horizontal" onSubmit={handleSubmit}>
      <Field
        name="title"
        type="text"
        component={renderField}
        label="Title"
      />
      <Field
        name="identifier"
        type="text"
        component={renderField}
        label="Identifier"
      />
      <Field
        name="notes"
        type="text"
        component={renderField}
        label="Description"
      />
      <Field
        name="theme"
        type="text"
        component={renderField}
        label="Themes"
      />
      <Field
        name="publisher_editor"
        type="text"
        component={renderField}
        label="Editor"
      />
      <Field
        name="publisher_identifier"
        type="text"
        component={renderField}
        label="Ipa/Iva"
      />
      <Field
        name="creation_date"
        type="text"
        component={renderField}
        label="Modification Date"
      />
      <Field
        name="holder_name"
        type="text"
        component={renderField}
        label="Rights Holder"
      />
      <Field
        name="holder_identifier"
        type="text"
        component={renderField}
        label="R. Ipa/Iva"
      />
      <Field
        name="license_title"
        type="text"
        component={renderField}
        label="License"
      />
      <Field
        name="license_id"
        type="text"
        component={renderField}
        label="License ID"
      />
      <Field
        name="owner_org"
        type="text"
        component={renderField}
        label="Organization"
      />
      <div>
        <button type="submit" className="next">Next</button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(WizardFormFirstPage)
