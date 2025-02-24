import { describe, test, expect } from "vitest";
import { Estudiante, Profesor, Asignatura } from "../src/mod-1";

/**
 * Pruebas para la clase Estudiante
 */
describe("Clase Estudiante", () => {
  test("Creación de Estudiante y getters de Persona (heredados)", () => {
    const estudiante = new Estudiante(
      "Laura",
      "Álvarez",
      "2001-04-27",
      "12345678A",
      "alu0101349824@ull.edu.es",
      "2º Curso",
    );
    // Verificamos propiedades
    expect(estudiante.nombre).toBe("Laura");
    expect(estudiante.apellidos).toBe("Álvarez");
    expect(estudiante.fechaNacimiento).toBe("2001-04-27");
    expect(estudiante.dni).toBe("12345678A");
    expect(estudiante.correoInstitucional).toBe("alu0101349824@ull.edu.es");
    expect(estudiante.cursoActual).toBe("2º Curso");
  });

  test("Creación de Estudiante con datos que no cumplen la regex => retornan undefined", () => {
    // DNI inválido, correo inválido
    const estudiante = new Estudiante(
      "Laura",
      "Álvarez",
      "2001-04-27",
      "1234567A", // Falta un dígito
      "alu010134@ull.es", // Faltan dígitos
      "2º Curso",
    );
    expect(estudiante.dni).toBe(undefined);
    expect(estudiante.correoInstitucional).toBe(undefined);
  });

  test("Setters de Estudiante modifican propiedades y validan correo (válido/inválido)", () => {
    const estudiante = new Estudiante(
      "Ana",
      "Pérez",
      "1999-10-10",
      "87654321B",
      "alu0100000000@ull.edu.es", // "alu" + "0100000000" (10 dígitos)
      "1º Curso",
    );

    // Cambiamos Persona
    estudiante.nombre = "Anita";
    estudiante.apellidos = "Pérez Díaz";
    estudiante.fechaNacimiento = "1999-01-01";
    estudiante.dni = "11111111C";
    // Cambiamos Estudiante
    estudiante.cursoActual = "3º Curso";
    estudiante.correoInstitucional = "alu0100557788@ull.edu.es";

    expect(estudiante.nombre).toBe("Anita");
    expect(estudiante.apellidos).toBe("Pérez Díaz");
    expect(estudiante.fechaNacimiento).toBe("1999-01-01");
    expect(estudiante.dni).toBe("11111111C");
    expect(estudiante.cursoActual).toBe("3º Curso");
    expect(estudiante.correoInstitucional).toBe("alu0100557788@ull.edu.es");

    // Intento de correo no válido
    estudiante.correoInstitucional = "correoinvalido@abc.com";
    // No se modifica
    expect(estudiante.correoInstitucional).toBe("alu0100557788@ull.edu.es");
  });

  test("mostrarDatosPersonales en Estudiante retorna el string correcto", () => {
    const estudiante = new Estudiante(
      "Luis",
      "Robles",
      "1998-03-15",
      "22222222D",
      "alu0101349824@ull.edu.es",
      "4º Curso",
    );
    // Comprobamos la cadena devuelta
    const resultado = estudiante.mostrarDatosPersonales();
    expect(resultado).toBe(
      "Estudiante: Luis Robles, Nacido el 1998-03-15, " +
        "DNI: 22222222D, Correo: alu0101349824@ull.edu.es, Curso: 4º Curso",
    );
  });
});

/**
 * Pruebas para la clase Profesor
 */
