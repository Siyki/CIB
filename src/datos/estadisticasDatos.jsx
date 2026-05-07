import sanJeronimoImg from '../imagenes/sanjerónimo.png'
import santaFeImg from '../imagenes/santafe.png'
import sopetranImg from '../imagenes/sopetran.png'

export const datosMunicipios = [
  {
    nombre: 'San Jerónimo',
    imagen: sanJeronimoImg,
    descripcion:
      'Distribución de casos identificados en el municipio, comparando dos variables principales para facilitar la lectura de los datos.',
    valores: [19, 31],
  },
  {
    nombre: 'Santa Fe de Antioquia',
    imagen: santaFeImg,
    descripcion:
      'Resumen de casos huerfanos por categoria. La grafica muestra la diferencia entre ambas variables en este territorio.',
    valores: [24, 33],
  },
  {
    nombre: 'Sopetrán',
    imagen: sopetranImg,
    descripcion:
      'Analisis local de registros identificados. Los datos se presentan para comparar el comportamiento entre las dos variables.',
    valores: [22, 15],
  },
]
