import React, { Component } from "react";
import { connect } from "react-redux";
import TableUser from './TableUser'
import { clearDataUser, getUsersList } from "actions";

class ListUsers extends Component {
  componentDidMount() {
    // Untuk menginject data dari API ke user
    this.props.dispatch(getUsersList());
    this.props.dispatch(clearDataUser());
  }

  render() {
    return (
      <div>
        <TableUser />
      </div>
    );
  }
    
}

export default connect()(ListUsers);
