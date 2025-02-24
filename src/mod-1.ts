/**
 * @module mod-1
 * # Modificación 1: Sistema de gestión de Asignaturas
 * @remarks Este código define un conjunto de clases para modelar:
 * - Una clase abstracta `Persona`.
 * - Clases `Estudiante` y `Profesor` que heredan de `Persona`.
 * - Una clase `Asignatura` que gestiona profesores, estudiantes y calificaciones.
 *
 * Se respeta la encapsulación a través de propiedades privadas con getters y setters,
 * y se proporciona un método abstracto para mostrar los datos personales en la clase `Persona`.
 */

/**
 * ## Persona
 * Clase abstracta que representa a una persona con datos personales básicos.
 * Define un método abstracto `mostrarDatosPersonales` que deberá ser implementado
 * en las subclases para mostrar la información de forma personalizada.
 */
export abstract class Persona {
  /**
   * Nombre de la persona.
   */
  private _nombre: string;

  /**
   * Apellidos de la persona.
   */
  private _apellidos: string;

  /**
   * Fecha de nacimiento de la persona, representada como string (por ejemplo, "1990-05-12").
   */
  private _fechaNacimiento: string;

  /**
   * DNI de la persona, como string (por ejemplo, "12345678A").
   */
  private _dni: string;

  /**
   * ## constructor
   * Constructor de la clase abstracta Persona.
   * @param nombre - Nombre de la persona
   * @param apellidos - Apellidos de la persona
   * @param fechaNacimiento - Fecha de nacimiento en formato string
   * @param dni - DNI de la persona
   */
  constructor(
    nombre: string,
    apellidos: string,
    fechaNacimiento: string,
    dni: string,
  ) {
    this._nombre = nombre;
    this._apellidos = apellidos;
    this._fechaNacimiento = fechaNacimiento;
    this._dni = dni;
  }

  /**
   * ## getnombre
   * Getter para el nombre.
   */
  get nombre(): string {
    return this._nombre;
  }

  /**
   * ## setnombre
   * Setter para el nombre.
   */
  set nombre(valor: string) {
    this._nombre = valor;
  }

  /**
   * ## getapellidos
   * Getter para los apellidos.
   */
  get apellidos(): string {
    return this._apellidos;
  }

  /**
   * ## setapellidos
   * Setter para los apellidos.
   */
  set apellidos(valor: string) {
    this._apellidos = valor;
  }

  /**
   * ## getfechaNacimiento
   * Getter para la fecha de nacimiento.
   */
  get fechaNacimiento(): string {
    return this._fechaNacimiento;
  }

  /**
   * ## setfechaNacimiento
   * Setter para la fecha de nacimiento.
   */
  set fechaNacimiento(valor: string) {
    this._fechaNacimiento = valor;
  }

  /**
   * ## getdni
   * Getter para el DNI.
   */
  get dni(): string | undefined {
    const patron = /^\d{8}[A-Z]$/;
    if (patron.test(this._dni)) {
      return this._dni;
    } else {
      return undefined;
    }
  }

  /**
   * ## setdni
   * Setter para el DNI.
   */
  set dni(valor: string) {
    const patron = /^\d{8}[A-Z]$/;
    if (patron.test(this._dni)) {
      this._dni = valor;
    } else {
      console.error("DNI no válido");
    }
  }

  /**
   * ## mostrarDatosPersonales
   * Método abstracto para mostrar los datos personales de la persona.
   * Las clases que hereden de `Persona` deben implementar este método.
   */
  abstract mostrarDatosPersonales(): string;
}

/**
 * ## Estudiante
 * Clase que representa a un estudiante. Hereda de la clase abstracta `Persona`
 * y añade propiedades específicas, como el correo institucional.
 */
export class Estudiante extends Persona {
  /**
   * Correo institucional del estudiante.
   */
  private _correoInstitucional: string;

  /**
   * Otras propiedades adicionales que se consideren necesarias (ej. curso, especialidad...).
   * Para este ejemplo, se define una propiedad de ejemplo: curso actual.
   */
  private _cursoActual: string;

