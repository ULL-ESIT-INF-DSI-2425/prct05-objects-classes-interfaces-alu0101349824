import { describe, expect, test, vi } from "vitest";
import {
  Pokemon,
  Pokedex,
  TipoPokemon,
  Combat,
  obtenerEfectividad,
} from "../src/ejercicio-1";

describe("Pokedex", () => {
  test("Buscar Pokémon por tipo", () => {
    const pokedex = new Pokedex();
    const charmander = new Pokemon(
      "Charmander",
      8.5,
      0.6,
      TipoPokemon.Fuego,
      52,
      43,
      65,
      100,
    );
    const bulbasaur = new Pokemon(
      "Bulbasaur",
      6.9,
      0.7,
      TipoPokemon.Hierba,
      49,
      49,
      45,
      100,
    );
    pokedex.agregarPokemon(charmander);
    pokedex.agregarPokemon(bulbasaur);
    const resultado = pokedex.buscarPokemon({ tipo: TipoPokemon.Fuego });
    expect(resultado.length).toBe(1);
    expect(resultado[0].nombre).toBe("Charmander");
  });

  test("Buscar Pokémon con filtro múltiple", () => {
    const pokedex = new Pokedex();
    const pokemon1 = new Pokemon(
      "Pokemon1",
      10,
      1,
      TipoPokemon.Fuego,
      50,
      40,
      50,
      100,
    );
    const pokemon2 = new Pokemon(
      "Pokemon2",
      12,
      1.2,
      TipoPokemon.Agua,
      40,
      50,
      40,
      100,
    );
    const pokemon3 = new Pokemon(
      "Pokemon3",
      9,
      0.9,
      TipoPokemon.Fuego,
      55,
      45,
      60,
      100,
    );
    pokedex.agregarPokemon(pokemon1);
    pokedex.agregarPokemon(pokemon2);
    pokedex.agregarPokemon(pokemon3);
    // Filtrar por tipo Fuego y ataque igual a 55.
    const resultado = pokedex.buscarPokemon({
      tipo: TipoPokemon.Fuego,
      ataque: 55,
    });
    expect(resultado.length).toBe(1);
    expect(resultado[0].nombre).toBe("Pokemon3");
  });

  test("Buscar Pokémon sin coincidencias", () => {
    const pokedex = new Pokedex();
    const pokemon = new Pokemon(
      "Pokemon",
      10,
      1,
      TipoPokemon.Agua,
      50,
      40,
      50,
      100,
    );
    pokedex.agregarPokemon(pokemon);
    const resultado = pokedex.buscarPokemon({ nombre: "NoExiste" });
    expect(resultado.length).toBe(0);
  });
});

