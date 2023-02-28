import * as dayjs from 'dayjs'

export const serializeGetHorario = (horarios) => {
  const result = []
  horarios.map(element => {
    const day = dayjs(element.fechaInicio)
    const formatDay = day.format('DD/MM/YYYY')
    const inicial = day.format('HH:mm')
    const final = dayjs(element.fechaFin).format('HH:ss')
    
    result.push({
      day: formatDay,
      start: inicial,
      end: final,
      medic: `${element.medico.nombre} ${element.medico.apellido}`
    })
  })
  return result
}