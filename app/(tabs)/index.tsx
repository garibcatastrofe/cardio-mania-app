import { Text, View, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect, useRef, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

/* COMPONENTS */
import { Modal } from "../../components/Modal/Modal";
import { Rounds } from "@/components/Modal/Body/Rounds";
import { AnimatedButton } from "@/components/AnimatedButton";
import CircularTimer from "@/components/CircularTimer";

/* STORES */
import { useModal } from "../../stores/Modal/modalStore";
import { useRoundsArray } from "@/stores/Rounds/roundStore";

/* ICONS */
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function TabOneScreen() {
  const { setModal, modalBody, modalTitle } = useModal();
  const { roundsArray, setRoundsArray } = useRoundsArray();

  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [currentSeconds, setCurrentSeconds] = useState(
    /* roundsArray[0] */ /* 0 */ roundsArray[0].seconds
  );
  const [paused, setPaused] = useState(false);
  const referenciaTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (roundsArray.length === 0) {
      return;
    }
    clearInterval(referenciaTimer.current!);
    setPaused(false);
    setCurrentSeconds(roundsArray[0].seconds);

    // ⚠️ Importante: reiniciamos el index después del render
    requestAnimationFrame(() => {
      setCurrentIndex(0);
    });
  };

  const reset = () => {
    clearInterval(referenciaTimer.current!);
    setCurrentIndex(null);
    setCurrentSeconds(roundsArray[0].seconds);
    setPaused(false);
  };

  useEffect(() => {
    setCurrentSeconds(roundsArray[0].seconds);
    setModal(false, "Generar ciclo", <Rounds />);
  }, []);

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

          if (nextIndex < roundsArray.length) {
            setCurrentIndex(nextIndex);
            return roundsArray[nextIndex].seconds;
          } else {
            // Reset to preview
            setCurrentIndex(null);
            setPaused(false);
            return roundsArray[0].seconds;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(referenciaTimer.current!);
  }, [currentIndex, paused]);

  const getColor = ({ isBackground }: { isBackground: boolean }): string => {
    if (currentIndex === null) {
      if (isBackground) return "bg-[#4ade80]";
      return "#86efac";
    }

    if (currentIndex % 2 === 0) {
      if (isBackground) return "bg-[#4ade80]";
      return "#86efac";
    } else {
      if (isBackground) return "bg-[#facc15]";
      return "#fde047";
    }
  };

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle("light-content");
      /* return () => {
          // (opcional) restaurar estilo anterior si quieres
          
        }; */
    }, [])
  );

  return (
    <>
      {/* MODAL PARA LOS CICLOS */}
      <Modal />

      {/* CONTENEDOR GENERAL */}
      <SafeAreaView
        className={`justify-center flex-1 ${getColor({
          isBackground: true,
        })}`}
      >
        <View>
          {/* TITULO */}
          <Text className="text-5xl text-center text-white font-poppins_light">
            CARDIOMANIA
          </Text>

          {/* TEMPORIZADOR */}
          <CircularTimer
            currentSeconds={currentSeconds}
            totalSeconds={
              currentIndex !== null
                ? roundsArray[currentIndex].seconds
                : roundsArray[0].seconds
            }
            color={"#ffffff"}
            paused={paused}
            active={currentIndex !== null}
            keyFrame={currentIndex ?? -1}
            colorStroke={getColor({ isBackground: false })}
          />

          <View className="flex flex-row justify-center gap-4">
            {/* BOTÓN PARA INICIAR */}
            <AnimatedButton
              pressOutFunction={startTimer}
              backgroundColor="bg-[#ffffff]"
              icon={<AntDesign name="poweroff" size={35} color="#525252" />}
              componentClassName={`self-center ${
                currentIndex !== null
                  ? "pointer-events-none opacity-20"
                  : "opacity-100"
              }`}
            />

            {/* BOTÓN PARA PAUSAR */}
            <AnimatedButton
              pressOutFunction={() => setPaused((prev) => !prev)}
              backgroundColor="bg-[#ffffff]"
              icon={
                <Entypo
                  className={paused ? "" : "hidden"}
                  name="controller-play"
                  size={35}
                  color="#525252"
                />
              }
              icon1={
                <AntDesign
                  className={paused ? "hidden" : ""}
                  name="pause"
                  size={35}
                  color="#525252"
                />
              }
              componentClassName={`self-center ${
                currentIndex === null
                  ? "pointer-events-none opacity-20"
                  : "opacity-100"
              }`}
            />

            {/* BOTÓN PARA REINICIAR */}
            <AnimatedButton
              pressOutFunction={reset}
              backgroundColor="bg-[#ffffff]"
              icon={<AntDesign name="reload1" size={35} color="#525252" />}
              componentClassName={`self-center ${
                currentIndex === null
                  ? "pointer-events-none opacity-20"
                  : "opacity-100"
              }`}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
