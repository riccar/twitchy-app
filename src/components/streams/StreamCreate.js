import React from 'react';
import { Field, reduxForm } from 'redux-form';
import './fields.css';

const renderError = ({ touched, error }) => {
  if (touched && error) {
    return (
      <div className="ui error message">
        <div >{error}</div>
      </div>
    );
  }
}
//By telling redux-form field how to render every field and assign properties like
//onChange and value, it passes these values to the form piece of state created in redux
//within the formProps.input which is destructing into {input}
const renderInput = ({ input, label, meta }) => {
  const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
  //the {...variable.attribute} automatically passes all the sub attributes of the input attributes
  //and set their name as the same name of the input attributes found.
  return (
    <div className={className}>
      <div className="header"><label>{label} </label>{renderError(meta)}</div>
      <input {...input} autoComplete="off"/>
      
    </div>
  );
}

//Redux form handleSubmit is a function that takes care of the 
//event.preventDefault() and executes any function we pass as parameter. 
//In turn this callback function receives all the field values as a parameter
const onSubmit = formValues => {
  console.log(formValues);
}

const StreamCreate = (props) => {
 
  return (
    <form onSubmit={props.handleSubmit(onSubmit)} className="ui form error">
      <Field name="title" component={renderInput} label="Enter name"/>
      <Field name="description" component={renderInput} label="Enter description"/>
      <button type="submit">submit</button>
    </form>
  );
};

/**
 * @param {*} formValues: Values of every field of the form
 * Returns an error object with all the fields in error or 
 * an empty object if no error is found.
 * Redux form matches every field name with name of the attributes of the errors object
 * and applies the validation to every match.
 * The error message is passed to the formProps for every field so it can be printed in the UI
 * Finally, this validation runs every time the form is rendered on the screen and when the user
 * interacts with the form (blur, focus, type, etc)
 */
const validate = formValues => {
  const errors = {}
  if (!formValues.title) {
    errors.title = 'You must enter a title'
  }

  if (!formValues.description) {
    errors.description = 'You must enter a description'
  }
  return errors;
}

//Redux form allows the connection between the forms and redux.
//It returns a function that is immediately called with StreamCreate component
//reduxForm receives a config object with the following values:
//form 'name of form' and validate, the function used to validate the fields. 
export default reduxForm({
  form: 'streamCreate',
  validate
})(StreamCreate);