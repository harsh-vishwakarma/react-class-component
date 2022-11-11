import React, { Component } from 'react'

export class Profile extends Component {
  render() {
    let { firstName, lastName, email, avatar } = this.props;
    return (
      <div className="card mb-3" style={{maxWidth: "540px"}}>
        <div className="row g-0">
          <div className="col-md-4">
            <img src={avatar} className="img-fluid rounded-start" alt="..."/>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{firstName} {lastName}</h5>
              <p className="card-text">Description...</p>
              {/* <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p> */}
              <h6 className="card-title">{email}</h6>
            </div>
          </div>
        </div>
    </div>
    )
  }
}

export default Profile