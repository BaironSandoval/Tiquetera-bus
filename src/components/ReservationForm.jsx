import React, { useState, useEffect } from "react";
import Input from "./Input";
import DateInput from "./DateInput";
import ReservationList from "./ReservationList";
import ReservationDetails from "./ReservationDetails";

const ReservationForm = () => {
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedReservations =
      JSON.parse(localStorage.getItem("reservations")) || [];
    setReservations(storedReservations);
  }, []);

  useEffect(() => {
    localStorage.setItem("reservations", JSON.stringify(reservations));
  }, [reservations]);

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing && selectedReservation) {
      // Editar reserva existente
      const editedReservations = reservations.map((reservation) =>
        reservation === selectedReservation
          ? { ...reservation, origin, destination, passengers, date, time }
          : reservation
      );

      setReservations(editedReservations);
      setIsEditing(false);
    } else {
      // Crear nueva reserva
      const newReservation = { origin, destination, passengers, date, time };
      setReservations([...reservations, newReservation]);
    }

    // Limpiar el formulario
    setOrigin("");
    setDestination("");
    setPassengers(1);
    setDate(new Date());
    setTime("");
    setSelectedReservation(null);
  };

  const handleReservationClick = (reservation) => {
    setSelectedReservation(reservation);
  };

  const handleEditClick = () => {
    if (selectedReservation) {
      // Rellenar el formulario con los detalles de la reserva seleccionada para editar
      setOrigin(selectedReservation.origin);
      setDestination(selectedReservation.destination);
      setPassengers(selectedReservation.passengers);
      setDate(new Date(selectedReservation.date));
      setTime(selectedReservation.time);
      setIsEditing(true);
    }
  };

  const handleDeleteClick = () => {
    if (selectedReservation) {
      // Eliminar la reserva seleccionada
      const updatedReservations = reservations.filter(
        (reservation) => reservation !== selectedReservation
      );
      setReservations(updatedReservations);
      setIsEditing(false);
      setSelectedReservation(null);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          id="origen"
          label="Origen"
          type="text"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />
        <Input
          id="destino"
          label="Destino"
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <Input
          id="pasajeros"
          label="Número de Pasajeros"
          type="number"
          value={passengers}
          onChange={(e) => setPassengers(e.target.value)}
        />
        <DateInput
          id="fecha"
          label="Fecha"
          selected={date}
          onChange={handleDateChange}
        />
        <Input
          id="hora"
          label="Hora"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <button type="submit">
          {isEditing ? "Guardar Reserva" : "Enviar Reserva"}
        </button>
      </form>

      {reservations.length > 0 && (
        <ReservationList
          reservations={reservations}
          onReservationClick={handleReservationClick}
        />
      )}

      {selectedReservation && (
        <ReservationDetails
          reservation={selectedReservation}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
        />
      )}
    </div>
  );
};

export default ReservationForm;
