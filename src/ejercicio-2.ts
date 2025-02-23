/**
 * # Ejercicio 2: Biblioteca Musical
 * Conjunto de clases e interfaces para almacenar información sobre artistas,
 * discos y canciones. Incluye una clase `BibliotecaMusical` para gestionar la
 *  información. Las clases `Cancion`, `Disco` y `Artista` implementan las
 * interfaces `ICancion`, `IDisco` e `IArtista` respectivamente. La clase
 * `BibliotecaMusical` permite agregar artistas, buscar información y calcular
 * datos de discos.
 *
 * - **Single Responsibility Principle (SRP):**
 *   Cada clase tiene una única responsabilidad:
 *     - `Cancion` se encarga de representar la información de una canción.
 *     - `Disco` encapsula la información de un álbum y sus canciones.
 *     - `Artista` almacena la información de un artista y su discografía.
 *     - `BibliotecaMusical` gestiona el almacenamiento, búsqueda y cálculo de datos de la biblioteca.
 *
 * - **Open/Closed Principle (OCP):**
 *   Las clases están abiertas a extensión sin modificar su comportamiento existente.
 *   Por ejemplo, se pueden añadir nuevos filtros de búsqueda o nuevas operaciones sobre discos
 *   sin alterar las clases actuales.
 *
 * - **Liskov Substitution Principle (LSP):**
 *   Cada clase que implementa una interfaz (por ejemplo, `Cancion` implementa `ICancion`)
 *   puede ser usada en lugar de la interfaz sin afectar el comportamiento del sistema.
 *
 * - **Interface Segregation Principle (ISP):**
 *   Se han definido interfaces específicas (`ICancion`, `IDisco` e `IArtista`) para que los consumidores
 *   de estos datos dependan únicamente de lo que necesitan, evitando depender de métodos o propiedades no utilizados.
 *
 * - **Dependency Inversion Principle (DIP):**
 *   Las clases de alto nivel, como `BibliotecaMusical`, dependen de abstracciones (interfaces) en lugar de
 *   implementaciones concretas, lo que facilita modificar la forma en que se representan los datos sin afectar la lógica de la biblioteca.
 *
 * @example
 * ```ts
 * const cancion = new Cancion("Canción1", 210, ["Pop", "Rock"], true, 15000);
 * const disco = new Disco("Álbum1", 2020, [cancion]);
 * const artista = new Artista("Artista1", 50000, [disco]);
 * const biblioteca = new BibliotecaMusical();
 * biblioteca.agregarArtista(artista);
 * biblioteca.mostrarBiblioteca();
 * const resultados = biblioteca.buscarCancion({ nombre: "Canción1" });
 * ```
 */

/**
 * ## ICancion
 * Interfaz que define la estructura de una canción.
 * @example
 * ```ts
 * const cancion: ICancion = {
 *   nombre: "Canción1",
 *   duracion: 210,
 *   generos: ["Pop", "Rock"],
 *   single: true,
 *   reproducciones: 15000
 * };
 * ```
 */
export interface ICancion {
  nombre: string;
  duracion: number; // Duración en segundos.
  generos: string[]; // Géneros de la canción.
  single: boolean; // Indica si fue lanzada como single.
  reproducciones: number; // Número de reproducciones.
}

/**
 * ## Cancion
 * Clase que representa una canción.
 * Implementa la interfaz ICancion.
 * @example
 * ```ts
 * const cancion = new Cancion("Canción1", 210, ["Pop", "Rock"], true, 15000);
 * ```
 */
export class Cancion implements ICancion {
  public nombre: string;
  public duracion: number;
  public generos: string[];
  public single: boolean;
  public reproducciones: number;

  /**
   * Crea una instancia de Cancion.
   * @param nombre - Nombre de la canción.
   * @param duracion - Duración en segundos.
   * @param generos - Géneros de la canción.
   * @param single - Indica si la canción es single.
   * @param reproducciones - Número de reproducciones.
   */
  constructor(
    nombre: string,
    duracion: number,
    generos: string[],
    single: boolean,
    reproducciones: number,
  ) {
    this.nombre = nombre;
    this.duracion = duracion;
    this.generos = generos;
    this.single = single;
    this.reproducciones = reproducciones;
  }
}

/**
 * ## IDisco
 * Interfaz que define la estructura de un disco o álbum.
 * @example
 * ```ts
 * const disco: IDisco = {
 *   nombre: "Álbum1",
 *   anioPublicacion: 2020,
 *   canciones: [cancion1, cancion2]
 * };
 * ```
 */
