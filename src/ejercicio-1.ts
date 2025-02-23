/**
 * # Ejercicio 1: Combates Pokemon
 * Estructura de clases, interfaces y funciones para simular combates entre
 * Pokémon y buscarlos en una Pokedex. Se usa un sistema de tipos y efectividades
 * para calcular el daño de los ataques. También se incluye una clase para simular
 * combates entre Pokémon y una clase para almacenar y buscar Pokémon en una Pokedex.
 *
 * Este diseño sigue los principios SOLID de la siguiente manera:
 *
 * - **Single Responsibility Principle (SRP):**
 *   Cada clase tiene una única responsabilidad:
 *     - La clase `Pokemon` representa únicamente los datos de un Pokémon.
 *     - La clase `Pokedex` se encarga de almacenar y buscar Pokémon.
 *     - La clase `Combat` simula el combate entre dos Pokémon.
 *     - La función `obtenerEfectividad` calcula la efectividad del ataque según los tipos.
 *
 * - **Open/Closed Principle (OCP):**
 *   El código está abierto a la extensión sin modificar su comportamiento existente.
 *   Por ejemplo, se pueden añadir nuevos tipos de Pokémon o ampliar los criterios de búsqueda
 *   (nuevos filtros) sin alterar las clases ya implementadas.
 *
 * - **Liskov Substitution Principle (LSP):**
 *   La clase `Pokemon` implementa la interfaz `IPokemon`, por lo que cualquier instancia
 *   de `Pokemon` puede ser utilizada donde se espere un `IPokemon`, garantizando la sustitución sin errores.
 *
 * - **Interface Segregation Principle (ISP):**
 *   Se definen interfaces específicas como `IPokemon` y `FiltroPokemon` que exponen solo
 *   las propiedades necesarias, evitando que las clases dependan de atributos o métodos no utilizados.
 *
 * - **Dependency Inversion Principle (DIP):**
 *   Las clases de alto nivel, como `Pokedex`, dependen de abstracciones (las interfaces)
 *   y no de implementaciones concretas. Esto permite modificar la forma en que se representan
 *   los Pokémon sin afectar la lógica de búsqueda o almacenamiento.
 *
 * @example
 * ```ts
 * // Crear un Charmander
 * const charmander = new Pokemon(
 *  "Charmander",
 *  8.5,
 *  0.6,
 *  TipoPokemon.Fuego,
 *  52,
 *  43,
 *  65,
 *  100
 * );
 * // Crear un Bulbasaur
 * const bulbasaur = new Pokemon(
 *  "Bulbasaur",
 *  6.9,
 *  0.7,
 *  TipoPokemon.Hierba,
 *  49,
 *  49,
 *  45,
 *  100
 * );
 * // Crear una Pokedex
 * const pokedex = new Pokedex();
 * // Agregar un Charmander
 * pokedex.agregarPokemon(charmander);
 * // Agregar un Bulbasaur
 * pokedex.agregarPokemon(bulbasaur);
 * // Mostrar todos los Pokémon
 * pokedex.mostrarPokemon();
 * // Buscar un Pokémon de tipo fuego
 * const resultado = pokedex.buscarPokemon({ tipo: TipoPokemon.Fuego });
 * // Crear un combate entre Charmander y Bulbasaur
 * const combate = new Combat(charmander, bulbasaur);
 * // Iniciar el combate
 * const ganador = combate.start();
 * ```
 */

/**
 * ## TipoPokemon
 * Enumerado que representa los posibles tipos de Pokémon.
 * @example
 * ```ts
 * TipoPokemon.Fuego // "fuego"
 * TipoPokemon.Agua // "agua"
 * TipoPokemon.Hierba // "hierba"
 * TipoPokemon.Electrico // "electrico"
 * ```
 */
export enum TipoPokemon {
  Fuego = "fuego",
  Agua = "agua",
  Hierba = "hierba",
  Electrico = "electrico",
}

/**
 * ## IPokemon
 * Interfaz que define la estructura de un Pokémon.
 * @example
 * ```ts
 * // Crear un Charmander
 * const charmander: IPokemon = {
 *  nombre: "Charmander",
 *  peso: 8.5,
 *  altura: 0.6,
 *  tipo: TipoPokemon.Fuego,
 *  ataque: 52,
 *  defensa: 43,
 *  velocidad: 65,
 *  hp: 100
 * };
 * ```
 */
export interface IPokemon {
  nombre: string;
  peso: number;
  altura: number;
  tipo: TipoPokemon;
  ataque: number;
  defensa: number;
  velocidad: number;
  hp: number; // Daño máximo (HP)
}

