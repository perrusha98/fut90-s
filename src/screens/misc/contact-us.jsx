import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import ArticleTemplate from '../templates/Articles';

const PageContent = () => {
  return (
    <ArticleTemplate>
      <Text style={styles.title}>Contáctanos</Text>
      <View style={styles.separator} />
      <Text style={styles.content}>
        En FUT90, valoramos la comunicación directa y transparente con nuestra comunidad. Si tienes alguna consulta, sugerencia o deseas ponerte en contacto con nuestro equipo, puedes hacerlo a través de los siguientes medios:
      </Text>

      <Text style={styles.content}>
        <Text style={styles.bold}>📧 Correo electrónico:</Text> contacto@fut90s.com
      </Text>
      <Text style={styles.content}>
        <Text style={styles.bold}>📞 Número de contacto:</Text> +52 341 532 44 69
      </Text>
      <Text style={styles.content}>
        <Text style={styles.bold}>🕒 Horario de atención:</Text> Lunes a Viernes de 9:00 AM a 6:00 PM (Hora local)
      </Text>

      <Text style={styles.content}>
        Nuestro equipo está comprometido en brindarte la información y el soporte que requieras. Ya sea que estés interesado en nuestros servicios, tengas dudas técnicas o simplemente quieras saludarnos, estaremos atentos a tu mensaje y responderemos a la brevedad posible.
      </Text>

      <Text style={styles.subtitle}>Envío de Notas de Prensa</Text>
      <Text style={styles.content}>
        Si cuentas con noticias deportivas relevantes, logros destacados o eventos que desees compartir con nuestra comunidad, te invitamos a enviar tus notas de prensa a <Text style={styles.bold}>prensa@fut90s.com</Text>. Nos interesa difundir información de valor y apoyar el crecimiento del deporte.
      </Text>

      <Text style={styles.subtitle}>Soporte Técnico</Text>
      <Text style={styles.content}>
        ¿Tienes problemas técnicos con nuestra app? No te preocupes, estamos aquí para ayudarte. Por favor, contáctanos en <Text style={styles.bold}>soporte@fut90s.com</Text> y nuestro equipo de soporte te asistirá de manera rápida y eficiente. Tu satisfacción es nuestra prioridad.
      </Text>

      <Text style={styles.content}>
        Agradecemos tu interés en contactarnos y te aseguramos que cada mensaje es importante para nosotros. ¡Gracias por elegir FUT90 como tu fuente de información deportiva!
      </Text>
      <View style={styles.separator} />
      <Text style={styles.footer}>
        © {new Date().getFullYear()} FUT90. Todos los derechos reservados.
      </Text>
    </ArticleTemplate>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#b90b0b',
    textAlign: 'center',
    marginBottom: 18,
    letterSpacing: 1,
  },
  separator: {
    borderBottomColor: '#b90b0b',
    borderBottomWidth: 2,
    marginVertical: 12,
    marginHorizontal: 40,
  },
  content: {
    fontSize: 17,
    color: 'white',
    marginBottom: 22,
    lineHeight: 26,
    textAlign: 'justify',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#b90b0b',
    marginBottom: 8,
    marginTop: 10,
    letterSpacing: 0.5,
  },
  footer: {
    fontSize: 13,
    color: '#CCCCCC',
    textAlign: 'center',
    marginTop: 18,
    fontStyle: 'italic',
  },
});

export default PageContent;
