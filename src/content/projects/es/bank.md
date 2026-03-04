Una aplicación de Android diseñada para ayudar a los usuarios a **presupuestar sus gastos diarios** leyendo automáticamente los mensajes SMS del banco y generando métricas financieras.

## Características Principales

- **Análisis Automático de SMS**: Lee y categoriza los mensajes de transacciones bancarias
- **Reportes Mensuales de Gastos**: Genera métricas detalladas a partir de los gastos reportados
- **Diseño Material3**: Construido con Jetpack Compose y Material3 para una interfaz moderna
- **Widget de Pantalla Principal**: Widget de Jetpack Glance para una vista rápida de gastos

## Aspectos Técnicos

La aplicación aprovecha los permisos de SMS de Android para analizar las notificaciones bancarias entrantes, extraer montos de transacciones y categorizarlos en categorías de gasto. Los datos se almacenan localmente y se procesan para generar reportes financieros mensuales con gráficos visuales.
