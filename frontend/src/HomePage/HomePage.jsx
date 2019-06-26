import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { MyModal } from '../_components'
import { userActions } from '../_actions';
class HomePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }
    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }
    show_update_modal(user) {
        this.props.dispatch(userActions.showModal(user));
    }
    render() {
        const { user, users} = this.props;
        return (
            <div className="col-md-9 col-md-offset-3">
                <h1>Hi {user.firstName}!</h1>
                <p>You're logged in with React & Basic HTTP Authentication!!</p>
                <h3>Users from secure api end point:</h3>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR:{users.error}</span>}
                {users.items &&
                    <ul>
                        {users.items.map((user, index) =>
                            <li key={user.id}>
                                {user.firstName + ' ' + user.lastName + ' - '}
                                <button onClick={()=> this.show_update_modal(user)}>
                                        Edit
                                </button>
                                {
                                    user.deleting ? <em>Deleting ...</em>
                                    : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                    :<span><button onClick = {this.handleDeleteUser(user.id)}>Delete</button></span>
                                }
                            </li>
                        )}
                        <MyModal/>
                    </ul>
                }
                <p>
                    <Link to="/login">Logout</Link>
                </p>
                
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}
const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };