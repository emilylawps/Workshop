import _ from 'lodash';
import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import PlanningsForm from './PlanningsForm';
import {planningsUpdate, planningsSave, planningsDelete } from './../actions';
const moment = require('moment')
const dismissKeyboard = require('dismissKeyboard')
import Header from './../components/Header';
import Button from './../components/Button';
import ConfirmDelete from './../components/ConfirmDelete';
// import { Card, CardSection } from './../components';

class PlanningsEdit extends Component {
  state = {error:'', showModal: false};

  componentWillMount() {
    _.each(this.props.planning, (value, prop) => {
      this.props.planningsUpdate({ prop, value });
    });
  }

  onButtonPress() {
    const { date, category, amount, notes, month } = this.props;

    if (date == null) {
        this.setState({ error: 'Select a date' });
    }
    else if (amount === ''|| amount <= 0) {
        this.setState({ error: 'Enter a valid amount' });
    }
    else {
      this.setState({error: ''});
      selectedFullDate = new moment(date, "DD/MM/YYYY")
      selectedDate = moment(selectedFullDate).format("DD/MM/YYYY")
      selectedMonth = moment(selectedFullDate).format('MMMM YYYY')
      console.log(selectedMonth)
      
      this.props.planningsSave({
        date: selectedDate,
        category: category || 'General',
        amount,
        notes,
        month: selectedMonth,
        uid: this.props.planning.uid
      });
    }
  }

  onAccept() {
    const {uid} = this.props.planning;

    this.props.planningsDelete({ uid });
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  render() {
    const {container, mainContainer, errorText} = styles;

    return (
      <TouchableWithoutFeedback onPress={()=>dismissKeyboard()}>
        <View style={container}>
          <Header Name={'Edit Plans'} />

          <View style={mainContainer}>
            <PlanningsForm />
            <Text style={errorText}>
              {this.state.error}
            </Text>
            <Button onPress={this.onButtonPress.bind(this)}>
              Save Changes
            </Button>

            <Button onPress={() => this.setState({showModal: !this.state.showModal})}>
              Delete
            </Button>

            <ConfirmDelete
              visible={this.state.showModal}
              onAccept={this.onAccept.bind(this)}
              onDecline={this.onDecline.bind(this)}
            >
              Are you sure you want to delete this record?
            </ConfirmDelete>

          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  container: {
    flex: 1
  },

  errorText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'red',
    paddingTop: 5,
  },

  mainContainer: {
    flex: 12,
    backgroundColor: 'beige',
    padding: 10
  }
};

const mapStateToProps = (state) => {
  const { date, category, amount, notes, month } = state.addPlannings;

  return { date, category, amount, notes, month };
};

export default connect (mapStateToProps, {
  planningsUpdate, planningsSave, planningsDelete
})(PlanningsEdit);
