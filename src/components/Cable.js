import React, {Fragment} from 'react';
import {ActionCableConsumer} from 'react-actioncable-provider';

const Cable = ({ rooms, handleReceivedMessage }) => {
  return (
    <Fragment>
      {rooms.map(room => {
        return (
          <ActionCableConsumer key={room.id} channel={{channel: 'RoomMessagesChannel', room: room.id }} onReceived={handleReceivedMessage} />
        );
      })}
    </Fragment>
  )
}

export default Cable;
