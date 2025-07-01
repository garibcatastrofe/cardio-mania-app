import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect, useRef } from "react";

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
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabOneScreen() {
  const { setModal } = useModal();
  const { roundsArray, setRoundsArray } = useRoundsArray();

  /* const times = [
    10, 30, 20, 30, 20, 30, 20, 30, 20, 30, 20, 30, 20, 30, 20, 30, 20, 30, 20,
  ]; */
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [currentSeconds, setCurrentSeconds] = useState(/* roundsArray[0] */ 0);
  const [paused, setPaused] = useState(false);
  const referenciaTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (roundsArray.length === 0) {
      return;
    }
    clearInterval(referenciaTimer.current!);
    setPaused(false);
    setCurrentSeconds(roundsArray[0]);

    // ⚠️ Importante: reiniciamos el index después del render
    requestAnimationFrame(() => {
      setCurrentIndex(0);
    });
  };

  const reset = () => {
    clearInterval(referenciaTimer.current!);
    setCurrentIndex(null);
    setCurrentSeconds(roundsArray[0]);
    setPaused(false);
  };

  useEffect(() => {
    setCurrentSeconds(roundsArray[0]);
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
            return roundsArray[nextIndex];
          } else {
            // Reset to preview
            setCurrentIndex(null);
            setPaused(false);
            return roundsArray[0];
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
        {/* BOTON PARA ABRIR MODAL DE ROUNDS */}
        <AnimatedButton
          pressOutFunction={() => setModal(true, "Generar ciclo", <Rounds />)}
          backgroundColor="bg-[#ffffff]"
          icon={<Ionicons name="options" size={35} color="#525252" />}
          componentClassName="absolute z-30 self-start bottom-6 right-6"
        />

        <View>
          {/* TITULO */}
          <Text className="text-5xl text-center text-white font-poppins_light">
            CARDIOMANIA
          </Text>

          {/* TEMPORIZADOR */}
          <CircularTimer
            currentSeconds={currentSeconds}
            totalSeconds={
              currentIndex !== null ? roundsArray[currentIndex] : roundsArray[0]
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
              icon={<FontAwesome5 name="running" size={35} color="#525252" />}
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
