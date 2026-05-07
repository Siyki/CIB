// --- GLOSARIO MÉDICO ---
export const GLOSSARY = {
    "autosómico dominante": "Patrón de herencia donde solo se necesita una copia del gen mutado (de uno de los padres) para heredar la enfermedad.",
    "mutación genética": "Un cambio permanente en la secuencia de ADN que forma un gen.",
    "enzimas pancreáticas": "Proteínas que ayudan a descomponer los alimentos. En la Fibrosis Quística a menudo deben tomarse como suplemento.",
    "tejido conectivo": "El tejido que sostiene, protege y da estructura a otros tejidos y órganos del cuerpo."
};

// --- DIRECTORIO INSTITUCIONAL ---
export const FOUNDATIONS = [
    {
        id: 1,
        name: "FECOER",
        focus: "Federación Colombiana de Enfermedades Raras",
        phone: "+57 310 123 4567",
        website: "www.fecoer.org",
        description: "Agrupa a organizaciones de pacientes con enfermedades raras en Colombia. Ofrece asesoría legal y apoyo para la Ley 1392."
    },
    {
        id: 2,
        name: "Asociación Colombiana de Fibrosis Quística",
        focus: "Fibrosis Quística",
        phone: "+57 311 987 6543",
        website: "www.fqcolombia.org",
        description: "Apoyo integral a pacientes y familias con FQ, facilitando acceso a tratamientos y terapias respiratorias."
    },
    {
        id: 3,
        name: "Fundación Colombiana para el Huntington",
        focus: "Enfermedad de Huntington",
        phone: "+57 320 456 7890",
        website: "www.huntingtoncolombia.org",
        description: "Acompañamiento psicológico y asesoramiento genético para familias con herencia de Huntington."
    }
];

