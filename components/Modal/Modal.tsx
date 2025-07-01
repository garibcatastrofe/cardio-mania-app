import { View, Text, Pressable, SafeAreaView } from "react-native";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";

/* STORES */
import { useModal } from "@/stores/Modal/modalStore";

/* ICONS */
import Feather from "@expo/vector-icons/Feather";

export function Modal() {
  const { isActivated, setModal, modalTitle, modalBody } = useModal();

  const hacerModalFalso = () => {
    setModal(false, modalTitle ?? "", modalBody);
  };

  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);
  const translateY = useSharedValue(-50);

  const modalOpacity = useSharedValue(0); // Nueva propiedad para el fade-out

  useEffect(() => {
    if (isActivated) {
      // Animación de entrada con rebote
      opacity.value = withTiming(1, { duration: 300 });
      scale.value = withSpring(1);
      translateY.value = withSpring(0);
      modalOpacity.value = withTiming(1, { duration: 300 }); // Desvanecer entrada
    } else {
      // Animación de salida suave
      opacity.value = withTiming(0, { duration: 200 });
      scale.value = withTiming(1, { duration: 200 });
      translateY.value = withTiming(50, { duration: 200 });
      modalOpacity.value = withTiming(0, { duration: 200 }); // Desvanecer salida
    }
  }, [isActivated]);

  const modalStyle = useAnimatedStyle(() => ({
    opacity: modalOpacity.value, // Aplicar opacidad
    transform: [{ scale: scale.value }, { translateY: translateY.value }],
  }));

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <SafeAreaView
      pointerEvents={isActivated ? "auto" : "none"}
      className="absolute inset-0 z-40 flex items-center justify-center w-full h-full"
    >
      {/* Fondo oscuro animado */}
      <Animated.View
        className="absolute top-0 left-0 w-full h-full bg-black/40"
        style={overlayStyle}
        pointerEvents={isActivated ? "auto" : "none"}
        onTouchEnd={hacerModalFalso}
      />
      <Animated.View
        className="w-11/12 p-4 bg-white shadow-lg rounded-2xl"
        style={modalStyle}
        pointerEvents={isActivated ? "auto" : "none"}
      >
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl font-poppins">{modalTitle}</Text>
          <Pressable
            className="p-2 rounded-lg active:bg-neutral-100"
            hitSlop={20}
            onPress={hacerModalFalso}
          >
            {({ pressed }) => (
              <Feather
                name="x"
                size={25}
                color={pressed ? "#039357" : "black"}
              />
            )}
          </Pressable>
        </View>
        <View style={{ maxHeight: 300 }}>{modalBody}</View>
      </Animated.View>
    </SafeAreaView>
  );
}