  /**
   * Constructor de la clase Estudiante.
   * @param nombre - Nombre del estudiante
   * @param apellidos - Apellidos del estudiante
   * @param fechaNacimiento - Fecha de nacimiento del estudiante
   * @param dni - DNI del estudiante
   * @param correoInstitucional - Correo institucional del estudiante
   * @param cursoActual - Curso o nivel en el que se encuentra el estudiante
   */
  constructor(
    nombre: string,
    apellidos: string,
    fechaNacimiento: string,
    dni: string,
    correoInstitucional: string,
    cursoActual: string,
  ) {
    super(nombre, apellidos, fechaNacimiento, dni);
    this._correoInstitucional = correoInstitucional;
    this._cursoActual = cursoActual;
  }

  /**
   * ## getcorreoInstitucional
   * Getter para el correo institucional.
   */
  get correoInstitucional(): string | undefined {
    // 3 letras minúsculas + 8 dígitos + (@ull.edu.es ó @ull.es)
    const patron = /^[a-z]{3}\d{10}@(ull\.edu\.es|ull\.es)$/;
    if (patron.test(this._correoInstitucional)) {
      return this._correoInstitucional;
    } else {
      return undefined;
    }
  }

  /**
   * ## setcorreoInstitucional
   * Setter para el correo institucional.
   */
  set correoInstitucional(valor: string) {
    // 3 letras minúsculas + 8 dígitos + (@ull.edu.es ó @ull.es)
    const patron = /^[a-z]{3}\d{10}@(ull\.edu\.es|ull\.es)$/;
    if (patron.test(valor)) {
      this._correoInstitucional = valor;
    } else {
      console.error("Correo institucional no válido");
    }
  }

  /**
   * ## getcursoActual
   * Getter para el curso actual.
   */
  get cursoActual(): string {
    return this._cursoActual;
  }

  /**
   * ## setcursoActual
   * Setter para el curso actual.
   */
  set cursoActual(valor: string) {
    this._cursoActual = valor;
  }

  /**
   * ## mostrarDatosPersonales
   * Implementación del método abstracto para mostrar datos personales de un estudiante.
   * @override
   */
  mostrarDatosPersonales(): string {
    return (
      `Estudiante: ${this.nombre} ${this.apellidos}, Nacido el ${this.fechaNacimiento}, ` +
      `DNI: ${this.dni}, Correo: ${this._correoInstitucional}, Curso: ${this._cursoActual}`
    );
  }
}

/**
 * ## Profesor
 * Clase que representa a un profesor. Hereda de la clase abstracta `Persona`
 * y añade propiedades específicas, como el correo institucional o un horario de tutorías.
 */
export class Profesor extends Persona {
  /**
   * Correo institucional del profesor.
   */
  private _correoInstitucional: string;

  /**
   * Horario de tutorías del profesor, como string (ej. "Lunes 10-12, Miércoles 16-18").
   */
  private _horarioTutorias: string;

  /**
   * Número de asignaturas que imparte el profesor.
   */
  private _asignaturas: number;

  /**
   * Constructor de la clase Profesor.
   * @param nombre - Nombre del profesor
   * @param apellidos - Apellidos del profesor
   * @param fechaNacimiento - Fecha de nacimiento del profesor
   * @param dni - DNI del profesor
   * @param correoInstitucional - Correo institucional del profesor
   * @param horarioTutorias - Horario de tutorías
   * @param asignaturas - Número de asignaturas que imparte el profesor
   */
  constructor(
    nombre: string,
    apellidos: string,
    fechaNacimiento: string,
    dni: string,
    correoInstitucional: string,
    horarioTutorias: string,
    asignaturas: number,
  ) {
    super(nombre, apellidos, fechaNacimiento, dni);
    this._correoInstitucional = correoInstitucional;
    this._horarioTutorias = horarioTutorias;
    this._asignaturas = asignaturas;
  }

  /**
   * ## getcorreoInstitucional
   * Getter para el correo institucional.
   */
  get correoInstitucional(): string | undefined {
    // 3 letras minúsculas + 8 dígitos + (@ull.edu.es ó @ull.es)
    const patron = /^[a-z]{3}\d{10}@(ull\.edu\.es|ull\.es)$/;
    if (patron.test(this._correoInstitucional)) {
      return this._correoInstitucional;
    } else {
      return undefined;
    }
  }

