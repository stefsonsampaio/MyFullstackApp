CREATE DATABASE barbershop

CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,  -- usuário é na verdade a barbearia;
    usuario VARCHAR(200) NOT NULL, -- aqui na verdade seria a barbearia;
    senha VARCHAR(200) NOT NULL
)

CREATE TABLE tipo_servico (
    id_tipo_servico SERIAL PRIMARY KEY,
    id_usuario int references usuario(id_usuario),
    descricao VARCHAR(200) NOT NULL
)

alter table servico
alter column data_hora set default now()

CREATE TABLE servico (
    id_servico SERIAL PRIMARY KEY,
    id_usuario INT REFERENCES usuario(id_usuario),  -- usuário é na verdade a barbearia;
    id_funcionario int references funcionario(id_funcionario),
    id_tipo_servico INT REFERENCES tipo_servico(id_tipo_servico),
    id_valor INT REFERENCES historico_preco(id_valor),
    nome_cliente VARCHAR(200) NOT NULL,
    data_hora TIMESTAMP   default now() 
)

CREATE TABLE funcionario (
    id_usuario int references usuario(id_usuario), -- usuário é na verdade a barbearia;
    id_funcionario serial primary key,
    nome_funcionario varchar(200) unique not null,
    data_admissao timestamp,
    data_demissao timestamp
)

ALTER TABLE historico_preco
ALTER COLUMN data_inicio SET DEFAULT now();

CREATE TABLE historico_preco (
    id_valor SERIAL PRIMARY KEY,
    id_tipo_servico INT REFERENCES tipo_servico(id_tipo_servico),
    id_usuario int references usuario(id_usuario),
    data_inicio TIMESTAMP default now(),
    data_fim TIMESTAMP,
    valor NUMERIC(10,2) NOT NULL
)

insert into tipo_servico (id_tipo_servico, descricao) values (1, 'Corte de Cabelo')
insert into tipo_servico (id_tipo_servico, descricao) values (2, 'Barba')
insert into tipo_servico (id_tipo_servico, descricao) values (3, 'Cabelo e Barba')

insert into historico_preco (id_tipo_servico, data_inicio, valor) values (1, current_timestamp, 40.00)
insert into historico_preco (id_tipo_servico, data_inicio, valor) values (2, current_timestamp, 35.00)
insert into historico_preco (id_tipo_servico, data_inicio, valor) values (3, current_timestamp, 65.00)