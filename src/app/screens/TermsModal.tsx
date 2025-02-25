// TermsModal.tsx
import React from "react";
import {
  Button,
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface TermsModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const { height } = Dimensions.get("window");

const TermsModal: React.FC<TermsModalProps> = ({ isVisible, onClose }) => {
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ScrollView>
            <Text style={styles.modalTitle}>Términos y Condiciones</Text>
            <Text style={styles.modalText}>
              La Aplicación (App) es operada por la Universidad Veracruzana
              (www.uv.mx), en adelante la UV. La aplicación funciona como un
              sistema para el aviso de varamientos de mamíferos marinos en las
              costas de México, con el objeto de facilitar el registro y reporte
              de estos eventos tanto a la Red Nacional de Varamientos de
              Mamíferos Marinos de la Sociedad Mexicana de Mastozoología Marina,
              A.C. (SOMEMMA), como a las Delegaciones Federales de la Secretaría
              del Medio Ambiente (SEMARNAT) y de la Procuraduría Federal de
              Protección al Ambiente (SOMEMMA), instancias apropiadas para el
              manejo de los eventos y la información generada de los
              varamientos, de acuerdo con el Protocolo de Atención para
              Varamiento de Mamíferos Marinos
              (http://www.dof.gob.mx/nota_detalle.php?codigo=5348898&fecha=17/06/2014),
              en adelante PAVMM. El usuario se compromete a leer los términos y
              condiciones aquí establecidas, previamente a la descarga de la
              aplicación, por tanto, en caso de realizar la instalación se
              entiende que cuenta con el conocimiento integral de este documento
              y la consecuente aceptación de la totalidad de sus estipulaciones.
              El Usuario reconoce que el ingreso de su información personal, y
              los datos que contiene la aplicación a su disposición respecto a
              los productos activos de la UV, la realizan de manera voluntaria,
              quienes optan por acceder a esta aplicación en México o desde
              fuera del territorio nacional, lo hacen por iniciativa propia y
              son responsables del cumplimiento de las leyes locales, en la
              medida en que dichas leyes sean aplicables en su correspondiente
              país. En caso de que se acceda por parte de menores de edad, deben
              contar con la supervisión de un adulto en todo momento desde la
              descarga y durante el uso de la aplicación, en el evento en que no
              se cumpla esta condición, le agradecemos no hacer uso de la
              aplicación. ALCANCE Y USO El usuario de la App entiende y acepta
              que no obstante es operada por la UV, la información contenida en
              la misma será la referente a los varamientos de mamíferos marinos
              reportados y podrá ser recuperada por la PROFEPA, SEMARNAT,
              SOMEMMA y la propia UV, por tanto, la información generada por
              cada usuario serán entregadas de manera voluntaria sin
              responsabilidad para la SOMEMMA y la UV. En la App se pondrá a
              disposición del usuario información sobre el PAVMM y/o permitirá
              la realización de los avisos sobre mamíferos marinos varados. La
              UV podrá adicionar, modificar o eliminar las funcionalidades en
              cualquier momento, lo cual acepta el usuario mediante la
              instalación de la aplicación. En todo caso, al momento de realizar
              dichas modificaciones se notificarán al usuario a través de la
              misma aplicación móvil una vez inicie sesión. Los tiempos de
              respuesta, trámites y demás solicitudes efectuadas por el usuario
              mediante la aplicación serán procesadas de conformidad con las
              responsabilidades de cada entidad involucrada en la atención a
              mamíferos marinos varados. El usuario acepta y autoriza que los
              registros electrónicos de las actividades mencionadas, que realice
              en la aplicación constituyen plena prueba de los mismos.
              REQUISITOS PARA USO El usuario deberá contar con un dispositivo
              móvil inteligente (Smartphone) o Tableta con sistema operativo
              IOS, cualquiera de estos con acceso a internet, ambos seguros y
              confiables. La UV, no será responsable por la seguridad de los
              equipos Smartphone propiedad de los usuarios utilizados para el
              acceso al canal, ni por la disponibilidad del servicio en los
              dispositivos en los cuales se descargue la aplicación. En la forma
              permitida por la ley, los materiales de la aplicación se
              suministran sin garantía de ningún género, expresa o implícita,
              incluyendo sin limitación las garantías de calidad satisfactoria,
              comerciabilidad, adecuación para un fin particular o no
              infracción, por tanto, la UV no garantiza el funcionamiento
              adecuado en los distintos sistemas operativos o dispositivos en
              los cuales se haga uso de la aplicación. Para acceder al portal,
              el Usuario contará con un nombre de Usuario y Contraseña, que lo
              identifica en su relación con la App y será proporcionada de
              manera voluntaria, por lo que la información contenida no es
              responsabilidad de la UV. OBLIGACIONES DE LOS USUARIOS El Usuario
              se obliga a usar la aplicación y los contenidos encontrados en
              ella de una manera diligente, correcta, lícita y en especial, se
              compromete a NO realizar las conductas descritas a continuación:
              (a) Utilizar los contenidos de forma, con fines o efectos
              contrarios a la ley, a la moral y a las buenas costumbres
              generalmente aceptadas o al orden público; (b) Reproducir, copiar,
              representar, utilizar, distribuir, transformar o modificar los
              contenidos de la aplicación, por cualquier procedimiento o sobre
              cualquier soporte, total o parcial, o permitir el acceso del
              público a través de cualquier modalidad de comunicación pública;
              (c) Utilizar los contenidos de cualquier manera que entrañen un
              riesgo de daño o inutilización de la aplicación o de los
              contenidos o de terceros; (d) Suprimir, eludir o manipular el
              derecho de autor y demás datos identificativos de los derechos de
              autor incorporados a los contenidos, así como los dispositivos
              técnicos de protección, o cualesquiera mecanismos de información
              que pudieren tener los contenidos; (e) Emplear los contenidos y,
              en particular, la información de cualquier clase obtenida a través
              de la aplicación para distribuir, transmitir, remitir, modificar,
              rehusar o reportar la publicidad o los contenidos de esta con
              fines de venta directa o con cualquier otra clase de finalidad
              comercial, mensajes no solicitados dirigidos a una pluralidad de
              personas con independencia de su finalidad, así como comercializar
              o divulgar de cualquier modo dicha información; (f) No permitir
              que terceros ajenos a usted usen la aplicación móvil con su clave;
              g) Utilizar la aplicación y los contenidos con fines lícitos y/o
              ilícitos, contrarios a lo establecido en estos Términos y
              Condiciones, o al uso mismo de la aplicación, que sean lesivos de
              los derechos e intereses de terceros, o que de cualquier forma
              puedan dañar, inutilizar, sobrecargar o deteriorar la aplicación y
              los contenidos o impedir la normal utilización o disfrute de esta
              y de los contenidos por parte de los usuarios. PROPIEDAD
              INTELECTUAL Todo el material informático, gráfico, publicitario,
              fotográfico, de multimedia, audiovisual y de diseño, así como
              todos los contenidos, textos y bases de datos puestos a su
              disposición en esta aplicación están protegidos por derechos de
              autor y/o propiedad industrial cuyo titular es la UV., o las
              personas físicas correspondientes en los casos donde se señale,
              que han autorizado su uso o explotación. Igualmente, el uso en la
              aplicación de algunos materiales de propiedad de terceros se
              encuentra expresamente autorizado por la ley o por dichos
              terceros. Todos los contenidos en la aplicación están protegidos
              por las normas sobre derecho de autor y por todas las normas
              nacionales e internacionales que le sean aplicables. Exceptuando
              lo expresamente estipulado en estos Términos y Condiciones, queda
              prohibido todo acto de copia, reproducción, modificación, creación
              de trabajos derivados, venta o distribución, exhibición de los
              contenidos de esta aplicación, de manera o por medio alguno,
              incluyendo, más no limitado a, medios electrónicos, mecánicos, de
              fotocopiado, de grabación o de cualquier otra índole, sin el
              permiso previo y por escrito de la UV o del titular de los
              respectivos derechos. En ningún caso estos Términos y Condiciones
              confieren derechos, licencias ni autorizaciones para realizar los
              actos anteriormente prohibidos. Cualquier uso no autorizado de los
              contenidos constituirá una violación del presente documento y a
              las normas vigentes sobre derechos de autor, a las normas vigentes
              nacionales e internacionales sobre Propiedad Industrial, y a
              cualquier otra que sea aplicable. LICENCIA PARA COPIAR PARA USO
              PERSONAL Usted podrá leer, visualizar, imprimir y descargar el
              material de sus productos.Ninguna parte de la aplicación podrá ser
              reproducida o transmitida o almacenada en otro sitio web o en otra
              forma de sistema de recuperación electrónico. Ya sea que se
              reconozca específicamente o no, las marcas comerciales, las marcas
              de servicio y los logos visualizados en esta aplicación pertenecen
              a la UV u otros terceros. INTEGRACIÓN CON OTRAS APLICACIONES Los
              links de Facebook®, Instagram®, twitter® en esta aplicación
              pueden mostrar contenido que no están bajo el control de la UV.
              Aunque esta aplicación de la UV trata de suministrar links
              solamente a sitios y aplicaciones de terceros que cumplan con las
              leyes y regulaciones aplicables y las normas de la UV, el Usuario
              debe entender que la UV no tiene control sobre la naturaleza y el
              contenido de esos sitios y no está recomendando estos sitios, la
              información que contienen ni los productos o servicios de
              terceros. La UV no acepta responsabilidad por el contenido del
              sitio de un tercero con el cual existe un link de hipertexto y no
              ofrece garantía (explícita o implícita) en cuanto al contenido de
              la información en esos sitios, ya que no recomienda estos sitios.
              Usted debe verificar las secciones de términos y condiciones,
              política legal y de privacidad de algunos otros sitios de la UV o
              de un tercero con los cuales se enlaza. La UV no asume ninguna
              responsabilidad por pérdida directa, indirecta o consecuencial por
              el uso de un sitio de un tercero. USO DE INFORMACIÓN Y PRIVACIDAD
              Con la descarga de la APP usted acepta y autoriza que la UV
              utilice sus datos en calidad de responsable del tratamiento para
              fines derivados de la ejecución de la App. La UV informa que podrá
              ejercer sus derechos a conocer, actualizar, rectificar y suprimir
              su información personal; así como el derecho a revocar el
              consentimiento otorgado para el tratamiento de datos personales
              previstos en la ley de protección de datos personales. La UV podrá
              dar a conocer, transferir y/o trasmitir los datos que genere a
              través de esta App dentro y fuera del país a cualquier entidad,
              empresa, así como a terceros que lo soliciten, para todo lo
              anterior otorgo mi autorización expresa e inequívoca. De
              conformidad a lo anterior autoriza el tratamiento de su
              información en los términos señalados, y transfiere a la UV de
              manera total, y sin limitación los derechos de imagen y
              patrimoniales de autor, de manera voluntaria, previa, explicita,
              informada e inequívoca. RESPONSABILIDAD DE LA UV La UV procurará
              garantizar disponibilidad, continuidad o buen funcionamiento de la
              aplicación; sin embargo, podrá bloquear, interrumpir o restringir
              el acceso a esta cuando lo considere necesario para el
              mejoramiento de la aplicación o por dada de baja de la misma. Se
              recomienda al Usuario tomar medidas adecuadas y actuar
              diligentemente al momento de acceder a la aplicación, como por
              ejemplo, contar con programas de protección, antivirus, para
              manejo de malware, spyware y herramientas similares. La UV no será
              responsable por: a) Fuerza mayor o caso fortuito; b) Por la
              pérdida, extravío o hurto de su dispositivo móvil que implique el
              acceso de terceros a la aplicación móvil; c) Por errores en la
              digitación o accesos por parte del Usuario; d) Por los perjuicios,
              lucro cesante, daño emergente, morales en general, por los
              retrasos, no procesamiento de información o suspensión del
              servicio del operador móvil o daños en los dispositivos móviles.
              DENEGACIÓN Y RETIRO DEL ACCESO A LA APP En el Evento en que un
              Usuario incumpla estos Términos y Condiciones, o cualesquiera
              otras disposiciones que resulten de aplicación, la UV podrá
              suspender su acceso a la aplicación. TÉRMINOS Y CONDICIONES El
              Usuario acepta expresamente los Términos y Condiciones, siendo
              condición esencial para la utilización de la APP. En el evento en
              que se encuentre en desacuerdo con estos Términos y Condiciones,
              le solicitamos abandonar la aplicación inmediatamente. La UV podrá
              modificar los presentes términos y condiciones, avisando a los
              usuarios de la aplicación mediante publicación en la página web
              donde resida la App o mediante la difusión de las modificación por
              algún medio electrónico, redes sociales, SMS y/o correo
              electrónico, lo cual se entenderá aceptado por el usuario si éste
              continua con el uso de la aplicación. JURISDICCIÓN Estos términos
              y condiciones y todo lo que tenga que ver con esta aplicación, se
              rigen por las leyes mexicanas. USO DE INFORMACIÓN NO PERSONAL La
              App también recolecta información no personal en forma agregada
              para seguimiento de datos como el número total de descargas de la
              aplicación. Utilizamos esta información, que permanece en forma
              agregada, para entender el comportamiento de la aplicación. USO DE
              DIRECCIONES IP Una dirección de Protocolo de Internet (IP) es un
              conjunto de números que se asigna automáticamente a su o
              dispositivo móvil cuando usted accede a su proveedor de servicios
              de internet, o a través de la red de área local (LAN) de su
              organización o la red de área amplia (WAN). Los servidores web
              automáticamente identifican su dispositivo móvil por la dirección
              IP asignada a él durante su sesión en línea. La App podrá
              recolectar direcciones IP para propósitos de administración de
              sistemas y para auditar el uso de nuestro sitio, todo lo anterior
              de acuerdo con la autorización de protección de datos que se
              suscribe para tal efecto. Sin embargo, podemos usar las
              direcciones IP para identificar a los usuarios de nuestro sitio
              cuando sea necesario con el objeto de para exigir el cumplimiento
              de los términos de uso del sitio, o para proteger nuestro
              servicio, sitio u otros usuarios. SEGURIDAD La UV está
              comprometida en la protección de la seguridad de su información
              personal. La App tiene implementados mecanismos de seguridad que
              aseguran la protección de la información personal, así como los
              accesos únicamente al personal y sistemas autorizados, también
              contra la pérdida, uso indebido y alteración de sus datos de
              usuario bajo nuestro control. Excepto como se indica a
              continuación, sólo personal autorizado tiene acceso a la
              información que nos proporciona. Además, hemos impuesto reglas
              estrictas a los administradores de la App y la plataforma Web con
              acceso a las bases de datos que almacenan información del usuario
              o a los servidores que hospedan nuestros servicios.
            </Text>
          </ScrollView>
          <Button title="Cerrar" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "85%", // Ancho del 85%
    maxHeight: height * 0.8, // Alto del 70% de la pantalla
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default TermsModal;
