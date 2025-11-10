
import { useTransactionDetail } from "@/shared/TransactionDetailContext";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const VaucherDetailComponent = () => {
  const transaction = useTransactionDetail();
  const [showVoucher, setShowVoucher] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [imageLoadError, setImageLoadError] = useState<string | null>(null);

  useEffect(() => {}, [transaction]);

  const voucherUri = transaction?.imagen || transaction?.imageUri;

  if (!transaction) {
    return null;
  }

  const canShowImage =
    typeof voucherUri === "string" &&
    voucherUri &&
    voucherUri !== "default";

  

  return (
    <View style={styles.fieldBlock}>
      <Text style={styles.label}>Recibo o voucher</Text>
      <TouchableOpacity
        style={styles.receiptBox}
        onPress={() => {
          if (!canShowImage) return;
          setImageLoadError(null);
          setIsImageLoading(true);
          setShowVoucher(true);
        }}
        disabled={!canShowImage}
      >
        {canShowImage ? (
          <>
            <Image
              source={{ uri: voucherUri }}
              style={styles.receiptImage}
              contentFit="cover"
              onLoadStart={() => {
                setImageLoadError(null);
                setIsImageLoading(true);
              }}
              onLoad={() => {
                setIsImageLoading(false);
              }}
              onError={(e) => {
                setIsImageLoading(false);
                try {
                  setImageLoadError(JSON.stringify(e));
                } catch {
                  setImageLoadError(String(e));
                }
              }}
            />
            {isImageLoading && (
              <View style={[styles.receiptPlaceholder, { position: 'absolute' }]}>
                <ActivityIndicator size="large" color="#3476F4" />
              </View>
            )}
          </>
        ) : (
          <View style={styles.receiptPlaceholder}>
            <Ionicons name="receipt-outline" size={moderateScale(48)} color="#6C75AD" />
            <Text style={styles.placeholderText}>
              No hay recibo adjunto
            </Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Minimal info: show only error text if image fails */}
      {imageLoadError ? (
        <View style={{ paddingVertical: 8 }}>
          <Text style={{ fontSize: 12, color: 'red' }}>{String(imageLoadError)}</Text>
        </View>
      ) : null}

      <Modal
        visible={showVoucher}
        onRequestClose={() => setShowVoucher(false)}
        transparent
        animationType="fade"
      >
        <TouchableWithoutFeedback onPress={() => setShowVoucher(false)}>
          <View style={styles.modalBackdrop} />
        </TouchableWithoutFeedback>
        <View style={styles.modalCentered} pointerEvents="box-none">
          <View style={styles.modalContent}>
            {canShowImage ? (
              <>
                {isImageLoading && <ActivityIndicator size="large" color="#3476F4" />}

                <Image
                  source={{ uri: voucherUri }}
                  style={styles.fullImage}
                  contentFit="contain"
                  onLoadStart={() => {
                    setImageLoadError(null);
                    setIsImageLoading(true);
                  }}
                  onLoad={() => {
                    setIsImageLoading(false);
                  }}
                  onError={(e) => {
                    setIsImageLoading(false);
                    try {
                      setImageLoadError("Error cargando imagen");
                    } catch {
                      setImageLoadError("Error cargando imagen");
                    }
                  }}
                />
              </>
            ) : (
              <Text>Sin imagen para mostrar</Text>
            )}

            <TouchableOpacity
              onPress={() => setShowVoucher(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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
        gap: verticalScale(8),
      },
      placeholderText: {
        fontFamily: "Montserrat_400Regular",
        fontSize: moderateScale(14),
        color: "#6C75AD",
        textAlign: "center",
      },
      modal: {
        margin: 0,
        justifyContent: "center",
        alignItems: "center",
      },
      modalBackdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)'
      },
      modalCentered: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
      },
      modalContent: {
        width: "90%",
        height: "80%",
        backgroundColor: "white",
        borderRadius: moderateScale(12),
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

export default VaucherDetailComponent;
