import React, { Component } from 'react'
import Profile from './Profile'

export class Board extends Component {
    constructor(){
        super()
        this.state = {
            profiles : [],
            loading : false
        }
    }

    async componentDidMount(){
        let url = "https://reqres.in/api/users?page=2";
        let response = await fetch(url);
        let { page, per_page, total, total_pages, data } = await response.json();
        console.log(`page: ${page}, per_page: ${per_page}, total: ${total}, total_pages: ${total_pages}, data: ${JSON.stringify(data)} `);
        this.setState({ profiles : data });
    }

    render() {
        return (
            <div className='container my-3'>
            <div className='row'>
                { this.state.profiles.map((profile) => {
                    return <div className='col-md-4' key={profile.id}> 
                        <Profile firstName={profile.first_name} lastName={profile.last_name} email={profile.email} avatar={profile.avatar}/>
                    </div>
                })
                }
            </div>

            </div>
        )
    }
}

export default Board