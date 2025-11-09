import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import Modal from "react-native-modal";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { useTransactionDetail } from "../TransactionDetailContext";

// Componente de solo lectura alineado al diseño Figma (monto, fecha, descripción, recibo)
const FieldComponent: React.FC = () => {
  const transaction = useTransactionDetail();
  const [showVoucher, setShowVoucher] = useState(false);

  const voucher = transaction ? ((transaction as any).voucherUri || transaction.imagen || transaction.imageUri) : null;
  const isAbsolute = voucher ? /^(https?:\/\/|file:\/\/|content:\/\/|ph:\/\/)/i.test(voucher) : false;
  const voucherUri = voucher ? (isAbsolute ? voucher : `${voucher}.webp`) : null;
  const { width: screenWidth } = useWindowDimensions();
  const [imgSize, setImgSize] = useState<{ w: number; h: number } | null>(null);

  useEffect(() => {
    if (showVoucher && voucherUri) {
      Image.getSize(
        voucherUri,
        (w, h) => setImgSize({ w, h }),
        () => setImgSize(null)
      );
    }
  }, [showVoucher, voucherUri]);

  if (!transaction) return null;

  const amount = transaction.monto ?? 0;
  const sign = amount > 0 ? "+" : "-";
  const formattedAmount = `${sign} $${Math.abs(amount).toFixed(2)}`;
  const dateText = new Date(transaction.fecha).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <View style={styles.wrapper}>
      <Text style={styles.mainTitle}>{transaction.type === "income" ? "Ingreso" : "Gasto"}</Text>

      {/* Monto */}
      <View style={styles.fieldBlock}>
        <Text style={styles.label}>Monto</Text>
        <View style={styles.inputRowTall}>
          <Text style={styles.currency}>$</Text>
          <Text style={styles.amount}>{formattedAmount.replace(/^[-+]?\s?\$/,'')}</Text>
        </View>
      </View>

      {/* Fecha */}
      <View style={styles.fieldBlock}>
        <Text style={styles.label}>Fecha</Text>
        <View style={styles.inputRowTallBetween}>
          <Text style={styles.inputValue}>{dateText}</Text>
          {/* Icono calendario (placeholder simple) */}
          <View style={styles.calendarIcon} />
        </View>
      </View>

      {/* Descripción */}
      <View style={styles.fieldBlock}>
        <Text style={styles.label}>Descripción</Text>
        <View style={styles.descriptionRow}>
          <Text style={styles.descriptionText} numberOfLines={4}>
            {transaction.descripcion || "Sin descripción"}
          </Text>
        </View>
      </View>

      <View style={styles.fieldBlock}>
        <Text style={styles.label}>Recibo o voucher</Text>
        <TouchableOpacity
          style={styles.receiptBox}
          activeOpacity={0.85}
          disabled={!voucherUri}
          onPress={() => voucherUri && setShowVoucher(true)}
          accessibilityRole="imagebutton"
          accessibilityLabel={voucherUri ? "Ver recibo completo" : "Sin recibo"}
        >
          {voucherUri ? (
            <Image
              source={{ uri: voucherUri }}
              style={styles.receiptImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.receiptPlaceholder} />
          )}
          <View style={[styles.expandIcon, !voucherUri && { opacity: 0.3 }]} />
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={showVoucher}
        onBackdropPress={() => setShowVoucher(false)}
        onBackButtonPress={() => setShowVoucher(false)}
        style={styles.modal}
        animationIn="fadeIn"
        animationOut="fadeOut"
        backdropOpacity={0.85}
        useNativeDriver
      >
        <View style={styles.modalContent}>
          {voucherUri ? (
            <ScrollView
              style={{ flex: 1, alignSelf: "stretch" }}
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: verticalScale(20),
              }}
              showsVerticalScrollIndicator={false}
              maximumZoomScale={3}
              minimumZoomScale={1}
            >
              <Image
                source={{ uri: voucherUri }}
                style={[
                  styles.fullImage,
                  imgSize
                    ? { width: screenWidth - 40, height: undefined, aspectRatio: imgSize.w / imgSize.h }
                    : { width: screenWidth - 40, height: undefined },
                ]}
                resizeMode="contain"
              />
            </ScrollView>
          ) : null}
          <TouchableOpacity
            onPress={() => setShowVoucher(false)}
            style={styles.closeButton}
            accessibilityRole="button"
            accessibilityLabel="Cerrar vista de recibo"
          >
            <Text style={styles.closeText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: "100%",
  },
  mainTitle: {
    fontFamily: "Montserrat_700Bold",
    fontSize: moderateScale(24),
    lineHeight: moderateScale(36),
    color: "#181A2A",
    marginBottom: verticalScale(24),
  },
  fieldBlock: {
    marginBottom: verticalScale(24),
  },
  label: {
    fontFamily: "Montserrat_400Regular",
    fontSize: moderateScale(16),
    lineHeight: moderateScale(24),
    color: "#181A2A",
    marginBottom: verticalScale(8),
  },
  inputRowTall: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: scale(8),
    height: verticalScale(48),
    borderBottomWidth: 0.5,
    borderBottomColor: "#6C75AD",
    paddingHorizontal: scale(8),
  },
  inputRowTallBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: verticalScale(48),
    borderBottomWidth: 0.5,
    borderBottomColor: "#6C75AD",
    paddingHorizontal: scale(8),
  },
  currency: {
    fontFamily: "Montserrat_700Bold",
    fontSize: moderateScale(24),
    lineHeight: moderateScale(36),
    color: "#3476F4",
  },
  amount: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: moderateScale(20),
    lineHeight: moderateScale(20),
    color: "#181A2A",
  },
  inputValue: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: moderateScale(20),
    lineHeight: moderateScale(20),
    color: "#181A2A",
  },
  calendarIcon: {
    width: scale(16),
    height: scale(16),
    borderRadius: 3,
    backgroundColor: "#3476F4",
    opacity: 0.9,
  },
  descriptionRow: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#6C75AD",
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(12),
  },
  descriptionText: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: moderateScale(16),
    lineHeight: moderateScale(24),
    color: "#181A2A",
  },
  receiptBox: {
    height: verticalScale(188),
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#6C75AD",
    borderRadius: moderateScale(12),
    overflow: "hidden",
    position: "relative",
  },
  receiptImage: {
    width: "100%",
    height: "100%",
  },
  receiptPlaceholder: {
    flex: 1,
    backgroundColor: "#E1EBFD",
  },
  expandIcon: {
    position: "absolute",
    right: scale(8),
    bottom: scale(8),
    width: scale(20),
    height: scale(20),
    borderRadius: scale(4),
    backgroundColor: "#3476F4",
    opacity: 0.9,
  },
  modal: {
    margin: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: "100%",
    height: "80%",
  },
  closeButton: {
    marginTop: verticalScale(20),
    backgroundColor: "#3476F4",
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(8),
  },
  closeText: {
    color: "#ffffff",
    fontFamily: "Montserrat_600SemiBold",
    fontSize: moderateScale(14),
  },
});

export default FieldComponent;
