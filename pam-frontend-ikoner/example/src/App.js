import React, { Component } from 'react'

import { AdresseIkon, EditIkon, ListeIkon, MailIkon, PrinterIkon, SlettIkon, TelefonIkon, Lenkeknapp } from 'pam-frontend-ikoner'

export default class App extends Component {
  render () {
    return (
      <div>
        <div>
            <EditIkon />
            <AdresseIkon />
            <ListeIkon />
            <MailIkon />
            <PrinterIkon />
            <SlettIkon />
            <TelefonIkon />
        </div>

        <div className="knapper">
            <Lenkeknapp ikon="Edit" onClick={() => {
                console.log("test");
            }}/>
        </div>
      </div>
    )
  }
}
