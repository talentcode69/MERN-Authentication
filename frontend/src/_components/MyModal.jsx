import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import {connect} from 'react-redux';

import { userActions} from '../_actions';
class MyModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
          user: {
            id:'',
            firstName: '',
            lastName: '',
            username: '',
            password: ''
          },
          submitted:false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.onclose = this.onclose.bind(this);
        this.onSave = this.onSave.bind(this);
        this.oninit = this.oninit.bind(this);
    }
    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }
    onclose() {
      this.props.dispatch(userActions.closeModal());
    }
    onSave() {
        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.firstName && user.lastName && user.username && user.password) {
          this.props.dispatch(userActions.update(user));
        }
    }
    oninit() {
    
      const { user,showmodal} = this.props;
      user.password = '';
      if (showmodal) {
        this.setState({user: user});
      }
    }
    render() {
      console.log(this.props);
      const { updating,showmodal} = this.props;
      const { user, submitted } = this.state;

      return (
        <Modal
          show = {showmodal}
          onShow = {this.oninit}
          onHide = {this.onclose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Modal heading
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form name="form">
                    <div className={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={this.handleChange} />
                        {submitted && !user.firstName &&
                            <div className="help-block">First Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.lastName ? ' has-error' : '')}>
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" className="form-control" name="lastName" value={user.lastName} onChange={this.handleChange} />
                        {submitted && !user.lastName &&
                            <div className="help-block">Last Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={user.username} onChange={this.handleChange} />
                        {submitted && !user.username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                        {submitted && !user.password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.onHide}>
              Close
            </Button>
            <Button variant="primary" onClick={this.onSave}>
                {updating ? 'Updating...' : 'Save Changes'
                 }
            </Button>
          </Modal.Footer>
        </Modal>
      );
    }
  }

function mapStateToProps(state) {
    const { updating,showmodal, user } = state.update;
    return {
      updating,showmodal, user
    };
}

const connectedMyModal = connect(mapStateToProps)(MyModal);
export { connectedMyModal as MyModal };