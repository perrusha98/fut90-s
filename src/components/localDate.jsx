import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import moment from "moment-timezone";
import "moment/locale/es";
import * as RNLocalize from "react-native-localize";

const EventComponent = ({ eventTime }) => {
  const [localHour, setLocalHour] = useState("");

  useEffect(() => {
    moment.locale("es"); // Configurar español
    const userTimeZone = RNLocalize.getTimeZone(); // Obtener la zona horaria del usuario

    // Convertir la hora del evento a la zona horaria local y formatear solo la hora
    setLocalHour(moment.tz(eventTime, "YYYY-MM-DD HH:mm:ss", userTimeZone).format("HH:mm"));
  }, [eventTime]);

  return <Text> {localHour}</Text>;
};

export default EventComponent;
