# Idea

## Introdución
O proxecto que se levará a cabo, "Bug Tracker", será de tipo entregable, sendo posible probalo tanto en local coma en producción aloxado nun proveedor de servizos na nube. Trátase de unha aplicación web que lles permite aos programadores xestionar os diferentes problemas que surxan durante o proceso de desenvolvemento de software, mediante a creación de diferentes entidades (proxectos) que conterán "bugs" con diferente información (coma a descrición do problema, a severidade deste, os desenvolvedores asignados a solucionalo, etc) que axude a xestionalos. Para iso, crearase unha base de datos que almacene a información necesaria e unha interface web que permita todas as operacións necesarias, coma a creación, modificación, borrado, etc da información de bugs e proxectos; a asignación de desenvolvedores a cada proxecto e/ou bug, etc. Finalmente, deberanse proporcionar diferentes medios de autorización e autenticación para facer que os usuarios accedan só aos seus proxectos ou aos proxectos aos que lles dera permiso o seu administrador.

## Obxetivos
O proxecto busca que os programadores teñan unha ferramenta que os axude a xestionar todas as issues que aparezan durante o ciclo de vida do software. Ferramentas existentes, coma Jira, xa realizan esta función de maneira adecuada, pero trátanse de ferramentas de código pechado e de pago. Por iso, a nosa aplicación busca ser unha alternativa open source e gratuíta que cubra as funcións citadas e permita a colaboración de diferentes programadores na mellora e ampliación do produto. 
Concretamente, un usuario de "Bug Tracker" poderá:
* Crear unha conta na apliación usando un proveedor OAuth.
* Crear proxectos privados, modificalos, eliminalos e engadir colaboradoes neles.
* Crear bugs en cada proxecto, modificalos, eliminalos, asignarllos aos colaboradores e cambiar o seu estado segundo estean resoltos ou non.
Para iso, a aplicación deberá contar con unha interfaz web sinxela que permita realizar as diferentes accións da maneira máis eficiente en canto ao tempo empregado polo usuario.

## Tecnoloxías
Como proxecto de aplicación web, utilizaremos:
* Diferentes proveedores de OAuth, coma Google e GitHub, que facilitarán o proceso de autenticación e mellorarán a seguridade da aplicación ao delegar parte deste proceso en entidades que son unha referencia no sector.
* MongoDB como base de datos, debido á flexibilidade dos schemas que permite realizar e a súa velocidade de lectura de datos.
* Nextjs como framework, xa que nos permite realizar tanto o frontend coma o backend de forma sinxela e con múltiples opcións para mellorar o rendemento da nosa aplicación (coma renderizados en cliente, servidor ou híbridos segundo as necesidades de cada compoñente respecto a SEO, interacción do usuario, etc).
* Tailwind como librería de CSS.
* Contedores con Docker para o despregue na fase de desenvolvemento.
* Hosting e dominio para a aplicación na plataforma de Vercel (versión gratuíta) e en MongoDB Atlas (versión gratuíta) para a base de datos, para a posta en producción.