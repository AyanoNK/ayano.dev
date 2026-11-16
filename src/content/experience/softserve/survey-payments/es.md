---
title: "Modernización de pagos legacy"
client: "Una plataforma líder de encuestas online en Estados Unidos"
summary: "Modernicé un sistema de pago de facturas de 20 años para una plataforma líder de encuestas online en Estados Unidos usando Stripe Payments, reduciendo las transacciones fraudulentas con tarjeta de crédito en un 80%."
highlights:
  - "Reduje las transacciones fraudulentas con tarjeta de crédito en un 80% usando Stripe Payments para el manejo seguro de transacciones en un sistema de facturación de 20 años."
  - "Migré el 20% de los correos de marketing y renovación de suscripciones de un servicio interno a una arquitectura productor-consumidor."
  - "Recuperé miles en fondos de impuestos de transacciones defectuosas mediante un análisis financiero cuidadoso."
---

### El cliente y el problema

El cliente es una plataforma líder de encuestas online en Estados Unidos. Partes de su plataforma tienen 20 años, incluido el sistema que maneja el pago de facturas, y necesitaba mantenimiento y una renovación para responder a las demandas actuales de la industria. Las empresas usan la plataforma para crear encuestas, recoger respuestas anónimas de audiencias seleccionadas y analizar los resultados, pagando con planes de suscripción y créditos de audiencia.

### Lo que hice

Trabajé en el mantenimiento y la renovación de estos sistemas de 20 años, y en la migración de partes legacy a microservicios y arquitecturas basadas en eventos.

- **Pagos.** Modernicé el sistema legacy de pago de facturas, usando Stripe Payments para el manejo seguro de transacciones.
- **Correos.** Migré el 20% de los correos de marketing y renovación de suscripciones de un servicio interno a una arquitectura productor-consumidor, donde un servicio pone los correos en cola y otro los envía.
- **Fondos de impuestos.** Mediante un análisis financiero cuidadoso, encontré transacciones defectuosas y recuperé miles en fondos de impuestos.

### Cómo está construida

La plataforma funciona como microservicios construidos con Python (Pyramid), React y Java en AWS, usando AWS SQS y Kafka para los eventos y Terraform para desplegar en Kubernetes. Trabajé en ella en un equipo de más de 30 personas.

- **Microservicios.** Desarrollé y mantuve microservicios en Python con Pyramid en AWS, y diseñé las APIs de backend y las integraciones en la nube para ellos.
- **Colas de correos.** Los correos que pasaron a la nueva arquitectura ahora se envían a través de AWS SQS y Kafka.

### Resultados

- 80% menos transacciones fraudulentas con tarjeta de crédito.
- Miles recuperados en fondos de impuestos.
