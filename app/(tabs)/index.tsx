import { Text, View, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect, useRef, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

/* COMPONENTS */
import { AnimatedModal } from "../../components/Animated/AnimatedModal";
import { AnimatedButton } from "@/components/Animated/AnimatedButton";
import CircularTimer from "@/components/CircularTimer";

/* STORES */
import { useModal } from "../../stores/Modal/modalStore";
import { useRoundsArray } from "@/stores/Rounds/roundStore";

/* ICONS */
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function TabOneScreen() {
  const { roundsArray } = useRoundsArray();

  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [currentSeconds, setCurrentSeconds] = useState(roundsArray[0].seconds);
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

  const getColor = ({ isBackground }: { isBackground: 1 | 2 | 3 }): string => {
    if (currentIndex === null) {
      if (isBackground === 1) {
        return "bg-[#4ade80]";
      } else if (isBackground === 2) {
        return "#86efac";
      } else if (isBackground === 3) {
        return "#4ade80";
      } else {
        return "#cccccc";
      }
    }

    if (currentIndex % 2 === 0) {
      if (isBackground === 1) {
        return "bg-[#4ade80]";
      } else if (isBackground === 2) {
        return "#86efac";
      } else if (isBackground === 3) {
        return "#4ade80";
      } else {
        return "#cccccc";
      }
    } else {
      if (isBackground === 1) {
        return "bg-[#facc15]";
      } else if (isBackground === 2) {
        return "#fde047";
      } else if (isBackground === 3) {
        return "#facc15";
      } else {
        return "#cccccc";
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle("light-content");
      StatusBar.setBackgroundColor(getColor({ isBackground: 3 }));
    }, [])
  );

  return (
    <>
      {/* MODAL PARA LOS CICLOS */}
      <AnimatedModal />

      {/* CONTENEDOR GENERAL */}
      <SafeAreaView
        className={`justify-center flex-1 ${getColor({
          isBackground: 1,
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
            colorStroke={getColor({ isBackground: 2 })}
          />

          <View className="flex flex-row justify-center gap-4">
            {/* BOTÓN PARA INICIAR */}
            <AnimatedButton
              pressOutFunction={startTimer}
              backgroundColor="bg-[#ffffff] p-4 rounded-3xl"
              wantIconAlone={true}
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
              wantIconAlone={true}
              backgroundColor="bg-[#ffffff] p-4 rounded-3xl"
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
              wantIconAlone={true}
              backgroundColor="bg-[#ffffff] p-4 rounded-3xl"
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
