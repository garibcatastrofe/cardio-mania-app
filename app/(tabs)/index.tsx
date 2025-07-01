import { Text, View, Pressable, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/components/useColorScheme";
import CircularTimer from "@/components/CircularTimer";
import { useState, useEffect, useRef } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";

/* COMPONENTS */
import { Modal } from "../../components/Modal/Modal";

/* STORES */
import { useModal } from "../../stores/Modal/modalStore";

export default function TabOneScreen() {
  const colorScheme = useColorScheme();
  const { isActivated, setModal, modalBody, modalTitle } = useModal();

  const times = [10, 30, 20, 30, 20, 30, 20]; // segundos
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [currentSeconds, setCurrentSeconds] = useState(times[0]);
  const [paused, setPaused] = useState(false);
  const referenciaTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (times.length === 0) {
      return;
    }
    clearInterval(referenciaTimer.current!);
    setPaused(false);
    setCurrentSeconds(times[0]);

    // ⚠️ Importante: reiniciamos el index después del render
    requestAnimationFrame(() => {
      setCurrentIndex(0);
    });
  };

  const reset = () => {
    clearInterval(referenciaTimer.current!);
    setCurrentIndex(null);
    setCurrentSeconds(times[0]);
    setPaused(false);
  };

  // ⏱ Controlar el temporizador con setInterval
  useEffect(() => {
    if (currentIndex === null || paused) {
      return;
    }

    clearInterval(referenciaTimer.current!);

    referenciaTimer.current = setInterval(() => {
      setCurrentSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(referenciaTimer.current!);
          const nextIndex = currentIndex + 1;

          if (nextIndex < times.length) {
            setCurrentIndex(nextIndex);
            return times[nextIndex];
          } else {
            // Reset to preview
            setCurrentIndex(null);
            setPaused(false);
            return times[0];
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(referenciaTimer.current!);
  }, [currentIndex, paused]);

  const getColor = ({ isBackground }: { isBackground: boolean }): string => {
    if (currentIndex === null) {
      if (isBackground) {
        return "bg-[#22c55e]";
      } else {
        return "#86efac";
      }
    }

    if (currentIndex % 2 === 0) {
      if (isBackground) {
        return "bg-[#22c55e]";
      } else {
        return "#86efac";
      }
    } else {
      if (isBackground) {
        return "bg-[#eab308]";
      } else {
        return "#fde047";
      }
    }
  };

  //const showPreview = currentIndex === null && times.length > 0;

  return (
    <SafeAreaView
      className={`justify-center flex-1 px-6 ${getColor({
        isBackground: true,
      })}`}
    >
      <Modal />
      {/* BOTON PARA ABRIR MODAL */}
      <Pressable
        className="absolute self-center p-4 bg-white rounded-2xl bottom-4 left-4"
        onPress={() =>
          setModal(
            true,
            "Opciones",
            <View className="p-4 bg-red-500">
              <Text>Este es el body del modal</Text>
            </View>
          )
        }
      >
        <Ionicons name="options" size={35} color="black" />
      </Pressable>
      <View>
        {/* TITULO */}
        <Text className="text-5xl text-center text-white font-poppins_light">
          CARDIOMANIA
        </Text>

        {/* TEMPORIZADOR */}
        <CircularTimer
          currentSeconds={currentSeconds}
          totalSeconds={currentIndex !== null ? times[currentIndex] : times[0]}
          color={"#ffffff"}
          paused={paused}
          active={currentIndex !== null}
          keyFrame={currentIndex ?? -1}
          colorStroke={getColor({ isBackground: false })}
        />

        {/* BOTONES PARA INICIAR, REINICIAR Y PAUSAR */}
        <View className="flex flex-row justify-center gap-4">
          <Pressable
            className={`self-center p-4 bg-white rounded-2xl ${
              currentIndex !== null
                ? "pointer-events-none opacity-20"
                : "opacity-100"
            }`}
            onPress={startTimer}
          >
            <FontAwesome5 name="running" size={35} color="black" />
          </Pressable>
          <Pressable
            className={`self-center p-4 bg-white rounded-2xl ${
              currentIndex === null
                ? "pointer-events-none opacity-20"
                : "opacity-100"
            }`}
            onPress={() => setPaused((prev) => !prev)}
          >
            <Entypo
              className={paused ? "" : "hidden"}
              name="controller-play"
              size={35}
              color="black"
            />
            <AntDesign
              className={paused ? "hidden" : ""}
              name="pause"
              size={35}
              color="black"
            />
          </Pressable>
          <Pressable
            className={`self-center p-4 bg-white rounded-2xl ${
              currentIndex === null
                ? "pointer-events-none opacity-20"
                : "opacity-100"
            }`}
            onPress={reset}
          >
            <AntDesign name="reload1" size={35} color="black" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
