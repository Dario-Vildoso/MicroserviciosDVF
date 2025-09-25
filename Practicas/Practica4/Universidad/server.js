const path = require("path");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = path.join(__dirname, "proto", "universidad.proto");
const packageDef = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const proto = grpc.loadPackageDefinition(packageDef).universidad;
const status = grpc.status;

const students = new Map(); 
const courses = new Map();  

const enrollments = new Map();
const courseEnrollments = new Map();

function AgregarEstudiante(call, callback) {
  const s = call.request;
  if (!s.ci) return callback({ code: status.INVALID_ARGUMENT, message: "ci es requerido" });
  if (students.has(s.ci)) {
    return callback({ code: status.ALREADY_EXISTS, message: `Estudiante con CI ${s.ci} ya existe` });
  }
  const student = { ci: s.ci, nombres: s.nombres || "", apellidos: s.apellidos || "", carrera: s.carrera || "" };
  students.set(s.ci, student);
  if (!enrollments.has(s.ci)) enrollments.set(s.ci, new Set());
  callback(null, { student, message: "Estudiante creado" });
}

function AgregarCurso(call, callback) {
  const c = call.request;
  if (!c.codigo) return callback({ code: status.INVALID_ARGUMENT, message: "codigo es requerido" });
  if (courses.has(c.codigo)) {
    return callback({ code: status.ALREADY_EXISTS, message: `Curso con codigo ${c.codigo} ya existe` });
  }
  const course = { codigo: c.codigo, nombre: c.nombre || "", docente: c.docente || "" };
  courses.set(c.codigo, course);
  if (!courseEnrollments.has(c.codigo)) courseEnrollments.set(c.codigo, new Set());
  callback(null, { course, message: "Curso creado" });
}

function InscribirEstudiante(call, callback) {
  const req = call.request;
  const ci = req.ci;
  const codigo = req.codigo;
  if (!ci || !codigo) return callback({ code: status.INVALID_ARGUMENT, message: "ci y codigo son requeridos" });

  const student = students.get(ci);
  if (!student) return callback({ code: status.NOT_FOUND, message: `Estudiante ${ci} no encontrado` });

  const course = courses.get(codigo);
  if (!course) return callback({ code: status.NOT_FOUND, message: `Curso ${codigo} no encontrado` });

  const sEnroll = enrollments.get(ci) || new Set();
  if (sEnroll.has(codigo)) {
    return callback({ code: status.ALREADY_EXISTS, message: `Estudiante ${ci} ya inscrito en curso ${codigo}` });
  }

  sEnroll.add(codigo);
  enrollments.set(ci, sEnroll);

  const cEnroll = courseEnrollments.get(codigo) || new Set();
  cEnroll.add(ci);
  courseEnrollments.set(codigo, cEnroll);

  callback(null, { ok: true, message: `Inscripción realizada: ${ci} -> ${codigo}` });
}

function ListarCursosDeEstudiante(call, callback) {
  const ci = call.request.ci;
  if (!ci) return callback({ code: status.INVALID_ARGUMENT, message: "ci es requerido" });

  if (!students.has(ci)) return callback({ code: status.NOT_FOUND, message: `Estudiante ${ci} no encontrado` });

  const codes = Array.from(enrollments.get(ci) || []);
  const cursos = codes.map(code => courses.get(code)).filter(Boolean);
  callback(null, { cursos });
}

function ListarEstudiantesDeCurso(call, callback) {
  const codigo = call.request.codigo;
  if (!codigo) return callback({ code: status.INVALID_ARGUMENT, message: "codigo es requerido" });

  if (!courses.has(codigo)) return callback({ code: status.NOT_FOUND, message: `Curso ${codigo} no encontrado` });

  const cis = Array.from(courseEnrollments.get(codigo) || []);
  const estudiantes = cis.map(ci => students.get(ci)).filter(Boolean);
  callback(null, { estudiantes });
}

function getServer() {
  const server = new grpc.Server();
  server.addService(proto.Universidad.service, {
    AgregarEstudiante,
    AgregarCurso,
    InscribirEstudiante,
    ListarCursosDeEstudiante,
    ListarEstudiantesDeCurso,
  });
  return server;
}

const addr = "0.0.0.0:50051";
const server = getServer();
server.bindAsync(addr, grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error("Error al bind:", err);
    return;
  }
  console.log(`gRPC server escuchando en ${addr}`);
  server.start();
});
