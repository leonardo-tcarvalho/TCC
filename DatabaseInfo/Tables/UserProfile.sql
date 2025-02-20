/*
  Tabela: UserProfile
  Depende de: Nenhuma
  Serve para: Armazena as informações do usuário
*/
CREATE TABLE UserProfile (
    userId INTEGER PRIMARY KEY AUTOINCREMENT,        -- Identificador único do usuário
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