  /**
   * ## setcorreoInstitucional
   * Setter para el correo institucional.
   */
  set correoInstitucional(valor: string) {
    // 3 letras minúsculas + 8 dígitos + (@ull.edu.es ó @ull.es)
    const patron = /^[a-z]{3}\d{10}@(ull\.edu\.es|ull\.es)$/;
    if (patron.test(valor)) {
      this._correoInstitucional = valor;
    } else {
      console.error("Correo institucional no válido");
    }
  }

  /**
   * ## gethorarioTutorias
   * Getter para el horario de tutorías.
   */
  get horarioTutorias(): string {
    return this._horarioTutorias;
  }

  /**
   * ## sethorarioTutorias
   * Setter para el horario de tutorías.
   */
  set horarioTutorias(valor: string) {
    this._horarioTutorias = valor;
  }

  /**
   * ## getasignaturas
   * Getter para las asignaturas que imparte el profesor.
   */

  get asignaturas(): number | undefined {
    if (this._asignaturas >= 0) {
      return this._asignaturas;
    } else {
      return undefined;
    }
  }

  /**
   * ## setasignaturas
   * Setter para las asignaturas que imparte el profesor.
   */
  set asignaturas(valor: number) {
    if (valor >= 0) {
      this._asignaturas = valor;
    } else {
      console.error("El número de asignaturas no puede ser negativo");
    }
  }

  /**
   * ## mostrarDatosPersonales
   * Implementación del método abstracto para mostrar datos personales de un profesor.
   * @override
   */
  mostrarDatosPersonales(): string {
    return (
      `Profesor: ${this.nombre} ${this.apellidos}, Nacido el ${this.fechaNacimiento}, ` +
      `DNI: ${this.dni}, Correo: ${this._correoInstitucional}, Tutorías: ${this._horarioTutorias}, ` +
      `Asignaturas: ${this._asignaturas}`
    );
  }
}

/**
 * ## DatosCalificacion
 * Representa la calificación de un estudiante en la asignatura.
 * Se puede usar una tupla [Estudiante, number], pero aquí se opta por un objeto
 * que ofrece más legibilidad.
 */
interface DatosCalificacion {
  estudiante: Estudiante;
  calificacion: number;
}

/**
 * ## Asignatura
 * Clase que modela la información de una asignatura, con su código, nombre, titulación,
 * profesorado y alumnado. Permite almacenar calificaciones y realizar búsquedas.
 */
export class Asignatura {
  /**
   * Código de la asignatura (ej. "DSI-101").
   */
  private _codigo: string;

  /**
   * Nombre de la asignatura (ej. "Desarrollo de Sistemas").
   */
  private _nombre: string;

  /**
   * Titulación a la que pertenece la asignatura (ej. "Grado en Ingeniería Informática").
   */
  private _titulacion: string;

  /**
   * Array que almacena el profesorado asignado a la asignatura.
   */
  private _profesorado: Profesor[];

  /**
   * Array que almacena las calificaciones de cada estudiante en la asignatura.
   * Combina información del estudiante y su calificación.
   */
  private _calificaciones: DatosCalificacion[];

  /**
   * ## constructor
   * Crea una instancia de Asignatura.
   * @param codigo - Código de la asignatura.
   * @param nombre - Nombre de la asignatura.
   * @param titulacion - Titulación a la que pertenece la asignatura.
   */
  constructor(codigo: string, nombre: string, titulacion: string) {
    this._codigo = codigo;
    this._nombre = nombre;
    this._titulacion = titulacion;
    this._profesorado = [];
    this._calificaciones = [];
  }

  /**
   * ## getcodigo
   * Getter para el código de la asignatura.
   */
  get codigo(): string {
    return this._codigo;
  }

  /**
   * ## getnombre
   * Getter para el nombre de la asignatura.
   */
  get nombre(): string {
    return this._nombre;
  }

  /**
   * ## gettitulacion
   * Getter para la titulación.
   */
  get titulacion(): string {
    return this._titulacion;
  }

  /**
   * ## agregarProfesor
   * Agregar un profesor a la asignatura.
   * @param profesor - Instancia de Profesor a añadir.
   */
  agregarProfesor(profesor: Profesor): void {
    this._profesorado.push(profesor);
  }

