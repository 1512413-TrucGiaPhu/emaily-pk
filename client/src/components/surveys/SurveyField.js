// SurveyField contains logic to render a signle label and text input
import React from 'react';

// take props.input and assign it to input
export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div>
      {/* equals to onBlur={input.onBlur} onChange={input.onChange} */}
      <label>{label}</label>
      <input {...input} style={{ marginBottom: '5px' }} />
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error}
      </div>
    </div>
  )
}