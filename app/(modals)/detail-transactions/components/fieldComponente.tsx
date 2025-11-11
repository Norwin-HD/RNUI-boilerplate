import { useTransactionDetail } from "@/src/shared/TransactionDetailContext";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import TarjetasDeCategoria from "./Categories";

const FieldComponent: React.FC = () => {
  const transaction = useTransactionDetail();
  const [showVoucher, setShowVoucher] = useState(false);

  if (!transaction) return null;

  const amount = transaction.monto ?? 0;
  const sign = amount > 0 ? "+" : "-";
  const formattedAmount = `${sign} $${Math.abs(amount).toFixed(2)}`;
  const dateText = new Date(transaction.fecha).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const voucherUri = transaction.imagen;

  const displayUri = voucherUri && voucherUri.startsWith('/') ? `file://${voucherUri}` : voucherUri;

 const shouldShowImage = displayUri && (displayUri.startsWith('data:') || displayUri.startsWith('http') || displayUri.startsWith('file:'));

  console.log('FieldComponent - voucherUri:', voucherUri);
  console.log('FieldComponent - displayUri:', displayUri);
  console.log('FieldComponent - shouldShowImage:', shouldShowImage);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.mainTitle}>{transaction.type === "income" ? "Detalle de Ingreso" : "Detalle de Gasto"}</Text>

      <View style={styles.fieldBlock}>
        <Text style={styles.label}>Monto</Text>
        <View style={styles.inputRowTall}>
          <Text style={styles.currency}>$</Text>
          <Text style={styles.amount}>{formattedAmount.replace(/^[-+]?\s?\$/,'')}</Text>
        </View>
      </View>

      <View style={styles.fieldBlock}>
        <Text style={styles.label}>Fecha</Text>
        <View style={styles.inputRowTallBetween}>
          <Text style={styles.inputValue}>{dateText}</Text>
          <View style={styles.calendarIcon} />
        </View>
      </View>

      <TarjetasDeCategoria />

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
          onPress={() => {
            console.log('FieldComponent - TouchableOpacity onPress called');
            console.log('FieldComponent - Pressed receipt box, displayUri:', displayUri, 'shouldShowImage:', shouldShowImage);
            if (displayUri && shouldShowImage) {
              console.log('FieldComponent - Opening modal');
              setShowVoucher(true);
              console.log('FieldComponent - setShowVoucher called with true');
            }
          }}
        >
          {shouldShowImage ? (
            <Image 
              source={{ uri: displayUri }} 
              style={styles.receiptImage} 
              resizeMode="cover"
              onError={(e) => console.log('FieldComponent - Image load error:', e)}
              onLoad={() => console.log('FieldComponent - Image loaded successfully')}
            />
          ) : (
            <View style={styles.receiptPlaceholder}>
              <Text style={styles.placeholderText}>
                {voucherUri ? "Sin imagen" : "Imagen guardada localmente"}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={showVoucher}
        onBackdropPress={() => {
          console.log('FieldComponent - Backdrop pressed, closing modal');
          setShowVoucher(false);
        }}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          {displayUri ? (
            <Image source={{ uri: displayUri }} style={styles.fullImage} resizeMode="contain" 
              onError={(e) => console.log('FieldComponent - Modal image load error:', e)}
              onLoad={() => console.log('FieldComponent - Modal image loaded successfully')}
            />
          ) : (
            <Text>No URI to display</Text>
          )}
          <TouchableOpacity onPress={() => {
            console.log('FieldComponent - Close button pressed');
            setShowVoucher(false);
          }} style={styles.closeButton}>
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
    lineHeight: moderateScale(34),
    color: "#181A2A",
    marginBottom: verticalScale(24),
  },
  fieldBlock: {
    marginBottom: verticalScale(24),
  },
  label: {
    fontFamily: "Montserrat_400Regular",
    fontSize: moderateScale(16),
    lineHeight: moderateScale(20),
    color: "#181A2A",
    marginBottom: verticalScale(2),
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
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontFamily: "Montserrat_400Regular",
    fontSize: moderateScale(14),
    color: "#6C75AD",
    textAlign: "center",
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
    width: "90%",
    height: "80%",
    backgroundColor: 'white',
    borderRadius: moderateScale(12),
    justifyContent: "center",
    alignItems: "center",
    padding: scale(10),
  },
  fullImage: {
    width: "100%",
    height: "70%",
  },
  closeButton: {
    position: 'absolute',
    bottom: verticalScale(20),
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