  /**
   * ## agregarEstudiante
   * Agregar un estudiante con una calificación inicial.
   * @param estudiante - Estudiante a matricular en la asignatura.
   * @param calificacion - Calificación inicial del estudiante (por defecto 0).
   */
  agregarEstudiante(estudiante: Estudiante, calificacion: number = 0): void {
    const registro: DatosCalificacion = {
      estudiante: estudiante,
      calificacion: calificacion,
    };
    this._calificaciones.push(registro);
  }

  /**
   * ## actualizarCalificacion
   * Modifica la calificación de un estudiante concreto.
   * @param estudiante - El estudiante cuya nota queremos actualizar.
   * @param nuevaNota - La nueva calificación que queremos asignar.
   */
  actualizarCalificacion(estudiante: Estudiante, nuevaNota: number): void {
    this._calificaciones.forEach((datos) => {
      if (datos.estudiante === estudiante) {
        datos.calificacion = nuevaNota;
      }
    });
  }

  /**
   * ## mostrarProfesorado
   * Muestra todos los datos personales del profesorado que imparte la asignatura, como string.
   */
  mostrarProfesorado(): string {
    let resultado = "";
    this._profesorado.forEach((prof) => {
      resultado += `${prof.nombre} ${prof.apellidos}, ${prof.fechaNacimiento}, ${prof.dni}, ${prof.correoInstitucional}, ${prof.asignaturas}\n`;
    });
    return resultado;
  }

  /**
   * ## mostrarAlumnado
   * Muestra todos los datos personales del alumnado que cursa la asignatura,
   * junto con su calificación, como string.
   */
  mostrarAlumnado(): string {
    let resultado = "";
    this._calificaciones.forEach((registro) => {
      const estudiante = registro.estudiante;
      resultado += `${estudiante.nombre} ${estudiante.apellidos}, ${estudiante.fechaNacimiento}, ${estudiante.dni}, ${estudiante.correoInstitucional}, ${estudiante.cursoActual}, Calificación: ${registro.calificacion}\n`;
    });
    return resultado;
  }

  /**
   * ## buscarProfesor
   * Busca al profesorado por nombre, apellidos, fecha de nacimiento, dni,
   * correo o número de asignaturas.
   * @param texto - Texto a buscar.
   * @returns Array de profesores que coinciden con la búsqueda.
   */
  buscarProfesor(texto: string | number): Profesor[] {
    const resultado: Profesor[] = [];
    this._profesorado.forEach((prof) => {
      const coincide =
        prof.nombre === texto ||
        prof.apellidos === texto ||
        prof.fechaNacimiento === texto ||
        prof.dni === texto ||
        prof.correoInstitucional === texto ||
        prof.asignaturas === texto;
      if (coincide) {
        resultado.push(prof);
      }
    });
    return resultado;
  }

  /**
   * ## buscarEstudiante
   * Busca al alumnado por nombre, apellidos, fecha de nacimiento, dni, correo
   * o curso.
   * @param texto - Texto a buscar (nombre o correo).
   * @returns Array de estudiantes que coinciden con la búsqueda.
   */
  buscarEstudiante(texto: string): Estudiante[] {
    const resultado: Estudiante[] = [];
    this._calificaciones.forEach((registro) => {
      const estudiante = registro.estudiante;
      const coincide =
        estudiante.nombre === texto ||
        estudiante.apellidos === texto ||
        estudiante.fechaNacimiento === texto ||
        estudiante.dni === texto ||
        estudiante.correoInstitucional === texto ||
        estudiante.cursoActual === texto;
      if (coincide) {
        resultado.push(estudiante);
      }
    });
    return resultado;
  }

  /**
   * ## buscarAlumnadoPorCalificacion
   * Obtiene el alumnado que haya obtenido cierta calificación en la asignatura.
   * @param nota - Calificación exacta a buscar.
   * @returns Array de estudiantes que tienen la calificación buscada.
   */
  buscarAlumnadoPorCalificacion(nota: number): Estudiante[] {
    const resultado: Estudiante[] = [];
    this._calificaciones.forEach((registro) => {
      if (registro.calificacion === nota) {
        resultado.push(registro.estudiante);
      }
    });
    return resultado;
  }
}
