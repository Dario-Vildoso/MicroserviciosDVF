const path = require("path");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = path.join(__dirname, "proto", "universidad.proto");
const packageDef = protoLoader.loadSync(PROTO_PATH, { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true });
const proto = grpc.loadPackageDefinition(packageDef).universidad;

const client = new proto.Universidad("localhost:50051", grpc.credentials.createInsecure());

function callAgregarEstudiante(estudiante) {
  return new Promise((resolve, reject) => {
    client.AgregarEstudiante(estudiante, (err, res) => {
      if (err) return reject(err);
      console.log("Estudiante Agregado:", res.message);
      resolve(res);
    });
  });
}

function callAgregarCurso(curso) {
  return new Promise((resolve, reject) => {
    client.AgregarCurso(curso, (err, res) => {
      if (err) return reject(err);
      console.log("Curso Agregado:", res.message);
      resolve(res);
    });
  });
}

function callInscribir(req) {
  return new Promise((resolve, reject) => {
    client.InscribirEstudiante(req, (err, res) => {
      if (err) return reject(err);
      console.log("Estudiante Inscrito", res.message);
      resolve(res);
    });
  });
}

function callListarCursos(ci) {
  return new Promise((resolve, reject) => {
    client.ListarCursosDeEstudiante({ ci }, (err, res) => {
      if (err) return reject(err);
      console.log(`Cursos de ${ci}:`, res.cursos);
      resolve(res);
    });
  });
}

function callListarEstudiantes(codigo) {
  return new Promise((resolve, reject) => {
    client.ListarEstudiantesDeCurso({ codigo }, (err, res) => {
      if (err) return reject(err);
      console.log(`Estudiantes en ${codigo}:`, res.estudiantes);
      resolve(res);
    });
  });
}

async function main() {
  try {
    // 1) Registrar un estudiante
    await callAgregarEstudiante({ ci: "12345678", nombres: "María", apellidos: "López", carrera: "Sistemas" });

    // 2) Registrar dos cursos
    await callAgregarCurso({ codigo: "SIS101", nombre: "Algoritmos", docente: "Dr. Perez" });
    await callAgregarCurso({ codigo: "SIS102", nombre: "Bases de Datos", docente: "Dra. Gomez" });

    // 3) Inscribir al estudiante en ambos cursos
    await callInscribir({ ci: "12345678", codigo: "SIS101" });
    await callInscribir({ ci: "12345678", codigo: "SIS102" });

    // 4) Consultar los cursos del estudiante
    await callListarCursos("12345678");

    // 5) Consultar los estudiantes de un curso
    await callListarEstudiantes("SIS101");

    // Demonstrate ALREADY_EXISTS when trying to enroll again
    // try {
    //   await callInscribir({ ci: "12345678", codigo: "SIS101" });
    // } catch (err) {
    //   console.error("Error esperado al re-inscribir:", err.code, err.details);
    // }

  } catch (err) {
    console.error("Error en cliente:", err);
  }
}

main();