export interface IDisco {
  nombre: string;
  anioPublicacion: number;
  canciones: Cancion[];
}

/**
 * ## Disco
 * Clase que representa un disco o álbum.
 * Implementa la interfaz IDisco.
 * @example
 * ```ts
 * const disco = new Disco("Álbum1", 2020, [cancion1, cancion2]);
 * ```
 */
export class Disco implements IDisco {
  public nombre: string;
  public anioPublicacion: number;
  public canciones: Cancion[];

  /**
   * ## constructor
   * Crea una instancia de Disco.
   * @param nombre - Nombre del disco.
   * @param anioPublicacion - Año de publicación.
   * @param canciones - Array de canciones que conforman el disco.
   */
  constructor(nombre: string, anioPublicacion: number, canciones: Cancion[]) {
    this.nombre = nombre;
    this.anioPublicacion = anioPublicacion;
    this.canciones = canciones;
  }
}

/**
 * ## IArtista
 * Interfaz que define la estructura de un artista (grupo o solista).
 * @example
 * ```ts
 * const artista: IArtista = {
 *   nombre: "Artista1",
 *   oyentesMensuales: 50000,
 *   discografia: [disco1, disco2]
 * };
 * ```
 */
export interface IArtista {
  nombre: string;
  oyentesMensuales: number;
  discografia: Disco[];
}

/**
 * ## Artista
 * Clase que representa un artista, ya sea un grupo o un solista.
 * Implementa la interfaz IArtista.
 * @example
 * ```ts
 * const artista = new Artista("Artista1", 50000, [disco1, disco2]);
 * ```
 */
export class Artista implements IArtista {
  public nombre: string;
  public oyentesMensuales: number;
  public discografia: Disco[];

  /**
   * ## constructor
   * Crea una instancia de Artista.
   * @param nombre - Nombre del artista.
   * @param oyentesMensuales - Número de oyentes mensuales.
   * @param discografia - Colección de discos del artista.
   */
  constructor(nombre: string, oyentesMensuales: number, discografia: Disco[]) {
    this.nombre = nombre;
    this.oyentesMensuales = oyentesMensuales;
    this.discografia = discografia;
  }
}

/**
 * ## BibliotecaMusical
 * Clase que representa una biblioteca musical.
 * Permite almacenar artistas, buscar información y calcular datos de discos.
 * @example
 * ```ts
 * const biblioteca = new BibliotecaMusical();
 * biblioteca.agregarArtista(artista);
 * biblioteca.mostrarBiblioteca();
 * const resultados = biblioteca.buscarCancion({ nombre: "Canción1" });
 * ```
 */
export class BibliotecaMusical {
  private artistas: Artista[];

  constructor() {
    this.artistas = [];
  }

  /**
   * ## agregarArtista
   * Agrega un artista a la biblioteca.
   * @param artista - El artista a agregar.
   */
  agregarArtista(artista: Artista): void {
    this.artistas.push(artista);
  }

  /**
   * ## mostrarBiblioteca
   * Muestra la información de la biblioteca en formato de tabla.
   * Utiliza console.table para mostrar nombre del artista, oyentes mensuales y nombres de discos.
   */
  mostrarBiblioteca(): void {
    const tabla: {
      nombre: string;
      oyentesMensuales: number;
      discos: string;
    }[] = [];
    this.artistas.forEach((artista) => {
      const nombresDiscos: string[] = [];
      artista.discografia.forEach((disco) => {
        nombresDiscos.push(disco.nombre);
      });
      tabla.push({
        nombre: artista.nombre,
        oyentesMensuales: artista.oyentesMensuales,
        discos: nombresDiscos.join(", "),
      });
    });
    console.table(tabla);
  }

