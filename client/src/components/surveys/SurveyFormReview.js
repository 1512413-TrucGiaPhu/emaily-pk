import _ from 'lodash'
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom'; // pass history object to other components in app that don't know about react router
import * as actions from '../../actions'


const SurveryFormReview = ({ onCancel, formValues, submitSurvey, history }) => {

  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>
          {formValues[name]}
        </div>
      </div>
    );
  });

  return (
    <div>
      <h5> Please confirm your entries</h5>
      {reviewFields}
      <button
        className="yellow darken-3 white-text btn-flat"
        onClick={onCancel}
      >
        Back
      </button>
      <button 
        onClick={() => submitSurvey(formValues, history)} // action creator 
        className="green btn-flat right white-text"
        >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    formValues: state.form.surveyForm.values
  };
}
// use connect to pull values out of redux store
export default connect(mapStateToProps, actions)(withRouter(SurveryFormReview));