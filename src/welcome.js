import React from 'react';
import {
    Modal
} from 'semantic-ui-react'

export default class WelcomeDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true
        };
    }
    render() {
        return (
            <Modal
                size='tiny'
                open={this.state.open}
                onClose={() => this.setState({ open: false })}
                onOpen={() => this.setState({ open: true })}
            >
                <Modal.Header>Doesn't work for reasons...</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <p>
                            The course hours are different once again. 
                            This breaks some part of the code. Go to <a href="https://theuniversityscheduler.com/">theuniversityscheduler.com</a> that seems to be working.
                        </p>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}
