import React from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import renderField from './renderField'

const WizardFormFirstPage = props => {
  const { handleSubmit } = props
  return (
    <form className="Form Form--spaced u-padding-all-xl u-text-r-xs" onSubmit={handleSubmit}>
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
        name="description"
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
        name="editor"
        type="text"
        component={renderField}
        label="Editor"
      />
      <Field
        name="ipa"
        type="text"
        component={renderField}
        label="Ipa/Iva"
      />
      <Field
        name="mdate"
        type="text"
        component={renderField}
        label="Modification Date"
      />
      <Field
        name="rightsHolder"
        type="text"
        component={renderField}
        label="Rights Holder"
      />
      <Field
        name="ripa"
        type="text"
        component={renderField}
        label="R. Ipa/Iva"
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
