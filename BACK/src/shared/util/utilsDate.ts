import * as dayjs from 'dayjs'

export const rangeCitas = (start: Date, end:Date, medico_id: number): Array<any> => {
  const result = []
  const inicio = dayjs(start)
  const diff = Math.abs(inicio.diff(end, 'hour', true))
  for(let i = 0; i < diff*2; i++){
    const payload = {
      medico_id,
      fecha: i == 0 ? inicio.toISOString() : inicio.add((30 * i), 'm').toISOString(),
      estado_id: 1
    }
    result.push(payload)
  }    
  return result
}