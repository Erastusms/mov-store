import React from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import swal from "sweetalert2";

const TableUser = (props) => {
  return (
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#add-modal"
        >
          <i class="fas fa-plus"></i>
        </button>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table
            class="table table-bordered"
            id="dataTable"
            width="100%"
            cellspacing="0"
          >
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Birthdate</th>
                <th>Gender</th>
                <th>Avatar</th>
                <th>Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {console.log(props.getUsersList[0].email)}
              {/* {users.map((user) => {
                return ( */}
              <tr>
                <td>No</td>
                <td>Name</td>
                <td>{props.getUsersList.email}</td>
                <td>Birtddate</td>
                <td>Gender</td>
                <td>Avatar</td>
                <td>Type</td>
                <td>
                  <form action="/admin/list-users" method="POST">
                    <button
                      type="submit"
                      class="btn btn-danger btn-circle btn-sm"
                    >
                      <i class="fas fa-trash"></i>
                    </button>
                  </form>
                </td>
              </tr>
               {/* );
              })} */}
              {/* <td>1</td>
                      <td>Eras</td>
                      <td>you</td>
                      <td>birthdate</td>
                      <td>male</td>
                      <td>
                        gambar
                        <img
                      src="http://localhost:3000/images/avatars/<%= users[i].avatar %>"
                      alt="avatar"
                      width="70px"
                    />
                      </td>
                      <td>type</td>
                       */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    getUsersList: state.users.getUsersList,
    errorUsersList: state.users.errorUsersList,
  };
};

export default connect(mapStateToProps, null)(TableUser);
