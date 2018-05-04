import React, {Component} from 'react';
import RSVPList from './RSVPList';
import { firebase } from '@firebase/app';
import '@firebase/firestore';

class RSVPListGetter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rsvplist: [],
            status: 'loading'
        }
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
          
        var db = firebase.firestore();
        const firestore = firebase.firestore();
        const settings = {timestampsInSnapshots: true};
        firestore.settings(settings);

        console.log('a');
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
                songReq: doc.data.songReq
            })))
            .then(guests => {
                console.log(guests);
                this.setState({rsvplist: guests, status: 'done'});
            })
            .catch(e => {
                console.error('Oh no!', e);
                this.setState({status: 'error'})
            })

    }

    render() {
        return (
            <div>
                { this.state.status === 'loading' ? (<div className="loading"> Please Wait... </div>) 
                    : this.state.status === 'error' ? <div className="error"> Something went wrong, go get Gino </div>
                    : <RSVPList rsvps={this.state.rsvplist}/> 
                }
            </div>
        )
    }
}

export default RSVPListGetter;