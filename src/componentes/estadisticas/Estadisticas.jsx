import { useEffect, useState } from 'react'
import 'chart.js/auto'
import { Bar } from 'react-chartjs-2'
import './Estadisticas.css'
// Componente Estadisticas. Recibe un arreglo de 'datos' para renderizar las tarjetas.
const crearData = (valores) => ({
  labels: ['Mujeres', 'Hombres'],
  datasets: [
    {
      data: valores,
      backgroundColor: ['#f06f85', '#69c5ec'], // Diferentes colores para Mujeres y Hombres
      borderRadius: 10,
      maxBarThickness: 54,
    },
  ],
})

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: '#4a5568', font: { size: 12 } },
    },
    y: {
      beginAtZero: true,
      ticks: { stepSize: 5, color: '#6b7280', font: { size: 11 } },
      grid: { color: 'rgba(255, 255, 255, 0.3)' }, // Grid más sutil sobre celeste
    },
  },
}

export const Estadisticas = ({ datos = [] }) => {
  const [municipioActivo, setMunicipioActivo] = useState(null)
  const [tarjetasVisibles, setTarjetasVisibles] = useState({})

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const nombre = entry.target.getAttribute('data-nombre');
          setTarjetasVisibles(prev => ({ ...prev, [nombre]: true }));
        }
      });
    }, { threshold: 0.1 });

    const tarjetas = document.querySelectorAll('.tarjeta-estadistica');
    tarjetas.forEach(t => observer.observe(t));

    return () => observer.disconnect();
  }, []);

  const activeOptions = {
    ...options,
    animation: {
      duration: 1500,
      easing: 'easeOutQuart',
      delay: 200
    }
  }

  const toggleMunicipio = (municipio) => {
    if (municipioActivo?.nombre === municipio.nombre) {
      setMunicipioActivo(null)
    } else {
      setMunicipioActivo(municipio)
    }
  }

  return (
   <section className="contenedor-estadisticas">
      {datos.map((municipio) => {
        const estaActivo = municipioActivo?.nombre === municipio.nombre;
        const yaAparecio = tarjetasVisibles[municipio.nombre];

        return (
          <article
            key={municipio.nombre}
            data-nombre={municipio.nombre}
            className={`tarjeta-estadistica ${yaAparecio ? 'activa' : ''} ${estaActivo ? 'expandida' : ''}`}
          >
            <button
              type="button"
              className="boton-imagen-municipio"
              onClick={() => toggleMunicipio(municipio)}
              aria-expanded={estaActivo}
              aria-controls={`grafico-${municipio.nombre}`}
              aria-label={`Ver estadísticas de ${municipio.nombre}`}
            >
              <img
                src={municipio.imagen}
                alt={`Municipio ${municipio.nombre}`}
                className="imagen-municipio"
              />
              <div className="capa-ver-estadisticas">
                <span className="texto-hover">ver estadísticas</span>
              </div>
            </button>

            <h3 className="titulo-municipio">{municipio.nombre}</h3>

            <div className={`detalle-estadistica ${estaActivo ? 'visible' : ''}`}>
              <div className="caja-grafica">
                <h4 className="titulo-caja">Casos identificados de enfermedades huérfanas por municipio</h4>
                <p className="texto-caja">{municipio.descripcion}</p>
                <div className="grafica-wrapper" id={`grafico-${municipio.nombre}`}>
                  <Bar
                    key={`${municipio.nombre}-${estaActivo}`} // Re-render when active state changes
                    options={activeOptions}
                    data={crearData(municipio.valores)}
                  />
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  )
}