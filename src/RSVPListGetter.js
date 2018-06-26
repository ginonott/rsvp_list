import React, {Component} from 'react';
import RSVPList from './RSVPList';
import { firebase } from '@firebase/app';
import '@firebase/firestore';
import guestlist from './guestlist';

function getGuestCountForGuest(name) {
    let guests = guestlist.guests;
    for (let i = 0; i < guests.length; i++) {
        if (guests[i].name === name) {
            return guests[i].guestCount
        }
    }

    return 0;
}

function rsvpListToMap(rsvpedGuests) {
    return rsvpedGuests.reduce((map, guest) => {
        map[guest.name] = guest;
        return map;
    }, {});
}

function getAwaitingRsvps(rsvpedGuests) {
    let rsvpedGuestMap = rsvpListToMap(rsvpedGuests);
    return guestlist.guests.filter(guest => !rsvpedGuestMap[guest.name])
        .map(guest => ({
            ...guest,
            guestCount: guest.guestCount + (guest.hasPlusOne ? 1 : 0),
            bringingPlusOne: guest.hasPlusOne
        }))
}

function getExpectedRsvps(rsvpedGuests) {
    let nonRsvpedGuests = getAwaitingRsvps(rsvpedGuests);
    let nonRsvpedGuestCount = nonRsvpedGuests.reduce((cnt, guest) => cnt + guest.guestCount, 0);
    let rsvpedGuestCount = rsvpedGuests.reduce((cnt, guest) => cnt + guest.guestCount, 0);

    return  nonRsvpedGuestCount + rsvpedGuestCount;
}

class RSVPListGetter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rsvplist: [],
            status: 'loading'
        }
    }

    refreshList() {
        var db = firebase.firestore();
        this.setState({status: 'loading'}, () => {
            db.collection("rsvp_list")
                .get()
                .then(resp => resp.docs)
                .then(docs => docs.map(doc => ({id: doc.id, data: doc.data()})))
                .then(docs => docs.map(doc => ({
                    id: doc.id,
                    attending: doc.data.attending,
                    diet: doc.data.diet,
                    bringingPlusOne: doc.data.bringingPlusOne,
                    name: doc.data.name,
                    partyRsvp: doc.data.partyRsvp,
                    rsvped: doc.data.rsvped,
                    songReq: doc.data.songReq,
                    plusOneName: doc.data.plusOneName,
                    guestCount: doc.data.attending === 'yes' ?
                        (doc.data.guestCount || getGuestCountForGuest(doc.data.name))
                            + (doc.data.bringingPlusOne ? 1 : 0)
                        : 0
                })))
                .then(guests => {
                    this.setState({rsvplist: guests, status: 'done'});
                })
                .catch(e => {
                    console.error('Oh no!', e);
                    this.setState({status: 'error'})
                })
        })
    }

    componentDidMount() {
        var config = {
            apiKey: "AIzaSyCS2Z-x2uAfhAtwfSu9EbYtXQDDoDIYYRc",
            authDomain: "wedding-f4d61.firebaseapp.com",
            databaseURL: "https://wedding-f4d61.firebaseio.com",
            projectId: "wedding-f4d61",
            storageBucket: "wedding-f4d61.appspot.com",
            messagingSenderId: "692014919563"
          };

        firebase.initializeApp(config); // eslint-dsiable-line no-undef
        const firestore = firebase.firestore();
        const settings = {timestampsInSnapshots: true};
        firestore.settings(settings);

        this.refreshList();
    }

    render() {
        return (
            <div>
                { this.state.status === 'loading' ? (<div className="loading"> Please Wait... </div>)
                    : this.state.status === 'error' ? <div className="error"> Something went wrong, go get Gino </div>
                    :
                    [
                        <div>
                            <h2>
                                Guest Count: <span> </span>
                                {
                                    this.state.rsvplist.reduce(
                                    (cnt, guest) => cnt + guest.guestCount,
                                    0
                                )} / {getExpectedRsvps(this.state.rsvplist)}
                            </h2>
                        </div>,
                        <div>
                            <button onClick={() => {this.refreshList()}}> Refresh List </button>
                            <RSVPList rsvps={this.state.rsvplist} pendingRsvps={getAwaitingRsvps(this.state.rsvplist)}
                                guestCount={this.state.rsvplist.reduce(
                                    (cnt, guest) => cnt + guest.guestCount,
                                    0
                                )}/>
                        </div>
                    ]
                }
            </div>
        )
    }
}

export default RSVPListGetter;