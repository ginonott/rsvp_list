import React, {Component} from 'react';
import RSVP from './RSVP';

class RSVPList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: ''
        }
    }

    handleChange(e) {
        this.setState({search: e.target.value.toUpperCase()});
    }

    render() {
        let {
           rsvps = []
        } = this.props;
        return (
            <div className="rsvp-list">
                <div className="rsvp-search-box">
                    <input placeholder="Search for guests here..." type="text" className="rsvp-search" 
                        onChange={e => this.handleChange(e)}/>
                </div>
                {rsvps.filter(rsvp => this.state.search.length > 0 ? rsvp.name.toUpperCase().includes(this.state.search) : true).map(rsvp => (
                    <RSVP key={rsvp.id} {...rsvp}/>
                ))}
            </div>
        )
    }
}

export default RSVPList;