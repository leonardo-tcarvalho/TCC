/*
  Tabela: TravelGroup
  Depende de: UserProfile
  Serve para: Classificar ou organizar as viagens em grupos
*/
CREATE TABLE TravelGroup (
    groupId INTEGER PRIMARY KEY,           -- Identificador único do grupo
    groupType VARCHAR(20),                 -- Tipo de grupo (ex: "Mensal", "Única")
    startDate DATETIME,                        -- Data de início (para grupo mensal)
    endDate DATETIME,                          -- Data de fim (para grupo mensal, pode ser nula para grupo único)
    travelDate DATETIME,                       -- Data da viagem (para grupo único, pode ser nula para grupo mensal)
    createdAt DATETIME,                        -- Data de criação do grupo
    status VARCHAR(20),                    -- Status do grupo (ex: ativo, inativo)
    userId INTEGER,                        -- Identificador do usuário (referência ao motorista ou passageiro)
    FOREIGN KEY (userId) REFERENCES UserProfile(userId) ON DELETE CASCADE  -- Relacionamento com o perfil do usuário
);