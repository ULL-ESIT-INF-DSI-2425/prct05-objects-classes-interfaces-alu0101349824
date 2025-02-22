import { describe, test, expect, vi } from "vitest";
import { Cancion, Disco, Artista, BibliotecaMusical } from "../src/ejercicio-2";

describe("Clase Cancion", () => {
  test("Creación de una canción y verificación de propiedades", () => {
    const cancion = new Cancion("SongTest", 180, ["Pop", "Rock"], true, 1000);
    expect(cancion.nombre).toBe("SongTest");
    expect(cancion.duracion).toBe(180);
    expect(cancion.generos).toEqual(["Pop", "Rock"]);
    expect(cancion.single).toBe(true);
    expect(cancion.reproducciones).toBe(1000);
  });
});

describe("Clase Disco", () => {
  test("Creación de un disco con canciones", () => {
    const c1 = new Cancion("Cancion1", 200, ["Pop"], true, 3000);
    const c2 = new Cancion("Cancion2", 250, ["Rock"], false, 1500);
    const disco = new Disco("DiscoTest", 2021, [c1, c2]);

    expect(disco.nombre).toBe("DiscoTest");
    expect(disco.anioPublicacion).toBe(2021);
    expect(disco.canciones.length).toBe(2);
    expect(disco.canciones[0].nombre).toBe("Cancion1");
    expect(disco.canciones[1].nombre).toBe("Cancion2");
  });
});

describe("Clase Artista", () => {
  test("Creación de un artista con discografía", () => {
    const c = new Cancion("Cancion", 210, ["Pop"], true, 5000);
    const d = new Disco("Disco", 2020, [c]);
    const artista = new Artista("ArtistaTest", 100000, [d]);

    expect(artista.nombre).toBe("ArtistaTest");
    expect(artista.oyentesMensuales).toBe(100000);
    expect(artista.discografia.length).toBe(1);
    expect(artista.discografia[0].nombre).toBe("Disco");
  });
});

