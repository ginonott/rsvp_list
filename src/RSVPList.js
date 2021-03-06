import React, {Component} from 'react';
import RSVP from './RSVP';

const SORTS = {
    LAST_NAME: 'Last Name',
    MOST_RECENT: 'Most Recent',
    PENDING_RSVP: 'Pending RSVP',
    NOT_ATTENDING: 'Not Attending First'
}

class RSVPList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: '',
            sort: SORTS.MOST_RECENT
        }
    }

    handleSortChange(e) {
        this.setState({sort: e.target.value});
    }

    handleSearchChange(e) {
        this.setState({search: e.target.value.toUpperCase()});
    }

    sortByLastName(a, b) {
        if (a.name < b.name) {
            return -1;
        }

        if (a.name > b.name) {
            return 1;
        }

        return 0;
    }

    sortByMostRecent(a, b) {
        let aDate = new Date(a.rsvped);
        let bDate = new Date(b.rsvped);

        if (aDate > bDate) {
            return -1;
        }

        if (aDate < bDate) {
            return 1;
        }

        return 0;
    }

    sortByNotAttending(a, b) {
        if (a.attending === b.attending) {
            return 0;
        }

        if (a.attending === 'no' && b.attending === 'yes') {
            return -1;
        }

        return 1;
    }

    sort = (a, b) => {
        if (this.state.sort === SORTS.LAST_NAME) {
            return this.sortByLastName(a, b);
        } else if (this.state.sort === SORTS.NOT_ATTENDING) {
            return this.sortByNotAttending(a, b);
        }
        else {
            return this.sortByMostRecent(a, b);
        }
    }

    hasDups = rsvpList => {
        let dups = false;
        let dupMap = {};
        rsvpList.forEach(rsvp => {
            if (dupMap[rsvp.name]) {
                dups = true;
            }

            dupMap[rsvp.name] = true;
        });

        return dups;
    }

    render() {
        const COLORS = [
            ['#FFCDD2', '#FFEBEE'],
            ['#FFCC80', '#FFE0B2'],
            ['#FFF59D', '#FFF9C4'],
            ['#C8E6C9', '#E8F5E9'],
            ['#BBDEFB', '#E3F2FD'],
            ['#CE93D8', '#F3E5F5']
        ]

        let {
           rsvps = []
        } = this.props;
        return (
            <div className="rsvp-list">
                <div className="rsvp-search-box">
                    <select onChange={e => this.handleSortChange(e)} >
                        {Object.values(SORTS).map((sort) => <option {...(this.state.sort === sort ? {selected: true} : {})} value={sort}> {sort} </option>)}
                    </select>
                    <input placeholder="Search for guests here..." type="text" className="rsvp-search"
                        onChange={e => this.handleSearchChange(e)}/>
                </div>
                <div>
                    {this.hasDups(rsvps) ? <h2> Duplicate RSVPs in the list! </h2> : null}
                </div>
                {
                    this.state.sort === SORTS.PENDING_RSVP
                    ? this.props.pendingRsvps.map((rsvp, indx) => (
                        <RSVP pColor={COLORS[indx % COLORS.length][0]} sColor={COLORS[indx % COLORS.length][1]} key={rsvp.id} {...rsvp}/>
                        ))
                    : rsvps.filter(rsvp => this.state.search.length > 0 ? rsvp.name.toUpperCase().includes(this.state.search) : true)
                        .sort(this.sort)
                        .map((rsvp, indx) => (
                        <RSVP pColor={COLORS[indx % COLORS.length][0]} sColor={COLORS[indx % COLORS.length][1]} key={rsvp.id} {...rsvp}/>
                        ))}
            </div>
        )
    }
}

export default RSVPList;