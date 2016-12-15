import React, { Component,PropTypes } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const propTypes = {
  onSelect: PropTypes.func,
};

const defaultProps = {
  onSelect: () => {},
};

class AddMemberContainer extends Component { // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(selection) {
    this.setState({ user: selection });
    this.props.onSelect(selection ? selection.value : {});
  }

  render() {
    const users = [
      { value: { id: 1, email: 'user1@example.com' }, label: 'user1' },
      { value: { id: 2, email: 'user2@example.com' }, label: 'user2' },
      { value: { id: 3, email: 'user3@example.com' }, label: 'user3' },
      { value: { id: 4, email: 'user4@example.com' }, label: 'user4' },
      { value: { id: 5, email: 'user5@example.com' }, label: 'user5' },
      { value: { id: 6, email: 'user6@example.com' }, label: 'user6' },
      { value: { id: 7, email: 'user7@example.com' }, label: 'user7' },
    ];
    return (
      <Select
        className="members-select"
        name="form-field-name"
        options={users}
        onChange={this.handleChange}
        value={this.state.user}
        placeholder={'Select members'}
      />
    );
  }
}

AddMemberContainer.propTypes = propTypes;
AddMemberContainer.defaultProps = propTypes;

export default AddMemberContainer;
