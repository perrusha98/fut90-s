import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import ArticleTemplate from '../templates/Articles';

const PageContent = () => {
  return (
    <ArticleTemplate>
      <Text style={styles.title}>Aviso DMCA y Derechos de Autor</Text>
      <View style={styles.separator} />
      <Text style={styles.content}>
        En FUT90, nuestra misión es compartir información relevante y actualizada sobre deportes a nivel nacional e internacional. Respetamos los derechos de autor y la propiedad intelectual de terceros. Las imágenes, videos y marcas registradas utilizadas en nuestra plataforma son propiedad de sus respectivos dueños y se emplean únicamente con fines ilustrativos o de referencia, reconociendo y agradeciendo la autoría correspondiente.
        {"\n\n"}
        No alojamos contenido protegido por derechos de autor en nuestros servidores; los enlaces y materiales compartidos son recopilados de fuentes públicas en Internet. Si considera que algún contenido infringe sus derechos, le invitamos a revisar cuidadosamente esta política antes de presentar una reclamación.
      </Text>

      <Text style={styles.subtitle}>Procedimiento para Notificación de Infracción</Text>
      <Text style={styles.content}>
        Hemos adoptado procedimientos conforme a la Digital Millennium Copyright Act (DMCA) para responder a presuntas infracciones de derechos de autor. Si usted es titular de derechos o su representante autorizado y considera que su material ha sido utilizado de manera indebida, puede enviar una notificación formal a través de nuestro formulario de contacto.
      </Text>

      <Text style={styles.subtitle}>Requisitos de la Notificación</Text>
      <Text style={styles.content}>
        La notificación debe incluir:
        {"\n"}• Firma física o electrónica de la persona autorizada.
        {"\n"}• Identificación clara de la obra protegida.
        {"\n"}• Descripción precisa del material presuntamente infractor y su ubicación.
        {"\n"}• Información de contacto del titular de los derechos (dirección, teléfono y correo electrónico).
        {"\n"}• Declaración de buena fe sobre el uso no autorizado.
        {"\n"}• Declaración, bajo pena de perjurio, de la veracidad de la información y la autorización para actuar en nombre del titular.
      </Text>

      <Text style={styles.subtitle}>Acciones Tras la Notificación</Text>
      <Text style={styles.content}>
        Una vez recibida la notificación, procederemos a:
        {"\n"}• Retirar o bloquear el acceso al material señalado.
        {"\n"}• Notificar al proveedor de contenidos, miembro o usuario afectado.
        {"\n"}• Eliminar materiales de infractores reincidentes y cancelar su acceso a la plataforma.
      </Text>

      <Text style={styles.subtitle}>Contacto</Text>
      <Text style={styles.content}>
        Si tiene alguna consulta o desea presentar una notificación DMCA, puede ponerse en contacto con nosotros a través de nuestro formulario. Nos comprometemos a responder con prontitud y a actuar conforme a la legislación vigente.
      </Text>
      <View style={styles.separator} />
      <Text style={styles.footer}>
        Última actualización: {new Date().toLocaleDateString()}
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
