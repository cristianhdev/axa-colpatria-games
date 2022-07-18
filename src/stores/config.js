import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useConfigStore = defineStore({
  id: 'counter',
  state: () => ({
    puntosGlobales: useStorage('puntosGlobalesActividad', 0),
    counter: 0,
    titulo: 'hola',
    menuEstado: false,
    posicionActualEscenario: useStorage('posicionActualEscenario', 0),
    _posicionActualActividades: useStorage('posicionActualActividades', 0),
    isCamaraHabilitada: useStorage('isCamaraHabilitada', false),
    usuario: useStorage('usuario', ''),
    preguntasAleatorias: useStorage('opciones', []),
    actividad: useStorage('actividadActual', []),
    actividadRealizadaCompletada: useStorage('actividadCompletada', []),
    mostrarInstruccionesEnInicio: useStorage('mostrarIntruccionInicio', true),
    audioEstadoPausas: useStorage('audioEstadoPausas', true)
  }),
  getters: {
    menuEstadoVisible: (state) => state.menuEstado,
    mostrarInicioInstrucciones: (state) => state.mostrarInstruccionesEnInicio,
    preguntasAleatoriasSeleccionadas: (state) => state.preguntasAleatorias,
    posicionactualEscenarioJuego: (state) => state.posicionActualEscenario,
    nombreUsuario: (state) => state.usuario,
    doubleCount: (state) => state.counter * 2,
    isCamara: (state) => state.isCamaraHabilitada,
    actividadActual: (state) => state.actividad,
    actividadCompletada: (state) => state.actividadRealizadaCompletada,
    audioPausas: (state) => state.audioEstadoPausas,
    posicionActualActividades: (state) => state._posicionActualActividades,
    puntosGlobalesActividad: (state) => state.puntosGlobales
  },
  actions: {
    increment() {
      this.counter++
    },
    habilitarCamara() {
      this.isCamaraHabilitada = true
    },
    inhabilitarCamara() {
      this.isCamaraHabilitada = false
    },
    setInstrucionesDeInicio() {
      this.mostrarInstruccionesEnInicio = false
    },
    setNombreUsuario(nombre) {
      this.usuario = nombre
    },
    setMenuEstadoVisible(estado) {
      this.menuEstado = estado
    },
    setAudioPausas(estado) {
      this.audioEstadoPausas = estado
    },
    setPosicionActualUsuario(posicion) {
      this.posicionActualEscenario = posicion
    },
    setPosicionActualActividades(posicionEjercicios) {
      this._posicionActualActividades = posicionEjercicios
    },
    setPreguntasAleatorias(preguntas) {
      this.preguntasAleatorias = preguntas
    },
    setActividadActual(infoActividad) {
      if (!this.actividad.includes(infoActividad)) {
        this.actividad.push(infoActividad)
      }

    },
    setPuntosGlobales(puntos) {
      this.puntosGlobales = this.puntosGlobales + puntos
    },
    setActividadCompletada() {
      this.actividadRealizadaCompletada.push(1)
    },
    reiniciarActividadActual(infoActividad) {
      this.actividad = infoActividad
    },
    reiniciarTodo() {
      this.posicionActualEscenario = 0
      this._posicionActualActividades = 0
      this.puntosGlobales = 0
      this.actividad = []
      this.actividadRealizadaCompletada = []
    },
    reiniciarTodoActividad() {
      this.posicionActualEscenario = 0
      this._posicionActualActividades = 0
      this.puntosGlobales = 0
      this.actividad = []
      this.preguntasAleatorias = []
      this.actividadRealizadaCompletada = []
      this.isCamaraHabilitada = false
      this.audioEstadoPausas = false
      this.usuario= ''
    }
  },
  persist: {
    key: 'store-config',
    storage: {},
    paths: ['nested.data'],
    beforeRestore: context => {
     
    },
    afterRestore: context => {
     
    },
  }
})
