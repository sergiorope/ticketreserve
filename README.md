REQUISITOS PARA LA INICIALIZACIÓN DEL PROYECTO:
- Docker


INSTRUCCIONES PARA LA INICIALIZACIÓN DEL PROYECTO:

Primero aclarar que para que este proyecto pueda ser desplegado no se hace de manera convencional, es decir (descargándolo e iniciandolo en un entorno), en este caso uso Docker porque permite al la persona que
lo va a probar que no le haga falta descargar ningun entorno ni nada además de problemas que dan con las versiones entre uno y otro.

1º: Debemos crear una carpeta base por ejemplo "ticketreserve".
2º: Después en esta carpeta debemos mover el docker-compose.yaml y la carpeta dbfiles de la ubicación raíz del proyecto de github.
3º: Situarnos en la línea de comandos en la carpeta de "ticketreserve", y poner el siguiente comando: docker-compose up -d, y ya tendríamos desplegado en docker el proyecto.