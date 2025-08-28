import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import ArticleTemplate from '../templates/Articles';

const PageContent = () => {
  return (
    <ArticleTemplate>
      <Text style={styles.title}>Política de Privacidad</Text>
      <View style={styles.separator} />
      <Text style={styles.content}>
        En FUT90, valoramos y respetamos la privacidad de nuestros usuarios. Esta política describe cómo recopilamos, utilizamos, almacenamos y protegemos su información personal cuando interactúa con nuestra plataforma. Nuestro compromiso es garantizar la transparencia y la seguridad en el manejo de sus datos, cumpliendo con las normativas vigentes y adoptando las mejores prácticas del sector.
      </Text>

      <Text style={styles.subtitle}>Recopilación de Información</Text>
      <Text style={styles.content}>
        Cuando los visitantes dejan comentarios en el sitio, recopilamos los datos proporcionados en el formulario de comentarios, así como la dirección IP y la cadena del agente de usuario del navegador, con el objetivo de ayudar a la detección de spam y mejorar la seguridad de la plataforma.
        {"\n\n"}
        Además, se puede generar una cadena anónima (hash) a partir de su dirección de correo electrónico para verificar si utiliza el servicio Gravatar. Puede consultar la política de privacidad de Gravatar en: https://automattic.com/privacy/. Tras la aprobación de su comentario, su foto de perfil será visible públicamente junto a su comentario.
      </Text>

      <Text style={styles.subtitle}>Imágenes y Datos de Ubicación</Text>
      <Text style={styles.content}>
        Si carga imágenes en nuestro sitio web, le recomendamos evitar incluir datos de ubicación (GPS EXIF), ya que otros visitantes podrían descargar y extraer dicha información de las imágenes publicadas.
      </Text>

      <Text style={styles.subtitle}>Uso de Cookies</Text>
      <Text style={styles.content}>
        Para mejorar su experiencia, utilizamos cookies que permiten recordar sus preferencias y facilitar su navegación. Si deja un comentario, puede optar por guardar su nombre, correo electrónico y sitio web en cookies, lo que le evitará tener que volver a ingresar estos datos en futuras interacciones. Estas cookies tienen una duración de un año.
        {"\n\n"}
        Si posee una cuenta e inicia sesión, se establecerán cookies temporales para verificar la aceptación de cookies por parte de su navegador. Estas cookies no contienen datos personales y se eliminan al cerrar el navegador. Las cookies de inicio de sesión duran dos días, mientras que las de preferencias de pantalla duran un año. Si selecciona «Recordarme», su sesión persistirá durante dos semanas. Al cerrar sesión, las cookies de inicio de sesión se eliminarán automáticamente.
      </Text>

      <Text style={styles.subtitle}>Contenido Incrustado y Terceros</Text>
      <Text style={styles.content}>
        Los artículos de este sitio pueden incluir contenido incrustado (videos, imágenes, artículos, etc.) de otros sitios web. Dicho contenido se comporta de la misma manera que si el usuario visitara directamente el sitio de origen, pudiendo estos recopilar datos, utilizar cookies y realizar seguimiento adicional según sus propias políticas de privacidad.
      </Text>

      <Text style={styles.subtitle}>Retención y Gestión de Datos</Text>
      <Text style={styles.content}>
        Los comentarios y sus metadatos se conservan indefinidamente para facilitar la aprobación automática de comentarios futuros. Los usuarios registrados pueden ver, editar o eliminar su información personal en cualquier momento, excepto su nombre de usuario. Los administradores del sitio también pueden gestionar dicha información.
        {"\n\n"}
        Si desea recibir un archivo exportado de sus datos personales o solicitar la eliminación de los mismos, puede hacerlo contactándonos. Existen excepciones para datos que debamos conservar por motivos legales, administrativos o de seguridad.
      </Text>

      <Text style={styles.subtitle}>Seguridad y Contacto</Text>
      <Text style={styles.content}>
        Implementamos medidas de seguridad para proteger su información y utilizamos servicios automatizados para la detección de spam. Si tiene dudas o desea ejercer sus derechos de acceso, rectificación o eliminación de datos, puede contactarnos a través de nuestro formulario de contacto.
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
