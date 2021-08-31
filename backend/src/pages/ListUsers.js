import React, { Component } from "react";

// import { connect } from "react-redux";
import {TableUser} from "parts";
// import { clearDataUser, getUsersList } from "actions";
// import { fetchPage } from "store/actions/page";

export default class ListUsers extends Component {
  // constructor(props) {
  //   super(props);
  // }

  // componentDidMount() {
  //   // Untuk menginject data dari API ke user
  //   // const access_token = localStorage.getItem("access_token");
  //   // console.log(access_token);
  //   // this.props.dispatch(getUsersList());
  //   // this.props.dispatch(clearDataUser());

  //   if (!this.props.listUsers)
  //     this.props.fetchPage(
  //       `http://localhost:3000/admin/list-users`,
  //       "listUsers"
  //     );
  // }

  render() {
    // const { page } = this.props;

    // console.log(page);
    // console.log(page.listUsers);
    // console.log(page.listUsers.users);
    return (
      <div>
        <TableUser />
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     getUsersList: state.users.getUsersList,
//     errorUsersList: state.users.errorUsersList,
//   };
// };

// export default connect(mapStateToProps, null)(ListUsers);

// const mapStateToProps = (state) => ({
//   page: state.page,
// });

// export default connect(mapStateToProps, { fetchPage })(ListUsers);
