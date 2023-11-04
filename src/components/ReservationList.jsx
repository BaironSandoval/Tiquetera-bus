import React from "react";

const ReservationList = ({ reservations, onReservationClick }) => {
  return (
    <div>
      <h2>Lista de Reservas</h2>
      <ul>
        {reservations &&
          reservations.length > 0 &&
          reservations.map((reservation, index) => (
            <li key={index} onClick={() => onReservationClick(reservation)}>
              <strong>Origen:</strong> {reservation.origin},{" "}
              <strong>Destino:</strong> {reservation.destination},{" "}
              <strong>Pasajeros:</strong> {reservation.passengers},{" "}
              <strong>Fecha:</strong> {reservation.date.toDateString()},{" "}
              <strong>Hora:</strong> {reservation.time}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ReservationList;