/**
 * ## Pokemon
 * Clase que representa un Pokémon.
 * Hereda de la interfaz IPokemon.
 * @example
 * ```ts
 * // Crear un Charmander
 * const charmander = new Pokemon(
 *  "Charmander",
 *  8.5,
 *  0.6,
 *  TipoPokemon.Fuego,
 *  52,
 *  43,
 *  65,
 *  100
 * );
 * ```
 */
export class Pokemon implements IPokemon {
  public nombre: string;
  public peso: number;
  public altura: number;
  public tipo: TipoPokemon;
  public ataque: number;
  public defensa: number;
  public velocidad: number;
  public hp: number;

  /**
   * ## constructor
   * Crea una instancia de Pokemon.
   * @param nombre - Nombre del Pokémon.
   * @param peso - Peso del Pokémon.
   * @param altura - Altura del Pokémon.
   * @param tipo - Tipo del Pokémon.
   * @param ataque - Capacidad de ataque.
   * @param defensa - Capacidad de defensa.
   * @param velocidad - Velocidad del Pokémon.
   * @param hp - Puntos máximos de vida.
   * @example
   * ```ts
   * // Crear un Charmander
   * const charmander = new Pokemon(
   *   "Charmander",
   *   8.5,
   *   0.6,
   *   TipoPokemon.Fuego,
   *   52,
   *   43,
   *   65,
   *   100
   * );
   * ```
   */
  constructor(
    nombre: string,
    peso: number,
    altura: number,
    tipo: TipoPokemon,
    ataque: number,
    defensa: number,
    velocidad: number,
    hp: number,
  ) {
    this.nombre = nombre;
    this.peso = peso;
    this.altura = altura;
    this.tipo = tipo;
    this.ataque = ataque;
    this.defensa = defensa;
    this.velocidad = velocidad;
    this.hp = hp;
  }
}

/**
 * ## FiltroPokemon
 * Interfaz para definir un filtro de búsqueda de Pokémon.
 * @example
 * ```ts
 * // Buscar un Pokémon de tipo fuego
 * const filtro: FiltroPokemon = { tipo: TipoPokemon.Fuego };
 * ```
 */
export interface FiltroPokemon {
  nombre?: string;
  peso?: number;
  altura?: number;
  tipo?: TipoPokemon;
  ataque?: number;
  defensa?: number;
  velocidad?: number;
  hp?: number;
}

/**
 * ## Pokedex
 * Clase que representa una Pokedex para almacenar y buscar Pokémon.
 * @example
 * ```ts
 * // Crear una Pokedex
 * const pokedex = new Pokedex();
 * // Agregar un Charmander
 * pokedex.agregarPokemon(charmander);
 * // Mostrar todos los Pokémon
 * pokedex.mostrarPokemon();
 * // Buscar un Pokémon de tipo fuego
 * const resultado = pokedex.buscarPokemon({ tipo: TipoPokemon.Fuego });
 * ```
 */
export class Pokedex {
  private listaPokemon: Pokemon[];

  constructor() {
    this.listaPokemon = [];
  }

  /**
   * ## agregarPokemon
   * Agrega un Pokémon a la Pokedex.
   * @param pokemon - El Pokémon a agregar.
   */
  agregarPokemon(pokemon: Pokemon): void {
    this.listaPokemon.push(pokemon);
  }

  /**
   * ## mostrarPokemon
   * Muestra por consola la información de todos los Pokémon.
   */
  mostrarPokemon(): void {
    this.listaPokemon.forEach((pokemon) => {
      console.log(
        `Nombre: ${pokemon.nombre}, Tipo: ${pokemon.tipo}, Peso: ${pokemon.peso}, Altura: ${pokemon.altura}, Ataque: ${pokemon.ataque}, Defensa: ${pokemon.defensa}, Velocidad: ${pokemon.velocidad}, HP: ${pokemon.hp}`,
      );
    });
  }

