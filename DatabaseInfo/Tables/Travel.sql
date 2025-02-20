/*
  Tabela: Travel
  Depende de: TravelGroup, UserProfile, UserVehicle
  Serve para: Armazenar os detalhes da viagem (motorista, veículo, horários etc.)
*/
CREATE TABLE Travel (
    travelId INTEGER PRIMARY KEY AUTOINCREMENT,           -- Identificador único da viagem
    groupId INTEGER,                        -- Identificador do grupo (relacionamento com a tabela TravelGroup)
    userId INTEGER,                         -- Identificador do motorista (relacionamento com a tabela UserProfile)
    vehicleId INTEGER,                      -- Identificador do veículo (relacionamento com a tabela UserVehicle)
    travelDate DATE,                        -- Data da viagem
    departureTime TIME,                     -- Hora de partida
    arrivalTime TIME,                       -- Hora de chegada
    departureLocation VARCHAR(255),         -- Local de partida
    arrivalLocation VARCHAR(255),           -- Local de chegada
    status VARCHAR(20),                     -- Status da viagem (ex: "pendente", "confirmada", "finalizada")
    FOREIGN KEY (groupId) REFERENCES TravelGroup(groupId) ON DELETE CASCADE,  -- Relacionamento com o grupo
    FOREIGN KEY (userId) REFERENCES UserProfile(userId),  -- Relacionamento com o motorista
    FOREIGN KEY (vehicleId) REFERENCES UserVehicle(vehicleId) -- Relacionamento com o veículo
);