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
                <Modal.Header>Old data</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <p>
                            Right now, Bilkent Offerings has no schedule data for some reason. <br/><br/>
                            This may be because "Weekly course schedules have been completely redesigned for the 2020-21 academic year," 
                            as they said. If that's the case, I will also change stuff to fit the "completely redesigned" scheduler format.<br/><br/> 
                            However, until they decide to tell us exactly how things are going to be, this site will continue to operate on 
                            old course data. Unfortunately, I didn't do any backups, so the latest data is from August 16th, and there might 
                            be some differences from reality.
                        </p>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}