  /**
   * ## buscarPokemon
   * Busca Pokémon que cumplan con el filtro dado.
   * @param filtro - Objeto con las propiedades a filtrar.
   * @returns Array de Pokémon que coinciden con el filtro.
   */
  buscarPokemon(filtro: FiltroPokemon): Pokemon[] {
    const resultado: Pokemon[] = [];
    this.listaPokemon.forEach((pokemon) => {
      let coincide = true;
      if (filtro.nombre !== undefined && pokemon.nombre !== filtro.nombre) {
        coincide = false;
      }
      if (filtro.peso !== undefined && pokemon.peso !== filtro.peso) {
        coincide = false;
      }
      if (filtro.altura !== undefined && pokemon.altura !== filtro.altura) {
        coincide = false;
      }
      if (filtro.tipo !== undefined && pokemon.tipo !== filtro.tipo) {
        coincide = false;
      }
      if (filtro.ataque !== undefined && pokemon.ataque !== filtro.ataque) {
        coincide = false;
      }
      if (filtro.defensa !== undefined && pokemon.defensa !== filtro.defensa) {
        coincide = false;
      }
      if (
        filtro.velocidad !== undefined &&
        pokemon.velocidad !== filtro.velocidad
      ) {
        coincide = false;
      }
      if (filtro.hp !== undefined && pokemon.hp !== filtro.hp) {
        coincide = false;
      }
      if (coincide) {
        resultado.push(pokemon);
      }
    });
    return resultado;
  }
}

/**
 * ## obtenerEfectividad
 * Calcula la efectividad del ataque basado en los tipos del atacante y del defensor.
 * @param tipoAtacante - Tipo del Pokémon atacante.
 * @param tipoDefensor - Tipo del Pokémon defensor.
 * @returns Un número representando la efectividad: 2 (efectivo), 1 (neutral), 0.5 (no efectivo).
 */
export function obtenerEfectividad(
  tipoAtacante: TipoPokemon,
  tipoDefensor: TipoPokemon,
): number {
  if (tipoAtacante === TipoPokemon.Fuego) {
    if (tipoDefensor === TipoPokemon.Hierba) return 2;
    if (tipoDefensor === TipoPokemon.Agua) return 0.5;
    if (tipoDefensor === TipoPokemon.Electrico) return 1;
  }
  if (tipoAtacante === TipoPokemon.Agua) {
    if (tipoDefensor === TipoPokemon.Hierba) return 0.5;
    if (tipoDefensor === TipoPokemon.Electrico) return 0.5;
  }
  if (tipoAtacante === TipoPokemon.Hierba) {
    // Se infiere que al ser agua < hierba, el ataque de hierba contra agua es efectivo.
    if (tipoDefensor === TipoPokemon.Agua) return 2;
    // De igual forma, al ser fuego > hierba, el ataque de hierba contra fuego es poco efectivo.
    if (tipoDefensor === TipoPokemon.Fuego) return 0.5;
    if (tipoDefensor === TipoPokemon.Electrico) return 1;
  }
  // Por defecto, se considera neutral.
  return 1;
}

/**
 * ## Combat
 * Clase que simula un combate entre dos Pokémon.
 * @example
 * ```ts
 * // Crear un combate entre Charmander y Bulbasaur
 * const combate = new Combat(charmander, bulbasaur);
 * // Iniciar el combate
 * const ganador = combate.start();
 * ```
 */
export class Combat {
  private contrincante1: Pokemon;
  private contrincante2: Pokemon;

  /**
   * ## constructor
   * Crea un combate entre dos Pokémon.
   * El primer Pokémon es el primero en atacar.
   * @param pokemon1 - Primer Pokémon.
   * @param pokemon2 - Segundo Pokémon.
   */
  constructor(pokemon1: Pokemon, pokemon2: Pokemon) {
    this.contrincante1 = pokemon1;
    this.contrincante2 = pokemon2;
  }

  /**
   * ## start
   * Inicia la simulación del combate.
   * En cada turno, el Pokémon atacante reduce el HP del defensor según el daño calculado.
   * Se muestra por consola la evolución del combate.
   * @returns El Pokémon ganador del combate.
   */
  start(): Pokemon {
    let atacante: Pokemon = this.contrincante1;
    let defensor: Pokemon = this.contrincante2;
    while (atacante.hp > 0 && defensor.hp > 0) {
      const efectividad = obtenerEfectividad(atacante.tipo, defensor.tipo);
      const danio = 50 * (atacante.ataque / defensor.defensa) * efectividad;
      // Se actualiza el HP del defensor
      defensor.hp = defensor.hp - danio;
      if (defensor.hp < 0) {
        defensor.hp = 0;
      }
      console.log(
        `${atacante.nombre} ataca a ${defensor.nombre}. HP de ${defensor.nombre}: ${defensor.hp.toFixed(
          2,
        )}`,
      );
      // Si el defensor se queda sin HP, termina el combate.
      if (defensor.hp === 0) {
        console.log(`${atacante.nombre} ha ganado el combate.`);
        return atacante;
      }
      // Se intercambian los roles para el siguiente turno.
      const temporal = atacante;
      atacante = defensor;
      defensor = temporal;
    }
    // Esta línea no se alcanzará en un combate normal.
    return atacante;
  }
}