// --- PUBLICACIONES INICIALES ---
export const initialPosts = [
    {
        id: 1,
        title: "¿Las dietas estrictas sin gluten curan la Fibrosis Quística?",
        type: "Mito",
        disease: "Fibrosis Quística",
        status: "Desmentido",
        content: "He leído en varios grupos de redes sociales que si elimino el gluten y los lácteos de la dieta de mi hijo, la fibrosis quística puede desaparecer. ¿Es esto cierto? Me da miedo cambiar su dieta sin saber.",
        doctorResponse: "Hola. Entiendo perfectamente tu preocupación. Sin embargo, la Fibrosis Quística es una enfermedad genética que afecta principalmente los pulmones y el sistema digestivo. Eliminar el gluten o los lácteos no cura la enfermedad, e incluso podría ser perjudicial si no se reemplazan adecuadamente las calorías y nutrientes esenciales que los pacientes con FQ necesitan. El tratamiento debe enfocarse en terapias respiratorias, enzimas pancreáticas y medicación prescrita. Te sugiero consultar siempre con su nutricionista clínico antes de hacer cambios.",
        doctorName: "Dra. Elena Gómez",
        doctorSpecialty: "Neumóloga Pediatra",
        date: "Hace 2 días",
        upvotes: 45,
        sources: null,
        isMine: false
    },
    {
        id: 2,
        title: "¿La enfermedad de Huntington siempre se hereda si el padre la tiene?",
        type: "Pregunta",
        disease: "Enfermedad de Huntington",
        status: "Confirmado",
        content: "Mi padre acaba de ser diagnosticado con Huntington. He leído que tengo un 50% de probabilidades de tenerla, pero no estoy seguro si siempre es así o si hay excepciones o formas de prevenirlo.",
        doctorResponse: "Es muy comprensible que tengas esta duda. La enfermedad de Huntington tiene un patrón de herencia autosómico dominante. Esto significa que cada hijo de una persona con la mutación genética tiene un 50% de probabilidad de heredar el gen mutado. Si se hereda el gen, la enfermedad se desarrollará eventualmente. No hay excepciones a esta regla genética. Te recomiendo fuertemente acudir a un asesoramiento genético EPS para hablar sobre la posibilidad de realizarte pruebas predictivas.",
        doctorName: "Dr. Carlos Ruiz",
        doctorSpecialty: "Genetista Clínico",
        date: "Hace 5 días",
        upvotes: 112,
        sources: "Guía de Práctica Clínica para Huntington (MinSalud Colombia).",
        isMine: false
    },
    {
        id: 3,
        title: "¿El dolor muscular en la ELA se puede tratar con masajes fuertes?",
        type: "Duda",
        disease: "Esclerosis Lateral Amiotrófica (ELA)",
        status: "En revisión",
        content: "Mi tía tiene ELA y sufre de muchos calambres y dolor muscular. Un vecino nos recomendó hacerle masajes de tejido profundo muy fuertes para 'soltar' el músculo. Queremos saber si esto es seguro para ella.",
        doctorResponse: null,
        doctorName: null,
        doctorSpecialty: null,
        date: "Hace 4 horas",
        upvotes: 12,
        sources: null,
        isMine: true
    },
    {
        id: 4,
        title: "¿Las personas con Síndrome de Marfan no pueden hacer ningún tipo de ejercicio?",
        type: "Mito",
        disease: "Síndrome de Marfan",
        status: "Desmentido",
        content: "Me acaban de diagnosticar y un familiar me dijo que debo quedarme en cama y no hacer ningún deporte jamás porque mi corazón puede fallar. ¿Es verdad que debo dejar toda actividad física?",
        doctorResponse: "Hola, gracias por tu pregunta. Es un mito que no puedas hacer ningún ejercicio. El Síndrome de Marfan afecta el tejido conectivo, por lo que se deben evitar los deportes de contacto o de alta intensidad isométrica (como el levantamiento de pesas pesadas). Sin embargo, el ejercicio aeróbico de baja a moderada intensidad, como caminar, nadar a ritmo suave o usar bicicleta estática, es generalmente seguro y beneficioso para tu salud cardiovascular. Es vital que diseñes un plan de ejercicio personalizado con tu cardiólogo.",
        doctorName: "Dr. Carlos Ruiz",
        doctorSpecialty: "Genetista Clínico",
        date: "Hace 1 semana",
        upvotes: 89,
        sources: "Fundación Marfan - Pautas de Actividad Física.",
        isMine: false
    },
    {
        id: 5,
        title: "¿El clima frío y húmedo en Bogotá empeora el endurecimiento de la piel en la Esclerodermia?",
        type: "Duda",
        disease: "Esclerodermia",
        status: "En revisión",
        content: "Siento que desde que empezó la temporada de lluvias mis manos se ponen más rígidas y cambian de color más rápido. ¿El clima frío realmente afecta la enfermedad o es coincidencia?",
        doctorResponse: null,
        doctorName: null,
        doctorSpecialty: null,
        date: "Hace 1 hora",
        upvotes: 3,
        sources: null,
        isMine: false
    }
];

// --- UTILIDADES GEMINI API ---
const API_KEY = import.meta.env.VITE_GEMINI_KEY || "";

const fetchWithRetry = async (url, options, retries = 5) => {
    const delays = [1000, 2000, 4000, 8000, 16000];
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            if (i === retries - 1) throw error;
            await new Promise(res => setTimeout(res, delays[i]));
        }
    }
};

export const callGemini = async (userText, systemInstruction) => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${API_KEY}`;
    const payload = {
        contents: [{ parts: [{ text: userText }] }],
        systemInstruction: { parts: [{ text: systemInstruction }] }
    };
    try {
        const result = await fetchWithRetry(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        return result.candidates?.[0]?.content?.parts?.[0]?.text || "Lo siento, tuve un problema procesando la solicitud.";
    } catch {
        return "Error de conexión. Por favor, intenta de nuevo más tarde.";
    }
};

// --- ENFERMEDADES SUGERIDAS ---
export const ENFERMEDADES_SUGERIDAS = [
    "Fibrosis Quística",
    "Enfermedad de Huntington",
    "Esclerosis Lateral Amiotrófica (ELA)",
    "Síndrome de Marfan",
    "Esclerodermia",
    "Atrofia Muscular Espinal",
    "Hemofilia"
];
