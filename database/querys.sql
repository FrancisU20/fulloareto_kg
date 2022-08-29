SET check_function_bodies = false;

CREATE TABLE empleado(
  id serial NOT NULL,
  cedula varchar(10) NOT NULL UNIQUE,
  nombres varchar(100) NOT NULL,
  apellidos varchar(100) NOT NULL,
  email varchar(100) NOT NULL UNIQUE,
  fecha_nac date,
  direccion varchar(100),
  celular varchar(10) UNIQUE,
  vacunado boolean,
  CONSTRAINT empleado_pkey PRIMARY KEY(id)
);

CREATE TABLE estado_vacunacion(
  id serial NOT NULL,
  empleado_id serial NOT NULL UNIQUE,
  tipo_vacuna varchar(50) NOT NULL,
  fecha_vac date NOT NULL,
  nro_dosis integer NOT NULL,
  CONSTRAINT estado_vacunacion_pkey PRIMARY KEY(id)
);

CREATE TABLE usuario(
  id serial NOT NULL,
  username varchar(30) NOT NULL UNIQUE,
  pwd varchar (16) NOT NULL,
  password varchar(512) NOT NULL,
  is_active boolean NOT NULL,
  roles_id integer NOT NULL,
  empleado_id integer NOT NULL UNIQUE,
  CONSTRAINT usuario_pkey PRIMARY KEY(id)
);

CREATE TABLE roles(
id serial NOT NULL, tipo_rol varchar NOT NULL,
  CONSTRAINT roles_pkey PRIMARY KEY(id)
);

ALTER TABLE estado_vacunacion
  ADD CONSTRAINT estado_vacunacion_empleado_id_fkey
    FOREIGN KEY (empleado_id) REFERENCES empleado (id);

ALTER TABLE usuario
  ADD CONSTRAINT "usuario_roles_id_fkey"
    FOREIGN KEY (roles_id) REFERENCES roles (id);

ALTER TABLE usuario
  ADD CONSTRAINT usuario_empleado_id_fkey
    FOREIGN KEY (empleado_id) REFERENCES empleado (id);