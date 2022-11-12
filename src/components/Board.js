import React, { Component } from 'react'
import Profile from './Profile'

export class Board extends Component {
    constructor(){
        super()
        this.state = {
            profiles : [],
            loading : false,
            page : 1
        }
    }

    async fetchProfile(pageNo, pageSize){
        let url = `https://reqres.in/api/users?page=${pageNo}&per_page=${pageSize}`;
        let response = await fetch(url);
        let { page, per_page, total, total_pages, data } = await response.json();
        console.log(`page: ${page}, per_page: ${per_page}, total: ${total}, total_pages: ${total_pages}, data: ${JSON.stringify(data)} `);
        return { page, per_page, total, total_pages, data }
    }

    async componentDidMount(){
        let { total, total_pages, data } = await this.fetchProfile(this.state.page, this.props.pageSize);
        this.setState({
            profiles : data,
            totalProfiles : total,
            totalPages : total_pages
        });
    }
    async componentDidUpdate(prevProps){
        if(this.props.pageSize !== prevProps.pageSize){
            let { total, total_pages, data } = await this.fetchProfile(1, this.props.pageSize);
            this.setState({
                page: 1,
                profiles : data,
                totalProfiles : total,
                totalPages : total_pages
            });
        }
    }

    handleNextClick = async ()=>{
        if( this.state.page + 1 <= this.state.totalPages) {
            let url = `https://reqres.in/api/users?page=${this.state.page + 1}&per_page=${this.props.pageSize}`;
            let response = await fetch(url);
            let { page, per_page, total, total_pages, data } = await response.json();
            console.log(`page: ${page}, per_page: ${per_page}, total: ${total}, total_pages: ${total_pages}, data: ${JSON.stringify(data)} `);
            this.setState({ 
                profiles : data,
                page : this.state.page + 1,
                totalProfiles : total,
                totalPages : total_pages
            });
        }
    }

    handlePrevClick = async ()=>{
        if(this.state.page > 1) {
            let url = `https://reqres.in/api/users?page=${this.state.page - 1}&per_page=${this.props.pageSize}`;
            let response = await fetch(url);
            let { page, per_page, total, total_pages, data } = await response.json();
            console.log(`page: ${page}, per_page: ${per_page}, total: ${total}, total_pages: ${total_pages}, data: ${JSON.stringify(data)} `);
            this.setState({ 
                profiles : data,
                page : this.state.page - 1,
                totalProfiles : total,
                totalPages : total_pages
            });
        }
    }

    render() {
        return (
            <div className='container my-3'>
                <h2>Contacts</h2>
                <div className='row my-3'>
                    { this.state.profiles.map((profile) => {
                        return <div className='col-md-4' key={profile.id}> 
                            <Profile firstName={profile.first_name} lastName={profile.last_name} email={profile.email} avatar={profile.avatar}/>
                        </div>
                    })
                    }
                </div>
                
                <div className="container d-flex justify-content-end mb-2">
                    Showing {this.state.page <= 1 ? 1 : ((this.state.page - 1) * this.props.pageSize) + 1 }
                    &nbsp;to {this.state.page < this.state.totalPages ? this.state.page * this.props.pageSize : this.state.totalProfiles }
                    &nbsp;of {this.state.totalProfiles}
                    &nbsp; ( Page {this.state.page} of {this.state.totalPages} )
                </div>
                <div className='container d-flex justify-content-end mb-2'>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            Page Size
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            { this.props.pageSizeList.map((element) => {
                                return <li key={element}><a className="dropdown-item" href="/" onClick={this.props.switchPageSize} >{element}</a></li>
                            })
                            }
                            {/* <li><a className="dropdown-item active" href="/" onClick={this.props.switchPageSize}>{this.props.pageSizeList}</a></li>
                            <li><a className="dropdown-item" href="/" onClick={this.props.switchPageSize}>18</a></li>
                            <li><a className="dropdown-item" href="/" onClick={this.props.switchPageSize}>60</a></li> */}
                        </ul>
                    </div>
                    <button disabled={this.state.page <= 1 } type="button" className="btn btn-dark ms-2" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > this.state.totalPages} type="button" className="btn btn-dark ms-2" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
                <div className="container d-flex justify-content-end mb-2">
                    <strong> Yes server side pagination!</strong>
                </div>

            </div>
        )
    }
}

export default Board