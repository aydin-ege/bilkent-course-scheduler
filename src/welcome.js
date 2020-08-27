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
                <Modal.Header>Things are changing...</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <p>
                            Right now, Bilkent Offerings is constantly updated. <br/><br/>
                            This is probably because "Weekly course schedules have been completely redesigned for the 2020-21 academic year," 
                            as they said. Right now things doesn't really work and I'm trying to fix stuff as there are some new things introduced.
                            I will get things done soon hopefully. <br />
                            Thank you for your patience.
                        </p>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}
