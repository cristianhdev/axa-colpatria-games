

let baseUrl = process.env.NODE_ENV == 'production' ? '' : '/src/assets'


export const PausasActivas = [
    {
        "tipo": "recordarSonido",
        "instruccion": "Girar la cabeza de izquierda a derecha y de derecha a izquierda lentamente. <br><br> -Repetir este movimiento durante 15 segundos.",
        "id": 0,
        "tiempo": 15,
        "cambio": false,
        "loop": true,
        "imagen": `${baseUrl}/ejercicios/EJ_P1.gif`,
        "video": `${baseUrl}/ejercicios/videos/EJ_P1.mp4`
    },
    {
        "tipo": "recordarSonido",
        "instruccion": "Realizar movimientos laterales de cuello de la siguiente manera: <br><br>Centro – izquierda – centro – derecha – centro. <br><br> -Repetir este movimiento durante 15 segundos.",
        "id": 1,
        "tiempo": 15,
        "cambio": false,
        "loop": true,
        "imagen": `${baseUrl}/ejercicios/EJ_P2A.gif`,
        "video": `${baseUrl}/ejercicios/videos/EJ_P2A.mp4`
    },
    {
        "tipo": "recordarSonido",
        "instruccion": "<ol start='1'><li>Doblar el cuello sin que el mentón se junte con el pecho.</li><li>Extender el cuello sin que la cabeza se junte con la espalda.</li></ol><br>-Repetir este movimiento durante 15 segundos.",
        "id": 2,
        "tiempo": 15,
        "cambio": false,
        "loop": true,
        "imagen": `${baseUrl}/ejercicios/EJ_P3.gif`,
        "video": `${baseUrl}/ejercicios/videos/EJ_P3.mp4`
    },
    {
        "tipo": "recordarPosicion",
        "instruccion": "<ol start='1'><li>Mover los hombros hacia arriba y llevarlos hacia atrás.</li><li>Mover los hombros hacia abajo y llevarlos hacia adelante de manera circular.</li></ol><br>-Repetir este movimiento durante 10 segundos.",
        "id": 3,
        "tiempo": 10,
        "cambio": false,
        "loop": true,
        "imagen": `${baseUrl}/ejercicios/EJ_P4.gif`,
        "video": `${baseUrl}/ejercicios/videos/EJ_P4.mp4`
    },
    {
        "tipo": "recordarPosicion",
        "instruccion": "Realizar movimientos de hombros en línea recta hacia adelante y hacia atrás.<br><br> -Repetir este movimiento durante 10 segundos.",
        "id": 4,
        "tiempo": 10,
        "cambio": false,
        "loop": true,
        "imagen": `${baseUrl}/ejercicios/EJ_P5.gif`,
        "video": `${baseUrl}/ejercicios/videos/EJ_P5.mp4`
    },
    {
        "tipo": "recordarSonido",
        "instruccion": "<ol start='1'><li>Colocarse de pie.</li><li>Colocar las manos en la cintura. </li><li>Iniciar movimientos de tronco inclinándolo a la izquierda, al centro, a la derecha, al centro.</li><li>Permanecer con la cadera firme.</li></ol><br>-Repetir estos movimientos durante 10 segundos",
        "id": 5,
        "tiempo": 10,
        "cambio": false,
        "loop": true,
        "imagen": `${baseUrl}/ejercicios/EJ_P6.gif`,
        "video": `${baseUrl}/ejercicios/videos/EJ_P6.mp4`
    },
    {
        "tipo": "recordarSonido",
        "instruccion": "Realizar movimientos alternados de brazos.<br><ol start='1'><li>Estirar el brazo derecho hacia arriba y bajar lentamente.</li><li>Estirar el brazo izquierdo hacia arriba y bajar lentamente.</li></ol><br>-Repetir estos movimientos durante 10 segundos",
        "id": 6,
        "tiempo": 20,
        "cambio": false,
        "loop": true,
        "imagen": `${baseUrl}/ejercicios/EJ_P7.gif`,
        "video": `${baseUrl}/ejercicios/videos/EJ_P7.mp4`
    },
    {
        "tipo": "recordarPosicion",
        "instruccion": "<ol><li>Colocarse de pie.</li><li>Pararse en punta de pies.</li><li>Pararse en los talones.</li></ol><br>-Repetir alternadamente estos movimientos durante 10 segundos.",
        "id": 7,
        "tiempo": 10,
        "cambio": false,
        "loop": true,
        "imagen": `${baseUrl}/ejercicios/EJ_P8.gif`,
        "video": `${baseUrl}/ejercicios/videos/EJ_P8.mp4`
    },
    {
        "tipo": "concentrese",
        "instruccion": "<ol><li>Estirar los brazos hacia al frente.</li><li>Realizar movimientos de abrir y cerrar los brazos de forma lateral.</li></ol><br>-Repetir alternadamente estos movimientos durante 10 segundos.",
        "id": 8,
        "tiempo": 10,
        "cambio": false,
        "loop": false,
        "imagen": `${baseUrl}/ejercicios/EJ_P9.png`,
        "video": ""
    },
    {
        "tipo": "recordarPosicion",
        "instruccion": "<ol><li>Estirar los dedos.</li><li>Realizar movimientos de subir y bajar las manos para darles la movilidad articular a las muñecas.</li></ol><br> - Repetir estos movimientos durante 10 segundos.",
        "id": 9,
        "tiempo": 10,
        "loop": true,
        "imagen": `${baseUrl}/ejercicios/EJ_P09.gif`,
        "video": `${baseUrl}/ejercicios/videos/EJ_P09.mp4`
    },
    {
        "tipo": "manos",
        "instruccion": "<ol><li>Abrir, cerrar, doblar y estirar los dedos como se aprecia en el ejemplo.</li><li>Juntar el dedo pulgar con cada uno de los demás dedos de la mano.</li></ol><br>Repetir cada uno de estos movimientos durante 10 segundos.",
        "id": 10,
        "tiempo": 10,
        "imagen": `${baseUrl}/ejercicios/EJ_P10.gif`,
        "video": `${baseUrl}/ejercicios/videos/EJ_P10.mp4`
    },
    {
        "tipo": "concentrese",
        "instruccion": "<ol><li>Entrelazar los dedos de las manos.</li><li>Llevar las palmas hacia al frente.</li><li>Extender los brazos como se muestra en el ejemplo.</li></ol><br>-Mantener esta posición de 10 a 15 segundos.",
        "id": 11,
        "tiempo": 15,
        "imagen": `${baseUrl}/ejercicios/EJ_P10.png`,
        "video": ""
    },
    {
        "tipo": "recordarSonido",
        "instruccion": "<ol><li>Con los dedos apuntando al piso y usando su otra mano, traer hacia usted suavemente la mano como se muestra en el ejemplo.</li><li>Con los dedos apuntando arriba y usando su otra mano, traer hacia usted suavemente la mano como se muestra en el ejemplo.</li></ol><br>-Mantener estas postura de 10 a 15 segundos y repetir los mismos ejercicios con la otra mano.",
        "id": 12,
        "tiempo": 40,
        "cambio": false,
        "loop": true,
        "imagen": `${baseUrl}/ejercicios/EJ_P16A.gif`,
        "video": `${baseUrl}/ejercicios/videos/EJ_P16A.mp4`
    },
    {
        "tipo": "recordarPosicion",
        "instruccion": "<ol><li>Unir las palmas de las manos.</li><li>Presionar de 10 a 15 segundos.</li><li>Unir los dorsos de las manos con los dedos estirados como se muestra en el ejemplo.</li><li>Mantener esta postura de 10 a 15 segundos.</li></ol>",
        "id": 13,
        "tiempo": 20,
        "cambio": false,
        "loop": true,
        "imagen": `${baseUrl}/ejercicios/EJ_P17A.gif`,
        "video": `${baseUrl}/ejercicios/videos/EJ_P17A.mp4`
    },
    {
        "tipo": "recordarPosicion",
        "instruccion": "Lleve los hombros hacia arriba y mantenga esta postura de 10 a 15 segundos.<br><br>Pasado este tiempo vuelva a su posición inicial.",
        "id": 14,
        "tiempo": 15,
        "imagen": `${baseUrl}/ejercicios/EJ_P11.gif`,
        "video": `${baseUrl}/ejercicios/videos/EJ_P11.mp4`
    },
    {
        "tipo": "concentrese",
        "instruccion": "<ol><li>Colocarse de pie.</li><li>Hacer flexión de rodilla derecha, llevando su pie hacia atrás.</li><li>Sujetar el pie con su mano derecha como se muestra en el ejemplo</li></ol><br>-Mantener esta postura de 10 a 15 segundos y repetir con la otra pierna.",
        "id": 15,
        "tiempo": 30,
        "cambio": true,
        "loop": false,
        "imagen": `${baseUrl}/ejercicios/EJ_P12.png`,
        "video": ""
    },
    {
        "tipo": "concentrese",
        "instruccion": "<ol><li>Colocarse de pie.</li><li>Flexionar la rodilla derecha, llevándola hacia adelante.</li><li>Sujetarla con sus dos manos como se muestra en el ejemplo.</li><li>Mantener siempre la espalda recta.</li></ol><br>- Mantener esta postura de 10 a 15 segundos y repetir con su pierna izquierda.",
        "id": 16,
        "tiempo": 30,
        "cambio": true,
        "loop": false,
        "imagen": `${baseUrl}/ejercicios/EJ_P13.png`,
        "video": ""
    },
    {
        "tipo": "recordarSonido",
        "instruccion": "<ol><li>Colocar su mano derecha sobre el lado superior izquierdo de su cabeza.</li><li>Ejercer presión hacia su hombro derecho.</li></ol><br>-Mantener postura de 10 a 15 segundos y volver a su postura inicial.<br><br>Repetir ejercicio hacia el lado izquierdo.",
        "id": 17,
        "tiempo": 30,
        "cambio": true,
        "loop": false,
        "imagen": `${baseUrl}/ejercicios/EJ_P14A.gif`,
        "video": `${baseUrl}/ejercicios/videos/EJ_P14A.mp4`
    },
    {
        "tipo": "recordarPosicion",
        "instruccion": " <ol><li>Entrelazar las manos por detrás de la cabeza.</li><li>Inhalar.</li><li>Llevar la cabeza hacía abajo y con los codos hacía adelante.</li><li>No mover el tronco. </li></ol><br>-Realizar este ejercicio de 10 a 15 segundos.",
        "id": 18,
        "tiempo": 15,
        "cambio": false,
        "loop": false,
        "imagen": `${baseUrl}/ejercicios/EJ_P15.gif`,
        "video": `${baseUrl}/ejercicios/videos/EJ_P15.mp4`
    },
    {
        "tipo": "recordarSonido",
        "instruccion": "<ol><li>Colocarse de pie.</li><li>Separar ligeramente las piernas.</li><li>Entrelazar los brazos sobre su cabeza como se muestra en el ejemplo.</li><li>Primera postura: inclinar su cuerpo hacia el lado derecho.</li><li>Segunda postura: llevar su cuerpo hacia el lado izquierdo.</li><li>Tercera postura: dejar su cuerpo en el centro.</li></ol><br>- Mantener cada una de las posturas de 10 a 15 segundos.",
        "id": 19,
        "tiempo": 30,
        "cambio": false,
        "loop": false,
        "imagen": `${baseUrl}/ejercicios/EJ_P16.gif`,
        "video": `${baseUrl}/ejercicios/videos/EJ_P16.mp4`
    },
    {
        "tipo": "recordarPosicion",
        "instruccion": " <ol><li>Colocarse de pie.</li><li>Separar ligeramente las piernas. </li><li>Llevar el brazo derecho hacia arriba.</li><li>Inclinar el tronco hacia el lado izquierdo.</li></ol><br>-Mantener esta postura de 10 a 15 segundos y repetir ejercicio con el brazo izquierdo.",
        "id": 20,
        "tiempo": 30,
        "cambio": false,
        "loop": false,
        "imagen": `${baseUrl}/ejercicios/EJ_P17.gif`,
        "video": `${baseUrl}/ejercicios/videos/EJ_P17.mp4`
    },
    {
        "tipo": "concentrese",
        "instruccion": "<ol><li>Colocarse de pie.</li><li>Estirar los dos brazos hacia al frente juntando las manos.</li><li>Girar el tronco hacia la derecha.</li><li>Girar lentamente el tronco hacia la izquierda.</li></ol><br>- Sostener cada una de estas posturas de 10 a 15 segundos por cada lado.",
        "id": 21,
        "tiempo": 30,
        "cambio": true,
        "loop": false,
        "imagen": `${baseUrl}/ejercicios/EJ_P18.png`,
        "video": ""
    },
    {
        "tipo": "recordarPosicion",
        "instruccion": "<ol><li>Colocarse de pie.</li><li>Separar las piernas.</li><li>Flexionar la rodilla izquierda.</li><li>Lentamente mueva el cuerpo hacia el mismo lado.</li></ol><br>- Mantener postura de 10 a 15 segundos y repetir cambiando al lado derecho.",
        "id": 22,
        "tiempo": 30,
        "cambio": true,
        "loop": false,
        "imagen": `${baseUrl}/ejercicios/EJ_P19.png`,
        "video": ""
    },
    {
        "tipo": "concentrese",
        "instruccion": "<ol><li>Colocarse de pie.</li><li>Ubicar la pierna derecha estirada hacia atrás.</li><li>Ubicar la pierna izquierda flexionada hacia adelante (como se muestra en el ejemplo).</li><li>Con la espalda derecha, tratar de aproximar la pelvis hacia adelante lo más que pueda.</li></ol><br> - Mantener esta postura de 10 a 15 segundos y repetir intercalando las piernas.",
        "id": 23,
        "tiempo": 30,
        "cambio": true,
        "loop": false,
        "imagen": `${baseUrl}/ejercicios/EJ_P20.png`,
        "video": ""
    },
    {
        "tipo": "concentrese",
        "instruccion": " <ol><li>Colocarse de pie.</li><li>Caminar normal, pero apoyando bien las puntas de los pies y los talones durante 10 segundos.</li><li>Caminar en puntillas por 10 segundos.</li><li>Caminar en talones por 10 segundos.</li><li>Caminar en los bordes externos de los pies por 10 segundos adicionales.</li></ol>",
        "id": 24,
        "tiempo": 40,
        "cambio": false,
        "loop": false,
        "imagen": `${baseUrl}/ejercicios/EJ_P21.png`,
        "video": ""
    },
    {
        "tipo": "concentrese",
        "instruccion": "<ol><li>Entrelazar los dedos de las manos en la parte posterior de su cuello.</li><li>Abrir los codos hacia atrás.</li></ol><br>- Mantener esta postura de 10 a 15 segundos.",
        "id": 25,
        "tiempo": 10,
        "loop": false,
        "imagen": `${baseUrl}/ejercicios/EJ_P21A.png`,
        "video": ""
    },
    {
        "tipo": "concentrese",
        "instruccion": "<ol><li>Colocarse de pie.</li><li>Entrelazar los dedos de las manos.</li><li>Estirar los brazos sobre la cabeza.</li><li>Llevar el cuerpo hacia arriba lo más que pueda, como si quisiera tocar el techo.</li></ol><br> - Mantener esta postura durante 10 segundos.",
        "id": 26,
        "tiempo": 10,
        "loop": false,
        "imagen": `${baseUrl}/ejercicios/EJ_P22.png`,
        "video": ""
    },
    {
        "tipo": "concentrese",
        "instruccion": "<ol><li>Pasar el brazo por encima del hombro contrario.</li><li>Estirar, ayudándose con la otra mano. </li></ol><br>- Mantener postura durante 10 segundos por cada lado.",
        "id": 27,
        "tiempo": 20,
        "cambio": true,
        "loop": false,
        "imagen": `${baseUrl}/ejercicios/EJ_P23.png`,
        "video": ""
    },
    {
        "tipo": "recordarPosicion",
        "instruccion": "<ol><li>Colocarse de pie. </li><li>Extender los brazos hacia adelante.</li><li>Separar levemente las piernas.</li><li>Flexionar las piernas manteniendo siempre la espalda derecha (simulando que se sienta en el aire).</li></ol><br>- Mantener esta posición durante 15 segundos.<br><br>OJO, La rodilla no debe pasar la punta del pie.",
        "id": 28,
        "tiempo": 15,
        "cambio": false,
        "loop": false,
        "imagen": `${baseUrl}/ejercicios/EJ_P24.gif`,
        "video": `${baseUrl}/ejercicios/videos/EJ_P24.mp4`
    },
    {
        "tipo": "recordarSonido",
        "instruccion": "<ol><li>Llevar la mano derecha sobre el lado derecho de la cabeza.</li><li>Empujar con la mano la cabeza hacia el lado izquierdo, llevando la cabeza en sentido contrario y aplicando fuerza sobre la mano.</li></ol> - Ejecutar el ejercicio de 10 a 15 segundos y repetir hacia el otro lado.",
        "id": 29,
        "tiempo": 30,
        "cambio": true,
        "loop": false,
        "imagen": `${baseUrl}/ejercicios/EJ_P14.gif`,
        "video": `${baseUrl}/ejercicios/videos/EJ_P14.mp4`
    },
    {
        "tipo": "concentrese",
        "instruccion": "<ol><li>Colocarse de pie.</li><li>Con una postura bien erguida.</li><li>Realizar inspiración</li><li>Llevar hacia atrás la cabeza, hombros y brazos extendidos con las palmas de la mano mirando hacia afuera (como se muestra en el ejemplo).</li></ol><br>- Mantener esta postura de 10 a 15 segundos.",
        "id": 30,
        "tiempo": 15,
        "imagen": `${baseUrl}/ejercicios/EJ_P26A.png`,
        "video": ""
    },
    {
        "tipo": "concentrese",
        "instruccion": "<ol><li>Colocarse de pie.</li><li>Juntar los talones.</li><li>Separar las puntas de los pies.</li><li>Flexionar levemente las rodillas.</li><li>Llevar el tronco a una flexión de 90°.</li><li>Llevar las manos hacia al frente estirando completamente los brazos (puede, si lo desea, apoyarse sobre la pared o el espaldar de un asiento).</li></ol> <br> - Mantener esta posición durante 15 segundos.",
        "id": 31,
        "tiempo": 15,
        "loop": false,
        "imagen": `${baseUrl}/ejercicios/EJ_P27A.png`,
        "video": ""
    },
    {
        "tipo": "concentrese",
        "instruccion": "<ol><li>Sentarse. </li><li>Cruzar los brazos, llevando sus manos sobre cada uno de sus hombros y formando con ellos una “X” sobre su pecho.Tomar una inspiración profunda.</li><li>Girar el tronco lentamente 45° hacia la derecha.</li><li>Regresar al centro. </li><li>Repetir la inspiración.</li><li>Girar el tronco lentamente 45° hacia la izquierda.</li></ol><br> Esto lo debe hacer sin levantar la pelvis del asiento.<br><br> - Repetir el ejercicio durante 30 segundos o realizar 3 repeticiones por lado.",
        "id": 32,
        "tiempo": 30,
        "cambio": true,
        "loop": false,
        "imagen": `${baseUrl}/ejercicios/EJ_P31.png`,
        "video": ""
    },
    {
        "tipo": "recordarSonido",
        "instruccion": "<ol><li>Colocarse de pie y erguido</li><li>Puede apoyarse en una pared.</li><li>Abrir los codos a 90° del tronco.</li><li>Flexionar los codos con las palmas de las manos mirando hacia al frente (como se muestra en la imagen).</li><li>Tomar una respiración profunda.</li><li>Elevar los brazos sin realizar desplazamiento de su tronco.</li><li>Volver los brazos a su posición inicial lentamente.</li></ol><br> - Repetir el ejercicio durante 30 segundos o realizar 3 repeticiones.",
        "id": 33,
        "tiempo": 30,
        "loop": false,
        "imagen": `${baseUrl}/ejercicios/EJ_P30.gif`,
        "video": ""
    },
    {
        "tipo": "recordarSonido",
        "instruccion": "<ol><li>Colocarse de pie.</li><li>Llevar la pierna derecha hacia atrás.</li><li>Sostenerla arriba durante 5 segundos.</li><li>Evitar llevar el tronco hacia adelante. Si desea se puede apoyar sobre el espaldar del asiento o la pared. </li><li>Repetir ejercicio con la pierna izquierda.</li></ol><br> - Repetir el ejercicio durante 30 segundos intercalando las piernas o realizar 3 repeticiones por lado.",
        "id": 34,
        "tiempo": 30,
        "cambio": false,
        "loop": true,
        "imagen": `${baseUrl}/ejercicios/EJ_P25.gif`,
        "video": `${baseUrl}/ejercicios/videos/EJ_P25.mp4`
    },
    {
        "tipo": "concentrese",
        "instruccion": "<ol><li>Colocarse de pie.</li><li>Entrelazar los dedos de las manos detrás de su espalda (como se muestra en el ejemplo).</li><li>Realizar respiraciones profundas llevando los codos hacia atrás al igual que los hombros.</li></ol><br>Evitar aumentar la curva de la espalda.<br><br> - Realizar 3 repeticiones del ejercicio durante 5 segundos cada una.",
        "id": 35,
        "tiempo": 10,
        "cambio": false,
        "loop": false,
        "imagen": `${baseUrl}/ejercicios/EJ_P26.png`,
        "video": ""
    },
    {
        "tipo": "ojos",
        "instruccion": "<ol><li>Mantener la cabeza recta.</li><li> Cerrar los ojos fuertemente y mantenerlos así por 5 segundos. </li><li>Volver a abrirlos y mantenerlos así por 5 segundos.</li></ol> <br> - Repetir el ejercicio durante 30 segundos o realizar 3 repeticiones.",
        "id": 36,
        "tiempo":30,
        "loop": false,
        "imagen": `${baseUrl}/ejercicios/EJ_P27.gif`,
        "video": ""
    },
    {
        "tipo": "ojos",
        "instruccion": "<ol><li>Mantener la cabeza recta.</li><li>Sostener un lápiz o un esfero con la mano frente a usted.</li><li>Sin mover la cabeza acérquelo lentamente hacia usted.</li><li>Alejar nuevamente el lápiz o esfero.</li><li>Mantener siempre la mirada fija en el lápiz o esfero.</li></ol><br> - Repetir el ejercicio durante 15 segundos o realizar 3 repeticiones.",
        "id": 37,
        "tiempo": 15,
        "loop": true,
        "imagen": `${baseUrl}/ejercicios/EJ_P28.gif`,
        "video": `${baseUrl}/ejercicios/videos/EJ_P28.mp4`
    }
]