describe("Pokedex - Filtros adicionales y mostrarPokemon", () => {
  test("Buscar Pokémon por peso", () => {
    const pokedex = new Pokedex();
    const p1 = new Pokemon("P1", 15, 1, TipoPokemon.Fuego, 50, 40, 70, 100);
    const p2 = new Pokemon("P2", 20, 1.2, TipoPokemon.Agua, 40, 50, 60, 100);
    pokedex.agregarPokemon(p1);
    pokedex.agregarPokemon(p2);
    const resultado = pokedex.buscarPokemon({ peso: 20 });
    expect(resultado.length).toBe(1);
    expect(resultado[0].nombre).toBe("P2");
  });

  test("Buscar Pokémon por altura", () => {
    const pokedex = new Pokedex();
    const p1 = new Pokemon("P1", 15, 1, TipoPokemon.Fuego, 50, 40, 70, 100);
    const p2 = new Pokemon("P2", 20, 1.5, TipoPokemon.Agua, 40, 50, 60, 100);
    pokedex.agregarPokemon(p1);
    pokedex.agregarPokemon(p2);
    const resultado = pokedex.buscarPokemon({ altura: 1.5 });
    expect(resultado.length).toBe(1);
    expect(resultado[0].nombre).toBe("P2");
  });

  test("Buscar Pokémon por defensa: coincidencia", () => {
    const pokedex = new Pokedex();
    const p1 = new Pokemon("P1", 15, 1, TipoPokemon.Fuego, 50, 40, 70, 100);
    const p2 = new Pokemon("P2", 20, 1.2, TipoPokemon.Agua, 40, 60, 60, 100);
    pokedex.agregarPokemon(p1);
    pokedex.agregarPokemon(p2);
    // Se filtra por defensa = 60, que solo coincide con p2.
    const resultado = pokedex.buscarPokemon({ defensa: 60 });
    expect(resultado.length).toBe(1);
    expect(resultado[0].nombre).toBe("P2");
  });

  test("Buscar Pokémon por defensa: sin coincidencias", () => {
    const pokedex = new Pokedex();
    const p = new Pokemon("P1", 15, 1, TipoPokemon.Fuego, 50, 40, 70, 100);
    pokedex.agregarPokemon(p);
    // Se filtra por defensa = 55, que no coincide con p (defensa 40).
    const resultado = pokedex.buscarPokemon({ defensa: 55 });
    expect(resultado.length).toBe(0);
  });

  test("Buscar Pokémon por velocidad", () => {
    const pokedex = new Pokedex();
    const p1 = new Pokemon("P1", 15, 1, TipoPokemon.Fuego, 50, 40, 80, 100);
    const p2 = new Pokemon("P2", 20, 1.2, TipoPokemon.Agua, 40, 50, 60, 100);
    pokedex.agregarPokemon(p1);
    pokedex.agregarPokemon(p2);
    const resultado = pokedex.buscarPokemon({ velocidad: 80 });
    expect(resultado.length).toBe(1);
    expect(resultado[0].nombre).toBe("P1");
  });

  test("Buscar Pokémon por HP", () => {
    const pokedex = new Pokedex();
    const p1 = new Pokemon("P1", 15, 1, TipoPokemon.Fuego, 50, 40, 70, 90);
    const p2 = new Pokemon("P2", 20, 1.2, TipoPokemon.Agua, 40, 50, 60, 100);
    pokedex.agregarPokemon(p1);
    pokedex.agregarPokemon(p2);
    const resultado = pokedex.buscarPokemon({ hp: 90 });
    expect(resultado.length).toBe(1);
    expect(resultado[0].nombre).toBe("P1");
  });

  test("Buscar Pokémon por nombre exacto", () => {
    const pokedex = new Pokedex();
    const p1 = new Pokemon("P1", 15, 1, TipoPokemon.Fuego, 50, 40, 70, 100);
    const p2 = new Pokemon("P2", 20, 1.2, TipoPokemon.Agua, 40, 50, 60, 100);
    pokedex.agregarPokemon(p1);
    pokedex.agregarPokemon(p2);
    const resultado = pokedex.buscarPokemon({ nombre: "P2" });
    expect(resultado.length).toBe(1);
    expect(resultado[0].nombre).toBe("P2");
  });

  test("mostrarPokemon imprime la información de los Pokémon", () => {
    const pokedex = new Pokedex();
    const p = new Pokemon("Test", 10, 1, TipoPokemon.Agua, 50, 50, 50, 100);
    pokedex.agregarPokemon(p);
    // Con vi spy, se puede verificar si console.log fue llamado con los datos del Pokémon. De esta forma se verifica que la función mostrarPokemon imprime la información de los Pokémon.
    const spy = vi.spyOn(console, "log");
    pokedex.mostrarPokemon();
    expect(spy).toHaveBeenCalledWith(
      `Nombre: Test, Tipo: ${TipoPokemon.Agua}, Peso: 10, Altura: 1, Ataque: 50, Defensa: 50, Velocidad: 50, HP: 100`,
    );
    spy.mockRestore();
  });
});

describe("obtenerEfectividad", () => {
  // Ramas para Pokémon de tipo Fuego
  test("Fuego vs Hierba (efectivo)", () => {
    expect(obtenerEfectividad(TipoPokemon.Fuego, TipoPokemon.Hierba)).toBe(2);
  });
  test("Fuego vs Agua (no efectivo)", () => {
    expect(obtenerEfectividad(TipoPokemon.Fuego, TipoPokemon.Agua)).toBe(0.5);
  });
  test("Fuego vs Electrico (neutral)", () => {
    expect(obtenerEfectividad(TipoPokemon.Fuego, TipoPokemon.Electrico)).toBe(
      1,
    );
  });
  test("Fuego vs Fuego (default neutral)", () => {
    expect(obtenerEfectividad(TipoPokemon.Fuego, TipoPokemon.Fuego)).toBe(1);
  });

  // Ramas para Pokémon de tipo Agua
  test("Agua vs Hierba (no efectivo)", () => {
    expect(obtenerEfectividad(TipoPokemon.Agua, TipoPokemon.Hierba)).toBe(0.5);
  });
  test("Agua vs Electrico (no efectivo)", () => {
    expect(obtenerEfectividad(TipoPokemon.Agua, TipoPokemon.Electrico)).toBe(
      0.5,
    );
  });
  test("Agua vs Fuego (default neutral)", () => {
    expect(obtenerEfectividad(TipoPokemon.Agua, TipoPokemon.Fuego)).toBe(1);
  });
  test("Agua vs Agua (default neutral)", () => {
    expect(obtenerEfectividad(TipoPokemon.Agua, TipoPokemon.Agua)).toBe(1);
  });

  // Ramas para Pokémon de tipo Hierba
  test("Hierba vs Agua (efectivo)", () => {
    expect(obtenerEfectividad(TipoPokemon.Hierba, TipoPokemon.Agua)).toBe(2);
  });
  test("Hierba vs Fuego (no efectivo)", () => {
    expect(obtenerEfectividad(TipoPokemon.Hierba, TipoPokemon.Fuego)).toBe(0.5);
  });
  test("Hierba vs Electrico (neutral)", () => {
    expect(obtenerEfectividad(TipoPokemon.Hierba, TipoPokemon.Electrico)).toBe(
      1,
    );
  });
  test("Hierba vs Hierba (default neutral)", () => {
    expect(obtenerEfectividad(TipoPokemon.Hierba, TipoPokemon.Hierba)).toBe(1);
  });

  // Para Pokémon de tipo Electrico (casos no definidos, se toma default)
  test("Electrico vs Fuego (default neutral)", () => {
    expect(obtenerEfectividad(TipoPokemon.Electrico, TipoPokemon.Fuego)).toBe(
      1,
    );
  });
  test("Electrico vs Agua (default neutral)", () => {
    expect(obtenerEfectividad(TipoPokemon.Electrico, TipoPokemon.Agua)).toBe(1);
  });
  test("Electrico vs Hierba (default neutral)", () => {
    expect(obtenerEfectividad(TipoPokemon.Electrico, TipoPokemon.Hierba)).toBe(
      1,
    );
  });
  test("Electrico vs Electrico (default neutral)", () => {
    expect(
      obtenerEfectividad(TipoPokemon.Electrico, TipoPokemon.Electrico),
    ).toBe(1);
  });
});

