import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

import FooterLink from "../components/FooterLink";
import Header from "../components/Header";
import PrimaryButton from "../components/PrimaryButton";
import StepDots from "../components/Stepdots";
import TitleSubtitle from "../components/TittleSubtitle";
import AppText from "../components/AppText";

const ocupacionesOpciones = [
  "Estudiante",
  "Empleado",
  "Profesional independiente",
  "Otro",
];

export default function RegisterScreen() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [ocupacion, setOcupacion] = useState("");
  const [showOcupacion, setShowOcupacion] = useState(false);
  const [fechaNacimiento, setFechaNacimiento] = useState<Date | undefined>();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const today = new Date();
      const minDate = new Date();
      minDate.setFullYear(today.getFullYear() - 10);
      if (selectedDate > minDate) {
        alert("Debes tener al menos 10 años.");
        return;
      }
      setFechaNacimiento(selectedDate);
    }
  };

  const handleNext = () => {
    const soloLetras = /^[A-Za-zÀ-ÿ\s]+$/;

    if (!nombre || !apellido || !ocupacion || !fechaNacimiento) {
      alert("Por favor completa todos los campos.");
      return;
    }
    if (!soloLetras.test(nombre) || !soloLetras.test(apellido)) {
      alert("Nombre y apellido solo deben contener letras.");
      return;
    }

    router.push("/auth/register/registerstep2");
  };

  return (
    <View style={styles.screen}>
      <Header title="Crear cuenta" onBack={() => router.back()} />

      <ScrollView
        style={styles.card}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: verticalScale(60) }}
      >
        <TitleSubtitle
          title="¡Bienvenido a Kovara!"
          subtitle="Completa tus datos personales para continuar con tu registro."
          titleStyle={{ fontSize: scale(20), marginBottom: verticalScale(12) }}
          subtitleStyle={{ fontSize: scale(13), lineHeight: verticalScale(18) }}
        />

        <View style={styles.formGroup}>
          <AppText variant="medium" style={styles.label}>Nombre</AppText>
          <TextInput
            value={nombre}
            onChangeText={(text) => setNombre(text.replace(/[^A-Za-zÀ-ÿ\s]/g, ""))}
            placeholder="Ingresa tu primer nombre"
            placeholderTextColor="#BDBDBD"
            style={styles.input}
          />
        </View>

        <View style={styles.formGroup}>
          <AppText variant="medium" style={styles.label}>Apellido</AppText>
          <TextInput
            value={apellido}
            onChangeText={(text) => setApellido(text.replace(/[^A-Za-zÀ-ÿ\s]/g, ""))}
            placeholder="Ingresa tu primer apellido"
            placeholderTextColor="#BDBDBD"
            style={styles.input}
          />
        </View>

        <View style={styles.formGroup}>
          <AppText variant="medium" style={styles.label}>Ocupación</AppText>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowOcupacion(!showOcupacion)}
          >
            <AppText variant="medium" style={{ color: ocupacion ? "#111827" : "#BDBDBD" }}>
              {ocupacion || "Selecciona tu ocupación"} ▼
            </AppText>
          </TouchableOpacity>

          {showOcupacion && (
            <View style={styles.dropdown}>
              {ocupacionesOpciones.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setOcupacion(item);
                    setShowOcupacion(false);
                  }}
                >
                  <AppText variant="medium">{item}</AppText>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <View style={styles.formGroup}>
          <AppText variant="medium" style={styles.label}>Fecha de nacimiento</AppText>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowDatePicker(true)}
          >
            <AppText variant="medium" style={{ color: fechaNacimiento ? "#111827" : "#BDBDBD" }}>
              {fechaNacimiento
                ? fechaNacimiento.toLocaleDateString()
                : "Ingresa tu fecha de nacimiento"}
            </AppText>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={fechaNacimiento || new Date()}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onDateChange}
              maximumDate={new Date(new Date().setFullYear(new Date().getFullYear() - 10))}
            />
          )}
        </View>

        <PrimaryButton
          title="Siguiente"
          style={{ marginTop: verticalScale(0) }}
          onPress={handleNext}
        />

        <StepDots activeIndex={0} total={3} />

        <FooterLink
          question="¿Ya tienes una cuenta?"
          actionText="Iniciar sesión"
          linkTo="/auth/login"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#3476F4" },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: verticalScale(10),
    borderTopLeftRadius: scale(18),
    borderTopRightRadius: scale(18),
    paddingTop: verticalScale(40),
    paddingHorizontal: scale(24),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 6,
  },
  formGroup: {
    marginBottom: verticalScale(14),
  },
  label: {
    fontSize: scale(13),
    color: "#374151",
    marginBottom: verticalScale(6),
  },
  input: {
    height: verticalScale(42),
    borderRadius: scale(10),
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
    paddingHorizontal: scale(14),
    justifyContent: "center",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: scale(10),
    backgroundColor: "#F9FAFB",
    marginTop: verticalScale(4),
  },
  dropdownItem: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(14),
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
});
