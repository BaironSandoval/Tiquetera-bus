import React from 'react';

const ReservationDetails = ({ reservation, onEditClick, onDeleteClick }) => {
  return (
    <div>
      <h2>Detalles de la Reserva</h2>
      <p>
        <strong>Origen:</strong> {reservation.origin}<br />
        <strong>Destino:</strong> {reservation.destination}<br />
        <strong>Pasajeros:</strong> {reservation.passengers}<br />
        <strong>Fecha:</strong> {reservation.date.toDateString()}<br />
        <strong>Hora:</strong> {reservation.time}
      </p>
      <button onClick={onEditClick}>Editar Reserva</button>
      <button onClick={onDeleteClick}>Eliminar Reserva</button>
    </div>
  );
};

export default ReservationDetails;
