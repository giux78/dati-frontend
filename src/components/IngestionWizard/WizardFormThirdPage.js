import React from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from './validate';


const colors = ['Yes'];
const tipo_lettura = ['Time Series']

const renderTipoLettura = ({ input, meta: { touched, error } }) => (
  <div>
    <select {...input}>
      <option value="Ultimo Aggiornamento">Ultimo Aggiornamento</option>
      {tipo_lettura.map(val => <option value={val} key={val}>{val}</option>)}
    </select>
    {touched && error && <span>{error}</span>}
  </div>
);

const renderColorSelector = ({ input, meta: { touched, error } }) => (
  <div>
    <select {...input}>
      <option value="No">No</option>
      {colors.map(val => <option value={val} key={val}>{val}</option>)}
    </select>
    {touched && error && <span>{error}</span>}
  </div>
);

const WizardFormThirdPage = props => {
  const { handleSubmit, pristine, previousPage, submitting } = props;
  return (
    <form className="from-horizontal" onSubmit={handleSubmit}>

      <div>
        <label htmlFor="uri">Dataset Uri</label>
        <div>
          <Field
            name="uri"
            id="uri"
            component="input"
            type="text"
          />
        </div>
      </div>
        <div>
        <label>Ownership</label>
        <div>
          <Field name="ownership" component="input" type="text" placeholder="ownership" />
        </div>
        <div>
        <label>Definisce uno standard?</label>
        <Field name="standard" component={renderColorSelector} />
      </div>
        <div>
        <label>Uri Standard Associato</label>
        <div>
          <Field name="uri_associato" component="input" type="text" placeholder="uri associato" />
        </div>
      </div>
      </div>
              <div>
        <label>Tipo Lettura del dataset</label>
        <Field name="standard" component={renderTipoLettura} />
      </div>
      <div>
        <button type="button" className="previous" onClick={previousPage}>
          Previous
        </button>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
      </div>
    </form>
  );
};
export default reduxForm({
  form: 'wizard', //                 <------ same form name
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
})(WizardFormThirdPage);
