import React, {Component} from 'react';

class RSVP extends Component {
    render() {
        let {
            attending,
            bringingPlusOne,
            diet,
            name,
            partyRsvp,
            plusOneName = '',
            rsvped,
            songReq
        } = this.props;
        return (
            <div className="rsvp">
                <div className="rsvp-title">
                    <span className="rsvp-name"> {name} {bringingPlusOne ? <span className="rsvp-has-plus-one"> +1 </span> : null} </span>
                    {attending ? <span className="fas fa-check rsvp-attending yes"/> : <span className="fas fa-times rsvp-attending no"/>}
                </div>
                <div className="rsvp-body">
                    <div className="rsvp-date"> RSVP: {rsvped} </div>
                    {partyRsvp.length > 0 ? <div> Party RSVP: {partyRsvp} </div> : null}
                    {bringingPlusOne ? <div> Plus One's Name: {plusOneName} </div> : null}
                    {diet.length > 0 ? <div> Diet Restrictions: {diet} </div> : null}
                    {songReq.length > 0 ? <div> Song Requests: {songReq} </div> : null}
                </div>
            </div>
        )
    }
}

export default RSVP;