import { Text, View } from "react-native";
import { useState, useEffect, useRef } from "react";

/* COMPONENTS */
import { AnimatedButton } from "@/components/Animated/AnimatedButton";
import CircularTimer from "@/components/CircularTimer";

/* ICONS */
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";

/* STORES */
import { useRoundsArray } from "@/stores/Rounds/roundStore";

/* UTILS */
import { getHexaColorByNativewindColor } from "@/utils/getHexaColorByNativewindColor";
import { NativewindColor } from "@/interfaces/nativewindColor";

export function IndexPage() {
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

  const getColor = (): NativewindColor => {
    if (currentIndex !== null) {
      return roundsArray[currentIndex].highColor;
    } else {
      return roundsArray[0].highColor;
    }
  };

  return (
    <View
      className="items-center justify-center flex-1"
      style={{
        backgroundColor: getHexaColorByNativewindColor(getColor()),
      }}
    >
      {/* TITULO */}
      <Text className="text-4xl text-center text-white font-poppins">
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
        colorStroke={
          currentIndex !== null
            ? getHexaColorByNativewindColor(roundsArray[currentIndex].lowColor)
            : getHexaColorByNativewindColor(roundsArray[0].lowColor)
        }
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
  );
}
