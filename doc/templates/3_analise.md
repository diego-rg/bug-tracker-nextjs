# REQUIRIMENTOS DO SISTEMA
Este documento describe os requirimentos para "Bug Tracker" especificando que funcionalidades ofrecerá e de que xeito.

## Descrición Xeral
O proxecto deberá permitir, de forma sinxela e eficiente, a xestión de todas as issues que ocorran durante o proceso de desenvolvemento de software. Para iso, deberá constar de unha interface web para realizar as operacións necesarias (crear, editar, borrar, asignar, etc bugs e proxectos), unha base de datos para almacenar a información, unha API web que permita o funcionamento de ambas, e un sistema de autenticación e autorización para limitar o acceso aos proxectos e as accións que se leven a cabo neles.

## Funcionalidades
1. RF1 - Xestión de usuarios.
    1. RF1.1 - Creación de usuarios. Creación de unha conta de usuario na páxina principal da aplicación web mediante un servizo de OAuth (Google, GitHub, etc), permitindo que cada usuario sexa identificado na nosa base de datos por unha dirección de email única e limitando o acceso ao seu panel de usuario a calquera outro visitante.
    2. RF1.2 - Login de usuario. Cada usuario deberá poder entrar ao seu perfil coas credenciais do servizo OAuth dende a páxina principal.
    3. RF1.3 - Peche de sesión. Cada usuario poderá pechar a sesión dende a páxina principal ou dende o menú do seu panel de usuario.
    4. RF1.4 - Usuario de proba. Para probar a aplicación, deberá existir un usuario "Invitado" que permita aos visitantes comprobar o funcionamento da aplicación antes de rexistrarse. Este usuario deberá ter as mismas funcionalidades que calquera usuario normal (login, peche de sesión, creación de proxectos, creación de bugs, etc)
2. RF2 - Xestión de proxectos.
    1. RF2.1 - Creación de proxectos. Cada usuario poderá crear proxectos só visibles polo seu perfil despois de iniciar sesión.
    2. RF2.2 - Edición de proxectos. Cada usuario poderá editar os proxectos dos que sexa creador dende o seu panel de usuario.
    3. RF2.3 - Eliminación de proxectos. Cada usuario poderá eliminar os proxectos dos que sexa creador dende o seu panel de usuario.
    4. RF2.4 - Invitación de colaboradoes. Cada usuario poderá invitar a un usuario rexistrado na aplicación para que colabore no proxecto, facendo que este pase a ser visible para o novo usuario tamén.
    5. RF2.5 - Listar proxectos. Cada usuario poderá ver todos os proxectos dos que sexa creador ou colaborador.
3. RF3 - Xestión de bugs.
    1. RF3.1 - Creación de bugs. Cada usuario poderá crear bugs dentro de cada proxecto do que sexa creador ou colaborador.
    2. RF3.2 - Edición de bugs. Cada usuario poderá editar os bugs dos que sexa creador ou colaborador dende o seu panel de usuario.
    3. RF3.3 - Eliminación de bugs. Cada usuario poderá eliminar os bugs dentro dos proxectos dos que sexa creador dende o seu panel de usuario.
    4. RF3.4 - Asignación de bugs. Cada usuario que sexa creador do proxecto poderá asignar bugs a un colaborador, cambiando o estado do bug a "asignado" de forma automática.
    5. RF3.5 - Búsqueda e filtrado de bugs. A aplicación deberá permitir, de forma rápida e sinxela dende a interfaz de usuario, o filtrado por estado, severidade, etc dos bugs e a búsqueda por texto en todos os seus campos.
    6. RF3.6 - Comentarios nos bugs. Todos os usuarios que teñan acceso a un proxecto poderán comentar en cada bug para aportar a información que consideren necesaria.
    7. RF3.7 - Listar bugs. Cada usuario poderá ver todos os bugs dos que sexa creador ou colaborador.
4. RF4 - Personalización da app.
    1. RF4.1 - Modo escuro. O usuario poderá cambiar a cor da súa interface de usuario para a súa dashboard segundo desexe.
 