describe("Clase Profesor", () => {
  test("Creación de Profesor y getters de Persona (heredados)", () => {
    const profesor = new Profesor(
      "Juan",
      "Pérez",
      "1975-01-02",
      "33333333E",
      "alu0101223344@ull.edu.es",
      "Lunes 10-12",
      2,
    );
    expect(profesor.nombre).toBe("Juan");
    expect(profesor.apellidos).toBe("Pérez");
    expect(profesor.fechaNacimiento).toBe("1975-01-02");
    expect(profesor.dni).toBe("33333333E");
    expect(profesor.correoInstitucional).toBe("alu0101223344@ull.edu.es");
    expect(profesor.horarioTutorias).toBe("Lunes 10-12");
    expect(profesor.asignaturas).toBe(2);
  });

  test("Creación de Profesor con datos que no cumplen la regex => retornan undefined", () => {
    // DNI inválido, correo inválido
    const profesor = new Profesor(
      "Marta",
      "Suárez",
      "1980-05-10",
      "123F", // Falta un dígito
      "alu0101@ull.es", // Faltan dígitos
      "Miércoles 9-11",
      1,
    );
    expect(profesor.dni).toBe(undefined);
    expect(profesor.correoInstitucional).toBe(undefined);
  });

  test("Setters de Profesor, validando correo e incluyendo asignaturas negativas", () => {
    const profesor = new Profesor(
      "Marta",
      "Suárez",
      "1980-05-10",
      "44444444F",
      "alu0101349824@ull.edu.es",
      "Miércoles 9-11",
      1,
    );

    profesor.nombre = "Marta B.";
    profesor.apellidos = "Suárez González";
    profesor.fechaNacimiento = "1980-12-31";
    profesor.dni = "55555555G";
    profesor.correoInstitucional = "alu0101223344@ull.edu.es";
    profesor.horarioTutorias = "Jueves 15-17";
    profesor.asignaturas = 3;

    expect(profesor.nombre).toBe("Marta B.");
    expect(profesor.apellidos).toBe("Suárez González");
    expect(profesor.fechaNacimiento).toBe("1980-12-31");
    expect(profesor.dni).toBe("55555555G");
    expect(profesor.correoInstitucional).toBe("alu0101223344@ull.edu.es");
    expect(profesor.horarioTutorias).toBe("Jueves 15-17");
    expect(profesor.asignaturas).toBe(3);

    // Correo no válido, no modifica
    profesor.correoInstitucional = "correo@invalido.com";
    expect(profesor.correoInstitucional).toBe("alu0101223344@ull.edu.es");

    // Asignaturas negativas, no modifica
    profesor.asignaturas = -2;
    expect(profesor.asignaturas).toBe(3);
  });

  test("mostrarDatosPersonales en Profesor retorna string correcto", () => {
    const profesor = new Profesor(
      "Carla",
      "Morales",
      "1970-09-09",
      "12345678H",
      "alu0101223377@ull.edu.es",
      "Viernes 18-20",
      4,
    );
    const resultado = profesor.mostrarDatosPersonales();
    expect(resultado).toBe(
      "Profesor: Carla Morales, Nacido el 1970-09-09, " +
        "DNI: 12345678H, Correo: alu0101223377@ull.edu.es, " +
        "Tutorías: Viernes 18-20, Asignaturas: 4",
    );
  });
});

/**
 * Pruebas para la clase Asignatura
 */
