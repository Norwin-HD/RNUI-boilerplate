import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import FooterLink from "../components/FooterLink";
import Header from "../components/Header";
import PrimaryButton from "../components/PrimaryButton";
import StepDots from "../components/Stepdots";
import TitleSubtitle from "../components/TittleSubtitle";

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
      minDate.setFullYear(today.getFullYear() - 10); // mínimo 10 años
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
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <TitleSubtitle
          title="¡Bienvenido a Kovara!"
          subtitle="Completa tus datos personales para continuar con tu registro."
        />

        <Text style={styles.label}>Nombre</Text>
        <TextInput
          value={nombre}
          onChangeText={(text) => {
            setNombre(text.replace(/[^A-Za-zÀ-ÿ\s]/g, ""));
          }}
          placeholder="Ingresa tu primer nombre"
          placeholderTextColor="#BDBDBD"
          style={styles.input}
        />

        <Text style={[styles.label, { marginTop: 14 }]}>Apellido</Text>
        <TextInput
          value={apellido}
          onChangeText={(text) => {
            setApellido(text.replace(/[^A-Za-zÀ-ÿ\s]/g, ""));
          }}
          placeholder="Ingresa tu primer apellido"
          placeholderTextColor="#BDBDBD"
          style={styles.input}
        />

        <Text style={[styles.label, { marginTop: 14 }]}>Ocupación</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowOcupacion(!showOcupacion)}
        >
          <Text style={{ color: ocupacion ? "#111827" : "#BDBDBD" }}>
            {ocupacion || "Selecciona tu ocupación"} ▼
          </Text>
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
                <Text>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Fecha de nacimiento */}
        <Text style={[styles.label, { marginTop: 14 }]}>Fecha de nacimiento</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={{ color: fechaNacimiento ? "#111827" : "#BDBDBD" }}>
            {fechaNacimiento
              ? fechaNacimiento.toLocaleDateString()
              : "Ingresa tu fecha de nacimiento"}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={fechaNacimiento || new Date()}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onDateChange}
            maximumDate={new Date(new Date().setFullYear(new Date().getFullYear() - 10))} // máximo 10 años atrás
          />
        )}

        {/* Botón siguiente */}
        <PrimaryButton
          title="Siguiente"
          style={{ marginTop: 30 }}
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
    marginTop: 10,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingTop: 48,
    paddingHorizontal: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 6,
  },
  label: {
    fontSize: 13,
    color: "#374151",
    marginBottom: 10,
    fontWeight: "600",
  },
  input: {
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 14,
    justifyContent: "center",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    backgroundColor: "#F9FAFB",
    marginTop: 4,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
});
