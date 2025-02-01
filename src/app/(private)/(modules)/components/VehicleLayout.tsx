import React, { useState } from 'react'

const SeatSelector = () => {
  const totalSeats = 6 // Número total de assentos no layout
  const occupiedSeats = [] // Assentos ocupados
  const [selectedSeats, setSelectedSeats] = useState([])
  const [seatDetails, setSeatDetails] = useState({})

  const isOccupied = (seat) => occupiedSeats.includes(seat)
  const isSelected = (seat) => selectedSeats.includes(seat)

  const toggleSeat = (seat) => {
    if (isOccupied(seat)) return
    if (isSelected(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat))
      setSeatDetails((prev) => {
        const updatedDetails = { ...prev }
        delete updatedDetails[seat]
        return updatedDetails
      })
    } else {
      setSelectedSeats([...selectedSeats, seat])
    }
  }

  const handleSelectChange = (seat, event) => {
    const value = event.target.value
    setSeatDetails((prev) => ({ ...prev, [seat]: value }))
  }

  const renderSeats = () => {
    const seats = []
    for (let i = 1; i <= totalSeats; i++) {
      seats.push(
        <div
          key={i}
          className={`seat ${
            isOccupied(i)
              ? 'occupied'
              : isSelected(i)
                ? 'selected'
                : 'available'
          }`}
          onClick={() => {
            toggleSeat(i)
          }}
        >
          {i}
          {isSelected(i) && (
            <select
              value={seatDetails[i] || ''}
              onChange={(event) => {
                handleSelectChange(i, event)
              }}
            >
              <option value="" disabled>
                Selecione...
              </option>
              <option value="Adulto">Adulto</option>
              <option value="Criança">Criança</option>
              <option value="Idoso">Idoso</option>
            </select>
          )}
        </div>,
      )
    }
    return seats
  }

  return (
    <div className="seat-selector">
      <h1>Selecione seu assento</h1>
      <div className="vehicle-layout">
        <div className="vehicle">
          <div className="vehicle-front">
            <div className="driver-area">🚌</div>
          </div>
          <div className="seats-area">{renderSeats()}</div>
        </div>
      </div>
      <button
        className="confirm-button"
        onClick={() => {
          alert(
            `Assentos selecionados: ${selectedSeats.map((seat) => `${seat} (${seatDetails[seat] || 'N/A'})`).join(', ')}`,
          )
        }}
      >
        Confirmar
      </button>

      <style jsx>{`
        .seat-selector {
          text-align: center;
          font-family: Arial, sans-serif;
        }

        .vehicle-layout {
          width: 300px;
          margin: 20px auto;
          background: #333;
          border-radius: 15px;
          padding: 20px;
          position: relative;
        }

        .vehicle {
          position: relative;
          background: #333;
          border-radius: 15px;
          padding: 20px;
        }

        .vehicle::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          height: 20px;
          background: #333;
          border-radius: 10px 10px 0 0;
        }

        .vehicle-front {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }

        .driver-area {
          width: 50px;
          height: 50px;
          background-color: #444;
          color: #333;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-size: 20px;
        }

        .seats-area {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
        }

        .seat {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #555;
          border-radius: 5px;
          cursor: pointer;
          font-size: 14px;
          position: relative;
        }

        .seat.available {
          background-color: #9acd32;
        }

        .seat.selected {
          background-color: #1e90ff;
        }

        .seat.occupied {
          background-color: #333;
          cursor: not-allowed;
        }

        .seat select {
          position: absolute;
          top: 60%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 70px;
          font-size: 12px;
        }

        .legend {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-top: 20px;
        }

        .legend-box {
          width: 20px;
          height: 20px;
          display: inline-block;
          border: 1px solid #555;
        }

        .legend-box.available {
          background-color: #9acd32;
        }

        .legend-box.selected {
          background-color: #1e90ff;
        }

        .legend-box.occupied {
          background-color: #d3d3d3;
        }

        .confirm-button {
          margin-top: 20px;
          padding: 10px 20px;
          font-size: 16px;
          background-color: #1e90ff;
          color: #333;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .confirm-button:hover {
          background-color: #1c86ee;
        }
      `}</style>
    </div>
  )
}

export default SeatSelector