describe("Combate Pokémon", () => {
  test("El combate finaliza con un ganador y un Pokémon con 0 HP", () => {
    const pikachu = new Pokemon(
      "Pikachu",
      6,
      0.4,
      TipoPokemon.Electrico,
      55,
      40,
      90,
      100,
    );
    const squirtle = new Pokemon(
      "Squirtle",
      9,
      0.5,
      TipoPokemon.Agua,
      48,
      65,
      43,
      100,
    );
    const combate = new Combat(pikachu, squirtle);
    const ganador = combate.start();
    expect(ganador).toBeDefined();
    expect(ganador.hp).toBeGreaterThan(0);
    expect(pikachu.hp === 0 || squirtle.hp === 0).toBeTruthy();
  });

  test("Combate finaliza en un solo golpe", () => {
    // Para Fuego vs Hierba: efectividad = 2.
    // Daño = 50 * (100/1) * 2 = 10000, que deja al defensor con HP 0.
    const atacante = new Pokemon(
      "Atacante",
      10,
      1,
      TipoPokemon.Fuego,
      100,
      50,
      50,
      100,
    );
    const defensor = new Pokemon(
      "Defensor",
      10,
      1,
      TipoPokemon.Hierba,
      30,
      1,
      30,
      50,
    );
    const combate = new Combat(atacante, defensor);
    const ganador = combate.start();
    expect(ganador.nombre).toBe("Atacante");
    expect(defensor.hp).toBe(0);
  });

  test("Combate con intercambio de roles (múltiples turnos)", () => {
    const pokemonA = new Pokemon(
      "A",
      10,
      1,
      TipoPokemon.Electrico,
      60,
      40,
      80,
      120,
    );
    const pokemonB = new Pokemon("B", 12, 1, TipoPokemon.Agua, 50, 50, 70, 120);
    const combate = new Combat(pokemonA, pokemonB);
    const ganador = combate.start();
    expect(
      (pokemonA.hp === 0 && pokemonB.hp > 0) ||
        (pokemonB.hp === 0 && pokemonA.hp > 0),
    ).toBeTruthy();
    expect(ganador.hp).toBeGreaterThan(0);
  });

  test("Combate registra logs en cada turno", () => {
    const p1 = new Pokemon("A", 10, 1, TipoPokemon.Fuego, 100, 50, 50, 100);
    const p2 = new Pokemon("B", 10, 1, TipoPokemon.Hierba, 30, 1, 30, 50);
    const combate = new Combat(p1, p2);
    const spy = vi.spyOn(console, "log");
    combate.start();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  test("Combate sin turnos cuando un Pokémon inicia con 0 HP", () => {
    // Si el primer Pokémon tiene 0 HP, el while no se ejecuta y se retorna directamente.
    const p1 = new Pokemon("P1", 10, 1, TipoPokemon.Fuego, 50, 50, 50, 0);
    const p2 = new Pokemon("P2", 10, 1, TipoPokemon.Hierba, 50, 50, 50, 100);
    const combate = new Combat(p1, p2);
    const ganador = combate.start();
    // Se espera que retorne el primer contrincante (aunque con 0 HP)
    expect(ganador).toBe(p1);
  });
});
