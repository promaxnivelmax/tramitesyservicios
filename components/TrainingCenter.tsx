
import React, { useState } from 'react';
import { ArrowLeft, BookOpen, CheckCircle, Award, User, Clock, ShieldCheck, AlertTriangle, Info, Check, X as XIcon, Layers, Target, HeartHandshake, Settings, Zap } from 'lucide-react';

interface Props {
  onBack: () => void;
}

type TrainingView = 'ONBOARDING' | 'LIST' | 'COURSE' | 'QUIZ' | 'CERTIFICATE';
type CourseId = 'CUSTOMER' | 'FOOD' | 'MECHANIC';

interface Course {
    id: CourseId;
    title: string;
    description: string;
    duration: string;
    modules: {title: string, icon: React.ReactNode, content: React.ReactNode}[];
    quiz: {question: string, options: string[], answer: number}[];
}

const COURSES: Course[] = [
    {
        id: 'FOOD',
        title: 'Certificado de Manipulación de Alimentos',
        description: 'Capacitación normativa obligatoria basada en la Resolución 2674 de 2013.',
        duration: '10 Horas Certificables',
        modules: [
            {
                title: 'Marco Legal Sanitario',
                icon: <ShieldCheck className="text-blue-500" />,
                content: (
                    <div className="space-y-4">
                        <p>La <strong>Resolución 2674 de 2013</strong> exige que todo personal que trabaje con alimentos reciba capacitación técnica y sanitaria.</p>
                        <div className="bg-blue-50 p-6 rounded-2xl border-l-8 border-blue-500">
                            <h4 className="font-bold mb-2">Puntos de Ley:</h4>
                            <ul className="list-disc ml-5 text-sm space-y-2">
                                <li><strong>Inocuidad:</strong> El alimento no debe causar daño al consumidor.</li>
                                <li><strong>Trazabilidad:</strong> Seguimiento desde el origen hasta el plato.</li>
                                <li><strong>Vigilancia:</strong> Inspecciones periódicas de la Secretaría de Salud.</li>
                            </ul>
                        </div>
                    </div>
                )
            },
            {
                title: 'Higiene del Manipulador',
                icon: <User className="text-green-500" />,
                content: (
                    <div className="space-y-4">
                        <p>El manipulador es la fuente principal de microorganismos. El lavado de manos es la herramienta de prevención número uno.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white p-5 border rounded-2xl shadow-sm">
                                <h4 className="font-bold flex items-center gap-2 mb-2 text-green-600"><CheckCircle size={18}/> Dotación</h4>
                                <p className="text-xs">Uniforme blanco, sin botones, cofia que cubra todo el cabello y tapabocas sobre nariz y boca.</p>
                            </div>
                            <div className="bg-white p-5 border rounded-2xl shadow-sm">
                                <h4 className="font-bold flex items-center gap-2 mb-2 text-red-600"><XIcon size={18}/> Prohibiciones</h4>
                                <p className="text-xs">Uso de joyas, maquillaje, esmalte de uñas, comer, fumar o celular en el área de proceso.</p>
                            </div>
                        </div>
                    </div>
                )
            }
        ],
        quiz: [
            { question: "¿Cuál es la temperatura segura de cocción para aves?", options: ["40°C", "60°C", "75°C", "100°C"], answer: 2 },
            { question: "¿Qué norma rige la manipulación de alimentos en Colombia?", options: ["Ley 100", "Res. 2674 de 2013", "Código de Policía", "Decreto 1072"], answer: 1 }
        ]
    },
    {
        id: 'CUSTOMER',
        title: 'Servicio al Cliente Moderno',
        description: 'Protocolos de atención presencial y telefónica con enfoque en resultados.',
        duration: '5 Horas Certificables',
        modules: [
            {
                title: 'Comunicación Asertiva',
                icon: <Zap className="text-yellow-500" />,
                content: (
                    <div className="space-y-4">
                        <p>Servir no es solo entregar, es generar una experiencia positiva mediante el lenguaje verbal y no verbal.</p>
                        <div className="bg-yellow-50 p-6 rounded-2xl border-l-8 border-yellow-500">
                            <h4 className="font-bold mb-2">Claves del Éxito:</h4>
                            <ul className="text-sm space-y-3">
                                <li><strong>Escucha Empática:</strong> Dejar hablar al cliente para entender su dolor.</li>
                                <li><strong>Lenguaje Corporal:</strong> Contacto visual y postura abierta.</li>
                                <li><strong>Resolución:</strong> No dar excusas, dar alternativas de solución.</li>
                            </ul>
                        </div>
                    </div>
                )
            }
        ],
        quiz: [
            { question: "¿Qué es lo primero que se debe hacer ante una queja?", options: ["Negar el error", "Escuchar activamente", "Llamar al gerente", "Ignorar"], answer: 1 }
        ]
    },
    {
        id: 'MECHANIC',
        title: 'Introducción a la Mecánica Preventiva',
        description: 'Conocimientos básicos para el mantenimiento y cuidado de vehículos.',
        duration: '8 Horas Certificables',
        modules: [
            {
                title: 'Fluidos y Niveles',
                icon: <Settings className="text-gray-500" />,
                content: (
                    <div className="space-y-4">
                        <p>El mantenimiento preventivo ahorra hasta un 60% en costos de reparación correctiva.</p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                                <h5 className="font-bold text-red-700 text-xs uppercase mb-1">Aceite</h5>
                                <p className="text-[10px]">Revisar nivel cada 1.000km. Cambiar según manual del fabricante.</p>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                <h5 className="font-bold text-blue-700 text-xs uppercase mb-1">Líquido Frenos</h5>
                                <p className="text-[10px]">Vital para la seguridad. Si el nivel baja, hay una fuga o desgaste de pastillas.</p>
                            </div>
                        </div>
                    </div>
                )
            }
        ],
        quiz: [
            { question: "¿Cuándo se debe revisar la presión de las llantas?", options: ["Una vez al año", "Solo cuando se ven bajas", "Semanalmente en frío", "Nunca"], answer: 2 }
        ]
    }
];

