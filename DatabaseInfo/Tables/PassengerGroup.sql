/*
  Tabela: PassengerGroup
  Depende de: UserProfile, TravelGroup
  Serve para: Registrar passageiros em cada grupo de viagem
*/
CREATE TABLE PassengerGroup (
    passengerGroupId INTEGER PRIMARY KEY AUTOINCREMENT,   -- Identificador único da participação
    groupId INTEGER,                        -- Identificador do grupo (relacionamento com a tabela TravelGroup)
    userId INTEGER,                         -- Identificador do usuário (passageiro)
    status VARCHAR(20),                     -- Status do passageiro no grupo (ex: "confirmado", "pendente")
    createdAt DATETIME,                         -- Data de criação da participação
    FOREIGN KEY (groupId) REFERENCES TravelGroup(groupId) ON DELETE CASCADE,  -- Relacionamento com o grupo de viagem
    FOREIGN KEY (userId) REFERENCES UserProfile(userId) -- Relacionamento com o usuário (passageiro)
);