## Requerimentos non funcionais
1. RNF1 - Seguridade. Para mellorar a seguridade da aplicación, o noso sistema non almacenará nin traballará con ningún tipo de contrasinal, limitándose ao uso da dirección de correo electrónico coa que solicite o acceso no proveedor de OAuth.
2. RNF2 - Deseño da base de datos. Debido a que a cantidade de bugs pode ser un número case ilimitado en aplicacións grandes que leven moitos anos usando noso sistema, o deseño da base de datos deberá ter en conta esta situación (exemplo: non crear un campo "Bugs" na entidade "Proxecto" onde integremos ou referenciemos todos os bugs do proxecto, senón que se debe facer ao contrario e referenciar en cada bug o proxecto ao que pertence, para evitar ter un array de datos que aumente indefinidamente podendo superar os 16mB de capacidade de cada documento de MongoDB).
3. RNF3 - Interfaces de usuario e fetch de datos. Dado que a natureza do proxecto require unha actualización dos datos mostrados ao usuario moi frecuente, deberase ter en conta a necesidade de crear índices na base de datos para as consultas máis frecuentes, renderizado no cliente dos compoñentes que se beneficien disto, uso de caché e, en xeral, todo o necesario para que a actualización dos datos requeridos sexa o máis rápida e frecuente posible.
4. RNF4 - Accesibilidade. Para mellorar a accesibilidade, deberase limitar a cantidade de información presentada (paxinación), o uso de animacións con alto uso de recursos, ou calquera outra situación que poida limitar ou dificultar o uso da aplicación.

## Tipos de usuarios
Por defecto, só existirá un tipo de usuario na nosa aplicación, anque as capacidades deste variarán segundo o contexto:
1. Usuario "Invitado": poderá acceder a el calquera persoa para probar a aplicación. Terá as mesmas limitacións que o resto de usuarios.
2. Usuario rexistrado cun proveedor OAuth: poderá ter certas limitacións dependendo do contexto:
* Se é o dono do proxecto: terá todas as funcionalidades existentes.
* Se está invitado como desenvolvedor: non poderá eliminar o proxecto nin eliminar ou modificar bugs aos que non estea asignado ou non sexa o seu creador.

## Avaliación da viabilidade técnica do proxecto

### Hardware requerido
Para o uso da aplicación, o usuario desta só necesitará un sistema que teña acceso a internet e poida executar un navegador web.

### Software
O uso da aplicación só requerirá dun navegador web, polo que se deberá ter en conta as limitacións de cada unha das opcións comerciais existentes en canto a incompatibilidades que poidan surxir co código que executen.

## Interfaces externos
A aplicación fará uso dos servizos de OAuth de Google e GitHub. Para iso, deberase rexistrar a nosa aplicación en cada un dos proveedores. Posteriormente, deberase crear un enlace na páxina de inicio de sesión que leve ao usuario á páxina indicada polo proveedor, onde, despois de introducir as credenciais correctamente, nos devolverá o email do usuario que usaremos na nosa aplicación para identificalo. Usarase unha librería de terceiros (NextAuth) para simplificar o proceso.

## Análise de riscos e interesados
Podemos diferenciar dous tipos de entidades interesadas:
1. Desenvolvedores de software. En xeral, a súa actitude respecto ao producto debería ser indiferente ou positiva. No segundo caso, podería haber programadores que non só estiveran interesados no uso do produto, senón tamén na colaboración nel como proxeto open source.
2. Entidades propietarias de ferramentas da competencia. Dado que o noso produto pode ter un impacto negativo sobre o seu negocio, xa que supoñemos unha alternativa open source e gratuíta, poderíamos esperar que estas reaccionen coa oferta de partes do seu servizo de forma gratuíta, potenciación da importacia do usuario no desenvolvemento do seu produto, etc

## Actividades
Os pasos que se han seguir para levar a cabo o proxecto son:
1. Deseño do diagrama de clases.
2. Deseño e diagrama da base de datos.
3. Deseño e documentación da API.
4. Deseño e mockup da interfaz de usuario.
5. Deseño e diagrama do fluxo de autenticación.
6. Diagrama de compoñentes.
7. Codificación da aplicación.
8. Deseño e realización das probas.
9. Posta en producción da aplicación.

## Melloras futuras
Dado que a versión inicial presentada só dispoñerá das funcionalidades básicas necesarias para o seu funcionamento, e dado o carácter opensource do proxecto, quedarán a libre disposición dos colaboradores a ampliación de funcionalidades, seguindo os pasos indicados na documentación. Entre elas, poderíamos recomendar para futuras versións:
* Integrar calendarios de tarefas con información de deadlines e similares.
* Distinción entre bugs propiamente ditos e funcionalidades.
* Ferramentas de creación de diagramas, informes, etc que faciliten o proceso de administración dos proxectos.
* etc