import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import ArticleTemplate from '../templates/Articles';

const PageContent = () => {
  return (
    <ArticleTemplate>
      <Text style={styles.title}>Sobre Nosotros</Text>
      <View style={styles.separator} />
      <Text style={styles.content}>
        En FUT90, somos un equipo apasionado por el deporte y la excelencia informativa. Nuestra dedicación y amor por las distintas disciplinas deportivas nos impulsan a ofrecer a nuestros seguidores una experiencia informativa, educativa y emocionante. Nos esforzamos por mantener los más altos estándares de calidad en cada uno de nuestros contenidos, brindando análisis profundos, noticias actualizadas y cobertura de eventos en vivo para que nuestros usuarios siempre estén al tanto de lo que acontece en el mundo deportivo.
        {"\n\n"}
        Nuestra plataforma está diseñada para ser un punto de encuentro para aficionados, atletas y profesionales, fomentando la interacción y el intercambio de ideas en un ambiente respetuoso y enriquecedor.
      </Text>
      <Text style={styles.subtitle}>Visión & Objetivo</Text>
      <Text style={styles.content}>
        En FUT90, entendemos que el deporte trasciende los límites de la competencia; es una pasión universal que une a personas de todas las edades, culturas y nacionalidades. Por ello, nuestro objetivo es ofrecer contenido diverso, entretenido y educativo que celebre la belleza, la emoción y los valores del deporte.
        {"\n\n"}
        Nos comprometemos a proporcionar información relevante sobre equipos, atletas, tácticas y tendencias, así como resúmenes de eventos destacados y debates enriquecedores sobre estrategias de juego. Queremos ser tu fuente confiable para mantenerte informado y motivado, sin importar cuál sea tu disciplina favorita.
      </Text>
      <Text style={styles.subtitle}>Compromiso</Text>
      <Text style={styles.content}>
        Nuestro compromiso con la comunidad deportiva es inquebrantable. Somos un equipo de profesionales y entusiastas que comparten la misma pasión que nuestros seguidores. Trabajamos día a día para ofrecer un espacio donde se celebren los logros, se compartan aprendizajes y se fomente el respeto por la diversidad deportiva.
        {"\n\n"}
        En FUT90, creemos en el poder del deporte para transformar vidas y unir comunidades. Por eso, te invitamos a formar parte de este emocionante viaje, donde juntos celebraremos los triunfos, aprenderemos de las derrotas y disfrutaremos de cada momento del juego. Únete a nosotros y vive el deporte desde una perspectiva única, profesional y apasionada.
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
