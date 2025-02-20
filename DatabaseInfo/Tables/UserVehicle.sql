/*
  Tabela: UserVehicle
  Depende de: UserProfile
  Serve para: Armazena as informações do veículo do usuário
*/
CREATE TABLE UserVehicle (
    vehicleId INTEGER PRIMARY KEY,     -- Identificador único do veículo
    userId INTEGER,                    -- Identificador do usuário (chave estrangeira)
    make VARCHAR(100),                 -- Marca do veículo
    model VARCHAR(100),                -- Modelo do veículo
    year INTEGER,                      -- Ano do veículo
    color VARCHAR(100),                -- Cor do veículo
    licensePlate VARCHAR(20),          -- Placa do veículo
    city VARCHAR(100),                 -- Cidade onde o veículo está registrado
    FOREIGN KEY (userId) REFERENCES UserProfile(userId) ON DELETE CASCADE -- Relacionamento com a tabela UserProfile
);