describe("Clase BibliotecaMusical", () => {
  test("Agregar artistas y mostrarBiblioteca (sin comprobar salida de consola)", () => {
    const biblioteca = new BibliotecaMusical();
    const artista = new Artista("A1", 50000, []);
    biblioteca.agregarArtista(artista);

    const spy = vi.spyOn(console, "table");
    biblioteca.mostrarBiblioteca();
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();

    // Verificamos que el artista se haya agregado
    const resultado = biblioteca.buscarArtista({ nombre: "A1" });
    expect(resultado.length).toBe(1);
    expect(resultado[0].nombre).toBe("A1");
  });

  test("buscarArtista: filtrar por nombre y oyentesMensuales", () => {
    const biblioteca = new BibliotecaMusical();
    const artista1 = new Artista("Artista1", 60000, []);
    const artista2 = new Artista("Artista2", 80000, []);
    biblioteca.agregarArtista(artista1);
    biblioteca.agregarArtista(artista2);

    const res1 = biblioteca.buscarArtista({ nombre: "Artista1" });
    expect(res1.length).toBe(1);
    expect(res1[0].oyentesMensuales).toBe(60000);

    const res2 = biblioteca.buscarArtista({ oyentesMensuales: 80000 });
    expect(res2.length).toBe(1);
    expect(res2[0].nombre).toBe("Artista2");

    // Sin coincidencia
    const res3 = biblioteca.buscarArtista({ nombre: "Inexistente" });
    expect(res3.length).toBe(0);
  });

  test("buscarArtista: filtrar por discografia", () => {
    const biblioteca = new BibliotecaMusical();
    const c = new Cancion("C1", 100, ["Pop"], false, 300);
    const disco = new Disco("Disco1", 2010, [c]);
    const artista = new Artista("A1", 50000, [disco]);
    biblioteca.agregarArtista(artista);

    // Coincide exactamente (mismo nombre de disco)
    const filtroCoincide = {
      discografia: [new Disco("Disco1", 0, [])], // año y canciones no importan, solo nombres
    };
    const resultado1 = biblioteca.buscarArtista(filtroCoincide);
    expect(resultado1.length).toBe(1);

    // No coincide (otro nombre de disco)
    const filtroNoCoincide = {
      discografia: [new Disco("NoExiste", 0, [])],
    };
    const resultado2 = biblioteca.buscarArtista(filtroNoCoincide);
    expect(resultado2.length).toBe(0);
  });

  test("buscarDisco: filtrar por nombre, año y canciones", () => {
    const biblioteca = new BibliotecaMusical();
    const c1 = new Cancion("C1", 180, ["Pop"], true, 1000);
    const c2 = new Cancion("C2", 220, ["Rock"], false, 2000);
    const disco1 = new Disco("Disco1", 2018, [c1]);
    const disco2 = new Disco("Disco2", 2020, [c2]);
    const artista1 = new Artista("Artista1", 1000, [disco1, disco2]);
    biblioteca.agregarArtista(artista1);

    // Por nombre
    const r1 = biblioteca.buscarDisco({ nombre: "Disco1" });
    expect(r1.length).toBe(1);
    expect(r1[0].anioPublicacion).toBe(2018);

    // Por año
    const r2 = biblioteca.buscarDisco({ anioPublicacion: 2020 });
    expect(r2.length).toBe(1);
    expect(r2[0].nombre).toBe("Disco2");

    // Por canciones (longitud 1)
    const r3 = biblioteca.buscarDisco({
      canciones: [new Cancion("", 0, [], false, 0)],
    });
    // Ambos discos tienen 1 canción, así que ambos coinciden
    expect(r3.length).toBe(2);

    // Sin coincidencias (longitud 2)
    const r4 = biblioteca.buscarDisco({
      canciones: [
        new Cancion("", 0, [], false, 0),
        new Cancion("", 0, [], false, 0),
      ],
    });
    expect(r4.length).toBe(0);
  });

  test("buscarCancion: filtrar por nombre, duracion, generos, single y reproducciones", () => {
    const biblioteca = new BibliotecaMusical();
    const c1 = new Cancion("CancionA", 200, ["Pop", "Rock"], true, 1000);
    const c2 = new Cancion("CancionB", 250, ["Jazz"], false, 500);
    const disco1 = new Disco("DiscoA", 2019, [c1, c2]);
    const artista1 = new Artista("ArtistaA", 20000, [disco1]);
    biblioteca.agregarArtista(artista1);

    // Por nombre
    const r1 = biblioteca.buscarCancion({ nombre: "CancionA" });
    expect(r1.length).toBe(1);
    expect(r1[0].single).toBe(true);

    // Por duracion
    const r2 = biblioteca.buscarCancion({ duracion: 250 });
    expect(r2.length).toBe(1);
    expect(r2[0].nombre).toBe("CancionB");

    // Por generos (coincidencia exacta)
    const r3 = biblioteca.buscarCancion({ generos: ["Pop", "Rock"] });
    expect(r3.length).toBe(1);
    expect(r3[0].nombre).toBe("CancionA");

    // No coincide (generos distintos)
    const r4 = biblioteca.buscarCancion({ generos: ["Pop"] });
    expect(r4.length).toBe(0);

    // Por single
    const r5 = biblioteca.buscarCancion({ single: false });
    expect(r5.length).toBe(1);
    expect(r5[0].nombre).toBe("CancionB");

    // Por reproducciones
    const r6 = biblioteca.buscarCancion({ reproducciones: 1000 });
    expect(r6.length).toBe(1);
    expect(r6[0].nombre).toBe("CancionA");

    // Filtro múltiple (coincide)
    const r7 = biblioteca.buscarCancion({
      nombre: "CancionA",
      duracion: 200,
      generos: ["Pop", "Rock"],
      single: true,
      reproducciones: 1000,
    });
    expect(r7.length).toBe(1);

    // Filtro múltiple (no coincide)
    const r8 = biblioteca.buscarCancion({
      nombre: "CancionA",
      duracion: 200,
      generos: ["Pop", "Rock"],
      single: true,
      reproducciones: 999,
    });
    expect(r8.length).toBe(0);
  });

  test("Cálculos de disco: numeroCanciones, duracionTotal, reproduccionesTotales", () => {
    const biblioteca = new BibliotecaMusical();
    const c1 = new Cancion("C1", 120, ["Pop"], false, 100);
    const c2 = new Cancion("C2", 200, ["Rock"], true, 400);
    const disco = new Disco("DiscoX", 2015, [c1, c2]);
    biblioteca.agregarArtista(new Artista("ArtistaX", 12345, [disco]));

    const numCanciones = biblioteca.numeroCanciones(disco);
    expect(numCanciones).toBe(2);

    const duracion = biblioteca.duracionTotal(disco);
    expect(duracion).toBe(320);

    const reproducciones = biblioteca.reproduccionesTotales(disco);
    expect(reproducciones).toBe(500);
  });

  test("mostrarBiblioteca: debe incluir los nombres de los discos en la propiedad 'discos'", () => {
    const biblioteca = new BibliotecaMusical();
    const disco1 = new Disco("DiscoA", 2021, []);
    const disco2 = new Disco("DiscoB", 2022, []);
    const artista = new Artista("ArtistaTest", 50000, [disco1, disco2]);
    biblioteca.agregarArtista(artista);

    const spy = vi.spyOn(console, "table");
    biblioteca.mostrarBiblioteca();
    // Se espera que la tabla contenga un objeto con la propiedad "discos" concatenando los nombres.
    expect(spy).toHaveBeenCalledWith([
      {
        nombre: "ArtistaTest",
        oyentesMensuales: 50000,
        discos: "DiscoA, DiscoB",
      },
    ]);
    spy.mockRestore();
  });
});
