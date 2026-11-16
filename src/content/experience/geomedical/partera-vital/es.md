---
title: Partera Vital
client: UNFPA Colombia y el DANE
summary: Lideré el desarrollo desde cero de Partera Vital, una aplicación móvil de salud pública que conecta a parteras tradicionales del Chocó, Colombia con los sistemas de salud, entregada en 3 meses y aún en uso.
highlights:
  - Entregué la aplicación móvil completa en 3 meses, y sigue en uso hoy.
  - Permití que los registros de nacimientos y las alertas de salud materna llegaran a entidades públicas en comunidades donde la mortalidad materna puede triplicar las cifras nacionales.
  - Diseñé sincronización de datos offline-first para zonas donde la conectividad a Internet es prácticamente inutilizable.
  - Abordé los desafíos de veracidad de datos causados por la falta de recursos tecnológicos en ubicaciones remotas.
  - "Expuse un endpoint REST seguro para que las entidades del gobierno puedan comprobar que cada recién nacido quede registrado."
---

### El cliente y el problema

Partera Vital es un proyecto de salud pública de UNFPA Colombia y el DANE, el departamento nacional de estadística de Colombia. Conecta a parteras tradicionales del Chocó, Colombia con los sistemas de salud y el registro de estadísticas vitales.

El Chocó tiene comunidades afrocolombianas e indígenas donde la mortalidad materna puede triplicar las cifras nacionales y la presencia del Estado es escasa.

### Lo que construí

Lideré el desarrollo desde cero del MVP de Partera Vital. Usé React Native para la aplicación móvil que usan las parteras, Flask para el backend que recibe los registros y Google Cloud para la infraestructura.

La conectividad a Internet en la región es tan intermitente que resulta prácticamente inutilizable. Diseñé una sincronización de datos offline-first, de modo que la aplicación guarda los registros en el teléfono y los envía cuando aparece una conexión.

La falta de recursos tecnológicos en ubicaciones remotas también causaba desafíos de veracidad de datos, que abordé como parte del proyecto.

### Más de lo que construí

Trabajé en un equipo de 1 a 3 personas.

- **Aplicación móvil.** Desarrollé toda la aplicación con React Native y Expo, incluyendo alertas para madres gestantes sobre problemas médicos y la sincronización de los datos con la nube.
- **Backend.** Construí el servidor en Flask entre la aplicación y la base de datos en la nube. Registra los nuevos nacimientos en una base de datos MySQL en Google Cloud, y expone un endpoint REST seguro que las entidades del gobierno usan para asegurarse de que los recién nacidos queden registrados.

### Resultados

- La aplicación completa se entregó en 3 meses.
- Los registros de nacimientos y las alertas de salud materna ahora llegan a entidades públicas desde comunidades donde el Estado casi no tiene presencia.
- La aplicación sigue en uso hoy.