  /**
   * ## buscarArtista
   * Busca artistas que cumplan con un filtro dado.
   * @param filtro - Objeto parcial con propiedades de IArtista para filtrar.
   * @returns Array de artistas que coinciden con el filtro.
   */
  buscarArtista(filtro: Partial<IArtista>): Artista[] {
    const resultado: Artista[] = [];
    this.artistas.forEach((artista) => {
      let coincide = true;
      if (filtro.nombre !== undefined && artista.nombre !== filtro.nombre) {
        coincide = false;
      }
      if (
        filtro.oyentesMensuales !== undefined &&
        artista.oyentesMensuales !== filtro.oyentesMensuales
      ) {
        coincide = false;
      }
      if (filtro.discografia !== undefined) {
        // Se comparan los nombres de los discos para una coincidencia sencilla.
        let nombresArtista = "";
        artista.discografia.forEach((disco) => {
          nombresArtista += disco.nombre + ",";
        });
        let nombresFiltro = "";
        filtro.discografia.forEach((disco) => {
          nombresFiltro += disco.nombre + ",";
        });
        if (nombresArtista !== nombresFiltro) {
          coincide = false;
        }
      }
      if (coincide) {
        resultado.push(artista);
      }
    });
    return resultado;
  }

  /**
   * ## buscarDisco
   * Busca discos que cumplan con un filtro dado en toda la biblioteca.
   * @param filtro - Objeto parcial con propiedades de IDisco para filtrar.
   * @returns Array de discos que coinciden con el filtro.
   */
  buscarDisco(filtro: Partial<IDisco>): Disco[] {
    const resultado: Disco[] = [];
    this.artistas.forEach((artista) => {
      artista.discografia.forEach((disco) => {
        let coincide = true;
        if (filtro.nombre !== undefined && disco.nombre !== filtro.nombre) {
          coincide = false;
        }
        if (
          filtro.anioPublicacion !== undefined &&
          disco.anioPublicacion !== filtro.anioPublicacion
        ) {
          coincide = false;
        }
        if (filtro.canciones !== undefined) {
          if (disco.canciones.length !== filtro.canciones.length) {
            coincide = false;
          }
        }
        if (coincide) {
          resultado.push(disco);
        }
      });
    });
    return resultado;
  }

  /**
   * ## buscarCancion
   * Busca canciones que cumplan con un filtro dado en toda la biblioteca.
   * @param filtro - Objeto parcial con propiedades de ICancion para filtrar.
   * @returns Array de canciones que coinciden con el filtro.
   */
  buscarCancion(filtro: Partial<ICancion>): Cancion[] {
    const resultado: Cancion[] = [];
    this.artistas.forEach((artista) => {
      artista.discografia.forEach((disco) => {
        disco.canciones.forEach((cancion) => {
          let coincide = true;
          if (filtro.nombre !== undefined && cancion.nombre !== filtro.nombre) {
            coincide = false;
          }
          if (
            filtro.duracion !== undefined &&
            cancion.duracion !== filtro.duracion
          ) {
            coincide = false;
          }
          if (filtro.generos !== undefined) {
            let generosCancion = "";
            cancion.generos.forEach((g) => {
              generosCancion += g + ",";
            });
            let generosFiltro = "";
            filtro.generos.forEach((g) => {
              generosFiltro += g + ",";
            });
            if (generosCancion !== generosFiltro) {
              coincide = false;
            }
          }
          if (filtro.single !== undefined && cancion.single !== filtro.single) {
            coincide = false;
          }
          if (
            filtro.reproducciones !== undefined &&
            cancion.reproducciones !== filtro.reproducciones
          ) {
            coincide = false;
          }
          if (coincide) {
            resultado.push(cancion);
          }
        });
      });
    });
    return resultado;
  }

  /**
   * ## numeroCanciones
   * Calcula el número de canciones incluidas en un disco concreto.
   * @param disco - El disco del cual se calculará el número de canciones.
   * @returns Número de canciones en el disco.
   */
  numeroCanciones(disco: Disco): number {
    let contador = 0;
    disco.canciones.forEach(() => {
      contador++;
    });
    return contador;
  }

  /**
   * ## duracionTotal
   * Calcula la duración total de un disco, sumando la duración de cada canción.
   * @param disco - El disco del cual se calculará la duración.
   * @returns Duración total en segundos.
   */
  duracionTotal(disco: Disco): number {
    let suma = 0;
    disco.canciones.forEach((cancion) => {
      suma += cancion.duracion;
    });
    return suma;
  }

  /**
   * ## reproduccionesTotales
   * Calcula el número total de reproducciones de un disco, sumando las reproducciones de sus canciones.
   * @param disco - El disco del cual se calculará el total de reproducciones.
   * @returns Número total de reproducciones.
   */
  reproduccionesTotales(disco: Disco): number {
    let suma = 0;
    disco.canciones.forEach((cancion) => {
      suma += cancion.reproducciones;
    });
    return suma;
  }
}
