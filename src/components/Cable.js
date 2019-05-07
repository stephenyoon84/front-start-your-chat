import React, {Fragment} from 'react';
import {ActionCable} from 'react-actioncable-provider';

const Cable = ({ rooms, handleReceivedMessage }) => {
  return (
    <Fragment>
      {rooms.map(room => {
        return (
          <ActionCable key={room.id} channel={{channel: 'RoomMessagesChannel', room: room.id }} onReceived={handleReceivedMessage} />
        );
      })}
    </Fragment>
  )
}

export default Cable;