export const TrainingCenter: React.FC<Props> = ({ onBack }) => {
    const [view, setView] = useState<TrainingView>('ONBOARDING');
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
    const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
    const [score, setScore] = useState(0);
    
    // User data for certificate
    const [studentData, setStudentData] = useState({
        name: '',
        doc: ''
    });

    const handleOnboarding = (e: React.FormEvent) => {
        e.preventDefault();
        if (studentData.name.length > 5 && studentData.doc.length > 5) {
            setView('LIST');
        } else {
            alert("Por favor ingrese sus datos completos para poder generar el certificado.");
        }
    };

    const startCourse = (course: Course) => {
        setSelectedCourse(course);
        setCurrentModuleIndex(0);
        setQuizAnswers(new Array(course.quiz.length).fill(-1));
        setView('COURSE');
    };

    const handleQuizSubmit = () => {
        if (!selectedCourse) return;
        let correct = 0;
        selectedCourse.quiz.forEach((q, idx) => {
            if (quizAnswers[idx] === q.answer) correct++;
        });
        setScore(correct);
        const passing = correct >= Math.ceil(selectedCourse.quiz.length * 0.8);
        if (passing) {
            setView('CERTIFICATE');
        } else {
            alert(`Obtuviste ${correct}/${selectedCourse.quiz.length}. Necesitas el 80% para aprobar. Intenta de nuevo.`);
            setCurrentModuleIndex(0);
            setView('COURSE');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 animate-slide-up">
            <div className="bg-tyGrey text-white p-6 no-print border-b-4 border-tyYellow flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="hover:text-tyYellow transition"><ArrowLeft /></button>
                    <h1 className="text-xl font-heading font-bold uppercase tracking-widest">Academia Digital</h1>
                </div>
                {view !== 'ONBOARDING' && <p className="text-tyYellow text-xs font-bold truncate">Estudiante: {studentData.name}</p>}
            </div>

            <div className="container mx-auto p-6 md:p-12 max-w-5xl">
                
                {view === 'ONBOARDING' && (
                    <div className="max-w-md mx-auto bg-white dark:bg-gray-900 p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 text-center animate-pop">
                        <div className="bg-yellow-100 dark:bg-yellow-900/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-tyYellow">
                            <User size={40} />
                        </div>
                        <h2 className="text-2xl font-bold dark:text-white mb-2">Identificación</h2>
                        <p className="text-gray-400 text-sm mb-8">Estos datos se imprimirán en tu certificado oficial al finalizar con éxito.</p>
                        <form onSubmit={handleOnboarding} className="space-y-4">
                            <input 
                                required
                                placeholder="Nombre Completo" 
                                className="w-full bg-gray-50 dark:bg-gray-800 dark:text-white p-4 rounded-xl border-transparent focus:ring-2 focus:ring-tyYellow transition"
                                value={studentData.name}
                                onChange={(e) => setStudentData({...studentData, name: e.target.value})}
                            />
                            <input 
                                required
                                placeholder="Número de Documento" 
                                className="w-full bg-gray-50 dark:bg-gray-800 dark:text-white p-4 rounded-xl border-transparent focus:ring-2 focus:ring-tyYellow transition"
                                value={studentData.doc}
                                onChange={(e) => setStudentData({...studentData, doc: e.target.value})}
                            />
                            <button className="w-full bg-tyYellow text-tyGrey py-4 rounded-xl font-bold shadow-lg hover:scale-105 transition mt-4 uppercase tracking-widest text-sm">Ingresar a la Academia</button>
                        </form>
                    </div>
                )}

                {view === 'LIST' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {COURSES.map(course => (
                            <div key={course.id} className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800 flex flex-col group hover:border-tyYellow transition duration-500">
                                <div className="p-8">
                                    <div className="bg-tyLightGrey dark:bg-gray-800 w-16 h-16 rounded-2xl flex items-center justify-center text-tyYellow mb-6 group-hover:bg-tyYellow group-hover:text-tyGrey transition">
                                        <BookOpen size={28} />
                                    </div>
                                    <h3 className="text-2xl font-bold dark:text-white mb-2 leading-tight">{course.title}</h3>
                                    <p className="text-gray-500 text-sm mb-8 flex-1 leading-relaxed">{course.description}</p>
                                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400">
                                        <span className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 px-3 py-1 rounded-full"><Clock size={12}/> {course.duration}</span>
                                        <span className="flex items-center gap-2 text-green-500"><ShieldCheck size={14}/> Certificado</span>
                                    </div>
                                </div>
                                <button onClick={() => startCourse(course)} className="w-full bg-tyGrey text-white py-5 font-bold uppercase text-xs tracking-[0.2em] hover:bg-black transition">Comenzar Formación</button>
                            </div>
                        ))}
                    </div>
                )}

                {view === 'COURSE' && selectedCourse && (
                    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
                        <div className="bg-gray-50 dark:bg-gray-800 p-8 flex justify-between items-center border-b dark:border-gray-700">
                            <div>
                                <span className="text-[10px] font-black text-tyYellow uppercase tracking-widest block mb-1">Curso en Progreso</span>
                                <h4 className="font-bold text-tyGrey dark:text-white">{selectedCourse.title}</h4>
                            </div>
                            <span className="text-[10px] bg-tyYellow px-4 py-2 rounded-full font-black uppercase">Módulo {currentModuleIndex + 1}/{selectedCourse.modules.length}</span>
                        </div>
                        <div className="p-12 min-h-[450px]">
                            <div className="flex items-center gap-6 mb-10">
                                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-3xl flex items-center justify-center text-3xl">
                                    {selectedCourse.modules[currentModuleIndex].icon}
                                </div>
                                <h2 className="text-3xl font-bold dark:text-white">{selectedCourse.modules[currentModuleIndex].title}</h2>
                            </div>
                            <div className="dark:text-gray-300 leading-loose text-xl">
                                {selectedCourse.modules[currentModuleIndex].content}
                            </div>
                        </div>
                        <div className="p-8 bg-gray-50 dark:bg-gray-800 border-t dark:border-gray-700 flex justify-between items-center">
                            <button onClick={() => currentModuleIndex > 0 ? setCurrentModuleIndex(currentModuleIndex - 1) : setView('LIST')} className="px-8 py-3 text-gray-400 font-bold hover:text-tyGrey">Anterior</button>
                            <button onClick={() => {
                                if (currentModuleIndex < selectedCourse.modules.length - 1) setCurrentModuleIndex(currentModuleIndex + 1);
                                else setView('QUIZ');
                                window.scrollTo(0,0);
                            }} className="bg-tyYellow text-tyGrey px-12 py-4 rounded-2xl font-black shadow-xl hover:scale-105 transition uppercase text-sm tracking-widest">
                                {currentModuleIndex === selectedCourse.modules.length - 1 ? 'Ir a Examen' : 'Continuar'}
                            </button>
                        </div>
                    </div>
                )}

                {view === 'QUIZ' && selectedCourse && (
                    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-12 rounded-[2.5rem] shadow-2xl">
                         <h2 className="text-3xl font-black mb-10 dark:text-white text-center uppercase tracking-widest">Examen de Evaluación</h2>
                         <div className="space-y-12">
                            {selectedCourse.quiz.map((q, qIdx) => (
                                <div key={qIdx} className="space-y-6">
                                    <p className="font-bold text-xl dark:text-white">{qIdx + 1}. {q.question}</p>
                                    <div className="grid grid-cols-1 gap-3">
                                        {q.options.map((opt, oIdx) => (
                                            <label key={oIdx} className={`p-6 rounded-2xl border-2 cursor-pointer transition flex items-center gap-4 ${quizAnswers[qIdx] === oIdx ? 'border-tyYellow bg-yellow-50 dark:bg-yellow-900/10' : 'border-gray-100 dark:border-gray-800 hover:bg-gray-50'}`}>
                                                <input type="radio" checked={quizAnswers[qIdx] === oIdx} onChange={() => { const n = [...quizAnswers]; n[qIdx] = oIdx; setQuizAnswers(n); }} className="w-6 h-6 accent-tyYellow"/>
                                                <span className="dark:text-gray-300 font-medium">{opt}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                         </div>
                         <button disabled={quizAnswers.includes(-1)} onClick={handleQuizSubmit} className="w-full mt-12 bg-tyYellow text-tyGrey py-5 rounded-2xl font-black uppercase tracking-widest disabled:opacity-50 shadow-2xl hover:scale-105 transition">Finalizar y Calificar</button>
                    </div>
                )}

                {view === 'CERTIFICATE' && (
                    <div className="flex flex-col items-center gap-10">
                        <div className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 p-6 rounded-2xl font-bold no-print text-center shadow-md animate-bounce">
                            ¡Felicidades, {studentData.name.split(' ')[0]}! Has aprobado con {score}/{selectedCourse?.quiz.length}.
                        </div>
                        <button onClick={() => window.print()} className="bg-tyYellow text-tyGrey px-12 py-5 rounded-2xl font-black no-print shadow-2xl hover:scale-110 transition uppercase tracking-widest">Descargar Certificado</button>
                        
                        <div className="w-[297mm] h-[210mm] bg-white p-20 relative border-[20px] border-double border-tyGrey shadow-2xl landscape-print">
                             <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
                                 <Award size={600} />
                             </div>
                             <div className="relative z-10 w-full h-full border-4 border-tyYellow p-12 flex flex-col items-center justify-between text-center">
                                 <h4 className="font-black text-tyYellow tracking-[0.8em] uppercase text-xs">Tramites y Servicios - Barrancabermeja</h4>
                                 <div className="space-y-4">
                                     <h1 className="text-7xl font-heading font-black text-tyGrey tracking-widest">CERTIFICADO</h1>
                                     <p className="text-2xl text-gray-400 uppercase tracking-[0.4em]">Acreditación Académica Digital</p>
                                 </div>
                                 <div className="space-y-8 my-6">
                                     <p className="italic text-gray-500 text-lg">Se otorga la presente certificación a:</p>
                                     <h2 className="text-6xl font-serif font-black text-tyGrey border-b-4 border-tyYellow px-24 inline-block pb-3 uppercase">{studentData.name}</h2>
                                     <p className="text-xl">Identificado con C.C. No. <span className="font-bold">{studentData.doc}</span></p>
                                     <p className="text-lg">Por haber cursado y aprobado el programa de formación en:</p>
                                     <h3 className="text-4xl font-black text-tyGrey uppercase tracking-wide">{selectedCourse?.title}</h3>
                                     <p className="text-[11px] text-gray-400 max-w-3xl mx-auto leading-relaxed mt-4">Intensidad horaria de {selectedCourse?.duration}. Certificado válido para cumplimiento normativo y perfiles laborales de alto impacto en el Distrito de Barrancabermeja.</p>
                                 </div>
                                 <div className="w-full flex justify-around items-end pt-12">
                                     <div className="text-center">
                                         <div className="w-56 border-b-2 border-gray-400 mb-2"></div>
                                         <p className="font-black text-[10px] uppercase">Rectoría Académica</p>
                                     </div>
                                     <div className="text-center">
                                         <Award className="text-tyYellow mx-auto mb-2" size={50} />
                                         <p className="text-[9px] text-gray-300 uppercase font-bold tracking-widest">{new Date().toLocaleDateString()}</p>
                                     </div>
                                     <div className="text-center">
                                         <div className="w-56 border-b-2 border-gray-400 mb-2"></div>
                                         <p className="font-black text-[10px] uppercase">Registro y Control</p>
                                     </div>
                                 </div>
                             </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
