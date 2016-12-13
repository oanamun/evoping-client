import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class AddMemberContainer extends Component { // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {
      values: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(elms) {
    this.setState({ values: elms });
  }

  render() {
    const isMulti = true;
    const options = [
      { value: 'one', label: 'One' },
      { value: 'two', label: 'Two1' },
      { value: 'three', label: 'Three' },
      { value: 'four', label: 'Four' },
      { value: 'five', label: 'Two4' },
      { value: 'six', label: 'Two5' },
      { value: 'seven', label: 'Seven' },
      { value: 'eight', label: 'Eight' },
    ];
    return (
      <Select
        className="members-select"
        name="form-field-name"
        multi={isMulti}
        options={options}
        onChange={this.handleChange}
        value={this.state.values}
        placeholder={'Select members'}
      />
    );
  }
}

export default AddMemberContainer;
