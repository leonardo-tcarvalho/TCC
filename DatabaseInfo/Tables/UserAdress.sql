/*
  Tabela: UserAddress
  Depende de: UserProfile
  Serve para: Armazena os endereços do usuário
*/
CREATE TABLE UserAddress (
    addressId INTEGER PRIMARY KEY AUTOINCREMENT,    -- Identificador único do endereço
    userId INTEGER,                   -- Identificador do usuário (chave estrangeira)
    address VARCHAR(255),              -- Endereço do usuário
    city VARCHAR(100),                 -- Cidade do endereço
    state VARCHAR(100),                -- Estado do endereço
    zipcode VARCHAR(20),               -- CEP do endereço
    FOREIGN KEY (userId) REFERENCES UserProfile(userId) ON DELETE CASCADE -- Relacionamento com a tabela UserProfile
);