describe("Clase Asignatura", () => {
  test("Creación de Asignatura y getters", () => {
    const asig = new Asignatura(
      "DSI-101",
      "Desarrollo de Sistemas",
      "Informatica",
    );
    expect(asig.codigo).toBe("DSI-101");
    expect(asig.nombre).toBe("Desarrollo de Sistemas");
    expect(asig.titulacion).toBe("Informatica");
  });

  test("Agregar profesor y mostrarProfesorado (retorna string)", () => {
    const asig = new Asignatura(
      "DSI-101",
      "Desarrollo de Sistemas",
      "Informatica",
    );
    const profesor = new Profesor(
      "Laura",
      "García",
      "1965-05-10",
      "12345678J",
      "alu0109999999@ull.edu.es",
      "Lunes 10-12",
      2,
    );
    asig.agregarProfesor(profesor);

    const cadena = asig.mostrarProfesorado();
    // Cada profesor se añade en una línea => "nombre apellidos, fechaNacimiento, dni, correo, asignaturas\n"
    expect(cadena).toContain(
      "Laura García, 1965-05-10, 12345678J, alu0109999999@ull.edu.es, 2",
    );
  });

  test("Agregar estudiante y mostrarAlumnado (retorna string)", () => {
    const asig = new Asignatura(
      "DSI-101",
      "Desarrollo de Sistemas",
      "Informatica",
    );
    const estudiante = new Estudiante(
      "Eva",
      "Díaz",
      "2000-01-01",
      "12345678K",
      "alu0109999000@ull.edu.es",
      "3º Curso",
    );
    asig.agregarEstudiante(estudiante, 7);

    const cadena = asig.mostrarAlumnado();
    // Cada estudiante se añade en una línea => "nombre apellidos, fechaNac, dni, correo, cursoActual, Calificación...\n"
    expect(cadena).toContain(
      "Eva Díaz, 2000-01-01, 12345678K, alu0109999000@ull.edu.es, 3º Curso, Calificación: 7",
    );
  });

  test("Actualizar calificación de un estudiante y verificar resultado en mostrarAlumnado()", () => {
    const asig = new Asignatura(
      "DSI-101",
      "Desarrollo de Sistemas",
      "Informatica",
    );
    const estudiante = new Estudiante(
      "Luis",
      "Robles",
      "1999-09-09",
      "12345678L",
      "alu0101222000@ull.edu.es",
      "2º Curso",
    );
    asig.agregarEstudiante(estudiante, 5);
    asig.actualizarCalificacion(estudiante, 9);

    const cadena = asig.mostrarAlumnado();
    expect(cadena).toContain(
      "Luis Robles, 1999-09-09, 12345678L, alu0101222000@ull.edu.es, 2º Curso, Calificación: 9",
    );
  });

  test("buscarProfesor por criterios: nombre, apellidos, fechaNacimiento, dni, correo, asignaturas", () => {
    const asig = new Asignatura(
      "DSI-101",
      "Desarrollo de Sistemas",
      "Informatica",
    );
    const prof1 = new Profesor(
      "Juan",
      "García",
      "1975-05-05",
      "12345678A",
      "alu0105555555@ull.es",
      "Martes 10-12",
      1,
    );
    const prof2 = new Profesor(
      "María",
      "Pérez",
      "1970-01-01",
      "12345678B",
      "alu0106666666@ull.edu.es",
      "Jueves 16-18",
      2,
    );
    asig.agregarProfesor(prof1);
    asig.agregarProfesor(prof2);

    // Nombre
    expect(asig.buscarProfesor("Juan").length).toBe(1);
    // Apellidos
    expect(asig.buscarProfesor("Pérez").length).toBe(1);
    // Fecha nacimiento
    expect(asig.buscarProfesor("1975-05-05").length).toBe(1);
    // DNI
    expect(asig.buscarProfesor("12345678B").length).toBe(1);
    // Correo
    expect(asig.buscarProfesor("alu0106666666@ull.edu.es").length).toBe(1);
    // Asignaturas
    expect(asig.buscarProfesor(2).length).toBe(1);
    // Sin coincidencias
    expect(asig.buscarProfesor("NoExiste").length).toBe(0);
  });

  test("buscarEstudiante por varios criterios: nombre, apellidos, fechaNac, dni, correo, curso", () => {
    const asig = new Asignatura(
      "DSI-101",
      "Desarrollo de Sistemas",
      "Informatica",
    );
    const e1 = new Estudiante(
      "Carlos",
      "López",
      "2001-01-01",
      "12345678A",
      "alu0101111111@ull.edu.es",
      "1º Curso",
    );
    const e2 = new Estudiante(
      "Sonia",
      "Martín",
      "2002-02-02",
      "12345678B",
      "alu0102222222@ull.es",
      "2º Curso",
    );
    asig.agregarEstudiante(e1, 8);
    asig.agregarEstudiante(e2, 9);

    // Por nombre
    expect(asig.buscarEstudiante("Carlos").length).toBe(1);
    expect(asig.buscarEstudiante("Carlos")[0].apellidos).toBe("López");

    // Por apellidos
    expect(asig.buscarEstudiante("Martín").length).toBe(1);
    expect(asig.buscarEstudiante("Martín")[0].nombre).toBe("Sonia");

    // Por fecha nacimiento
    expect(asig.buscarEstudiante("2001-01-01")[0].dni).toBe("12345678A");

    // Por dni
    expect(asig.buscarEstudiante("12345678B")[0].nombre).toBe("Sonia");

    // Por correo
    expect(asig.buscarEstudiante("alu0102222222@ull.es").length).toBe(1);

    // Por curso
    expect(asig.buscarEstudiante("1º Curso")[0].nombre).toBe("Carlos");

    // Sin coincidencias
    expect(asig.buscarEstudiante("NoExiste").length).toBe(0);
  });

  test("buscarAlumnadoPorCalificacion", () => {
    const asig = new Asignatura(
      "DSI-101",
      "Desarrollo de Sistemas",
      "Informatica",
    );
    const e1 = new Estudiante(
      "Carlos",
      "López",
      "2001-01-01",
      "12345678A",
      "alu0101111111@ull.edu.es",
      "1º",
    );
    const e2 = new Estudiante(
      "Sonia",
      "Martín",
      "2002-02-02",
      "12345678B",
      "alu0102222222@ull.es",
      "2º",
    );
    asig.agregarEstudiante(e1, 8);
    asig.agregarEstudiante(e2, 9);

    expect(asig.buscarAlumnadoPorCalificacion(8).length).toBe(1);
    expect(asig.buscarAlumnadoPorCalificacion(10).length).toBe(0);
  });
});
