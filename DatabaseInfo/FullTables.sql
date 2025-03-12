/*
  Tabela: UserProfile
  Depende de: Nenhuma
  Serve para: Armazena as informações do usuário
*/
CREATE TABLE UserProfile (
    userId INT IDENTITY(1,1) PRIMARY KEY,        -- Identificador único do usuário
    userType VARCHAR(20),              -- Tipo de usuário (ex: motorista, passageiro)
    firstName VARCHAR(100) NOT NULL,   -- Primeiro nome do usuário
    lastName VARCHAR(100),             -- Sobrenome do usuário
    email VARCHAR(255),                -- Email do usuário
    password VARCHAR(255),             -- Senha do usuário
    phone VARCHAR(20),                 -- Telefone do usuário
    birthdate DATE,                    -- Data de nascimento do usuário
    createAt DATE,                     -- Data de criação do perfil
    profilePicture VARCHAR(MAX),       -- URL ou caminho da foto de perfil do usuário
    rating FLOAT,                      -- Avaliação do usuário
    status VARCHAR(20),                -- Status do usuário (ex: ativo, inativo)
    lastLogin DATE                     -- Data do último login do usuário
);

/*
  Tabela: UserAddress
  Depende de: UserProfile
  Serve para: Armazena os endereços do usuário
*/
CREATE TABLE UserAddress (
    addressId INT IDENTITY(1,1) PRIMARY KEY,    -- Identificador único do endereço
    userId INT,                   -- Identificador do usuário (chave estrangeira)
    address VARCHAR(255),              -- Endereço do usuário
    city VARCHAR(100),                 -- Cidade do endereço
    state VARCHAR(100),                -- Estado do endereço
    zipcode VARCHAR(20),               -- CEP do endereço
    FOREIGN KEY (userId) REFERENCES UserProfile(userId) ON DELETE CASCADE -- Relacionamento com a tabela UserProfile
);

/*
  Tabela: UserVehicle
  Depende de: UserProfile
  Serve para: Armazena as informações do veículo do usuário
*/
CREATE TABLE UserVehicle (
    vehicleId INT IDENTITY(1,1) PRIMARY KEY,     -- Identificador único do veículo
    userId INT,                    -- Identificador do usuário (chave estrangeira)
    make VARCHAR(100),                 -- Marca do veículo
    model VARCHAR(100),                -- Modelo do veículo
    year INT,                      -- Ano do veículo
    color VARCHAR(100),                -- Cor do veículo
    licensePlate VARCHAR(20),          -- Placa do veículo
    city VARCHAR(100),                 -- Cidade onde o veículo está registrado
    FOREIGN KEY (userId) REFERENCES UserProfile(userId) ON DELETE CASCADE -- Relacionamento com a tabela UserProfile
);

/*
  Tabela: TravelGroup
  Depende de: UserProfile
  Serve para: Classificar ou organizar as viagens em grupos
*/
CREATE TABLE TravelGroup (
    groupId INT IDENTITY(1,1) PRIMARY KEY,        -- Identificador único do grupo
    groupType VARCHAR(20),                 -- Tipo de grupo (ex: "Mensal", "Única")
    startDate DATETIME,                        -- Data de início (para grupo mensal)
    endDate DATETIME,                          -- Data de fim (para grupo mensal, pode ser nula para grupo único)
    travelDate DATETIME,                       -- Data da viagem (para grupo único, pode ser nula para grupo mensal)
    createdAt DATETIME,                        -- Data de criação do grupo
    status VARCHAR(20),                    -- Status do grupo (ex: ativo, inativo)
    userId INT,                        -- Identificador do usuário (referência ao motorista ou passageiro)
    FOREIGN KEY (userId) REFERENCES UserProfile(userId) ON DELETE CASCADE  -- Relacionamento com o perfil do usuário
);

/*
  Tabela: PassengerGroup
  Depende de: UserProfile, TravelGroup
  Serve para: Registrar passageiros em cada grupo de viagem
*/
CREATE TABLE PassengerGroup (
    passengerGroupId INT IDENTITY(1,1) PRIMARY KEY,  -- Identificador único da participação
    groupId INT,                        -- Identificador do grupo (relacionamento com a tabela TravelGroup)
    userId INT,                         -- Identificador do usuário (passageiro)
    status VARCHAR(20),                     -- Status do passageiro no grupo (ex: "confirmado", "pendente")
    createdAt DATETIME,                         -- Data de criação da participação
    FOREIGN KEY (groupId) REFERENCES TravelGroup(groupId) ON DELETE CASCADE,  -- Relacionamento com o grupo de viagem
    FOREIGN KEY (userId) REFERENCES UserProfile(userId) -- Relacionamento com o usuário (passageiro)
);

/*
  Tabela: Travel
  Depende de: TravelGroup, UserProfile, UserVehicle
  Serve para: Armazenar os detalhes da viagem (motorista, veículo, horários etc.)
*/
CREATE TABLE Travel (
    travelId INT IDENTITY(1,1) PRIMARY KEY,         -- Identificador único da viagem
    groupId INT,                        -- Identificador do grupo (relacionamento com a tabela TravelGroup)
    userId INT,                         -- Identificador do motorista (relacionamento com a tabela UserProfile)
    vehicleId INT,                      -- Identificador do veículo (relacionamento com a tabela UserVehicle)
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
