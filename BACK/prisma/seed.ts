import { PrismaClient } from "@prisma/client";
import { Logger } from '@nestjs/common';
import { JSON_tipoIdentificacion, JSON_medicos, JSON_estadoCita } from "./json";
const prisma = new PrismaClient()

async function main() {
 const logger = new Logger()
 logger.log("Cargando la base de datos con la información inicial.","Prisma.io")

 //TODO Revisado
 const tipo_identificacion = await prisma.tipo_identificacion.createMany({data:JSON_tipoIdentificacion, skipDuplicates:true})
 logger.verbose(`Tipos de identificación.`,`${tipo_identificacion.count}/${Object.keys(JSON_tipoIdentificacion).length}`)

 const medicos = await prisma.medico.createMany({data:JSON_medicos, skipDuplicates:true})
 logger.verbose(`Medicos.`,`${medicos.count}/${Object.keys(JSON_medicos).length}`)

 const estadoCita = await prisma.cita_estado.createMany({data:JSON_estadoCita, skipDuplicates: true})
 logger.verbose(`Estados de cita.`,`${estadoCita.count}/${Object.keys(JSON_estadoCita).length}`)
}

main()
 .catch((e)=>{
  console.error(e);
  process.exit(1)
 })
 .finally(async ()=>{
  await prisma.$disconnect()
  Logger.log("Base de datos desconectada", "Prisma.io")
 })